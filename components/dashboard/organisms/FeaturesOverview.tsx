import FeatureCard from "../molecules/FeatureCard";

export default function FeaturesOverview() {
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
      <div className="relative bg-white/90 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
          <h2 className="text-xl font-semibold text-gray-900">ฟีเจอร์หลัก</h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
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
