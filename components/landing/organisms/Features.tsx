import SectionTitle from '../atoms/SectionTitle';
import FeatureCard from '../molecules/FeatureCard';

export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'Discord Bot แจ้งเตือน',
      description: 'รับการแจ้งเตือนอัตโนมัติผ่าน Discord เมื่อมีการ Deploy หรือ Merge โค้ดภายในทีม',
      bulletPoints: [
        'รับแจ้งเตือนทันทีที่มีการ Deploy',
        'ข้อมูล Commit และผู้ Deploy',
        'ติดตาม Branch ที่สำคัญ'
      ],
      bgColor: 'bg-blue-100'
    },
    {
      icon: '📊',
      title: 'วิเคราะห์คุณภาพโค้ด',
      description: 'ตรวจสอบและวิเคราะห์คุณภาพโค้ดโดยอัตโนมัติด้วย AI เพื่อให้คำแนะนำในการปรับปรุง',
      bulletPoints: [
        'คะแนน Best Practices',
        'วิเคราะห์ประสิทธิภาพและ SEO',
        'ข้อเสนอแนะในการปรับปรุงโค้ด'
      ],
      bgColor: 'bg-indigo-100'
    },
    {
      icon: '📈',
      title: 'Dashboard ติดตามผล',
      description: 'ติดตามประวัติการ Deploy และแนวโน้มคุณภาพโค้ดผ่าน Dashboard ที่ใช้งานง่าย',
      bulletPoints: [
        'แสดงประวัติการ Deploy ทั้งหมด',
        'กราฟแสดงแนวโน้มคุณภาพโค้ด',
        'กรองข้อมูลตามโปรเจ็คและ Branch'
      ],
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-8">
        <SectionTitle 
          title="ฟีเจอร์หลักของระบบ" 
          subtitle="ระบบของเราช่วยให้คุณติดตามคุณภาพโค้ดและการ Deploy ได้อย่างมีประสิทธิภาพ" 
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              bulletPoints={feature.bulletPoints}
              bgColor={feature.bgColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}