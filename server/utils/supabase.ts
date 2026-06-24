// server/utils/supabase.ts
// 共享 Supabase 客户端（单例）
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null
let initialized = false

export function getSupabaseAdmin(): SupabaseClient | null {
  if (initialized) return client
  initialized = true

  const url = process.env.KV_SUPABASE_URL
  const key = process.env.KV_SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    console.warn('[supabase] 缺少 KV_SUPABASE_URL 或 KV_SUPABASE_SERVICE_ROLE_KEY')
    return null
  }

  try {
    client = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false }
    })
    return client
  } catch (err) {
    console.warn('[supabase] 客户端初始化失败:', err)
    return null
  }
}
