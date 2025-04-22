"use client";
import { useState } from "react";
import Loading from "./Loading";
const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [geminiRes, setGeminiRes] = useState("");
  const [claudeAIRes, setClaudeAIRes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendPrompt = async () => {
    setIsLoading(true);
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const geminiData = await res.json();

    const claudeRes = await fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const claudeData = await claudeRes.json();

    setIsLoading(false);
    setClaudeAIRes(claudeData);
    setGeminiRes(geminiData.result);
    setPrompt("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      sendPrompt();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4 h-full w-full">
      <div className="flex gap-4 justify-center items-center">
        <textarea
          className="flex-1 min-h-[100px] p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono resize-none"
          placeholder="Type your prompt..."
          value={prompt}
          onKeyDown={handleKeyDown}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          disabled={prompt.trim().length < 1}
          onClick={sendPrompt}
        >
          Send
        </button>
      </div>
      <div>
        <h1>Gemini</h1>

        <div className="bg-gray-100 border border-gray-300 rounded-md p-4 whitespace-pre-wrap font-mono">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loading isLoading={isLoading} />
            </div>
          ) : (
            geminiRes || "🤖 Waiting for prompt..."
          )}
        </div>
      </div>
      {/* {claudeAIRes && (
        <div>
          <h1>ChatGPT</h1>
          <div className="bg-gray-100 border border-gray-300 rounded-md p-4 whitespace-pre-wrap font-mono">
            {claudeAIRes || "🤖 Waiting for prompt..."}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Chat;
