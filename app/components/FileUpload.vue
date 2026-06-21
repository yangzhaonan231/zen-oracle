<!-- app/components/FileUpload.vue — 文件上传组件 -->
<script setup lang="ts">
const toast = useToast()
const uploading = ref(false)
const uploadedUrl = ref('')
const uploadedName = ref('')

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploading.value = true

  const formData = new FormData()
  formData.append('file', file)

  try {
    const result = await $fetch<{
      success: boolean
      url: string
      filename: string
      size: number
    }>('/api/upload', {
      method: 'POST',
      body: formData
    })
    uploadedUrl.value = result.url
    uploadedName.value = result.filename
    toast.add({ title: '上传成功', color: 'success', icon: 'i-lucide-check-circle' })
  } catch (error: any) {
    toast.add({
      title: '上传失败',
      description: error?.data?.message || '请重试',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    uploading.value = false
    // 重置 input 以允许重复上传同一文件
    target.value = ''
  }
}
</script>

<template>
  <div>
    <label class="block mb-3">
      <span class="text-sm font-medium">上传文件</span>
      <input
        type="file"
        class="mt-1 block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:text-sm file:font-medium
               file:bg-[var(--ui-primary)]/10 file:text-[var(--ui-primary)]
               hover:file:bg-[var(--ui-primary)]/20
               cursor-pointer"
        @change="handleFileChange"
        :disabled="uploading"
      />
    </label>

    <div v-if="uploading" class="flex items-center gap-2 text-sm text-gray-500">
      <UIcon name="i-lucide-loader" class="animate-spin w-4 h-4" />
      上传中...
    </div>

    <div v-if="uploadedUrl" class="text-sm">
      <span class="text-green-500">✓ 上传成功</span>
      <span class="text-gray-500 ml-2">{{ uploadedName }}</span>
      <a
        :href="uploadedUrl"
        target="_blank"
        class="text-[var(--ui-primary)] ml-2 underline"
      >
        查看文件
      </a>
    </div>
  </div>
</template>
