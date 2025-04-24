"use client";

import { useState } from "react";
import AnswerBlock from "@/components/chat/AnswerBlock";

const Chat = () => {
  const [prompt, setPrompt] = useState("ลองถามมาสิ");
  const [geminiData, setGeminiData] = useState("");
  const [claudeData, setClaudeData] = useState("");
  const [summaryData, setSummaryData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);

    try {
      // เรียกใช้ API จากหลาย model พร้อมกัน
      const [geminiRes, claudeRes] = await Promise.all([
        fetch("/api/integrations/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, models: "gemini-2.0-flash" }),
        }).then((res) => res.json()),

        fetch("/api/integrations/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, models: "gemini-1.5-flash" }),
        }).then((res) => res.json()),
      ]);

      setGeminiData(geminiRes.result);
      setClaudeData(claudeRes.result);

      // สร้างสรุปจากทั้งสอง model
      await onSummaryData(claudeRes.result, geminiRes.result);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเรียกใช้ AI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSummaryData = async (article1: string, article2: string) => {
    try {
      const res = await fetch("/api/integrations/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `สรุป "${prompt}" \nบทความแรก ${article1}\n และ \nบทความสอง${article2} และอกทิ้งท้ายด้วยว่าบทความไหนมีประโยชน์มากกว่า เพราะอะไรและแทนที่คำว่าบทความด้วยคำว่า โมเดล`,
          models: "gemini-1.5-pro",
        }),
      });

      const sumRes = await res.json();
      setSummaryData(sumRes.result);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการสร้างสรุป:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt();
    }
  };

  return (
    <div className="w-full p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          💡 AI Code Review Assistant
        </h2>

        <div className="flex gap-4 items-end">
          <div className="flex-1 relative">
            <textarea
              className="w-full min-h-[100px] p-3 bg-gray-50 border border-gray-200 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      font-mono resize-none"
              placeholder="พิมพ์คำถามหรือโค้ดที่ต้องการตรวจสอบ..."
              value={prompt}
              onKeyDown={handleKeyDown}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                    transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={prompt.trim().length < 1 || isLoading}
            onClick={sendPrompt}
          >
            {isLoading ? "กำลังประมวลผล..." : "วิเคราะห์"}
          </button>
        </div>
      </div>

      {/* แสดงผลลัพธ์ */}
      <div className="space-y-6">
        {summaryData && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <AnswerBlock
              isLoading={isLoading}
              title="สรุปผลการวิเคราะห์"
              data={summaryData}
            />
          </div>
        )}

        {(geminiData || claudeData) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <AnswerBlock
                isLoading={isLoading}
                title="Gemini Analysis"
                data={geminiData}
              />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <AnswerBlock
                isLoading={isLoading}
                title="Claude Analysis"
                data={claudeData}
              />
            </div>
          </div>
        )}

        {!summaryData && !isLoading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <AnswerBlock
              isLoading={isLoading}
              title=""
              data="🤖 พิมพ์โค้ดหรือคำถามแล้วกด 'วิเคราะห์' เพื่อตรวจสอบ"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
