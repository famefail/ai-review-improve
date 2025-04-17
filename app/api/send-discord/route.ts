'use server'

export const sendToDiscord = async(message: string) => {
    const webhookURL = `https://discord.com/api/webhooks/${process.env.NEXT_PUBLIC_DISCORD_ID}/${process.env.NEXT_PUBLIC_DISCORD_TOKEN}`
    console.log('add')

    await fetch(webhookURL,{
        method:'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify({content: message})
    }
    )
}