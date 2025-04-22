import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // ตรวจสอบว่ามีการตั้งค่า webhook ID และ token หรือไม่
    if (!process.env.NEXT_PUBLIC_DISCORD_ID || !process.env.NEXT_PUBLIC_DISCORD_TOKEN ||
        process.env.NEXT_PUBLIC_DISCORD_ID === 'your_discord_webhook_id' ||
        process.env.NEXT_PUBLIC_DISCORD_TOKEN === 'your_discord_webhook_token') {
      return NextResponse.json({
        success: false,
        error: 'ไม่พบการตั้งค่า Discord Webhook ID หรือ Token',
        message: 'กรุณาตั้งค่า NEXT_PUBLIC_DISCORD_ID และ NEXT_PUBLIC_DISCORD_TOKEN ใน .env.local'
      }, { status: 400 });
    }
    
    // ตรวจสอบว่า webhook URL ถูกต้องหรือไม่โดยไม่ส่งข้อความ
    const webhookURL = `https://discord.com/api/webhooks/${process.env.NEXT_PUBLIC_DISCORD_ID}/${process.env.NEXT_PUBLIC_DISCORD_TOKEN}`;
    
    // เรียกใช้ GET request เพื่อตรวจสอบว่า webhook มีอยู่จริง
    // Discord webhook API อนุญาตให้ใช้ GET เพื่อดึงข้อมูล webhook โดยไม่ส่งข้อความ
    const response = await fetch(webhookURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
      return NextResponse.json({ 
        success: false, 
        message: 'ไม่สามารถเชื่อมต่อกับ Discord webhook ได้',
        status: response.status
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'การตั้งค่า Discord webhook ถูกต้อง'
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการตรวจสอบ Discord webhook:', error);
    return NextResponse.json({ 
      success: false,
      error: 'เกิดข้อผิดพลาดในการตรวจสอบ Discord webhook', 
      message: (error as Error).message 
    }, { status: 500 });
  }
}