import { createDiscordEmbed, sendDiscordEmbed } from "@/utils/discord";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload: GitHubPayload = await request.json();

    // // ตรวจสอบว่าเป็น branch ที่ต้องการหรือไม่
    // if (!isTargetBranch(payload.ref)) {
    //   console.log(`ไม่ใช่ branch ที่ต้องการ: ${payload.ref}`);
    //   return NextResponse.json(
    //     { message: "ไม่ใช่ branch ที่ต้องการ (main หรือ develop)" },
    //     { status: 200 }
    //   );
    // }

    // // สร้าง embed และส่งไปยัง Discord
    const embeds = await createDiscordEmbed(payload);

    await sendDiscordEmbed(embeds);

    // บันทึกข้อมูล deployment ลงในระบบ
    try {
      const { repository, sender, head_commit, commits, ref } = payload;
      const branchName = ref ? ref.replace("refs/heads/", "") : "ไม่ระบุ";
      const commit =
        head_commit || (commits && commits.length > 0 ? commits[0] : null);
      if (repository && sender && commit) {
        console.log("กำลังบันทึกข้อมูล deployment");
        // ใช้ absolute URL สำหรับการเรียก API ภายใน
        const deploymentResponse = await fetch("/api/deployments", {
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
        });
        if (!deploymentResponse.ok) {
          throw new Error(
            `การบันทึกข้อมูล deployment ล้มเหลว: ${deploymentResponse.status}`
          );
        }
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
      message: payload,
      embeds: embeds,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `เกิดข้อผิดพลาดในการประมวลผล webhook ${error}` },
      { status: 500 }
    );
  }
}
