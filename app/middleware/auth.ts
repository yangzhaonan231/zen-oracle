// middleware/auth.ts
// 页面级登录保护中间件
// 用法：definePageMeta({ middleware: 'auth' })
export default defineNuxtRouteMiddleware(async () => {
  // 在服务端通过 cookie 检查登录状态
  const { data } = await useFetch('/api/auth/session', {
    headers: useRequestHeaders(['cookie'])
  })

  if (!data.value?.user) {
    return navigateTo('/login')
  }
})
