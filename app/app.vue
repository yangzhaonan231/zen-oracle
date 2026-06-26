<script setup>
// 动手2：从环境变量读取站点名称（useRuntimeConfig）
const config = useRuntimeConfig()
const siteName = config.public.siteName

// 认证状态
const { user, logout } = useAuth()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'google-site-verification', content: 'A285K1EsuE73M5-_Pjv7EpPSyPZFYODUidnjUFO8E74' }
  ],
  link: [
    { rel: 'icon', href: '/logo.jpg' }
  ],
  htmlAttrs: {
    lang: 'zh-CN'
  }
})

const title = `${siteName} — 东方玄学与现代科学的交汇`
const description = '融合八字命理、堪舆风水、奇门遁甲与脑神经科学，探索东方智慧与现代科学的交汇点。'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/logo.jpg',
  twitterCard: 'summary_large_image'
})

// ====== Day 8: 页面访问统计 ======
const route = useRoute()
watch(() => route.fullPath, (path) => {
  if (import.meta.client) {
    fetch('/api/track-pageview', {
      method: 'POST',
      body: JSON.stringify({
        path,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {}) // 静默失败
  }
}, { immediate: true })

// ====== Day 8: 全局前端错误捕获 ======
onErrorCaptured((err) => {
  if (import.meta.client) {
    fetch('/api/log-error', {
      method: 'POST',
      body: JSON.stringify({
        message: err.message,
        stack: err.stack,
        page: route.fullPath,
      }),
    }).catch(() => {})
  }
  // 不阻止错误继续传播
  return false
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-8 shrink-0" />
        </NuxtLink>

        <TemplateMenu />
      </template>

      <template #right>
        <div class="flex items-center gap-2">
          <!-- 已登录：显示仪表盘 + 退出 -->
          <template v-if="user">
            <UButton
              label="仪表盘"
              to="/dashboard"
              size="sm"
              variant="ghost"
              icon="i-lucide-layout-dashboard"
              class="hidden sm:flex"
            />
            <UButton
              label="退出"
              size="sm"
              variant="ghost"
              color="neutral"
              icon="i-lucide-log-out"
              @click="logout()"
              class="hidden sm:flex"
            />
            <UAvatar
              :alt="user.name"
              size="sm"
              class="cursor-pointer"
            />
          </template>
          <!-- 未登录：显示登录按钮 -->
          <UButton
            v-else
            label="登录"
            to="/login"
            size="sm"
            variant="subtle"
            icon="i-lucide-log-in"
          />
          <UColorModeButton />
        </div>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          {{ siteName }} © {{ new Date().getFullYear() }} — 探索命运，洞见未来
        </p>
      </template>
    </UFooter>

    <!-- Toast 通知渲染位置 —— useToast() 的弹窗在这里显示 -->
    <UToast />
  </UApp>
</template>
