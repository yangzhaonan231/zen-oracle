<script setup lang="ts">
useSeoMeta({
  title: '定价方案 — Zen Oracle',
  description: '选择适合你的命理探索方案，从免费入门到大师深度服务，总有一款适合你。'
})

const plans = [
  {
    name: '免费入门',
    price: '¥0',
    period: '永久免费',
    description: '适合初次接触玄学的探索者',
    features: [
      '每日运势查询（限 1 次）',
      '基础八字排盘',
      '风水小贴士（每周）',
      '社区讨论参与',
      'AI 助手对话（每日 5 次）'
    ],
    cta: '免费开始',
    highlight: false
  },
  {
    name: '进阶修行',
    price: '¥99',
    period: '/月',
    description: '适合系统学习命理的修行者',
    features: [
      '无限次日运势查询',
      '深度八字命盘分析',
      '紫微斗数排盘',
      '居家风水布局指导',
      'AI 助手无限对话',
      '专属冥想引导音频',
      '奇门遁甲排盘',
      '邮件优先支持'
    ],
    cta: '立即订阅',
    highlight: true
  },
  {
    name: '大师传承',
    price: '¥299',
    period: '/月',
    description: '适合追求深度命理指导的求道者',
    features: [
      '进阶修行全部功能',
      '一对一真人命理咨询（月 2 次）',
      '个性化风水方案定制',
      '流年大运深度解读',
      '择日择吉服务',
      '专属学习路线定制',
      '优先体验新功能',
      'VIP 社群准入'
    ],
    cta: '联系大师',
    highlight: false
  }
]
</script>

<template>
  <UContainer class="py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">选择适合你的修行之路</h1>
      <p class="text-lg text-muted max-w-2xl mx-auto">
        从免费探索到大师传承，每一位求道者都能找到属于自己的节奏。无需犹豫，从免费入门开始你的玄学之旅。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <UCard
        v-for="plan in plans"
        :key="plan.name"
        :class="[plan.highlight ? 'ring-2 ring-[var(--ui-primary)] scale-[1.02]' : '']"
        :ui="{ body: { base: 'flex flex-col h-full' } }"
      >
        <template #header>
          <div class="text-center">
            <h2 class="text-xl font-semibold">{{ plan.name }}</h2>
            <div class="mt-3">
              <span class="text-4xl font-bold">{{ plan.price }}</span>
              <span class="text-sm text-muted">{{ plan.period }}</span>
            </div>
            <p class="text-sm text-muted mt-2">{{ plan.description }}</p>
          </div>
        </template>

        <ul class="space-y-3 flex-1">
          <li
            v-for="feature in plan.features"
            :key="feature"
            class="flex items-start gap-2"
          >
            <UIcon name="i-lucide-check" class="text-[var(--ui-primary)] mt-0.5 shrink-0" size="16" />
            <span class="text-sm">{{ feature }}</span>
          </li>
        </ul>

        <UButton
          :color="plan.highlight ? 'primary' : 'neutral'"
          :variant="plan.highlight ? 'solid' : 'outline'"
          block
          size="lg"
          class="mt-6"
        >
          {{ plan.cta }}
        </UButton>
      </UCard>
    </div>

    <div class="text-center mt-12 text-sm text-muted">
      <p>所有方案均支持 7 天无理由退款 · 随时升级或降级 · 支持支付宝/微信支付</p>
    </div>
  </UContainer>
</template>
