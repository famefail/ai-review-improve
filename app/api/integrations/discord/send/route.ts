'use server'

// ประเภทข้อมูลสำหรับ Discord Embed
interface DiscordEmbed {
  title?: string;
  description?: string;
  url?: string;
  color?: number; // สีของ embed (เป็นเลขฐาน 10)
  timestamp?: string;
  footer?: {
    text: string;
    icon_url?: string;
  };
  thumbnail?: {
    url: string;
  };
  author?: {
    name: string;
    url?: string;
    icon_url?: string;
  };
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
}

// ฟังก์ชันส่งข้อความธรรมดาไปยัง Discord
export const sendToDiscord = async(message: string) => {
    try {
        // ตรวจสอบว่ามีการตั้งค่า webhook ID และ token หรือไม่
        if (!process.env.NEXT_PUBLIC_DISCORD_ID || !process.env.NEXT_PUBLIC_DISCORD_TOKEN) {
            console.error('ไม่พบการตั้งค่า Discord Webhook ID หรือ Token');
            throw new Error('ไม่พบการตั้งค่า Discord Webhook ID หรือ Token');
        }

        const webhookURL = `https://discord.com/api/webhooks/${process.env.NEXT_PUBLIC_DISCORD_ID}/${process.env.NEXT_PUBLIC_DISCORD_TOKEN}`;
        console.log(`กำลังส่งข้อความไปยัง Discord: ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`);

        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`การส่งข้อความไปยัง Discord ล้มเหลว: ${response.status} ${errorText}`);
            throw new Error(`การส่งข้อความไปยัง Discord ล้มเหลว: ${response.status}`);
        }

        console.log('ส่งข้อความไปยัง Discord สำเร็จ');
        return { success: true };
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการส่งข้อความไปยัง Discord:', error);
        throw error;
    }
}

// ฟังก์ชันส่งข้อความแบบ rich embed ไปยัง Discord
export const sendDiscordEmbed = async(embeds: DiscordEmbed[]) => {
    try {
        // ตรวจสอบว่ามีการตั้งค่า webhook ID และ token หรือไม่
        if (!process.env.NEXT_PUBLIC_DISCORD_ID || !process.env.NEXT_PUBLIC_DISCORD_TOKEN) {
            console.error('ไม่พบการตั้งค่า Discord Webhook ID หรือ Token');
            throw new Error('ไม่พบการตั้งค่า Discord Webhook ID หรือ Token');
        }

        const webhookURL = `https://discord.com/api/webhooks/${process.env.NEXT_PUBLIC_DISCORD_ID}/${process.env.NEXT_PUBLIC_DISCORD_TOKEN}`;
        console.log(`กำลังส่ง embed ไปยัง Discord: ${JSON.stringify(embeds).substring(0, 100)}...`);

        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ embeds })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`การส่ง embed ไปยัง Discord ล้มเหลว: ${response.status} ${errorText}`);
            throw new Error(`การส่ง embed ไปยัง Discord ล้มเหลว: ${response.status}`);
        }

        console.log('ส่ง embed ไปยัง Discord สำเร็จ');
        return { success: true };
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการส่ง embed ไปยัง Discord:', error);
        throw error;
    }
}

// ฟังก์ชันส่งข้อความพร้อม embed ไปยัง Discord
export const sendDiscordMessageWithEmbed = async(content: string, embeds: DiscordEmbed[]) => {
    const webhookURL = `https://discord.com/api/webhooks/${process.env.NEXT_PUBLIC_DISCORD_ID}/${process.env.NEXT_PUBLIC_DISCORD_TOKEN}`

    await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, embeds })
    })
}