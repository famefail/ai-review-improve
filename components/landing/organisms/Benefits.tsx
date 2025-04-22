import SectionTitle from '../atoms/SectionTitle';
import BenefitItem from '../molecules/BenefitItem';

export default function Benefits() {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      title: 'เพิ่มประสิทธิภาพในการทำงานของทีม',
      description: 'ลดเวลาในการตรวจสอบโค้ดด้วยการวิเคราะห์อัตโนมัติ ทำให้ทีมพัฒนาของเราสามารถโฟกัสกับงานสำคัญได้มากขึ้น',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: 'ยกระดับคุณภาพโค้ด',
      description: 'วิเคราะห์และให้คำแนะนำในการปรับปรุงโค้ดตาม Best Practices ช่วยให้โค้ดมีคุณภาพสูงและลดปัญหาในอนาคต',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: 'ลดความเสี่ยงในการ Deploy',
      description: 'ตรวจสอบปัญหาก่อนที่จะเกิดขึ้นในการ Deploy และแจ้งเตือนทีมทันทีเมื่อมีการเปลี่ยนแปลงสำคัญ',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
        </svg>
      ),
      title: 'เพิ่มการสื่อสารในทีม',
      description: 'แจ้งเตือนการ Deploy ผ่าน Discord ทำให้ทุกคนในทีมรับทราบความเคลื่อนไหวล่าสุดและสามารถตอบสนองได้อย่างรวดเร็ว',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      ),
      title: 'เพิ่มประสิทธิภาพของเว็บไซต์',
      description: 'วิเคราะห์ประสิทธิภาพและ SEO เพื่อปรับปรุงการทำงานของเว็บไซต์ ทำให้ผู้ใช้งานมีประสบการณ์ที่ดีขึ้น',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      ),
      title: 'ติดตามความก้าวหน้าได้ง่าย',
      description: 'Dashboard แสดงข้อมูลสถิติและประวัติการ Deploy ทำให้ติดตามความก้าวหน้าของโปรเจ็คได้อย่างสะดวก',
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    }
  ];

  // แบ่งข้อมูลออกเป็น 2 คอลัมน์ (สำหรับหน้าจอขนาดกลาง-ใหญ่)
  const leftBenefits = benefits.slice(0, 3);
  const rightBenefits = benefits.slice(3);

  return (
    <div id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-8">
        <SectionTitle 
          title="ประโยชน์ที่คุณจะได้รับ" 
          subtitle="ระบบของเราช่วยให้ทีมพัฒนาซอฟต์แวร์ทำงานได้อย่างมีประสิทธิภาพและปรับปรุงคุณภาพโค้ดอย่างต่อเนื่อง" 
        />
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col space-y-6">
            {leftBenefits.map((benefit, index) => (
              <BenefitItem 
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                bgColor={benefit.bgColor}
                iconColor={benefit.iconColor}
              />
            ))}
          </div>
          
          <div className="flex flex-col space-y-6">
            {rightBenefits.map((benefit, index) => (
              <BenefitItem 
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                bgColor={benefit.bgColor}
                iconColor={benefit.iconColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}