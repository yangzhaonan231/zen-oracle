<script setup>
// 动手2：从环境变量读取站点名称（useRuntimeConfig）
const config = useRuntimeConfig()
const siteName = config.public.siteName

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
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
        <UColorModeButton />
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
