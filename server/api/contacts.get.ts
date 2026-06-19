// server/api/contacts.get.ts
// 动手7：查看联系表单提交记录（后台使用）

export default defineEventHandler(async () => {
  return await getContacts(50)
})
