'use client';

import { useEffect, useState } from 'react';
import DiscordStatus from '@/components/discord/DiscordStatus';
import Chat from '@/components/chat/Chat';

// ประเภทข้อมูลสำหรับ Deployment
interface Deployment {
  id: string;
  projectName: string;
  branch: string;
  deployedBy: string;
  commitMessage: string;
  commitUrl: string;
  timestamp: string;
  repositoryUrl: string;
  scores?: {
    bestPractices?: number;
    documentation?: number;
    performance?: number;
    seo?: number;
    overall?: number;
  };
  feedback?: string;
}

export default function DashboardOverview() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ดึงข้อมูล deployments จาก API
    const fetchDeployments = async () => {
      try {
        const response = await fetch('/api/deployments');
        if (!response.ok) {
          throw new Error('ไม่สามารถดึงข้อมูล deployments ได้');
        }
        const data = await response.json();
        setDeployments(data.deployments);
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeployments();
  }, []);

  // ฟังก์ชันสำหรับแสดงวันที่ในรูปแบบที่อ่านง่าย
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // ฟังก์ชันสำหรับแสดงสีตามคะแนน
  const getScoreColor = (score?: number) => {
    if (!score) return 'bg-gray-200';
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen p-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard ติดตามคุณภาพโค้ด</h1>
        </div>
        <p className="text-gray-600 mt-2">ติดตามการ deploy และคุณภาพโค้ดของโปรเจ็ค</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* ส่วนซ้าย: สถานะการเชื่อมต่อ */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold">สถานะการเชื่อมต่อ</h2>
            </div>
            <div className="p-6">
              <DiscordStatus />
            </div>
          </div>
        </div>

        {/* ส่วนขวา: ฟีเจอร์หลัก */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold">ฟีเจอร์หลัก</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-2">🤖 Discord Bot แจ้งเตือน</h3>
                  <p className="text-gray-600 text-sm">รับแจ้งเตือนจาก GitHub เมื่อมีการ deploy หรือ merge โค้ด และส่งข้อความแจ้งเตือนใน Discord channel</p>
                </div>
                <div className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-2">📊 Dashboard ติดตามคุณภาพโค้ด</h3>
                  <p className="text-gray-600 text-sm">แสดงประวัติการ deploy และการวิเคราะห์คุณภาพโค้ดตามเกณฑ์ต่างๆ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนประวัติการ Deploy */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      ) : (
        <div className="grid gap-6 mb-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold">ประวัติการ Deploy</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      โปรเจ็ค
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Branch
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ผู้ Deploy
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      เวลา
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      คะแนนรวม
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deployments.map((deployment) => (
                    <tr key={deployment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          <a href={deployment.repositoryUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                            {deployment.projectName}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {deployment.branch}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {deployment.deployedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href={deployment.commitUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 truncate block max-w-xs">
                          {deployment.commitMessage}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(deployment.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {deployment.scores?.overall ? (
                          <div className="flex items-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getScoreColor(deployment.scores.overall)}`}>
                              {deployment.scores.overall}
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">ไม่มีข้อมูล</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* รายละเอียดคะแนนล่าสุด */}
          {deployments.length > 0 && deployments[0].scores && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-semibold">รายละเอียดคะแนนล่าสุด</h2>
              </div>
              <div className="p-6">
                <h3 className="font-medium text-lg mb-4">{deployments[0].projectName} ({deployments[0].branch})</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Best Practices</div>
                    <div className={`text-2xl font-bold ${deployments[0].scores.bestPractices && deployments[0].scores.bestPractices >= 80 ? 'text-green-600' : deployments[0].scores.bestPractices && deployments[0].scores.bestPractices >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {deployments[0].scores.bestPractices || 'N/A'}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Documentation</div>
                    <div className={`text-2xl font-bold ${deployments[0].scores.documentation && deployments[0].scores.documentation >= 80 ? 'text-green-600' : deployments[0].scores.documentation && deployments[0].scores.documentation >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {deployments[0].scores.documentation || 'N/A'}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">Performance</div>
                    <div className={`text-2xl font-bold ${deployments[0].scores.performance && deployments[0].scores.performance >= 80 ? 'text-green-600' : deployments[0].scores.performance && deployments[0].scores.performance >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {deployments[0].scores.performance || 'N/A'}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 mb-1">SEO</div>
                    <div className={`text-2xl font-bold ${deployments[0].scores.seo && deployments[0].scores.seo >= 80 ? 'text-green-600' : deployments[0].scores.seo && deployments[0].scores.seo >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {deployments[0].scores.seo || 'N/A'}
                    </div>
                  </div>
                </div>
                
                {deployments[0].feedback && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">ข้อเสนอแนะ:</h4>
                    <div className="bg-blue-50 p-4 rounded-lg text-blue-800">
                      {deployments[0].feedback}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ส่วน AI Assistant */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold">AI Code Review Assistant</h2>
        </div>
        <div className="p-6">
          <Chat />
        </div>
      </div>
    </div>
  );
}