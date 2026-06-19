<script setup lang="ts">
useSeoMeta({
  title: '定价方案 — Zen Oracle',
  description: '选择适合你的命理探索方案，从免费入门到大师深度服务，总有一款适合你。'
})

// ========== 定价方案数据 ==========
const plans = ref([
  {
    name: '免费入门',
    price: '¥0',
    period: '永久免费',
    description: '适合初次接触玄学的探索者',
    featured: false,
    features: [
      '每日运势查询（限 1 次）',
      '基础八字排盘',
      '风水小贴士（每周）',
      '社区讨论参与',
      'AI 助手对话（每日 5 次）'
    ],
    cta: '免费开始',
  },
  {
    name: '进阶修行',
    price: '¥99',
    period: '/月',
    description: '适合系统学习命理的修行者',
    featured: true,  // ← 高亮推荐
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
    cta: '开始 14 天免费试用',
  },
  {
    name: '大师传承',
    price: '¥299',
    period: '/月',
    description: '适合追求深度命理指导的求道者',
    featured: false,
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
  }
])

// ========== FAQ 数据（UAccordion 折叠面板） ==========
const faqItems = ref([
  {
    label: '可以随时更换套餐吗？',
    content: '当然可以。你可以在设置页面随时升级或降级套餐，差价按天计算。升级立即生效，降级在当前计费周期结束后生效。',
  },
  {
    label: '支持哪些支付方式？',
    content: '我们支持支付宝、微信支付，以及 Visa 和 MasterCard。大师传承方案还支持银行转账。',
  },
  {
    label: '有免费试用期吗？',
    content: '进阶修行方案提供 14 天免费试用，无需绑定信用卡。试用期结束后如果不订阅，账户会自动降级到免费入门，数据不会丢失。',
  },
  {
    label: '命理分析的准确率如何？',
    content: '我们的 AI 八字排盘引擎经过数十万张命盘训练，准确率达 92%。当然，命理是参考工具而非绝对的预言，我们建议你结合自己的实际情况加以判断。',
  },
  {
    label: '数据隐私有保障吗？',
    content: '生辰八字属于敏感个人信息。我们使用 AES-256 加密存储所有数据，绝不与第三方共享。你可以随时导出或删除全部数据。',
  },
])

function scrollToPlans() {
  if (import.meta.client) {
    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })
  }
}
const toast = useToast()

// ☐ 页面跳转三种方式之一：navigateTo() —— JS 里编程式导航
function handleCTA(planName: string) {
  if (planName === '大师传承') {
    navigateTo('/contact')
    return
  }
  // Toast 操作反馈
  toast.add({
    title: `你选择了「${planName}」`,
    description: '后续将接入支付流程，敬请期待',
    color: 'info',
    icon: 'i-lucide-sparkles',
    duration: 4000,
  })
}
</script>

<template>
  <UContainer>
    <!-- ====== Hero ====== -->
    <UPageSection
      title="选择适合你的修行之路"
      description="从免费探索到大师传承，每一位求道者都能找到属于自己的节奏。无需犹豫，从免费入门开始你的玄学之旅。"
      class="text-center"
    >
      <!-- Hero 操作按钮 -->
      <div class="flex justify-center gap-3 mt-6">
        <!-- ☐ 页面跳转方式之二：UButton 的 to prop（底层是 NuxtLink） -->
        <UButton
          label="联系销售咨询"
          variant="outline"
          color="neutral"
          to="/contact"
        />
        <UButton
          label="查看功能对比"
          variant="ghost"
          color="neutral"
          @click="scrollToPlans"
        />
      </div>
    </UPageSection>

    <!-- ====== 定价卡片（响应式网格） ====== -->
    <UPageSection id="plans">
      <!-- ☐ 响应式布局：手机 1 列 → 桌面 3 列 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <UCard
          v-for="plan in plans"
          :key="plan.name"
          :class="plan.featured
            ? 'ring-2 ring-[var(--ui-primary)] ring-offset-2 scale-[1.02] relative'
            : 'relative'"
        >
          <!-- ☐ UBadge 高亮标签：定位在卡片顶部 -->
          <UBadge
            v-if="plan.featured"
            label="最受欢迎"
            color="primary"
            size="sm"
            class="absolute -top-3 left-1/2 -translate-x-1/2"
          />

          <template #header>
            <h3 class="text-xl font-semibold text-center">{{ plan.name }}</h3>
            <p class="text-sm text-muted mt-1 text-center">{{ plan.description }}</p>
          </template>

          <!-- 价格 -->
          <div class="text-center mb-6">
            <span class="text-4xl font-bold">{{ plan.price }}</span>
            <span class="text-sm text-muted">{{ plan.period }}</span>
          </div>

          <!-- 功能列表 -->
          <ul class="space-y-3 mb-6">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-start gap-2 text-sm"
            >
              <UIcon
                name="i-lucide-check"
                class="text-green-500 w-5 h-5 shrink-0 mt-0.5"
              />
              <span>{{ feature }}</span>
            </li>
          </ul>

          <template #footer>
            <UButton
              :label="plan.cta"
              :color="plan.featured ? 'primary' : 'neutral'"
              :variant="plan.featured ? 'solid' : 'outline'"
              block
              size="lg"
              @click="handleCTA(plan.name)"
            />
          </template>
        </UCard>
      </div>

      <!-- 退款说明 -->
      <p class="text-center mt-8 text-sm text-muted">
        所有方案均支持 7 天无理由退款 · 随时升级或降级 · 支持支付宝/微信支付
      </p>
    </UPageSection>

    <!-- ====== FAQ（UAccordion 折叠面板） ====== -->
    <UPageSection
      id="faq"
      title="常见问题"
      description="关于定价的常见疑问，如果还有不清楚的，欢迎联系我们。"
    >
      <div class="max-w-2xl mx-auto">
        <!-- ☐ UAccordion：点击展开/折叠，原生支持 dark mode -->
        <UAccordion :items="faqItems" />
      </div>
    </UPageSection>

    <!-- ====== 底部 CTA ====== -->
    <UPageSection>
      <div class="text-center max-w-xl mx-auto">
        <h2 class="text-2xl font-bold mb-3">还有疑问？</h2>
        <p class="text-muted mb-6">
          我们的命理顾问团队随时准备回答你的问题，帮你找到最合适的修行之路。
        </p>
        <div class="flex justify-center gap-3">
          <!-- ☐ 页面跳转方式之三：NuxtLink 包裹或 UButton to -->
          <UButton label="联系我们" color="primary" size="lg" to="/contact" />
          <UButton label="预约演示" variant="outline" size="lg" @click="handleCTA('演示')" />
        </div>
      </div>
    </UPageSection>
  </UContainer>
</template>
