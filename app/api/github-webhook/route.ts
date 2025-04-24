import {
  createDiscordEmbed,
  isTargetBranch,
  sendDiscordEmbed,
} from "@/utils/discord";
import { NextRequest, NextResponse } from "next/server";

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
    const embeds: Promise<DiscordEmbed[]> = createDiscordEmbed(payload);
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
