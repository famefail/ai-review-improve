import { NextRequest, NextResponse } from "next/server";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

export async function POST(req: NextRequest) {
  const event = req.headers.get("x-github-event");
  const payload = await req.json();

  if (event === "push") {
    const repo = payload.repository.full_name;
    const pusher = payload.pusher.name;
    const commits = payload.commits
      .map(
        (commit: any) =>
          `• [${commit.id.slice(0, 7)}](${commit.url}) ${commit.message}`
      )
      .join("\n");

    const discordEmbed = {
      username: "GitHub Bot",
      avatar_url:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      embeds: [
        {
          title: `🚀 ${pusher} pushed to ${repo}`,
          description: commits,
          color: 0x7289da,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const discordRes = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordEmbed),
      });

      if (!discordRes.ok) {
        const errorText = await discordRes.text();
        throw new Error(
          `Discord responded with status ${discordRes.status}: ${errorText}`
        );
      }

      return NextResponse.json(
        { message: "Webhook sent to Discord" },
        { status: 200 }
      );
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Event not handled" }, { status: 200 });
}
