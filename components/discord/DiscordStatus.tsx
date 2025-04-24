"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface DiscordStatusProps {
  className?: string;
}

const DiscordStatus = ({ className = "" }: DiscordStatusProps) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState<string>("");
  const [isTesting, setIsTesting] = useState(false);
  const [hasTestedThisSession, setHasTestedThisSession] = useState(false);

  // ฟังก์ชันตรวจสอบการตั้งค่า (ไม่ส่งข้อความ)
  const validateDiscordConfig = async () => {
    setStatus("loading");
    setMessage("กำลังตรวจสอบการตั้งค่า Discord...");

    try {
      // ตรวจสอบว่ามีการตั้งค่า Discord webhook หรือไม่
      const discordId = process.env.NEXT_PUBLIC_DISCORD_ID;
      const discordToken = process.env.NEXT_PUBLIC_DISCORD_TOKEN;

      if (
        !discordId ||
        !discordToken ||
        discordId === "your_discord_webhook_id" ||
        discordToken === "your_discord_webhook_token"
      ) {
        setStatus("error");
        setMessage(
          "ยังไม่ได้ตั้งค่า Discord webhook กรุณาตั้งค่าใน .env.local",
        );

        return;
      }

      // ตรวจสอบการเชื่อมต่อกับ Discord webhook โดยไม่ส่งข้อความ
      const response = await fetch("/api/integrations/discord/validate");
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage(
          "การตั้งค่า Discord webhook ถูกต้อง พร้อมสำหรับการแจ้งเตือน",
        );
      } else {
        throw new Error(
          data.message || "ไม่สามารถเชื่อมต่อกับ Discord webhook ได้",
        );
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        `เกิดข้อผิดพลาด: ${error instanceof Error ? error.message : "ไม่สามารถเชื่อมต่อกับ Discord webhook ได้"}`,
      );
    }
  };

  // ฟังก์ชันทดสอบการส่งข้อความ (เมื่อกดปุ่มทดสอบเท่านั้น)
  const testDiscordMessage = async () => {
    setIsTesting(true);
    setMessage("กำลังส่งข้อความทดสอบไปยัง Discord...");

    try {
      const response = await fetch("/api/integrations/discord/test");
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage(
          "เชื่อมต่อกับ Discord webhook สำเร็จ กรุณาตรวจสอบข้อความใน Discord channel",
        );
        setHasTestedThisSession(true);
      } else {
        throw new Error(
          data.message || "เกิดข้อผิดพลาดในการเชื่อมต่อกับ Discord webhook",
        );
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        `เกิดข้อผิดพลาดในการส่งข้อความทดสอบ: ${error instanceof Error ? error.message : "ไม่สามารถส่งข้อความไปยัง Discord ได้"}`,
      );
    } finally {
      setIsTesting(false);
    }
  };

  // เรียกใช้ฟังก์ชันตรวจสอบเมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    validateDiscordConfig();
  }, []);

  // สถานะและสไตล์
  const statusStyles = {
    loading: {
      container: "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200",
      icon: "bg-gradient-to-r from-blue-400 to-blue-500 animate-pulse",
      iconText: "💫",
      badge: "bg-gray-100 text-gray-600",
      title: "text-gray-700",
      message: "text-gray-600",
    },
    success: {
      container: "bg-gradient-to-r from-green-50 to-green-100 border-green-200",
      icon: "bg-gradient-to-r from-green-400 to-green-500",
      iconText: "🚀",
      badge: "bg-green-600 text-white",
      title: "text-green-800",
      message: "text-green-700",
    },
    error: {
      container: "bg-gradient-to-r from-red-50 to-red-100 border-red-200",
      icon: "bg-gradient-to-r from-red-400 to-red-500",
      iconText: "⚠️",
      badge: "bg-red-600 text-white",
      title: "text-red-800",
      message: "text-red-700",
    },
  };

  const statusMessages = {
    loading: "กำลังตรวจสอบการตั้งค่า Discord",
    success: "การเชื่อมต่อ Discord พร้อมใช้งาน",
    error: "การตั้งค่า Discord ไม่สมบูรณ์",
  };

  const currentStyle = statusStyles[status];

  return (
    <div
      className={`relative rounded-xl shadow-md overflow-hidden transition-all duration-300 ${className} ${currentStyle.container} border`}
    >
      {/* Discord Icon Badge */}
      <div className="absolute top-0 right-0 m-4 p-1 transform transition-transform hover:scale-110">
        <svg
          className={`${status === "loading" ? "animate-pulse" : ""}`}
          height="28"
          viewBox="0 0 24 24"
          width="28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.02.06.03.09.02c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"
            fill="#5865F2"
          />
        </svg>
      </div>

      {/* Header */}
      <div className="px-6 py-4 border-b border-opacity-30 border-gray-300">
        <div className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 shadow-inner ${currentStyle.icon}`}
          >
            <span className="text-xl">{currentStyle.iconText}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-semibold text-lg ${currentStyle.title}`}>
                Discord Integration
              </h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${currentStyle.badge}`}
              >
                {status === "loading"
                  ? "กำลังตรวจสอบ"
                  : status === "success"
                    ? "พร้อมใช้งาน"
                    : "ไม่พร้อมใช้งาน"}
              </span>
            </div>
            <p className={`text-sm mt-1 ${currentStyle.message}`}>
              {statusMessages[status]}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {message && (
          <div
            className={`mb-4 text-sm ${currentStyle.message} bg-white bg-opacity-60 rounded-lg p-3 shadow-sm`}
          >
            {message}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-4">
          {status === "error" && (
            <>
              <Link
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center shadow-sm hover:shadow"
                href="/docs/integrations/DISCORD_SETUP.md"
                target="_blank"
              >
                <span className="mr-2">📖</span> คู่มือการตั้งค่า
              </Link>

              <button
                className="text-sm bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors shadow-sm hover:shadow"
                onClick={() => validateDiscordConfig()}
              >
                <span className="mr-2">🔄</span> ตรวจสอบใหม่
              </button>
            </>
          )}

          {status === "success" && !hasTestedThisSession && (
            <button
              className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm hover:shadow disabled:opacity-50 disabled:hover:bg-blue-500 disabled:hover:shadow-sm flex items-center"
              disabled={isTesting}
              onClick={testDiscordMessage}
            >
              {isTesting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg>
                  กำลังทดสอบ...
                </>
              ) : (
                <>
                  <span className="mr-2">📨</span> ทดสอบส่งข้อความ
                </>
              )}
            </button>
          )}

          {status === "success" && hasTestedThisSession && (
            <div className="text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200 flex items-center">
              <span className="mr-2">✓</span> ทดสอบส่งข้อความสำเร็จแล้ว
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscordStatus;
