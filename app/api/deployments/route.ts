import { NextRequest, NextResponse } from 'next/server';

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

// ข้อมูล mock สำหรับใช้ในการพัฒนา (ในอนาคตจะเชื่อมต่อกับฐานข้อมูลจริง)
let mockDeployments: Deployment[] = [
  {
    id: '1',
    projectName: 'ai-review-improve',
    branch: 'main',
    deployedBy: 'developer1',
    commitMessage: 'เพิ่มฟีเจอร์ Discord Bot',
    commitUrl: 'https://github.com/example/ai-review-improve/commit/123456',
    timestamp: new Date().toISOString(),
    repositoryUrl: 'https://github.com/example/ai-review-improve',
    scores: {
      bestPractices: 85,
      documentation: 70,
      performance: 90,
      seo: 80,
      overall: 82
    },
    feedback: 'โค้ดมีคุณภาพดี แต่ควรปรับปรุงเรื่องเอกสารประกอบโค้ด'
  },
  {
    id: '2',
    projectName: 'ai-review-improve',
    branch: 'develop',
    deployedBy: 'developer2',
    commitMessage: 'แก้ไข UI ของ Dashboard',
    commitUrl: 'https://github.com/example/ai-review-improve/commit/789012',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 วันก่อน
    repositoryUrl: 'https://github.com/example/ai-review-improve',
    scores: {
      bestPractices: 75,
      documentation: 65,
      performance: 85,
      seo: 90,
      overall: 78
    },
    feedback: 'ควรปรับปรุงการใช้ best practices และเพิ่มเอกสารประกอบโค้ด'
  }
];

// GET: ดึงข้อมูล deployments ทั้งหมด
export async function GET(request: NextRequest) {
  // ในอนาคตจะดึงข้อมูลจากฐานข้อมูลจริง
  return NextResponse.json({ deployments: mockDeployments });
}

// POST: เพิ่มข้อมูล deployment ใหม่
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // สร้าง ID แบบง่ายๆ (ในระบบจริงควรใช้ UUID หรือ ID จากฐานข้อมูล)
    const newDeployment: Deployment = {
      id: Date.now().toString(),
      ...data,
      timestamp: new Date().toISOString()
    };
    
    // เพิ่มข้อมูลใหม่ (ในระบบจริงจะบันทึกลงฐานข้อมูล)
    mockDeployments.unshift(newDeployment);
    
    return NextResponse.json({ success: true, deployment: newDeployment });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล deployment:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' }, { status: 500 });
  }
}

// PUT: อัปเดตข้อมูล deployment (เช่น เพิ่มคะแนนและ feedback)
export async function PUT(request: NextRequest) {
  try {
    const { id, scores, feedback } = await request.json();
    
    // หา deployment ที่ต้องการอัปเดต
    const deploymentIndex = mockDeployments.findIndex(d => d.id === id);
    
    if (deploymentIndex === -1) {
      return NextResponse.json({ error: 'ไม่พบข้อมูล deployment ที่ต้องการอัปเดต' }, { status: 404 });
    }
    
    // อัปเดตข้อมูล
    mockDeployments[deploymentIndex] = {
      ...mockDeployments[deploymentIndex],
      scores: scores || mockDeployments[deploymentIndex].scores,
      feedback: feedback || mockDeployments[deploymentIndex].feedback
    };
    
    return NextResponse.json({ success: true, deployment: mockDeployments[deploymentIndex] });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล deployment:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' }, { status: 500 });
  }
}