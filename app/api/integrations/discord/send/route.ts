import { sendToDiscord } from "@/utils/discord";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const result = await sendToDiscord(message);
    return Response.json(result);
  } catch (err: unknown) {
    let detail = "Unknown error";
    if (err instanceof Error) detail = err.message;

    return Response.json({ error: true, detail }, { status: 500 });
  }
}
