import Link from "next/link";

import { useTheme } from "@/contexts/ThemeContext";

export default function DashboardHeader() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className={isDark ? "text-white" : "text-gray-900"}>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            AI Code Review Dashboard
          </h1>
          <p
            className={`mt-2 text-base sm:text-lg ${isDark ? "text-blue-100" : "text-gray-600"}`}
          >
            ภาพรวมระบบตรวจสอบคุณภาพโค้ด
          </p>
        </div>
        <Link
          className={`group flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 ${
            isDark
              ? "bg-white/10 hover:bg-white/20 text-white border-white/20"
              : "bg-white/80 hover:bg-white text-gray-700 border-gray-200"
          } rounded-lg transition-all duration-300 hover:scale-105 border backdrop-blur-md`}
          href="/"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          กลับหน้าหลัก
        </Link>
      </div>
    </header>
  );
}
