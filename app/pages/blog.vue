<script setup lang="ts">
useSeoMeta({
  title: '博客 — Zen Oracle',
  description: '命理知识、风水指南、冥想技巧……探索东方玄学的广阔世界。'
})

const posts = [
  {
    title: '八字入门：十分钟看懂你的命盘',
    description: '不需要任何基础，带你从零开始认识天干地支、五行生克，快速读懂自己的八字命盘。',
    category: '命理',
    date: '2026-06-15',
    author: '明远',
    readTime: '8 min'
  },
  {
    title: '居家风水 7 大禁忌，你中了几个？',
    description: '从大门朝向到卧室布局，盘点最常见但最容易被忽视的家居风水问题及化解方法。',
    category: '风水',
    date: '2026-06-10',
    author: '清玄',
    readTime: '6 min'
  },
  {
    title: '奇门遁甲与现代决策科学',
    description: '奇门遁甲的时空模型与脑神经科学的决策机制有哪些惊人的相似之处？一篇深度对比分析。',
    category: '奇门',
    date: '2026-06-05',
    author: '云鹤',
    readTime: '12 min'
  },
  {
    title: '冥想入门：从 5 分钟开始的日常修行',
    description: '不需要蒲团和香炉，在办公室里就能做的冥想练习，帮你快速恢复专注与平静。',
    category: '心理',
    date: '2026-05-28',
    author: '灵素',
    readTime: '5 min'
  },
  {
    title: '流年运势 2026：丙午年十二生肖详解',
    description: '丙午马年各生肖的运势走向，哪些生肖今年宜守不宜攻？哪些将迎来事业突破？',
    category: '命理',
    date: '2026-05-20',
    author: '明远',
    readTime: '15 min'
  },
  {
    title: '中医五行与情绪管理：肝怒、心喜、脾思、肺悲、肾恐',
    description: '从中医情志学说出发，理解五脏与情绪的对应关系，学会用五行调节情绪的方法。',
    category: '心理',
    date: '2026-05-12',
    author: '灵素',
    readTime: '10 min'
  }
]

const categories = ['全部', '命理', '风水', '奇门', '心理']
const activeCategory = ref('全部')

const filteredPosts = computed(() => {
  if (activeCategory.value === '全部') return posts
  return posts.filter(p => p.category === activeCategory.value)
})
</script>

<template>
  <UContainer class="py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Zen Oracle 博客</h1>
      <p class="text-lg text-muted max-w-2xl mx-auto">
        命理解读、风水指南、冥想修行、奇门遁甲——持续更新，让玄学智慧融入日常生活。
      </p>
    </div>

    <!-- 分类筛选 -->
    <div class="flex justify-center gap-2 mb-10 flex-wrap">
      <UButton
        v-for="cat in categories"
        :key="cat"
        :label="cat"
        :color="activeCategory === cat ? 'primary' : 'neutral'"
        :variant="activeCategory === cat ? 'solid' : 'outline'"
        size="xs"
        class="rounded-full"
        @click="activeCategory = cat"
      />
    </div>

    <!-- 文章列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <UCard v-for="post in filteredPosts" :key="post.title" class="hover:shadow-md transition-shadow">
        <template #header>
          <div class="flex items-center justify-between">
            <UBadge :label="post.category" color="primary" variant="subtle" size="xs" />
            <span class="text-xs text-muted">{{ post.date }}</span>
          </div>
          <h2 class="font-semibold mt-3 line-clamp-2">{{ post.title }}</h2>
        </template>
        <p class="text-sm text-muted line-clamp-3">{{ post.description }}</p>
        <template #footer>
          <div class="flex items-center justify-between text-xs text-muted">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-user" size="14" />
              <span>{{ post.author }}</span>
            </div>
            <div class="flex items-center gap-1">
              <UIcon name="i-lucide-clock" size="14" />
              <span>{{ post.readTime }}</span>
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
