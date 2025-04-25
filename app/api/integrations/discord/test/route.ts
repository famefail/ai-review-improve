import { NextRequest, NextResponse } from "next/server";

import { sendDiscordEmbed, sendToDiscord } from "@/utils/discord";

// ฟังก์ชันสำหรับทดสอบการส่งข้อความไปยัง Discord
export async function GET(request: NextRequest) {
  console.log(request);
  try {
    // ตรวจสอบว่ามีการตั้งค่า webhook ID และ token หรือไม่
    if (
      !process.env.NEXT_PUBLIC_DISCORD_ID ||
      !process.env.NEXT_PUBLIC_DISCORD_TOKEN ||
      process.env.NEXT_PUBLIC_DISCORD_ID === "your_discord_webhook_id" ||
      process.env.NEXT_PUBLIC_DISCORD_TOKEN === "your_discord_webhook_token"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "ไม่พบการตั้งค่า Discord Webhook ID หรือ Token",
          message:
            "กรุณาตั้งค่า NEXT_PUBLIC_DISCORD_ID และ NEXT_PUBLIC_DISCORD_TOKEN ใน .env.local",
        },
        { status: 400 },
      );
    }

    // ทดสอบส่งข้อความธรรมดา
    await sendToDiscord(
      "🧪 ทดสอบการส่งข้อความจากระบบ AI Code Review & Deployment Monitoring",
    );

    // ทดสอบส่ง embed
    const testEmbed = [
      {
        title: "🚀 ทดสอบการส่ง Embed",
        description:
          "นี่เป็นการทดสอบการส่ง embed ไปยัง Discord จากระบบ AI Code Review & Deployment Monitoring",
        color: 5763719, // สีเขียว
        fields: [
          {
            name: "📂 โปรเจ็ค",
            value: "ai-review-improve",
            inline: true,
          },
          {
            name: "🌿 Branch",
            value: "main",
            inline: true,
          },
          {
            name: "👨‍💻 ผู้ Deploy",
            value: "test-user",
            inline: true,
          },
          {
            name: "📝 Commit Message",
            value: "ทดสอบระบบแจ้งเตือน Discord",
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "AI Code Review System",
          icon_url:
            "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        },
      },
    ];

    await sendDiscordEmbed(testEmbed);

    return NextResponse.json({
      success: true,
      message: "ส่งข้อความทดสอบไปยัง Discord สำเร็จ",
      note: "กรุณาตรวจสอบใน Discord channel ที่ตั้งค่าไว้ว่าได้รับข้อความหรือไม่",
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการทดสอบส่งข้อความไปยัง Discord:", error);

    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดในการทดสอบส่งข้อความไปยัง Discord",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
