// GET /api/auth/session — 获取当前登录用户
export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  return { user }
})
