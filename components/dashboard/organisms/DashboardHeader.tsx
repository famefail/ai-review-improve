import Link from "next/link";

export default function DashboardHeader() {
  return (
    <header className="relative">
      <div className="flex justify-between items-center">
        <div className="text-white">
          <h1 className="text-4xl font-bold tracking-tight">
            Dashboard ติดตามคุณภาพโค้ด
          </h1>
          <p className="text-blue-100 mt-2 text-lg">
            ติดตามการ deploy และคุณภาพโค้ดของโปรเจ็คทั้งหมด
          </p>
        </div>
        <Link
          className="group flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-lg transition-all duration-300 hover:scale-105 border border-white/20"
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
