<!-- app/pages/dashboard.vue — 登录保护仪表盘 -->
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
const toast = useToast()

// ========== 项目列表 ==========
const { data: projectList, refresh: refreshProjects } = await useFetch('/api/projects')

// ========== 新建项目 ==========
const showNewModal = ref(false)
const newProjectName = ref('')
const newProjectDesc = ref('')

async function createProject() {
  if (!newProjectName.value) return

  try {
    await $fetch('/api/projects', {
      method: 'POST',
      body: {
        name: newProjectName.value,
        description: newProjectDesc.value
      }
    })

    toast.add({ title: '项目创建成功', color: 'success', icon: 'i-lucide-check-circle' })
    showNewModal.value = false
    newProjectName.value = ''
    newProjectDesc.value = ''
    refreshProjects()
  } catch (error: any) {
    toast.add({
      title: '创建失败',
      description: error?.data?.message || '请重试',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  }
}

// ========== 格式化日期 ==========
function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UContainer class="py-8">
    <!-- 页面头部 -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold">仪表盘</h1>
        <p class="text-gray-500 dark:text-gray-400">
          欢迎回来，{{ user?.name }}
        </p>
      </div>
      <UButton
        label="新建项目"
        icon="i-lucide-plus"
        color="primary"
        @click="showNewModal = true"
      />
    </div>

    <!-- 项目统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <UCard>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-[var(--ui-primary)]/10 rounded-lg">
            <UIcon name="i-lucide-folder" class="text-[var(--ui-primary)] w-5 h-5" />
          </div>
          <div>
            <p class="text-2xl font-bold">{{ projectList?.length || 0 }}</p>
            <p class="text-sm text-gray-500">项目总数</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <UIcon name="i-lucide-check-circle" class="text-green-600 w-5 h-5" />
          </div>
          <div>
            <p class="text-2xl font-bold">
              {{ projectList?.filter((p: any) => p.status === 'active').length || 0 }}
            </p>
            <p class="text-sm text-gray-500">活跃项目</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-3">
          <div class="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <UIcon name="i-lucide-calendar" class="text-purple-600 w-5 h-5" />
          </div>
          <div>
            <p class="text-2xl font-bold">
              {{ new Date().toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }) }}
            </p>
            <p class="text-sm text-gray-500">今天</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- 项目列表 -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">我的项目</h2>
      </template>

      <div v-if="projectList?.length" class="space-y-3">
        <div
          v-for="project in projectList"
          :key="project.id"
          class="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div>
            <h3 class="font-medium">{{ project.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ project.description || '暂无描述' }}
            </p>
          </div>
          <div class="flex items-center gap-3">
            <UBadge
              :label="project.status === 'active' ? '活跃' : '已归档'"
              :color="project.status === 'active' ? 'success' : 'neutral'"
              size="sm"
            />
            <span class="text-xs text-gray-400">
              {{ formatDate(project.updatedAt) }}
            </span>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        <UIcon name="i-lucide-folder-open" class="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>还没有项目</p>
        <p class="text-sm">点击右上角「新建项目」开始</p>
      </div>
    </UCard>

    <!-- 新建项目弹窗 -->
    <UModal v-model:open="showNewModal" title="新建项目">
      <template #body>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">项目名称 *</label>
            <UInput
              v-model="newProjectName"
              placeholder="例如：官网改版"
              @keydown.enter="createProject"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">项目描述</label>
            <UTextarea
              v-model="newProjectDesc"
              placeholder="简单描述这个项目（选填）"
              :rows="3"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <UButton label="取消" variant="ghost" color="neutral" @click="showNewModal = false" />
        <UButton
          label="创建"
          color="primary"
          :disabled="!newProjectName"
          @click="createProject"
        />
      </template>
    </UModal>
  </UContainer>
</template>
