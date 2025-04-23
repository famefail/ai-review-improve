# คู่มือการตั้งค่าและทดสอบ Discord Webhook

## การตั้งค่า Discord Webhook

### 1. สร้าง Discord Webhook

1. เข้าไปที่ Server Settings ใน Discord
2. เลือก Integrations > Webhooks
3. คลิก "New Webhook"
4. ตั้งชื่อและเลือก channel ที่ต้องการให้ส่งข้อความ
5. คัดลอก Webhook URL ซึ่งจะมีรูปแบบ `https://discord.com/api/webhooks/{webhook_id}/{webhook_token}`

### 2. ตั้งค่า Environment Variables

1. เปิดไฟล์ `.env.local` ที่ root ของโปรเจ็ค
2. กำหนดค่า `NEXT_PUBLIC_DISCORD_ID` และ `NEXT_PUBLIC_DISCORD_TOKEN` จาก Webhook URL ที่ได้
   ```
   NEXT_PUBLIC_DISCORD_ID=your_discord_webhook_id
   NEXT_PUBLIC_DISCORD_TOKEN=your_discord_webhook_token
   ```
   โดยที่:
   - `your_discord_webhook_id` คือส่วนแรกของ URL หลัง `/webhooks/`
   - `your_discord_webhook_token` คือส่วนที่สองของ URL

## การทดสอบ Discord Webhook

### 1. ทดสอบผ่าน API Endpoint

1. เริ่มต้น development server ด้วยคำสั่ง `npm run dev`
2. เปิดเบราว์เซอร์และเข้าไปที่ URL: `http://localhost:3000/api/test-discord`
3. ระบบจะส่งข้อความทดสอบไปยัง Discord channel ที่กำหนดไว้
4. ตรวจสอบใน Discord channel ว่าได้รับข้อความหรือไม่

### 2. ทดสอบผ่าน GitHub Webhook

#### การตั้งค่า GitHub Webhook

1. ไปที่ Settings ของ GitHub repository
2. เลือก Webhooks > Add webhook
3. กำหนดค่าต่อไปนี้:
   - Payload URL: `https://your-domain.com/api/github-webhook` (ใช้ URL ของเซิร์ฟเวอร์ที่รันแอปพลิเคชัน)
   - Content type: `application/json`
   - เลือก "Just the push event" หรือกำหนดเอง
   - Active: เลือกเพื่อเปิดใช้งาน webhook

#### การทดสอบ

1. ทำการ push หรือ merge โค้ดไปยัง branch main หรือ develop
2. ตรวจสอบว่ามีข้อความแจ้งเตือนใน Discord channel ที่กำหนดไว้หรือไม่

## การแก้ไขปัญหา

### ไม่ได้รับข้อความใน Discord

1. ตรวจสอบว่าได้กำหนดค่า `NEXT_PUBLIC_DISCORD_ID` และ `NEXT_PUBLIC_DISCORD_TOKEN` ถูกต้อง
2. ตรวจสอบว่า Webhook ใน Discord ยังใช้งานได้
3. ตรวจสอบ console logs เพื่อดูข้อผิดพลาดที่อาจเกิดขึ้น

### ไม่ได้รับ Webhook จาก GitHub

1. ตรวจสอบการตั้งค่า Webhook ใน GitHub
2. ตรวจสอบว่า URL ที่กำหนดถูกต้องและเข้าถึงได้จากภายนอก
3. ตรวจสอบ Recent Deliveries ใน GitHub Webhook settings เพื่อดูสถานะและข้อผิดพลาด