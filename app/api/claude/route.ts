// app/api/claude/route.ts
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Claude API Error:", errorText);
      return Response.json(
        { error: "Claude API error", detail: errorText },
        { status: 500 }
      );
    }

    const data = await res.json();
    return Response.json({ result: data.choices[0].message.content });
  } catch (err: any) {
    console.error("Internal Error:", err);
    return Response.json(
      { error: "Internal Server Error", detail: err.message },
      { status: 500 }
    );
  }
}
