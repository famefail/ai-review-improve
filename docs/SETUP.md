# คู่มือการตั้งค่าและใช้งานระบบ

## การตั้งค่าเริ่มต้น

### 1. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ที่ root ของโปรเจ็ค โดยคัดลอกจาก `.env.example` และกำหนดค่าต่อไปนี้:

```
NEXT_PUBLIC_DISCORD_ID=your_discord_webhook_id
NEXT_PUBLIC_DISCORD_TOKEN=your_discord_webhook_token
```

คุณสามารถสร้าง Discord Webhook ได้โดย:
1. เข้าไปที่ Server Settings ใน Discord
2. เลือก Integrations > Webhooks
3. คลิก "New Webhook"
4. ตั้งชื่อและเลือก channel ที่ต้องการให้ส่งข้อความ
5. คัดลอก Webhook URL ซึ่งจะมีรูปแบบ `https://discord.com/api/webhooks/{webhook_id}/{webhook_token}`

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. รัน Development Server

```bash
npm run dev
```

## การตั้งค่า GitHub Webhook

### 1. ตั้งค่า Webhook ใน GitHub Repository

1. ไปที่ Settings ของ repository ที่ต้องการติดตาม
2. เลือก Webhooks > Add webhook
3. กรอก Payload URL เป็น URL ของ API endpoint: `https://your-domain.com/api/github-webhook`
4. เลือก Content type เป็น `application/json`
5. เลือก events ที่ต้องการติดตาม (แนะนำให้เลือก "Pushes" และ "Pull requests")
6. คลิก "Add webhook"

### 2. ทดสอบ Webhook

1. ทำการ push หรือ merge โค้ดไปยัง branch main หรือ develop
2. ตรวจสอบว่ามีข้อความแจ้งเตือนใน Discord channel ที่กำหนดไว้หรือไม่
3. ตรวจสอบว่าข้อมูลปรากฏใน Dashboard หรือไม่

## การใช้งาน Dashboard

1. เข้าไปที่ `/dashboard` เพื่อดูประวัติการ deploy และคะแนนคุณภาพโค้ด
2. คุณสามารถดูรายละเอียดคะแนนในแต่ละหมวดหมู่ได้ เช่น Best Practices, Documentation, Performance และ SEO
3. ข้อเสนอแนะในการปรับปรุงโค้ดจะแสดงอยู่ในส่วนล่างของหน้า

## การวิเคราะห์โค้ดด้วยตนเอง

คุณสามารถส่งโค้ดเพื่อวิเคราะห์ได้โดยตรงผ่าน API:

```bash
curl -X POST https://your-domain.com/api/code-analysis \
  -H "Content-Type: application/json" \
  -d '{"deploymentId":"your_deployment_id","codeSnippet":"your_code_here"}'
```

## การ Deploy ระบบ

### การใช้ Docker

```bash
# สร้าง Docker image
docker build -t ai-review-improve .

# รัน Docker container
docker run -p 3000:3000 --env-file .env.local ai-review-improve
```

### การ Deploy บน Vercel

1. เชื่อมต่อ GitHub repository กับ Vercel
2. ตั้งค่า Environment Variables ใน Vercel dashboard
3. Deploy โปรเจ็ค

## แผนการพัฒนาในอนาคต

1. เพิ่มการวิเคราะห์โค้ดด้วย AI (OpenAI API)
2. เชื่อมต่อกับฐานข้อมูลจริง (PostgreSQL หรือ MongoDB)
3. เพิ่มการวิเคราะห์ Performance ด้วย Lighthouse API
4. เพิ่มการแสดงกราฟแนวโน้มคะแนนตามเวลา
5. เพิ่มระบบ Authentication