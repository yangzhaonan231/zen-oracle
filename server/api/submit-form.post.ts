// server/api/submit-form.post.ts
// 联系表单提交 → Drizzle ORM 数据库
import { contacts } from '../db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 验证
  if (!body.name || !body.email) {
    throw createError({ statusCode: 400, message: '请填写姓名和邮箱' })
  }
  if (!body.message) {
    throw createError({ statusCode: 400, message: '请填写消息内容' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    throw createError({ statusCode: 400, message: '请输入有效的邮箱地址' })
  }

  // 1. 插入数据库（db 由 @nuxthub/core 自动注入）
  await db.insert(contacts).values({
    name: body.name,
    email: body.email,
    company: body.company || body.topic || '',
    plan: body.plan || '',
    message: body.message,
    createdAt: new Date()
  })

  // 2. 发送邮件通知（异步，不阻塞响应）
  sendContactNotification({
    name: body.name,
    email: body.email,
    company: body.company || body.topic || '',
    plan: body.plan || '',
    message: body.message,
  }).catch((err) => {
    console.error('邮件发送失败:', err)
  })

  return {
    success: true,
    message: `感谢 ${body.name}，我们会尽快回复你！`
  }
})
