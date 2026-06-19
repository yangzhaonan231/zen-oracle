<!--
  app/components/PricingCard.vue
  纯 Tailwind 手写定价卡片 — 零 Nuxt UI 依赖
  没有 UCard / UButton / UBadge / UIcon
-->
<script setup lang="ts">
defineProps<{
  name: string
  price: string
  period: string
  description: string
  features: string[]
  featured?: boolean
  cta: string
}>()

const emit = defineEmits<{
  select: []
}>()
</script>

<template>
  <div
    class="relative bg-white dark:bg-gray-800 rounded-2xl border p-6 flex flex-col transition-shadow hover:shadow-lg"
    :class="featured
      ? 'ring-2 ring-primary-500 ring-offset-2 border-primary-500 scale-105'
      : 'border-gray-200 dark:border-gray-700'"
  >
    <!-- 推荐标签（纯 div，没用 UBadge） -->
    <span
      v-if="featured"
      class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full"
    >
      最受欢迎
    </span>

    <!-- 套餐名 + 描述 -->
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
      {{ name }}
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
      {{ description }}
    </p>

    <!-- 价格 -->
    <div class="mb-6">
      <span class="text-4xl font-bold text-gray-900 dark:text-white">
        {{ price }}
      </span>
      <span class="text-gray-500 dark:text-gray-400">
        {{ period }}
      </span>
    </div>

    <!-- 功能列表（纯 ul + li，没用 UIcon） -->
    <ul class="space-y-3 mb-8 flex-1">
      <li
        v-for="feature in features"
        :key="feature"
        class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
      >
        <span class="text-green-500 mt-0.5 shrink-0">✓</span>
        <span>{{ feature }}</span>
      </li>
    </ul>

    <!-- CTA 按钮（纯 button，没用 UButton） -->
    <button
      class="w-full py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
      :class="featured
        ? 'bg-primary-500 hover:bg-primary-600 text-white'
        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'"
      @click="emit('select')"
    >
      {{ cta }}
    </button>
  </div>
</template>
