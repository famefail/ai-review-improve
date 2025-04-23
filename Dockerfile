FROM node:18-alpine AS base

# ติดตั้ง dependencies สำหรับ build
FROM base AS deps
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json
COPY package.json package-lock.json ./

# ติดตั้ง dependencies
RUN npm ci

# Build แอปพลิเคชัน
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# สร้าง production build
RUN npm run build

# ตั้งค่าสำหรับ production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# คัดลอกไฟล์ที่จำเป็นสำหรับ production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# เปิด port 3000
EXPOSE 3000

# ตั้งค่า environment variables
ENV PORT 3000

# รัน Next.js ในโหมด production
CMD ["node", "server.js"]