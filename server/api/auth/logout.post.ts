// POST /api/auth/logout — 退出登录
export default defineEventHandler(async (event) => {
  const token = getAuthToken(event)
  if (token) {
    await destroyKVSession(token)
  }

  deleteCookie(event, 'session_token', { path: '/' })

  return { success: true }
})
