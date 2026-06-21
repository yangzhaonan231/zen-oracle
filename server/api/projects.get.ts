// GET /api/projects — 获取当前用户的项目列表
import { projects } from '../db/schema'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  if (!user) {
    throw createError({ statusCode: 401, message: '请先登录' })
  }

  // db 由 @nuxthub/core 自动注入
  return await db
    .select()
    .from(projects)
    .where(eq(projects.userId, user.id))
    .orderBy(desc(projects.updatedAt))
})
