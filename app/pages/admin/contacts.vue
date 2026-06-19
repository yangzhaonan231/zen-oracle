<script setup lang="ts">
useSeoMeta({
  title: '表单提交记录 — Zen Oracle 后台',
  description: '查看联系表单提交记录'
})

const contacts = ref<any[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    contacts.value = await $fetch('/api/contacts')
  } catch (e: any) {
    error.value = e?.data?.message || '加载失败'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <UContainer class="py-16">
    <div class="flex items-center gap-3 mb-8">
      <UIcon name="i-lucide-database" size="28" class="text-[var(--ui-primary)]" />
      <h1 class="text-2xl font-bold">联系表单提交记录</h1>
      <UBadge :label="`${contacts.length} 条`" color="primary" variant="subtle" size="sm" />
    </div>

    <!-- 加载中 -->
    <div v-if="loading" class="text-center py-12 text-muted">
      <UIcon name="i-lucide-loader" class="animate-spin w-8 h-8 mx-auto mb-3" />
      加载中...
    </div>

    <!-- 错误 -->
    <div v-else-if="error" class="text-center py-12">
      <UIcon name="i-lucide-alert-circle" class="text-red-500 w-10 h-10 mx-auto mb-3" />
      <p class="text-red-500">{{ error }}</p>
    </div>

    <!-- 空状态 -->
    <div v-else-if="contacts.length === 0" class="text-center py-16">
      <UIcon name="i-lucide-inbox" size="48" class="text-muted mx-auto mb-4" />
      <p class="text-muted text-lg mb-2">暂无提交记录</p>
      <p class="text-sm text-muted mb-4">
          去 /contact 提交一条表单，然后回到这里查看记录。
      </p>
      <UButton label="去提交表单" color="primary" to="/contact" />
    </div>

    <!-- 记录列表 -->
    <div v-else class="space-y-4 max-w-3xl">
      <UCard v-for="contact in contacts" :key="contact.id">
        <div class="flex justify-between items-start mb-2 flex-wrap gap-2">
          <div>
            <h3 class="font-semibold">{{ contact.name }}</h3>
            <p class="text-sm text-muted">{{ contact.email }}</p>
          </div>
          <UBadge
            :label="contact.topic || '未选择'"
            :color="contact.topic ? 'primary' : 'neutral'"
            variant="subtle"
            size="xs"
          />
        </div>
        <p class="text-sm text-muted mt-2 leading-relaxed">
          {{ contact.message }}
        </p>
        <p class="text-xs text-muted mt-3">
          {{ new Date(contact.createdAt).toLocaleString('zh-CN') }}
        </p>
      </UCard>
    </div>
  </UContainer>
</template>
