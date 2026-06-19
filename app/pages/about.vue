<script setup lang="ts">
useSeoMeta({
  title: '关于我们 — Zen Oracle',
  description: '了解 Zen Oracle 的使命与团队，探索东方玄学与现代科学交汇的故事。'
})

const team = [
  {
    name: '明远',
    role: '创始人 & 首席命理师',
    description: '研习八字命理 20 年，曾师从多位隐世高师，致力于将传统玄学与现代科技融合。',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=MingYuan'
  },
  {
    name: '清玄',
    role: '风水堪舆顾问',
    description: '精通杨公风水与玄空飞星，为超过 500 个家庭和企业提供风水布局服务。',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=QingXuan'
  },
  {
    name: '灵素',
    role: '心理咨询师',
    description: '国家二级心理咨询师，融汇认知行为疗法与东方心性修养，专注情绪管理与灵性成长。',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=LingSu'
  },
  {
    name: '云鹤',
    role: '奇门遁甲传承人',
    description: '奇门遁甲第 8 代传承人，擅长时空择吉与策略运筹，为政商人士提供决策参考。',
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=YunHe'
  }
]

// ========== 价值观 ==========
const values = [
  {
    title: '古今融合',
    description: '以现代科技为器，以传统智慧为魂。用 AI、数据科学的方式让千年玄学焕发新的生命力。',
    icon: 'i-lucide-orbit',
  },
  {
    title: '知行合一',
    description: '命理不是宿命论。我们强调认识自己、改善自己——知命而不认命，顺势而为。',
    icon: 'i-lucide-lightbulb',
  },
  {
    title: '用户至上',
    description: '每一个命盘背后都是一个真实的人。隐私保护、信息准确、服务用心——这是我们的底线。',
    icon: 'i-lucide-heart',
  },
]

const milestones = [
  { year: '2024', title: 'Zen Oracle 诞生', description: '一群热爱东方玄学的技术人与命理师走到一起，决定用科技让古老智慧触手可及。' },
  { year: '2025 Q1', title: 'AI 命理引擎上线', description: '历时 6 个月训练，AI 八字排盘与解读引擎正式发布，准确率达 92%。' },
  { year: '2025 Q3', title: '风水堪舆模块', description: '结合 3D 建模技术，实现远程风水布局可视化，打破地域限制。' },
  { year: '2026 Q1', title: '全球用户破万', description: '服务覆盖 15 个国家，海外华人用户突破 10,000 人。' },
  { year: '2026 Q2', title: '奇门遁甲 + 脑科学', description: '引入脑神经科学研究成果，从科学角度验证奇门遁甲时空模型的合理性。' }
]
</script>

<template>
  <UContainer class="py-16">
    <!-- 使命 -->
    <div class="max-w-3xl mx-auto text-center mb-16">
      <h1 class="text-4xl font-bold mb-6">关于 Zen Oracle</h1>
      <p class="text-lg leading-relaxed text-muted">
        我们是东西方智慧的桥梁。Zen Oracle 汇聚了八字命理、堪舆风水、奇门遁甲等东方玄学精髓，
        并以脑神经科学、心理学等现代学科加以佐证与诠释。
        我们相信，古老的智慧不应被束之高阁——它应当以现代人能够理解的方式，
        服务于每一个寻求自我认知与命运探索的灵魂。
      </p>
    </div>

    <!-- 大事记 -->
    <UPageSection title="成长之路" description="从一个小想法到服务全球上万用户，每一步都走得坚实而笃定。">
      <div class="max-w-2xl mx-auto space-y-6">
        <div
          v-for="(m, i) in milestones"
          :key="m.year"
          class="flex gap-6"
        >
          <div class="text-right w-20 shrink-0">
            <span class="text-sm font-bold text-[var(--ui-primary)]">{{ m.year }}</span>
          </div>
          <div class="relative pb-8">
            <div
              class="absolute left-[-13px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--ui-primary)]"
              :class="{ 'ring-4 ring-[var(--ui-primary)]/20': i === milestones.length - 1 }"
            />
            <div
              v-if="i < milestones.length - 1"
              class="absolute left-[-12px] top-4 w-[2px] h-full bg-[var(--ui-border)]"
            />
            <h3 class="font-semibold">{{ m.title }}</h3>
            <p class="text-sm text-muted mt-1">{{ m.description }}</p>
          </div>
        </div>
      </div>
    </UPageSection>

    <!-- 团队 -->
    <UPageSection title="核心团队" description="一群相信古老智慧可以与现代科技共存的人。">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <UCard v-for="person in team" :key="person.name">
          <template #header>
            <div class="text-center">
              <UAvatar :src="person.avatar" :alt="person.name" size="xl" class="mx-auto" />
              <h3 class="font-semibold mt-3">{{ person.name }}</h3>
              <UBadge :label="person.role" color="primary" variant="subtle" size="xs" class="mt-1" />
            </div>
          </template>
          <p class="text-sm text-muted text-center">{{ person.description }}</p>
        </UCard>
      </div>
    </UPageSection>

    <!-- ====== 价值观 ====== -->
    <UPageSection
      title="我们的信念"
      description="这三条核心价值观，是 Zen Oracle 每一次决策的指南针。"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <UCard v-for="value in values" :key="value.title">
          <div class="text-center py-4">
            <UIcon
              :name="value.icon"
              class="w-10 h-10 text-[var(--ui-primary)] mx-auto mb-3"
            />
            <h3 class="font-semibold mb-2">{{ value.title }}</h3>
            <p class="text-sm text-muted">{{ value.description }}</p>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <!-- ====== 底部 CTA ====== -->
    <UPageSection>
      <div class="text-center max-w-xl mx-auto">
        <h2 class="text-2xl font-bold mb-3">想加入我们的修行之路？</h2>
        <p class="text-muted mb-6">
          我们一直在寻找对玄学有热情、对技术有追求的同道中人。
        </p>
        <div class="flex justify-center gap-3">
          <UButton label="联系我们" color="primary" size="lg" to="/contact" />
          <UButton
            label="探索文档"
            variant="outline"
            size="lg"
            to="/docs"
          />
        </div>
      </div>
    </UPageSection>
  </UContainer>
</template>
