import { useTheme } from "@/contexts/ThemeContext";

import FeatureCard from "../molecules/FeatureCard";

export default function FeaturesOverview() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const features = [
    {
      id: "discord-bot",
      icon: "🤖",
      title: "Discord Bot แจ้งเตือน",
      description:
        "รับแจ้งเตือนจาก GitHub เมื่อมีการ deploy หรือ merge โค้ด และส่งข้อความแจ้งเตือนใน Discord channel",
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "dashboard-overview",
      icon: "📊",
      title: "Dashboard ติดตามคุณภาพโค้ด",
      description:
        "แสดงประวัติการ deploy และการวิเคราะห์คุณภาพโค้ดตามเกณฑ์ต่างๆ",
      color: "from-blue-500 to-cyan-600",
    },
  ];

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
      <div
        className={`relative ${
          isDark ? "bg-gray-800/90" : "bg-white/90"
        } backdrop-blur-lg rounded-xl shadow-lg overflow-hidden`}
      >
        <div
          className={`px-4 sm:px-6 py-4 border-b ${
            isDark
              ? "border-gray-700 bg-gradient-to-r from-purple-900/50 to-blue-900/50"
              : "border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50"
          }`}
        >
          <h2
            className={`text-lg sm:text-xl font-semibold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            ฟีเจอร์หลัก
          </h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                color={feature.color}
                description={feature.description}
                icon={feature.icon}
                title={feature.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
