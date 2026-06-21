<!-- app/pages/login.vue — 登录页面 -->
<script setup lang="ts">
const { user, login, loading } = useAuth()
const toast = useToast()
const router = useRouter()

const email = ref('')

// 已登录则跳转仪表盘
if (user.value) {
  await navigateTo('/dashboard')
}

async function handleEmailLogin() {
  if (!email.value) return
  try {
    await login(email.value)
    toast.add({ title: '登录成功 🙏', color: 'success', icon: 'i-lucide-check-circle' })
    router.push('/dashboard')
  } catch (error: any) {
    toast.add({
      title: '登录失败',
      description: error?.data?.message || '请重试',
      color: 'error'
    })
  }
}

async function handleGitHubLogin() {
  // GitHub OAuth 配置后启用：
  // await navigateTo('/api/auth/signin/github', { external: true })
  toast.add({
    title: 'GitHub 登录',
    description: 'GitHub OAuth 需要在 Vercel 部署后配置，本地开发请使用邮箱登录',
    color: 'info',
    duration: 6000
  })
}
</script>

<template>
  <UContainer class="py-16 max-w-sm">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold">登录 Zen Oracle</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-2">
        选择一种方式登录你的账户
      </p>
    </div>

    <UCard>
      <div class="space-y-4">
        <!-- 邮箱登录（开发模式：无密码） -->
        <div class="space-y-3">
          <UInput
            v-model="email"
            placeholder="your@email.com"
            icon="i-lucide-mail"
            size="lg"
            :disabled="loading"
            @keydown.enter="handleEmailLogin"
          />
          <UButton
            label="邮箱登录"
            color="primary"
            block
            size="lg"
            :loading="loading"
            :disabled="!email"
            @click="handleEmailLogin"
          />
          <p class="text-xs text-gray-400 text-center">
            开发模式：输入邮箱即可登录，无需密码
          </p>
        </div>

        <!-- 分割线 -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white dark:bg-gray-950 px-2 text-gray-500">
              或
            </span>
          </div>
        </div>

        <!-- GitHub 登录 -->
        <UButton
          label="使用 GitHub 登录"
          icon="i-lucide-github"
          color="neutral"
          variant="outline"
          block
          size="lg"
          @click="handleGitHubLogin"
        />
      </div>

      <template #footer>
        <p class="text-sm text-gray-500 text-center">
          还没有账户？
          <NuxtLink to="/register" class="text-[var(--ui-primary)] hover:underline">
            注册
          </NuxtLink>
        </p>
      </template>
    </UCard>
  </UContainer>
</template>
