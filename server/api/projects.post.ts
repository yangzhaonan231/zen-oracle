// POST /api/projects — 创建新项目
import { projects } from '../db/schema'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  if (!user) {
    throw createError({ statusCode: 401, message: '请先登录' })
  }

  const body = await readBody(event)

  if (!body.name) {
    throw createError({ statusCode: 400, message: '项目名称不能为空' })
  }

  const now = new Date()
  const result = await db.insert(projects).values({
    userId: user.id,
    name: body.name,
    description: body.description || '',
    status: 'active',
    createdAt: now,
    updatedAt: now
  })

  return {
    success: true,
    projectId: Number(result.lastInsertRowid)
  }
})
