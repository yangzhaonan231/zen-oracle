// POST /api/auth/login — 邮箱登录
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email) {
    throw createError({ statusCode: 400, message: '请输入邮箱地址' })
  }

  // 简易登录：用邮箱生成用户（实际项目需验证密码/GitHub OAuth）
  const user = {
    id: `user:${Date.now()}`,
    name: body.email.split('@')[0],
    email: body.email,
  }

  const token = await createKVSession(user)

  // 设置 cookie
  setCookie(event, 'session_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 // 7 天
  })

  return { success: true, user }
})
