import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const POST = async (req: Request) => {
  const { prompt } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return Response.json({ result: text });
};
