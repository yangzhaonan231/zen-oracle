// server/api/log-error.post.ts
// Day 8: 全局前端错误上报
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.error('[前端错误]', {
    message: body.message,
    stack: body.stack?.slice(0, 500),
    page: body.page,
    timestamp: new Date().toISOString()
  })

  return { ok: true }
})
