<template>
  <UNavigationMenu
    :items="[{
      label: '首页',
      to: '/',
      icon: 'i-lucide-home'
    }, {
      label: '定价',
      to: '/pricing',
      icon: 'i-lucide-tag'
    }, {
      label: '博客',
      to: '/blog',
      icon: 'i-lucide-pen'
    }, {
      label: '文档',
      to: '/docs',
      icon: 'i-lucide-book-open'
    }, {
      label: '聊天',
      to: '/chat',
      icon: 'i-lucide-messages-square'
    }, {
      label: '联系',
      to: '/contact',
      icon: 'i-lucide-mail'
    }, {
      label: '演练场',
      to: '/playground',
      icon: 'i-lucide-flask-conical'
    }, {
      label: '关于',
      to: '/about',
      icon: 'i-lucide-info'
    }]"
    variant="link"
    size="sm"
    class="hidden md:flex"
  />

  <!-- Mobile menu -->
  <UDropdownMenu
    v-slot="{ open }"
    :modal="false"
    :items="[{
      label: '首页',
      to: '/',
      icon: 'i-lucide-home'
    }, {
      label: '定价方案',
      to: '/pricing',
      icon: 'i-lucide-tag'
    }, {
      label: '博客文章',
      to: '/blog',
      icon: 'i-lucide-pen'
    }, {
      label: '知识文档',
      to: '/docs',
      icon: 'i-lucide-book-open'
    }, {
      label: 'AI 玄学助手',
      to: '/chat',
      icon: 'i-lucide-messages-square'
    }, {
      label: '联系我们',
      to: '/contact',
      icon: 'i-lucide-mail'
    }, {
      label: '组件演练场',
      to: '/playground',
      icon: 'i-lucide-flask-conical'
    }, {
      label: '更新日志',
      to: '/changelog',
      icon: 'i-lucide-clock'
    }, {
      label: '关于我们',
      to: '/about',
      icon: 'i-lucide-info'
    }]"
    :content="{ align: 'start' }"
    size="xs"
    class="md:hidden"
  >
    <UButton
      label="菜单"
      variant="subtle"
      trailing-icon="i-lucide-menu"
      size="xs"
      class="rounded-full"
      :class="[open && 'bg-primary/15']"
    />
  </UDropdownMenu>
</template>
