// server/api/hello.ts
// 动手4：第一个后端 API —— 访问 http://localhost:3000/api/hello
export default defineEventHandler(() => {
  return {
    message: '你好，杨兆楠！你的第一个 Nuxt 后端 API 已就绪 🙏',
    time: new Date().toISOString(),
  }
})
