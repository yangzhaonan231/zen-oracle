// server/utils/mail.ts
// Day 8: 邮件通知 — 联系表单提交后自动通知管理员 + 回复用户
import { Resend } from 'resend'

// TODO: 替换为你的收件邮箱
const MY_EMAIL = 'yzhaonan231@gmail.com'

export async function sendContactNotification(data: {
  name: string
  email: string
  company: string
  plan: string
  message: string
}) {
  const config = useRuntimeConfig()

  // 如果没有配置 Resend API Key，跳过发送
  if (!config.resendApiKey) {
    console.warn('[mail] NUXT_RESEND_API_KEY 未配置，跳过邮件发送')
    return
  }

  const resend = new Resend(config.resendApiKey)

  // ====== 邮件一：通知你自己 ======
  await resend.emails.send({
    from: 'Zen Oracle <noreply@zen-oracle.vercel.app>',
    to: MY_EMAIL,
    subject: `[新咨询] ${data.name} — ${data.plan || '未选套餐'}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">新的联系表单提交</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6B7280; width: 80px;">姓名</td>
            <td style="padding: 8px 0;"><strong>${data.name}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B7280;">邮箱</td>
            <td style="padding: 8px 0;">${data.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B7280;">公司</td>
            <td style="padding: 8px 0;">${data.company || '未填写'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6B7280;">套餐</td>
            <td style="padding: 8px 0;">${data.plan || '未选择'}</td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #F3F4F6; border-radius: 8px;">
          <p style="margin: 0; color: #374151;">${data.message}</p>
        </div>
        <p style="margin-top: 24px; color: #9CA3AF; font-size: 12px;">
          此邮件由 Zen Oracle 联系表单自动发送。回复此邮件将直接联系 ${data.name}。
        </p>
      </div>
    `,
    // Reply-To：你回复这封邮件时，会直接发给用户
    replyTo: data.email,
  })

  // ====== 邮件二：发给用户的自动回复 ======
  await resend.emails.send({
    from: 'Zen Oracle <noreply@zen-oracle.vercel.app>',
    to: data.email,
    subject: '收到你的消息 — Zen Oracle',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>你好，${data.name}！</h2>
        <p>我们已收到你的消息，团队会在 <strong>24 小时内</strong>回复你。</p>
        <p style="color: #6B7280;">以下是你的消息摘要：</p>
        <div style="padding: 16px; background: #F3F4F6; border-radius: 8px;">
          <p style="margin: 0; color: #374151;">${data.message.slice(0, 200)}${data.message.length > 200 ? '...' : ''}</p>
        </div>
        <p style="margin-top: 24px; color: #6B7280;">
          如有紧急事项，可以直接回复这封邮件。
        </p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #E5E7EB;" />
        <p style="color: #9CA3AF; font-size: 12px;">
          Zen Oracle — 探索命运，洞见未来
        </p>
      </div>
    `,
  })
}
