<!-- ============================================ -->
<!-- 区域一：<template> — 页面骨架 (HTML + 组件)   -->
<!-- ============================================ -->
<template>
  <div>
    <!-- ===== Hero 区域 ===== -->
    <!-- 动手3：Preview 部署测试标记 -->
    <UPageHero
      title="Zen Oracle"
      description="融合八字命理、堪舆风水、奇门遁甲与脑神经科学，以东方千年智慧为根基、现代科学为佐证，探索身心平衡与命运之道。— Preview 测试"
      :links="[{
        label: '开始探索',
        to: '/#features',
        color: 'primary',
        size: 'xl',
        trailingIcon: 'i-lucide-arrow-right'
      }, {
        label: '了解更多',
        to: '/docs',
        color: 'neutral',
        size: 'xl',
        variant: 'subtle'
      }]"
    />

    <!-- ===== Feature 区域（☐6 v-for + ☐7 Props） ===== -->
    <UPageSection
      id="features"
      title="核心服务"
      description="六位一体，从传统玄学到现代心理，全方位守护你的身心与运势。"
    >
      <!-- ☐6：v-for 循环渲染 features 数组，:key 是必须的 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          :icon="feature.icon"
          :link="feature.link"
        />
      </div>
    </UPageSection>

    <!-- ===== 学习成果展示区（☐2~5 综合演示） ===== -->
    <UPageSection
      title="Vue 基础实战演示"
      description="以下区域展示了 Day 2 学到的核心概念：ref()、{{ }}、@click、v-if、v-show。"
    >
      <div class="max-w-lg mx-auto space-y-6">

        <!-- ☐2 + ☐3：ref() 变量 + {{ }} 插值显示在页面上 -->
        <UCard>
          <template #header>
            <h3 class="font-semibold flex items-center gap-2">
              <UIcon name="i-lucide-mouse-pointer-click" size="18" />
              ☐3 {{ }} 插值 &amp; ☐4 @click 事件
            </h3>
          </template>

          <!-- ☐3：{{ }} 把 JS 变量显示到页面上 -->
          <p class="text-lg text-center py-2">
            你已经点击了 <span class="text-[var(--ui-primary)] font-bold text-2xl">{{ count }}</span> 次
          </p>

          <template #footer>
            <div class="flex gap-2 justify-center">
              <!-- ☐4：@click 给按钮绑定点击事件 -->
              <UButton label="+1" color="primary" @click="addOne" />
              <UButton label="重置" color="neutral" variant="outline" @click="reset" />
            </div>
          </template>
        </UCard>

        <!-- ☐5：v-if / v-else / v-show 条件渲染 -->
        <UCard>
          <template #header>
            <h3 class="font-semibold flex items-center gap-2">
              <UIcon name="i-lucide-eye" size="18" />
              ☐5 v-if / v-show 条件渲染
            </h3>
          </template>

          <!-- v-if：条件为真才创建 DOM 元素 -->
          <div v-if="isLoggedIn" class="p-4 bg-green-50 dark:bg-green-950 rounded-lg text-center">
            <UIcon name="i-lucide-check-circle" class="text-green-500 w-8 h-8 mx-auto mb-2" />
            <p class="font-medium">欢迎回来，杨兆楠 🙏</p>
            <p class="text-xs text-muted mt-1">此区域由 v-if 控制——注销后整个元素从 DOM 中移除</p>
          </div>

          <!-- v-else：上面条件不成立时显示 -->
          <div v-else class="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg text-center">
            <UIcon name="i-lucide-log-in" class="text-amber-500 w-8 h-8 mx-auto mb-2" />
            <p class="font-medium">请登录以查看您的运势</p>
            <p class="text-xs text-muted mt-1">此区域由 v-else 控制</p>
          </div>

          <!-- v-show：始终在 DOM 中，通过 CSS display 切换 -->
          <div
            v-show="showTip"
            class="mt-4 p-3 bg-[var(--ui-primary)]/10 rounded-lg text-sm flex items-start gap-2"
          >
            <UIcon name="i-lucide-lightbulb" size="16" class="shrink-0 mt-0.5" />
            <span>
              💡 <strong>v-show vs v-if：</strong>看 DevTools——这个提示用 v-show 控制，
              元素始终存在于 DOM 中，只是 CSS display:none。适合频繁切换的场景。
            </span>
          </div>

          <template #footer>
            <div class="flex gap-2 justify-center flex-wrap">
              <UButton
                :label="isLoggedIn ? '退出登录' : '模拟登录'"
                :color="isLoggedIn ? 'neutral' : 'primary'"
                size="sm"
                @click="isLoggedIn = !isLoggedIn"
              />
              <UButton
                :label="showTip ? '隐藏提示' : '显示提示 (v-show)'"
                color="neutral"
                variant="outline"
                size="sm"
                @click="showTip = !showTip"
              />
            </div>
          </template>
        </UCard>

      </div>
    </UPageSection>

    <!-- ============================================ -->
    <!-- Day 3：Nuxt UI 组件深入实战                    -->
    <!-- ============================================ -->

    <!-- 动手1：表单组件测试区 — UInput/UTextarea/USelect/UCheckbox/UToggle -->
    <UPageSection
      title="Nuxt UI 组件实战演示"
      description="动手1：v-model 双向绑定——在输入框里打字，变量即时更新。打开 Vue DevTools 观察数据变化。"
    >
      <div class="max-w-lg mx-auto space-y-6">

        <!-- UInput + v-model：文本输入框 -->
        <div>
          <label class="block text-sm font-medium mb-2">📧 邮箱地址（UInput + v-model）</label>
          <UInput
            v-model="demoEmail"
            placeholder="请输入邮箱"
            icon="i-lucide-mail"
            :error="demoEmailError"
            helper="输入内容即时同步到变量 demoEmail"
          />
          <p class="text-xs text-muted mt-1">
            当前值：<code class="bg-muted px-1 rounded">{{ demoEmail || '(空)' }}</code>
          </p>
        </div>

        <!-- UTextarea：多行文本 -->
        <div>
          <label class="block text-sm font-medium mb-2">💬 留言内容（UTextarea + v-model）</label>
          <UTextarea
            v-model="demoMessage"
            placeholder="请描述你的问题..."
            :rows="3"
            :maxlength="200"
            hint="最多 200 字"
          />
          <p class="text-xs text-muted mt-1">
            已输入 <span class="text-[var(--ui-primary)] font-bold">{{ demoMessage.length }}</span> / 200 字
          </p>
        </div>

        <!-- USelect：下拉选择 -->
        <div>
          <label class="block text-sm font-medium mb-2">🎯 感兴趣的领域（USelect 对象数组）</label>
          <USelect
            v-model="demoInterest"
            :items="interestOptions"
            placeholder="请选择你感兴趣的领域"
          />
          <p class="text-xs text-muted mt-1">
            已选择：<span class="text-[var(--ui-primary)]">{{ demoInterest || '(未选择)' }}</span>
          </p>
        </div>

        <!-- UCheckbox + UToggle 并排 -->
        <div class="flex items-center gap-8 flex-wrap">
          <div class="flex items-center gap-2">
            <UCheckbox v-model="demoAgreed" />
            <span class="text-sm">我同意服务条款（UCheckbox）</span>
          </div>
          <div class="flex items-center gap-2">
            <UToggle v-model="demoNotify" />
            <span class="text-sm">{{ demoNotify ? '🔔 已开启通知' : '🔕 已关闭通知' }}（UToggle）</span>
          </div>
        </div>

        <!-- 表单状态一览 -->
        <UCard>
          <template #header>
            <h3 class="font-semibold text-sm">📋 所有表单变量即时快照（ref 响应式）</h3>
          </template>
          <div class="grid grid-cols-2 gap-2 text-sm">
            <span class="text-muted">demoEmail:</span>
            <span>{{ demoEmail || '(空)' }}</span>
            <span class="text-muted">demoMessage:</span>
            <span>{{ demoMessage || '(空)' }}</span>
            <span class="text-muted">demoInterest:</span>
            <span>{{ demoInterest || '(空)' }}</span>
            <span class="text-muted">demoAgreed:</span>
            <span>{{ demoAgreed ? '✅' : '❌' }}</span>
            <span class="text-muted">demoNotify:</span>
            <span>{{ demoNotify ? '✅' : '❌' }}</span>
          </div>
        </UCard>

        <!-- 动手2+3：订阅弹窗 + Toast 通知 -->
        <div class="text-center pt-2">
          <UButton
            label="📬 订阅更新（UModal + UToast）"
            color="primary"
            size="lg"
            @click="subscribeModalOpen = true"
          />

          <!-- UModal 弹窗 -->
          <UModal v-model:open="subscribeModalOpen" title="订阅 Zen Oracle 更新">
            <template #body>
              <div class="space-y-4">
                <p class="text-sm text-muted">
                  输入你的邮箱，我们会不定期推送玄学知识、新功能上线通知。
                </p>
                <UInput
                  v-model="subscribeEmail"
                  placeholder="your@email.com"
                  icon="i-lucide-mail"
                  size="lg"
                />
              </div>
            </template>
            <template #footer>
              <div class="flex gap-3 justify-end">
                <UButton
                  label="取消"
                  color="neutral"
                  variant="ghost"
                  @click="subscribeModalOpen = false"
                />
                <UButton
                  label="确认订阅"
                  color="primary"
                  :disabled="!subscribeEmail"
                  @click="handleSubscribe"
                />
              </div>
            </template>
          </UModal>
        </div>

      </div>
    </UPageSection>

    <!-- ===== CTA 区域 ===== -->
    <UPageSection>
      <UPageCTA
        title="准备好探索命运的奥秘了吗？"
        description="无论你是想了解自己的命盘、改善居家风水，还是寻求心灵的平静，Zen Oracle 都会是你最可靠的向导。"
        variant="subtle"
        :links="[{
          label: '立即开始',
          to: '/#features',
          color: 'primary',
          trailingIcon: 'i-lucide-arrow-right',
          size: 'xl'
        }, {
          label: '阅读文档',
          to: '/docs',
          target: '_blank',
          icon: 'i-lucide-book-open',
          color: 'neutral',
          size: 'xl',
          variant: 'outline'
        }]"
      />
    </UPageSection>
  </div>
</template>

<!-- ============================================   -->
<!-- 区域二：<script setup> — 页面逻辑 (JS/TS)     -->
<!-- ============================================   -->
<script setup lang="ts">
// ☐2：ref() 创建响应式变量——值变了，页面自动更新
//      ⚠️ 在 JS 里读写需要 .value，在模板里直接写变量名

// --- Toast 通知（动手3） ---
const toast = useToast()

// --- 计数器（☐4 @click 事件演示） ---
const count = ref(0)

function addOne() {
  count.value++  // JS 里必须 .value
}

function reset() {
  count.value = 0
}

// --- 登录状态（☐5 v-if / v-else 演示） ---
const isLoggedIn = ref(false)

// --- 提示显示（☐5 v-show 演示——频繁切换） ---
const showTip = ref(true)

// --- ☐6：features 数组集中管理，v-for 循环渲染 ---
const features = ref([
  {
    title: '命理堪舆',
    description: '八字命盘精解 + 居家风水布局，从先天命格到后天环境，为你揭示人生轨迹与空间能量的奥秘。',
    icon: 'i-lucide-compass',
    link: '/docs'
  },
  {
    title: '奇门遁甲',
    description: '上古三式之首，融汇天时、地利、人和，为重大决策提供精准的时空择吉与策略参考。',
    icon: 'i-lucide-shield',
    link: '/docs'
  },
  {
    title: '心理咨询',
    description: '结合东方心性修养与西方心理学，提供专业情绪管理与心理疏导，助你走出低谷、找回内在力量。',
    icon: 'i-lucide-heart-handshake',
    link: '/chat'
  },
  {
    title: '聊天应用',
    description: '随时随地与AI玄学助手对话，获取即时命理解读、风水建议与情绪陪伴，让智慧触手可及。',
    icon: 'i-lucide-messages-square',
    link: '/chat'
  },
  {
    title: '文档站',
    description: '系统化命理知识库：八字入门、风水要诀、奇门基础、冥想指南，从零开始学玄学。',
    icon: 'i-lucide-book-open',
    link: '/docs'
  },
  {
    title: '更新日志',
    description: '持续迭代进化，追踪每一次功能更新与内容扩充，见证 Zen Oracle 与你共同成长。',
    icon: 'i-lucide-clock',
    link: '/changelog'
  }
])

// ============================================
// Day 3：表单组件演示变量（动手1）
// ============================================

// UInput 演示
const demoEmail = ref('')
const demoEmailError = computed(() => {
  if (!demoEmail.value) return ''
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(demoEmail.value) ? '' : '请输入有效的邮箱地址'
})

// UTextarea 演示
const demoMessage = ref('')

// USelect 演示 —— 对象数组（推荐）
const interestOptions = [
  { label: '命理堪舆', value: 'bazi' },
  { label: '奇门遁甲', value: 'qimen' },
  { label: '堪舆风水', value: 'fengshui' },
  { label: '心理咨询', value: 'psychology' },
]
const demoInterest = ref('')

// UCheckbox 演示
const demoAgreed = ref(false)

// UToggle 演示
const demoNotify = ref(true)

// ============================================
// Day 3：订阅弹窗 + Toast（动手2 + 动手3）
// ============================================
const subscribeModalOpen = ref(false)
const subscribeEmail = ref('')

function handleSubscribe() {
  if (!subscribeEmail.value) return
  // 关闭弹窗
  subscribeModalOpen.value = false
  // Toast 操作反馈通知
  toast.add({
    title: '订阅成功！感谢你的关注 🙏',
    description: `我们已将确认邮件发送至 ${subscribeEmail.value}`,
    color: 'success',
    icon: 'i-lucide-check-circle',
    duration: 5000
  })
  // 重置输入
  subscribeEmail.value = ''
}
</script>

<!-- ============================================   -->
<!-- 区域三：<style scoped> — 页面专属样式       -->
<!-- ============================================   -->
<style scoped>
/* scoped 意味着这里的样式只影响当前 index.vue，不会污染其他页面 */
</style>
