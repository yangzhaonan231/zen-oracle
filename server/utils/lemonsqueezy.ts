// server/utils/lemonsqueezy.ts
// Lemon Squeezy SDK 初始化 (Day 9)
import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'

let initialized = false

/** 初始化 Lemon Squeezy SDK（全局一次性配置） */
export function initLemonSqueezy() {
  if (initialized) return

  const config = useRuntimeConfig()
  const apiKey = config.lemonsqueezyApiKey

  if (!apiKey) {
    console.warn('[LemonSqueezy] 未配置 NUXT_LEMONSQUEEZY_API_KEY')
    return
  }

  lemonSqueezySetup({
    apiKey,
    onError(error) {
      console.error('[LemonSqueezy] SDK 错误:', error.message)
    }
  })

  initialized = true
  console.log('[LemonSqueezy] SDK 已初始化')
}
