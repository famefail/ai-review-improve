"use server";

// ประเภทข้อมูลสำหรับ Discord Embed

// ฟังก์ชันส่งข้อความธรรมดาไปยัง Discord
export const sendToDiscord = async (message: string) => {
  try {
    // ตรวจสอบว่ามีการตั้งค่า webhook ID และ token หรือไม่
    if (
      !process.env.NEXT_PUBLIC_DISCORD_ID ||
      !process.env.NEXT_PUBLIC_DISCORD_TOKEN
    ) {
      console.error("ไม่พบการตั้งค่า Discord Webhook ID หรือ Token");
      throw new Error("ไม่พบการตั้งค่า Discord Webhook ID หรือ Token");
    }

    const webhookURL = `https://discord.com/api/webhooks/${process.env.NEXT_PUBLIC_DISCORD_ID}/${process.env.NEXT_PUBLIC_DISCORD_TOKEN}`;
    console.log(
      `กำลังส่งข้อความไปยัง Discord: ${message.substring(0, 50)}${
        message.length > 50 ? "..." : ""
      }`
    );

    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `การส่งข้อความไปยัง Discord ล้มเหลว: ${response.status} ${errorText}`
      );
      throw new Error(`การส่งข้อความไปยัง Discord ล้มเหลว: ${response.status}`);
    }

    console.log("ส่งข้อความไปยัง Discord สำเร็จ");
    return { success: true };
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการส่งข้อความไปยัง Discord:", error);
    throw error;
  }
};

// ฟังก์ชันส่งข้อความแบบ rich embed ไปยัง Discord
export const sendDiscordEmbed = async (embeds: Promise<DiscordEmbed[]>) => {
  try {
    // ตรวจสอบว่ามีการตั้งค่า webhook ID และ token หรือไม่
    if (
      !process.env.NEXT_PUBLIC_DISCORD_ID ||
      !process.env.NEXT_PUBLIC_DISCORD_TOKEN
    ) {
      console.error("ไม่พบการตั้งค่า Discord Webhook ID หรือ Token");
      throw new Error("ไม่พบการตั้งค่า Discord Webhook ID หรือ Token");
    }

    const webhookURL = `https://discord.com/api/webhooks/${process.env.NEXT_PUBLIC_DISCORD_ID}/${process.env.NEXT_PUBLIC_DISCORD_TOKEN}`;
    console.log(
      `กำลังส่ง embed ไปยัง Discord: ${JSON.stringify(embeds).substring(
        0,
        100
      )}...`
    );

    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `การส่ง embed ไปยัง Discord ล้มเหลว: ${response.status} ${errorText}`
      );
      throw new Error(`การส่ง embed ไปยัง Discord ล้มเหลว: ${response.status}`);
    }

    console.log("ส่ง embed ไปยัง Discord สำเร็จ");
    return { success: true };
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการส่ง embed ไปยัง Discord:", error);
    throw error;
  }
};

// ฟังก์ชันส่งข้อความพร้อม embed ไปยัง Discord
export const sendDiscordMessageWithEmbed = async (
  content: string,
  embeds: DiscordEmbed[]
) => {
  const webhookURL = `https://discord.com/api/webhooks/${process.env.NEXT_PUBLIC_DISCORD_ID}/${process.env.NEXT_PUBLIC_DISCORD_TOKEN}`;

  await fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, embeds }),
  });
};

// ฟังก์ชันสำหรับตรวจสอบว่า branch ที่ได้รับเป็น main หรือ develop หรือไม่
export async function isTargetBranch(ref?: string) {
  if (!ref) return false;

  // รูปแบบของ ref จะเป็น "refs/heads/branch_name"
  const branchName = ref.replace("refs/heads/", "");
  return (
    branchName === "main" || branchName === "develop" || branchName === "master"
  );
}

// ฟังก์ชันสร้าง Discord Embed สำหรับส่งไปยัง Discord

export async function createDiscordEmbed(
  payload: GitHubPayload
): Promise<DiscordEmbed[]> {
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
