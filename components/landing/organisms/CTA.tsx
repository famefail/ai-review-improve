import GradientButton from "../atoms/GradientButton";

export default function CTA() {
  return (
    <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          พร้อมยกระดับการพัฒนาโค้ดของคุณ?
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          เริ่มใช้งานระบบ AI Code Review & Deployment Monitoring วันนี้
          เพื่อติดตามและปรับปรุงคุณภาพโค้ดของคุณ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GradientButton href="/register" primary={true}>
            สมัครใช้งานฟรี
          </GradientButton>
          <GradientButton href="/login" primary={false}>
            เข้าสู่ระบบ
          </GradientButton>
        </div>
      </div>
    </div>
  );
}
