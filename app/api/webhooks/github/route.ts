import { sendDiscordEmbed } from "@/utils/discord";
import { NextRequest, NextResponse } from "next/server";

// ประเภทข้อมูลสำหรับ GitHub webhook payload
interface GitHubPayload {
  repository: {
    name: string;
    full_name: string;
    html_url: string;
  };
  ref?: string;
  ref_name?: string;
  pusher?: {
    name: string;
    email: string;
  };
  sender: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  commits?: Array<{
    id: string;
    message: string;
    url: string;
    timestamp: string;
  }>;
  head_commit?: {
    id: string;
    message: string;
    url: string;
    timestamp: string;
  };
}

// ฟังก์ชันสำหรับตรวจสอบว่า branch ที่ได้รับเป็น main หรือ develop หรือไม่
function isTargetBranch(ref?: string): boolean {
  if (!ref) return false;

  // รูปแบบของ ref จะเป็น "refs/heads/branch_name"
  const branchName = ref.replace("refs/heads/", "");
  return (
    branchName === "main" || branchName === "develop" || branchName === "master"
  );
}

// ฟังก์ชันสร้าง Discord Embed สำหรับส่งไปยัง Discord

async function createDiscordEmbed(payload: GitHubPayload) {
  const { repository, sender, head_commit, commits, ref } = payload;

  if (!repository || !sender) {
    return [
      {
        title: "⚠️ ข้อมูลไม่ครบถ้วน",
        description: "ได้รับ webhook จาก GitHub แต่ข้อมูลไม่ครบถ้วน",
        color: 16776960, // สีเหลือง
      },
    ];
  }

  const branchName = ref ? ref.replace("refs/heads/", "") : "ไม่ระบุ";
  const commit =
    head_commit || (commits && commits.length > 0 ? commits[0] : null);

  // สร้าง fields สำหรับ embed
  const fields = [
    {
      name: "📂 โปรเจ็ค",
      value: repository.full_name,
      inline: true,
    },
    {
      name: "🌿 Branch",
      value: branchName,
      inline: true,
    },
    {
      name: "👨‍💻 ผู้ Deploy",
      value: sender.login,
      inline: true,
    },
  ];

  if (commit) {
    fields.push(
      {
        name: "📝 Commit Message",
        value: commit.message,
        inline: false,
      },
      {
        name: "⏰ เวลา",
        value: commit.timestamp
          ? new Date(commit.timestamp).toLocaleString("th-TH")
          : "ไม่ระบุ",
        inline: false,
      }
    );
  }

  // กำหนดสีตาม branch
  let color = 5814783; // สีฟ้า (ค่าเริ่มต้น)
  if (branchName === "main" || branchName === "master") {
    color = 5763719; // สีเขียว
  } else if (branchName === "develop") {
    color = 16750899; // สีส้ม
  }

  return [
    {
      title: `🚀 มีการ Deploy โปรเจ็ค ${repository.name}`,
      description: `มีการ deploy โค้ดไปยัง branch ${branchName} โดย ${sender.login}`,
      color: color,
      fields: fields,
      timestamp: new Date().toISOString(),
      footer: {
        text: "AI Code Review System",
        icon_url:
          "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      },
      thumbnail: {
        url: sender.avatar_url,
      },
      url: commit ? commit.url : repository.html_url,
    },
  ];
}

export async function POST(request: NextRequest) {
  try {
    const payload: GitHubPayload = await request.json();
    console.log(
      "ได้รับ GitHub webhook payload:",
      JSON.stringify(payload, null, 2)
    );

    // ตรวจสอบว่าเป็น branch ที่ต้องการหรือไม่
    if (!isTargetBranch(payload.ref)) {
      console.log(`ไม่ใช่ branch ที่ต้องการ: ${payload.ref}`);
      return NextResponse.json(
        { message: "ไม่ใช่ branch ที่ต้องการ (main หรือ develop)" },
        { status: 200 }
      );
    }

    console.log(`ได้รับ webhook จาก branch ที่ต้องการ: ${payload.ref}`);

    // สร้าง embed และส่งไปยัง Discord
    const embeds = await createDiscordEmbed(payload);
    console.log(
      "กำลังส่งข้อความไปยัง Discord:",
      JSON.stringify(embeds, null, 2)
    );

    await sendDiscordEmbed(embeds);
    console.log("ส่งข้อความไปยัง Discord สำเร็จ");

    // บันทึกข้อมูล deployment ลงในระบบ
    try {
      const { repository, sender, head_commit, commits, ref } = payload;
      const branchName = ref ? ref.replace("refs/heads/", "") : "ไม่ระบุ";
      const commit =
        head_commit || (commits && commits.length > 0 ? commits[0] : null);

      if (repository && sender && commit) {
        console.log("กำลังบันทึกข้อมูล deployment");

        // ใช้ absolute URL สำหรับการเรียก API ภายใน
        const deploymentResponse = await fetch(
          "http://localhost:3000/api/deployments",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              projectName: repository.name,
              branch: branchName,
              deployedBy: sender.login,
              commitMessage: commit.message,
              commitUrl: commit.url,
              repositoryUrl: repository.html_url,
            }),
          }
        );

        if (!deploymentResponse.ok) {
          throw new Error(
            `การบันทึกข้อมูล deployment ล้มเหลว: ${deploymentResponse.status}`
          );
        }

        console.log("บันทึกข้อมูล deployment สำเร็จ");
      }
    } catch (deploymentError) {
      console.error(
        "เกิดข้อผิดพลาดในการบันทึกข้อมูล deployment:",
        deploymentError
      );
      // ไม่ return error เพื่อให้การส่งข้อความไปยัง Discord สำเร็จ
    }

    return NextResponse.json({
      success: true,
      message: "ส่งข้อความไปยัง Discord สำเร็จ",
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการประมวลผล webhook:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการประมวลผล webhook" },
      { status: 500 }
    );
  }
}
