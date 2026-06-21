// app/composables/useAuth.ts
// 客户端认证 composable

interface AuthUser {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export function useAuth() {
  const user = useState<AuthUser | null>('auth:user', () => null)
  const loading = ref(false)
  const { data: session, refresh } = useFetch('/api/auth/session', {
    immediate: true,
    onResponse({ response }) {
      user.value = response._data?.user || null
    }
  })

  async function login(email: string) {
    loading.value = true
    try {
      const result = await $fetch<{ success: boolean; user: AuthUser }>('/api/auth/login', {
        method: 'POST',
        body: { email }
      })
      user.value = result.user
      return result
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
      user.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    session,
    loading,
    login,
    logout
  }
}
