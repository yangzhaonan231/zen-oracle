<script setup lang="ts">
useSeoMeta({
  title: '文档站 — Zen Oracle',
  description: '系统化玄学知识库：八字入门、风水要诀、奇门基础、冥想指南，从零开始学玄学。'
})

const sections = [
  {
    title: '八字命理',
    icon: 'i-lucide-compass',
    description: '从零开始学习天干地支、五行生克、十神六亲、大运流年。',
    articles: [
      { title: '天干地支基础', done: true },
      { title: '五行生克关系', done: true },
      { title: '排八字四柱', done: true },
      { title: '十神详解', done: true },
      { title: '大运与流年', done: false },
      { title: '实战案例精解', done: false }
    ]
  },
  {
    title: '堪舆风水',
    icon: 'i-lucide-home',
    description: '学习风水基础理论、罗盘使用、居家布局、办公室风水。',
    articles: [
      { title: '风水基本概念', done: true },
      { title: '八卦与方位', done: true },
      { title: '玄空飞星入门', done: true },
      { title: '阳宅三要', done: false },
      { title: '办公室风水', done: false },
      { title: '风水工具使用', done: false }
    ]
  },
  {
    title: '奇门遁甲',
    icon: 'i-lucide-shield',
    description: '上古三式之首，学习奇门排盘、八门九星、时空择吉。',
    articles: [
      { title: '奇门遁甲概述', done: true },
      { title: '九宫八卦基础', done: true },
      { title: '八门详解', done: false },
      { title: '九星与八神', done: false },
      { title: '奇门择吉应用', done: false },
      { title: '商业决策案例', done: false }
    ]
  },
  {
    title: '心理与冥想',
    icon: 'i-lucide-heart-handshake',
    description: '融汇东西方心性修养方法，学习情绪管理与正念冥想。',
    articles: [
      { title: '正念冥想入门', done: true },
      { title: '情绪识别与管理', done: true },
      { title: '呼吸法与放松训练', done: true },
      { title: '中医情志学说', done: false },
      { title: '认知行为疗法基础', done: false },
      { title: '灵性成长之路', done: false }
    ]
  }
]
</script>

<template>
  <UContainer class="py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">知识文档</h1>
      <p class="text-lg text-muted max-w-2xl mx-auto">
        系统化的玄学知识库，从基础概念到实战应用，每一步都清晰可循。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      <UCard v-for="section in sections" :key="section.title">
        <template #header>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-[var(--ui-primary)]/10 flex items-center justify-center">
              <UIcon :name="section.icon" class="text-[var(--ui-primary)]" size="20" />
            </div>
            <div>
              <h2 class="font-semibold">{{ section.title }}</h2>
              <p class="text-xs text-muted">{{ section.articles.filter(a => a.done).length }}/{{ section.articles.length }} 篇已完成</p>
            </div>
          </div>
        </template>
        <p class="text-sm text-muted mb-4">{{ section.description }}</p>
        <ul class="space-y-2">
          <li
            v-for="article in section.articles"
            :key="article.title"
            class="flex items-center gap-2 text-sm"
            :class="article.done ? '' : 'opacity-50'"
          >
            <UIcon
              :name="article.done ? 'i-lucide-file-text' : 'i-lucide-pencil'"
              size="14"
              class="shrink-0"
            />
            <span>{{ article.title }}</span>
            <UBadge
              v-if="!article.done"
              label="撰写中"
              variant="outline"
              size="xs"
              class="ml-auto shrink-0"
            />
          </li>
        </ul>
      </UCard>
    </div>
  </UContainer>
</template>
