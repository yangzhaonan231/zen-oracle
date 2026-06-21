// server/api/contacts.get.ts
// 查看联系表单提交记录
import { contacts } from '../db/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const result = await db
    .select()
    .from(contacts)
    .orderBy(desc(contacts.createdAt))
    .limit(50)

  return result
})
