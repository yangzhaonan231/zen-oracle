<script setup lang="ts">
useSeoMeta({
  title: '联系我们 — Zen Oracle',
  description: '有任何关于命理、风水、奇门遁甲的问题？请填写表单，我们的玄学顾问会尽快回复。'
})

// ========== 表单数据（reactive 管理整个表单） ==========
const form = reactive({
  name: '',
  email: '',
  topic: '',
  message: '',
})

// USelect 选项 — 咨询主题
const topicOptions = [
  { label: '命理堪舆（八字/紫微）', value: 'bazi' },
  { label: '堪舆风水（居家/办公室）', value: 'fengshui' },
  { label: '奇门遁甲（择吉/决策）', value: 'qimen' },
  { label: '心理咨询（情绪/冥想）', value: 'psychology' },
  { label: '其他问题', value: 'other' },
]

const agreed = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

// ========== 表单验证（computed 计算属性） ==========
const emailError = computed(() => {
  if (!form.email) return ''
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  return isValid ? '' : '请输入有效的邮箱地址'
})

const canSubmit = computed(() => {
  return form.name && form.email && !emailError.value && form.message && agreed.value
})

// ========== 方法 ==========
const toast = useToast()

function submitForm() {
  if (!canSubmit.value) return

  // 模拟提交（70% 成功率）
  const success = Math.random() > 0.3

  if (success) {
    showSuccess.value = true
    toast.add({
      title: '提交成功 🙏',
      description: '我们会在 24 小时内回复你，请留意邮箱',
      color: 'success',
      icon: 'i-lucide-check-circle',
      duration: 5000,
    })
  } else {
    errorMessage.value = '服务器繁忙，请稍后重试'
    showError.value = true
    toast.add({
      title: '提交失败',
      description: '网络连接异常，请稍后重试',
      color: 'error',
      icon: 'i-lucide-alert-circle',
      duration: 5000,
    })
  }
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.topic = ''
  form.message = ''
  agreed.value = false
  showSuccess.value = false
  showError.value = false
}
</script>

<template>
  <UContainer class="py-16 max-w-2xl">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <UIcon name="i-lucide-mail" size="48" class="text-[var(--ui-primary)] mx-auto mb-4" />
      <h1 class="text-4xl font-bold mb-3">联系我们</h1>
      <p class="text-lg text-muted">
        关于命理、风水、奇门有任何疑问？欢迎随时联系我们。
      </p>
    </div>

    <!-- 成功状态 — v-if/v-else 切换 -->
    <UCard v-if="!showSuccess">
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-message-circle" size="20" class="text-[var(--ui-primary)]" />
          <h2 class="text-lg font-semibold">发送消息</h2>
        </div>
      </template>

      <div class="space-y-5">
        <!-- 姓名 -->
        <div>
          <label class="block text-sm font-medium mb-2">姓名 *</label>
          <UInput
            v-model="form.name"
            placeholder="你的姓名"
            icon="i-lucide-user"
            size="lg"
          />
        </div>

        <!-- 邮箱 -->
        <div>
          <label class="block text-sm font-medium mb-2">邮箱 *</label>
          <UInput
            v-model="form.email"
            placeholder="your@email.com"
            icon="i-lucide-mail"
            size="lg"
            :error="emailError"
            helper="我们会严格保护你的隐私"
          />
        </div>

        <!-- 咨询主题（USelect 下拉选择） -->
        <div>
          <label class="block text-sm font-medium mb-2">咨询主题</label>
          <USelect
            v-model="form.topic"
            :items="topicOptions"
            placeholder="请选择你感兴趣的领域"
            size="lg"
          />
        </div>

        <!-- 消息内容（UTextarea 多行文本） -->
        <div>
          <label class="block text-sm font-medium mb-2">消息内容 *</label>
          <UTextarea
            v-model="form.message"
            placeholder="请描述你的需求或问题……"
            :rows="5"
            :maxlength="500"
            hint="最多 500 字"
          />
        </div>

        <!-- 同意条款（UCheckbox） -->
        <UCheckbox
          v-model="agreed"
          label="我同意隐私政策和服务条款"
        />
      </div>

      <template #footer>
        <div class="flex gap-3 justify-end">
          <UButton label="重置" variant="ghost" color="neutral" @click="resetForm" />
          <UButton
            label="提交消息"
            color="primary"
            size="lg"
            :disabled="!canSubmit"
            @click="submitForm"
          />
        </div>
      </template>
    </UCard>

    <!-- 成功状态 -->
    <UCard v-else>
      <div class="text-center py-8">
        <UIcon name="i-lucide-check-circle" class="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 class="text-2xl font-bold mb-3">消息已发送！</h2>
        <p class="text-muted mb-6">
          感谢你联系 Zen Oracle，我们的玄学顾问会在 24 小时内回复到你的邮箱。
        </p>
        <UButton label="再写一条" color="primary" @click="resetForm" />
      </div>
    </UCard>

    <!-- 错误弹窗（UModal） -->
    <UModal v-model:open="showError" title="提交失败">
      <template #body>
        <div class="flex items-start gap-3">
          <UIcon name="i-lucide-alert-circle" size="20" class="text-red-500 shrink-0 mt-0.5" />
          <p class="text-red-500">{{ errorMessage }}</p>
        </div>
      </template>
      <template #footer>
        <UButton label="知道了" color="neutral" @click="showError = false" />
      </template>
    </UModal>
  </UContainer>
</template>

<style scoped>
/* contact 页面专属样式（暂无） */
</style>
