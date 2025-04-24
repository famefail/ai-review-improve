import Navigator from "@/components/general/Navigator";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard - AI Code Review",
  description: "ติดตามคุณภาพโค้ดและการ deploy ของโปรเจ็ค",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navPages = [
    { name: "หน้าหลัก", url: "/" },
    { name: "Dashboard", url: "/overview" },
    { name: "Ai Assists", url: "/ai-assists" },
  ];
  return (
    <div className="bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="font-bold text-xl text-blue-600">
                  AI Review
                </Link>
              </div>
              <Navigator />
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
