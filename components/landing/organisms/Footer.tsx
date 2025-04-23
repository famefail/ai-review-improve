export default function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-700 py-8 border-t border-gray-200">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md mr-2 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="font-bold text-xl text-gray-900">
                  AI Review
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                ระบบติดตามคุณภาพโค้ดและแจ้งเตือน Deployment สำหรับทีมพัฒนาภายในบริษัท
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-900">ลิงก์ภายใน</h3>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-blue-600 transition-colors">คู่มือการใช้งาน</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">ระบบจัดการโปรเจค</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">ระบบรายงานปัญหา</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">ข้อมูลทีมพัฒนา</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4 text-gray-900">ติดต่อทีม</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <span>Peem</span>,
                  <span>Ice</span>,
                  <span>Boy</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000-16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                  </svg>
                  <span>ช่อง #ai-code-review ใน Discord</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} [ชื่อบริษัทของคุณ] - ระบบพัฒนาโดยทีม Ai Code Review</p>
          </div>
        </div>
      </footer>
    );
  }