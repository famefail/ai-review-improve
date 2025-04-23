import SectionTitle from '../atoms/SectionTitle';

export default function Demo() {
  return (
    <div id="demo" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-8">
        <SectionTitle 
          title="ตัวอย่างการใช้งาน" 
          subtitle="ดูตัวอย่างการทำงานของระบบติดตามคุณภาพโค้ดและการแจ้งเตือน Deploy" 
        />
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gray-800 text-white px-6 py-4 flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm font-mono">AI Code Review Dashboard</div>
          </div>
          
          <div className="p-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid md:grid-cols-4 gap-4 p-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-1">Best Practices</div>
                  <div className="text-2xl font-bold text-green-600">92</div>
                  <div className="text-xs text-green-500">+5% จากครั้งก่อน</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-1">Documentation</div>
                  <div className="text-2xl font-bold text-green-600">85</div>
                  <div className="text-xs text-green-500">+3% จากครั้งก่อน</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-1">Performance</div>
                  <div className="text-2xl font-bold text-yellow-600">78</div>
                  <div className="text-xs text-yellow-500">-2% จากครั้งก่อน</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-500 mb-1">SEO</div>
                  <div className="text-2xl font-bold text-green-600">90</div>
                  <div className="text-xs text-green-500">+7% จากครั้งก่อน</div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">ประวัติการ Deploy ล่าสุด</h3>
                  <div className="text-sm text-blue-600">ดูทั้งหมด</div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">โปรเจ็ค</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้ Deploy</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เวลา</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">คะแนน</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">company-portal</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">main</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">[ชื่อพนักงานจริง]</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 นาทีที่แล้ว</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-green-500">92</div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">admin-dashboard</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">develop</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">jane_admin</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 ชั่วโมงที่แล้ว</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-yellow-500">75</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Discord Notification */}
            <div className="mt-6 p-4 bg-[#36393f] rounded-lg shadow-lg text-white">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center mr-2">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <div className="font-semibold">AI Code Review Bot</div>
                  <div className="text-xs text-gray-400">วันนี้ เวลา 10:45</div>
                </div>
              </div>
              
              <div className="border-l-4 border-[#5865F2] pl-3 py-1">
                <div className="font-semibold">🚀 มีการ Deploy โปรเจ็ค ecommerce-website</div>
                <div className="text-sm text-gray-300 mt-1">มีการ deploy โค้ดไปยัง branch main โดย john_dev</div>
                
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <div>
                    <span className="text-gray-400">📂 โปรเจ็ค:</span> ecommerce-website
                  </div>
                  <div>
                    <span className="text-gray-400">🌿 Branch:</span> main
                  </div>
                  <div>
                    <span className="text-gray-400">👨‍💻 ผู้ Deploy:</span> john_dev
                  </div>
                  <div>
                    <span className="text-gray-400">⏰ เวลา:</span> 10:45:32
                  </div>
                </div>
                
                <div className="mt-2 text-xs">
                  <span className="text-gray-400">📝 Commit Message:</span> Fix product search functionality and improve performance
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}