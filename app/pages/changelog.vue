<script setup lang="ts">
useSeoMeta({
  title: '更新日志 — Zen Oracle',
  description: '追踪每一次功能更新与内容扩充，见证 Zen Oracle 的持续进化。'
})

const releases = [
  {
    version: 'v1.5.0',
    date: '2026-06-18',
    title: 'Zen Oracle 官方网站上线',
    type: 'major',
    changes: [
      '全新品牌形象 Zen Oracle 正式亮相',
      '首页六大核心服务展示',
      '三档定价方案：免费入门 / 进阶修行 / 大师传承',
      '完整玄学知识文档站上线',
      'AI 玄学助手聊天应用开放',
      '博客系统上线，首批 6 篇文章'
    ]
  },
  {
    version: 'v1.4.0',
    date: '2026-06-01',
    title: '奇门遁甲排盘引擎',
    type: 'feature',
    changes: [
      '支持时家奇门自动排盘',
      '八门、九星、八神完整解析',
      '时空择吉推荐算法上线',
      '排盘结果可导出为 PDF'
    ]
  },
  {
    version: 'v1.3.0',
    date: '2026-05-15',
    title: '脑科学与玄学交叉研究模块',
    type: 'feature',
    changes: [
      '新增脑神经科学科普专栏',
      '冥想与脑电波可视化功能',
      '情绪管理模块整合认知行为疗法',
      '科学研究论文解读系列上线'
    ]
  },
  {
    version: 'v1.2.0',
    date: '2026-04-20',
    title: '风水堪舆 3D 可视化',
    type: 'feature',
    changes: [
      '支持上传户型图自动分析',
      '3D 空间风水布局模拟',
      '罗盘工具数字化',
      '八宅风水与玄空飞星双体系支持'
    ]
  },
  {
    version: 'v1.1.0',
    date: '2026-03-10',
    title: 'AI 命理助手升级',
    type: 'improvement',
    changes: [
      '八字排盘准确率提升至 92%',
      '新增紫微斗数命盘解读',
      'AI 对话上下文记忆优化',
      '支持多语言：简中 / 繁中 / 英语'
    ]
  },
  {
    version: 'v1.0.0',
    date: '2026-01-01',
    title: 'Zen Oracle 内测发布',
    type: 'major',
    changes: [
      'AI 八字排盘引擎上线',
      '基础命理解读功能',
      '社区讨论功能',
      '每日运势推送'
    ]
  }
]

const typeMap: Record<string, { label: string; color: string }> = {
  major: { label: '重大更新', color: 'primary' },
  feature: { label: '新功能', color: 'green' },
  improvement: { label: '优化', color: 'blue' },
  fix: { label: '修复', color: 'neutral' }
}
</script>

<template>
  <UContainer class="py-16 max-w-3xl">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">更新日志</h1>
      <p class="text-lg text-muted">
        持续进化，永不止步。每一次更新，都让 Zen Oracle 更接近完美。
      </p>
    </div>

    <div class="space-y-8">
      <div
        v-for="release in releases"
        :key="release.version"
        class="relative pl-8 border-l-2 border-[var(--ui-border)] pb-2"
      >
        <!-- 时间线节点 -->
        <div
          class="absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-[var(--ui-bg)]"
          :class="release.type === 'major' ? 'bg-[var(--ui-primary)]' : 'bg-[var(--ui-border)]'"
        />

        <!-- 版本信息 -->
        <div class="flex items-center gap-3 mb-3 flex-wrap">
          <span class="font-mono text-sm font-bold">{{ release.version }}</span>
          <UBadge
            :label="typeMap[release.type]?.label || release.type"
            :color="typeMap[release.type]?.color || 'neutral'"
            variant="subtle"
            size="xs"
          />
          <span class="text-xs text-muted">{{ release.date }}</span>
        </div>

        <h2 class="text-lg font-semibold mb-3">{{ release.title }}</h2>

        <ul class="space-y-1.5">
          <li
            v-for="(change, i) in release.changes"
            :key="i"
            class="text-sm text-muted flex items-start gap-2"
          >
            <UIcon name="i-lucide-dot" size="16" class="shrink-0 mt-0.5" />
            {{ change }}
          </li>
        </ul>
      </div>
    </div>

    <!-- RSS 订阅 -->
    <div class="text-center mt-12 pt-8 border-t border-[var(--ui-border)]">
      <p class="text-sm text-muted mb-3">订阅更新通知，不错过每一次进化</p>
      <div class="flex justify-center gap-3">
        <UButton label="RSS 订阅" icon="i-lucide-rss" variant="outline" color="neutral" size="sm" />
        <UButton label="邮件通知" icon="i-lucide-mail" variant="outline" color="neutral" size="sm" />
      </div>
    </div>
  </UContainer>
</template>
