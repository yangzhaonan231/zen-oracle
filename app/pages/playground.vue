<script setup lang="ts">
useSeoMeta({
  title: '组件演练场 — Zen Oracle',
  description: 'Nuxt UI 组件实战练习：UTabs 标签页、UTable 数据表格。'
})

// ============================================
// 动手4：UTabs 标签页 —— 月付 vs 年付
// ============================================
const activeTab = ref(0)

const tabItems = [
  { label: '月付', slot: 'monthly' },
  { label: '年付（省 20%）', slot: 'yearly' },
]

// ============================================
// 动手5：UTable 数据表格 —— 用户列表
// ============================================
const columns = [
  { key: 'name', header: '姓名' },
  { key: 'email', header: '邮箱' },
  { key: 'role', header: '角色' },
  { key: 'status', header: '状态' },
  { key: 'actions', header: '操作' },
]

const rows = ref([
  {
    name: '杨兆楠',
    email: 'yang@zen-oracle.com',
    role: '管理员',
    status: 'active',
    click: () => handleEdit('杨兆楠')
  },
  {
    name: '李玄清',
    email: 'li@zen-oracle.com',
    role: '命理师',
    status: 'active',
    click: () => handleEdit('李玄清')
  },
  {
    name: '王灵素',
    email: 'wang@zen-oracle.com',
    role: '心理咨询师',
    status: 'active',
    click: () => handleEdit('王灵素')
  },
  {
    name: '赵明远',
    email: 'zhao@zen-oracle.com',
    role: '风水顾问',
    status: 'inactive',
    click: () => handleEdit('赵明远')
  },
  {
    name: '刘云鹤',
    email: 'liu@zen-oracle.com',
    role: '访客',
    status: 'inactive',
    click: () => handleEdit('刘云鹤')
  },
])

const toast = useToast()

function handleEdit(name: string) {
  toast.add({
    title: `编辑用户：${name}`,
    description: '用户编辑功能将在后续版本中开放',
    color: 'info',
    icon: 'i-lucide-pencil',
    duration: 3000
  })
}
</script>

<template>
  <UContainer class="py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">组件演练场</h1>
      <p class="text-lg text-muted max-w-2xl mx-auto">
        这里集中展示了 Day 3 学到的 UTabs 标签页 和 UTable 数据表格。每个组件都是独立的「积木」，可以搬到任何页面。
      </p>
    </div>

    <!-- ===== 动手4：UTabs 定价标签页 ===== -->
    <section class="mb-16 max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <UIcon name="i-lucide-layout-dashboard" size="24" class="text-[var(--ui-primary)]" />
        动手4：UTabs 定价标签页
      </h2>
      <p class="text-sm text-muted mb-6">
        用 <code>v-model</code> 控制当前激活的标签，配合 <code>v-if</code> 切换不同内容。
      </p>

      <UCard>
        <template #header>
          <!-- UTabs 组件：点击切换 activeTab -->
          <UTabs v-model="activeTab" :items="tabItems" />
        </template>

        <!-- 月付方案 -->
        <div v-if="activeTab === 0" class="text-center py-8">
          <UIcon name="i-lucide-sun" size="48" class="text-[var(--ui-primary)] mx-auto mb-4" />
          <div class="text-5xl font-bold mb-2">¥99<span class="text-lg font-normal text-muted">/月</span></div>
          <p class="text-muted mb-4">灵活付费，随时取消</p>
          <ul class="text-sm space-y-2 text-left max-w-xs mx-auto">
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" size="16" class="text-green-500 shrink-0" />
              基础命理分析（10 次/月）
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" size="16" class="text-green-500 shrink-0" />
              AI 玄学助手无限对话
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" size="16" class="text-green-500 shrink-0" />
              文档站全部内容
            </li>
          </ul>
          <UButton label="选择月付" color="primary" size="lg" class="mt-6" />
        </div>

        <!-- 年付方案 -->
        <div v-else class="text-center py-8">
          <UIcon name="i-lucide-star" size="48" class="text-[var(--ui-primary)] mx-auto mb-4" />
          <div class="flex items-center justify-center gap-2 mb-2">
            <span class="text-2xl text-muted line-through">¥1,188</span>
            <span class="text-5xl font-bold">¥948<span class="text-lg font-normal text-muted">/年</span></span>
            <UBadge label="省 20%" color="primary" variant="subtle" size="xs" />
          </div>
          <p class="text-muted mb-4">折算每天仅 ¥2.6，比月付省 ¥240</p>
          <ul class="text-sm space-y-2 text-left max-w-xs mx-auto">
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" size="16" class="text-green-500 shrink-0" />
              无限次命理分析
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" size="16" class="text-green-500 shrink-0" />
              AI 玄学助手 + 优先响应
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" size="16" class="text-green-500 shrink-0" />
              专属命理师一对一咨询（2 次/月）
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" size="16" class="text-green-500 shrink-0" />
              奇门遁甲择吉（4 次/月）
            </li>
          </ul>
          <UButton label="选择年付（推荐）" color="primary" size="lg" class="mt-6" />
        </div>
      </UCard>
    </section>

    <!-- ===== 动手5：UTable 用户列表 ===== -->
    <section class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <UIcon name="i-lucide-table" size="24" class="text-[var(--ui-primary)]" />
        动手5：UTable 数据表格 + 自定义列 slot
      </h2>
      <p class="text-sm text-muted mb-6">
        表格是后台管理系统里使用频率最高的组件。<code>#列key-data</code> 命名规则可以自定义每一列的渲染内容。
      </p>

      <UCard>
        <UTable :columns="columns" :rows="rows">
          <!-- 自定义状态列：用 UBadge 渲染不同颜色 -->
          <template #status-data="{ row }">
            <UBadge
              :label="row.status === 'active' ? '活跃' : '禁用'"
              :color="row.status === 'active' ? 'success' : 'neutral'"
              variant="subtle"
              size="xs"
            />
          </template>

          <!-- 自定义操作列：放按钮 -->
          <template #actions-data="{ row }">
            <UButton
              label="编辑"
              variant="link"
              size="xs"
              @click="row.click"
            />
          </template>
        </UTable>
      </UCard>
    </section>
  </UContainer>
</template>

<style scoped>
/* playground 专属样式（暂无） */
</style>
