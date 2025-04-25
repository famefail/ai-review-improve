import SectionTitle from "../atoms/SectionTitle";
import FeatureCard from "../molecules/FeatureCard";

export default function Features() {
  const features = [
    {
      id: "discord-bot",
      icon: "🤖",
      title: "Discord Bot แจ้งเตือน",
      description:
        "รับการแจ้งเตือนอัตโนมัติผ่าน Discord เมื่อมีการ Deploy หรือ Merge โค้ด พร้อมรายละเอียดที่สำคัญ",
      bulletPoints: [
        "รับแจ้งเตือนทันทีที่มีการ Deploy",
        "ข้อมูล Commit และผู้ Deploy",
        "ติดตาม Branch ที่สำคัญ",
      ],
      bgColor: "bg-blue-100",
    },
    {
      id: "code-analysis",
      icon: "📊",
      title: "วิเคราะห์คุณภาพโค้ด",
      description:
        "ตรวจสอบและวิเคราะห์คุณภาพโค้ดโดยอัตโนมัติด้วย AI เพื่อให้คำแนะนำในการปรับปรุง",
      bulletPoints: [
        "คะแนน Best Practices",
        "วิเคราะห์ประสิทธิภาพและ SEO",
        "ข้อเสนอแนะในการปรับปรุงโค้ด",
      ],
      bgColor: "bg-indigo-100",
    },
    {
      id: "dashboard-monitoring",
      icon: "📈",
      title: "Dashboard ติดตามผล",
      description:
        "ติดตามประวัติการ Deploy และแนวโน้มคุณภาพโค้ดผ่าน Dashboard ที่ใช้งานง่าย",
      bulletPoints: [
        "แสดงประวัติการ Deploy ทั้งหมด",
        "กราฟแสดงแนวโน้มคุณภาพโค้ด",
        "กรองข้อมูลตามโปรเจ็คและ Branch",
      ],
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="py-20 bg-gray-50" id="features">
      <div className="container mx-auto px-8">
        <SectionTitle
          subtitle="ระบบของเราช่วยให้คุณติดตามคุณภาพโค้ดและการ Deploy ได้อย่างมีประสิทธิภาพ"
          title="ฟีเจอร์หลักของระบบ"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              bgColor={feature.bgColor}
              bulletPoints={feature.bulletPoints}
              description={feature.description}
              icon={feature.icon}
              title={feature.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
