<script setup lang="ts">
useSeoMeta({
  title: 'AI 玄学助手 — Zen Oracle',
  description: '随时随地与AI玄学助手对话，获取即时命理解读、风水建议与情绪陪伴。'
})

const messages = ref([
  {
    role: 'assistant',
    content: '你好，我是 Zen Oracle 的 AI 玄学助手。我可以为你解读命盘、提供风水建议、分析运势，也可以随时陪你聊聊心情。有什么想了解的吗？',
    time: '刚刚'
  }
])

const input = ref('')

const quickPrompts = [
  { label: '看今日运势', icon: 'i-lucide-sun' },
  { label: '排八字命盘', icon: 'i-lucide-compass' },
  { label: '居家风水', icon: 'i-lucide-home' },
  { label: '奇门问事', icon: 'i-lucide-shield' },
  { label: '情绪疏导', icon: 'i-lucide-heart' },
  { label: '冥想引导', icon: 'i-lucide-moon' }
]

function sendMessage() {
  if (!input.value.trim()) return
  messages.value.push({
    role: 'user',
    content: input.value,
    time: '刚刚'
  })
  input.value = ''

  // 模拟 AI 回复
  setTimeout(() => {
    const replies = [
      '根据你的命盘分析，近期你的运势呈现上升趋势，适合在事业上做出新的尝试。',
      '从风水角度来看，建议你在东南方位摆放绿植，有助于提升家中的生气与财运。',
      '我理解你现在的感受。试着做三次深呼吸，专注于当下的每个瞬间，让思绪慢慢沉淀。',
      '奇门盘显示，这个月的开门方位在正东，适合出行与开启新项目。',
      '你的八字中五行缺水，建议多接触与水相关的事物，如养鱼、佩戴黑色饰品等。'
    ]
    messages.value.push({
      role: 'assistant',
      content: replies[Math.floor(Math.random() * replies.length)],
      time: '刚刚'
    })
  }, 1000)
}
</script>

<template>
  <div class="h-[calc(100vh-64px)] flex flex-col">
    <!-- 聊天区域 -->
    <div class="flex-1 overflow-y-auto px-4 py-6">
      <UContainer class="max-w-3xl">
        <div class="space-y-6">
          <div
            v-for="(msg, i) in messages"
            :key="i"
            class="flex gap-3"
            :class="msg.role === 'user' ? 'flex-row-reverse' : ''"
          >
            <UAvatar
              :icon="msg.role === 'assistant' ? 'i-lucide-sparkles' : 'i-lucide-user'"
              :color="msg.role === 'assistant' ? 'primary' : 'neutral'"
              size="sm"
              class="shrink-0"
            />
            <div
              class="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
              :class="msg.role === 'user'
                ? 'bg-[var(--ui-primary)] text-[var(--ui-bg)] rounded-tr-sm'
                : 'bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)] rounded-tl-sm'"
            >
              {{ msg.content }}
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- 快捷提示 -->
    <div class="border-t border-[var(--ui-border)] bg-[var(--ui-bg)] px-4 py-3">
      <UContainer class="max-w-3xl">
        <div class="flex gap-2 flex-wrap mb-3">
          <UButton
            v-for="prompt in quickPrompts"
            :key="prompt.label"
            :label="prompt.label"
            :icon="prompt.icon"
            variant="outline"
            size="xs"
            class="rounded-full"
            color="neutral"
            @click="input = prompt.label"
          />
        </div>

        <!-- 输入框 -->
        <div class="flex gap-2">
          <UInput
            v-model="input"
            placeholder="输入你的问题……"
            class="flex-1"
            size="lg"
            @keyup.enter="sendMessage"
          />
          <UButton
            icon="i-lucide-send"
            color="primary"
            size="lg"
            square
            @click="sendMessage"
          />
        </div>
      </UContainer>
    </div>
  </div>
</template>
