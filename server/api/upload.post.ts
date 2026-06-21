// POST /api/upload — 文件上传到 Nuxt Hub Blob 存储
export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)

  if (!user) {
    throw createError({ statusCode: 401, message: '请先登录' })
  }

  // 接收上传的文件
  const formData = await readFormData(event)
  const file = formData.get('file') as File | null

  if (!file || !file.size) {
    throw createError({ statusCode: 400, message: '未选择文件' })
  }

  // 限制文件大小（最大 5 MB）
  if (file.size > 5 * 1024 * 1024) {
    throw createError({ statusCode: 400, message: '文件不能超过 5 MB' })
  }

  // 存储到 Hub Blob（blob 由 @nuxthub/core 自动注入）
  const key = `uploads/${user.id}/${Date.now()}-${file.name}`
  const result = await blob.put(key, file.stream(), {
    contentType: file.type,
    access: 'public'
  })

  return {
    success: true,
    url: result.url,
    pathname: result.pathname,
    filename: file.name,
    size: result.size || file.size
  }
})
