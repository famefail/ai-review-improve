# การตั้งค่า GitHub Actions สำหรับการแจ้งเตือน Discord

## ขั้นตอนการติดตั้ง

### 1. สร้าง Discord Webhook
1. ไปที่ Discord server ของคุณ
2. คลิกขวาที่ channel ที่ต้องการรับการแจ้งเตือน
3. เลือก "Edit Channel" → "Integrations" → "Webhooks"
4. คลิก "New Webhook" หรือ "Create Webhook"
5. ตั้งชื่อ webhook และเลือก channel
6. คัดลอก Webhook URL

### 2. เพิ่ม Webhook URL ใน GitHub Secrets
1. ไปที่ GitHub repository ของคุณ
2. ไปที่ "Settings" → "Secrets and variables" → "Actions"
3. คลิก "New repository secret"
4. ชื่อ: `DISCORD_WEBHOOK`
5. ค่า: Webhook URL ที่คัดลอกมาจาก Discord
6. คลิก "Add secret"

### 3. สร้างไฟล์ GitHub Actions
1. สร้างโฟลเดอร์ `.github/workflows/` ใน repository ของคุณ
2. สร้างไฟล์ `discord-notifications.yml` หรือ `discord-advanced-notifications.yml`
3. คัดลอกโค้ด YAML ที่ให้ไว้ด้านบน
4. Commit และ push ไปยัง repository

### 4. ทดสอบการแจ้งเตือน
1. ทำการ push, สร้าง pull request, หรือทำกิจกรรมอื่นๆ ที่กำหนดไว้ใน workflow
2. ตรวจสอบ Discord channel ว่าได้รับการแจ้งเตือนหรือไม่

## การแจ้งเตือนที่รองรับ

### Push Events
- แจ้งเตือนเมื่อมีการ push ไปยัง branches: main, develop, feature/*, release/*, hotfix/*
- แสดงจำนวน commits, ผู้ทำการ push, และข้อความ commit

### Pull Request Events
- แจ้งเตือนเมื่อ PR ถูก: opened, closed, reopened, synchronized, review requested, ready for review
- แสดงสถานะ PR, ผู้สร้าง, และ branch ต้นทาง/ปลายทาง

### Release Events
- แจ้งเตือนเมื่อมีการสร้าง release ใหม่
- แสดงชื่อ release, tag, และ release notes

### Workflow Status
- แจ้งเตือนสถานะของ CI/CD pipeline
- แสดงผลการ run (success/failure), branch, และเวลาที่ใช้

## การปรับแต่งเพิ่มเติม

### เปลี่ยนสีการแจ้งเตือน
แก้ไขค่า `color` ในแต่ละ notification step โดยใช้รหัสสี decimal (เช่น 3066993 สำหรับสีเขียว)

### เพิ่ม/ลดประเภทการแจ้งเตือน
แก้ไขส่วน `on:` ในไฟล์ YAML เพื่อเพิ่มหรือลด events ที่ต้องการแจ้งเตือน

### ปรับแต่งข้อความแจ้งเตือน
แก้ไขส่วน `description` ในแต่ละ notification step เพื่อปรับแต่งข้อความตามต้องการ

## Troubleshooting

1. **ไม่ได้รับการแจ้งเตือน**
   - ตรวจสอบว่า webhook URL ถูกต้อง
   - ตรวจสอบว่า secret name เป็น `DISCORD_WEBHOOK`
   - ตรวจสอบ GitHub Actions logs

2. **Error: Resource not accessible by integration**
   - ตรวจสอบ permissions ของ GitHub Actions ใน repository settings

3. **การแจ้งเตือนไม่แสดงข้อมูลที่ต้องการ**
   - ตรวจสอบ syntax ของ YAML file
   - ตรวจสอบว่าใช้ variables ถูกต้อง (เช่น `${{ github.actor }}`)