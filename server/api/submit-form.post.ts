// server/api/submit-form.post.ts
// 动手7：接入 Vercel KV 存储联系表单数据

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

  // 生成唯一 ID
  const id = `contact:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`

  const contactData = {
    name: body.name,
    email: body.email,
    topic: body.topic || '',
    message: body.message,
    createdAt: new Date().toISOString(),
  }

  // 使用共享存储（本地内存 / Vercel KV 自动切换）
  await saveContact(id, contactData)

  return {
    success: true,
    message: `感谢 ${body.name}，我们会在 24 小时内回复到 ${body.email}`,
    id,
  }
})
