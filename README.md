# AI Code Review & Deployment Monitoring System

ระบบติดตามคุณภาพโค้ดใน production/staging พร้อม Discord Bot สำหรับแจ้งเตือน Deployment โดยใช้ Next.js

## โครงสร้างระบบ

### A. Discord Bot สำหรับแจ้งเตือน Deployment

- **ฟังก์ชันหลัก**:

  - รับแจ้งเตือนจาก GitHub (ผ่าน Webhook หรือ GitHub Actions) เมื่อมีการ deploy หรือ merge โค้ด
  - ตรวจสอบว่า event มาจาก branch ที่กำหนด (เฉพาะ main และ develop) เท่านั้น
  - ส่งข้อความแจ้งเตือนใน Discord channel พร้อมรายละเอียด เช่น ชื่อโปรเจ็ค, Branch ที่ deploy, ชื่อคน deploy, รายละเอียด commit

- **การส่งข้อมูล**:
  - ใช้ Discord Webhook หรือ Discord Bot API ในการส่งข้อความแบบ rich embed

### B. Dashboard สำหรับติดตามและวิเคราะห์คุณภาพโค้ด

- **ฟังก์ชันหลัก**:

  - แสดงประวัติการ deploy และการวิเคราะห์คุณภาพโค้ดที่ผ่านการ deploy
  - ให้คะแนนโค้ดตามเกณฑ์ต่างๆ (Best Practices, Documentation Compliance, Performance, SEO)
  - ให้คำแนะนำและ feedback ในการปรับปรุง

- **การแสดงผล**:
  - ใช้กราฟและสถิติแสดงแนวโน้มคะแนนในแต่ละช่วงเวลา
  - สามารถกรองข้อมูลตาม environment และ branch ที่เกี่ยวข้อง

## เทคโนโลยีและเครื่องมือที่ใช้

### Next.js (Full-stack Framework)

- **Frontend**:

  - สร้างหน้า Dashboard และ UI สำหรับแสดงผลข้อมูล
  - Data Visualization ด้วย ApexCharts.js

- **Backend (API Routes)**:
  - สร้าง API Routes ที่รับข้อมูลจาก GitHub Webhook
  - จัดการ logic การประมวลผลและส่งข้อมูลไปยัง Discord
  - เชื่อมต่อกับ AI API เพื่อวิเคราะห์คุณภาพโค้ด

### Integration และ CI/CD

- **GitHub Actions / Webhook**: Trigger event เมื่อมีการ deploy หรือ merge โค้ด
- **Discord Webhook/Bot**: ส่งข้อความแจ้งเตือน

### Tools เสริมอื่นๆ

- **Static Code Analysis**: ESLint, Prettier
- **Performance & SEO Analysis**: Google Lighthouse, PageSpeed Insights API
- **Database**: PostgreSQL/MongoDB
- **Containerization**: Docker

## แผนการพัฒนา

### Phase 1: Discord Bot

- พัฒนาระบบแจ้งเตือนผ่าน Discord Bot ขั้นพื้นฐาน
- รับข้อมูลจาก GitHub Webhook และส่งแจ้งเตือนไปยัง Discord

### Phase 2: Dashboard พื้นฐาน

- สร้าง UI สำหรับแสดงประวัติการ deploy
- เชื่อมต่อกับ API Routes เพื่อดึงข้อมูล

### Phase 3: ระบบวิเคราะห์โค้ด

- เพิ่มการวิเคราะห์คุณภาพโค้ดด้วย static analysis tools
- แสดงผลการวิเคราะห์ใน Dashboard

### Phase 4: AI Code Review

- เพิ่มการวิเคราะห์ด้วย AI และให้ feedback
- ปรับปรุง UI เพื่อแสดงผลการวิเคราะห์อย่างละเอียด

### Phase 5: ขยายฟีเจอร์

- เชื่อมต่อกับระบบอื่นๆ
- เพิ่มฟีเจอร์ตามความต้องการเพิ่มเติม

## การติดตั้งและใช้งาน

```bash
# ติดตั้ง dependencies
npm install

# รัน development server
npm run dev

# สร้าง production build
npm run build

# รัน production server
npm start
```

## ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` และกำหนดค่าต่อไปนี้:

```
DISCORD_WEBHOOK_URL=your_discord_webhook_url
DATABASE_URL=your_database_connection_string
OPENAI_API_KEY=your_openai_api_key  # ถ้าใช้ AI Code Review
```

## การใช้งาน Docker

```bash
# สร้าง Docker image
docker build -t ai-review-improve .

# รัน Docker container
docker run -p 3000:3000 ai-review-improve
```
