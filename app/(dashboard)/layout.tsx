import type { Metadata } from "next";

import DashboardShell from "@/components/layouts/DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard - AI Code Review",
  description: "ติดตามคุณภาพโค้ดและการ deploy ของโปรเจ็ค",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell>{children}</DashboardShell>;
}
