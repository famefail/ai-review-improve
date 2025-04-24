import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export const POST = async (req: Request) => {
  console.log(req);
  const response = await client.responses.create({
    model: "gpt-3.5",
    instructions: "You are a coding assistant that talks like a pirate",
    input: "Are semicolons optional in JavaScript?",
  });

  console.log(response.output_text);

  return NextResponse.json({
    success: true,
    message: "ส่งข้อความไปยัง Discord สำเร็จ",
  });
};
