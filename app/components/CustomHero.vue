<!--
  app/components/CustomHero.vue
  纯 Tailwind 手写 Hero 区块 — 零 Nuxt UI 依赖
  没有 UPageHero / UButton
-->
<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- 背景装饰渐变（纯 CSS） -->
    <div
      class="absolute inset-0 -z-10"
      aria-hidden="true"
    >
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary-100/50 to-transparent dark:from-primary-900/20 dark:to-transparent rounded-full blur-3xl"
      />
    </div>

    <!-- 内容 -->
    <div class="max-w-3xl mx-auto text-center py-24 md:py-32 px-4">
      <h1
        class="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
      >
        {{ title }}
      </h1>
      <p
        class="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        {{ description }}
      </p>
      <!-- 按钮组（纯 button，没用 UButton） -->
      <div class="flex flex-col sm:flex-row justify-center gap-3">
        <button
          class="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors cursor-pointer"
        >
          开始使用
        </button>
        <button
          class="px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors cursor-pointer"
        >
          了解更多
        </button>
      </div>
    </div>
  </div>
</template>
