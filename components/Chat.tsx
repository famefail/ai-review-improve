"use client";
import { useState } from "react";
import Loading from "./Loading";
import AnswerBlock from "./AnswerBlock";
const Chat = () => {
  const [prompt, setPrompt] = useState("ทำนายอนาคตของฉัน");
  const [geminiData, setGeminiData] = useState("");
  const [claudeData, setClaudeData] = useState("");
  const [openAIData, setOpenAIData] = useState("");
  const [summaryData, setSummaryData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendPrompt = async () => {
    setIsLoading(true);
    const [geminiRes, claudeRes] = await Promise.all([
      fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }).then((res) => res.json()),

      fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }).then((res) => res.json()),
    ]);
    setClaudeData(claudeRes.result);
    setGeminiData(geminiRes.result);
    // setOpenAIData(openAIRes.result);

    setIsLoading(false);
    await onSummaryData(claudeRes.result, geminiRes.result);
    setPrompt("");
  };

  const onSummaryData = async (article1: string, article2: string) => {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `สรุป ${prompt} \n ${article1} และ ${article2}`,
      }),
    });

    const sumRes = await res.json();
    setSummaryData(sumRes.result);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      sendPrompt();
    }
  };

  return (
    <div className=" mx-auto p-4 space-y-4 h-full w-full">
      <div className="flex gap-4 justify-center items-center">
        <textarea
          className="flex-1 min-h-[100px] p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono resize-none"
          placeholder="Type your prompt..."
          value={prompt}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          disabled={prompt.trim().length < 1 || isLoading}
          onClick={sendPrompt}
        >
          Send
        </button>
      </div>
      {summaryData ? (
        <>
          <AnswerBlock
            isLoading={isLoading}
            title="Summary"
            data={summaryData}
          />
          <div className="grid grid-cols-2 gap-1">
            <AnswerBlock
              isLoading={isLoading}
              title="model 1"
              data={geminiData}
            />
            <AnswerBlock
              isLoading={isLoading}
              title="model 2"
              data={claudeData}
            />
          </div>{" "}
        </>
      ) : (
        <AnswerBlock
          isLoading={isLoading}
          title=""
          data="🤖 Waiting for prompt..."
        />
      )}
    </div>
  );
};

export default Chat;
