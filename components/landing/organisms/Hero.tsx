import GradientButton from '../atoms/GradientButton';

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white pt-32 pb-24 relative overflow-hidden">
      {/* Animated Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-400 opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-300 opacity-10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI <span className="text-blue-300">Code Review</span> & Deployment Monitoring
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-xl leading-relaxed">
              ยกระดับการพัฒนาโค้ดด้วยระบบติดตามคุณภาพและแจ้งเตือน Deployment อัตโนมัติ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <GradientButton href="/login" primary={true}>
                เข้าสู่ระบบ
              </GradientButton>
              <GradientButton href="/register" primary={false}>
                สมัครใช้งาน
              </GradientButton>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="w-full h-80 md:h-96 lg:h-[500px] relative bg-white bg-opacity-10 backdrop-blur-sm rounded-xl overflow-hidden border border-white border-opacity-20 shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="p-5 pt-10 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4 bg-gray-800 bg-opacity-50 rounded-md p-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-xs text-green-300">Deploy successful</span>
                  </div>
                  <span className="text-xs text-gray-300">main branch</span>
                </div>
                <div className="flex-1 bg-gray-900 bg-opacity-50 rounded-md p-3 overflow-hidden">
                  <pre className="text-xs text-gray-300 font-mono">
                    <code>
{`> Analyzing code quality...
> Best Practices: 92/100
> Documentation: 85/100
> Performance: 88/100
> SEO Score: 90/100

✓ Code meets quality standards
✓ No critical issues found
✓ Sending notification to Discord...`}
                    </code>
                  </pre>
                </div>
                <div className="mt-4 bg-blue-600 bg-opacity-20 rounded-md p-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-500 rounded-md mr-2 flex items-center justify-center text-xs">
                      🤖
                    </div>
                    <span className="text-sm font-semibold text-blue-100">AI Feedback</span>
                  </div>
                  <p className="text-xs text-blue-100 mt-2">
                    โค้ดมีคุณภาพดี แต่พบส่วนที่สามารถปรับปรุงประสิทธิภาพได้ในฟังก์ชัน processData()
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-24 text-gray-50">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,24,0,48Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}