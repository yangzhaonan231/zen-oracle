<script setup lang="ts">
// ☐ 7. Props：父组件传数据给子组件
defineProps<{
  title: string
  description: string
  icon: string
  link?: string  // ? 表示可选
}>()
</script>

<!-- ============ 区域一：模板 (HTML 骨架) ============ -->
<template>
  <!-- ☐ 8. Slots：UCard 提供 #header / 默认 / #footer 三个插槽 -->
  <UCard>
    <template #header>
      <UIcon :name="icon" class="text-[var(--ui-primary)] w-10 h-10" />
      <h3 class="text-xl font-semibold mt-3">{{ title }}</h3>
    </template>

    <!-- 默认插槽：直接写在 UCard 里的内容 -->
    <p class="text-muted">{{ description }}</p>

    <template #footer>
      <!-- ☐ 5. v-if：link 有值显示"了解更多"，无值显示"即将推出" -->
      <UButton
        v-if="link"
        label="了解更多 →"
        color="primary"
        variant="link"
      />
      <UButton
        v-else
        label="即将推出"
        color="neutral"
        variant="link"
        disabled
      />
    </template>
  </UCard>
</template>

<!-- ============ 区域三：样式 (只作用于当前组件) ============ -->
<style scoped>
/* scoped 意味着这里的 CSS 不会污染其他组件 */
</style>
