// server/api/track-pageview.post.ts
// Day 8: 页面访问统计 — 每次页面切换时自动记录
import { pageViews } from '../db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 静默记录，不影响用户体验
  await db.insert(pageViews).values({
    path: body.path || '/',
    referrer: body.referrer || '',
    userAgent: body.userAgent || '',
    createdAt: new Date()
  }).catch(() => {
    // 静默失败，不影响页面
  })

  return { ok: true }
})
