// server/utils/auth.ts
// 会话系统：Supabase（生产持久化）→ NuxtHub KV（本地/回退）
import { randomBytes } from 'node:crypto'
import { getSupabaseAdmin } from './supabase'

interface SessionUser {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

interface AuthSession {
  user: SessionUser
  expires: number
}

const SESSION_PREFIX = 'session:'
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000 // 7 天

let supabaseAvailable: boolean | null = null

/** 检测 Supabase sessions 表是否可用 */
async function checkSupabase(): Promise<boolean> {
  if (supabaseAvailable !== null) return supabaseAvailable

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    supabaseAvailable = false
    return false
  }

  try {
    // 试探性查询，检测表是否存在
    const { error } = await supabase.from('sessions').select('id').limit(1)
    if (error && error.code === '42P01') {
      console.warn('[auth] Supabase sessions 表不存在，使用 NuxtHub KV 回退')
      console.warn('[auth] 请在 Supabase SQL Editor 执行:')
      console.warn('  CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, user_data JSONB, expires_at BIGINT, created_at TIMESTAMPTZ DEFAULT NOW())')
      supabaseAvailable = false
      return false
    }
    supabaseAvailable = !error
    if (supabaseAvailable) {
      console.log('[auth] 存储后端: Supabase')
    }
    return supabaseAvailable
  } catch {
    supabaseAvailable = false
    return false
  }
}

/** 生成安全的 session token */
export function generateToken(): string {
  return randomBytes(32).toString('hex')
}

/** 创建会话 */
export async function createKVSession(user: SessionUser): Promise<string> {
  const token = generateToken()
  const session: AuthSession = { user, expires: Date.now() + SESSION_TTL }

  // 1️⃣ 优先 Supabase（Vercel 生产环境持久化）
  if (await checkSupabase()) {
    const supabase = getSupabaseAdmin()!
    const { error } = await supabase.from('sessions').upsert({
      id: token,
      user_data: user,
      expires_at: session.expires,
      created_at: new Date().toISOString()
    })
    if (!error) return token
    console.error('[auth] Supabase 写入失败:', error.message)
  }

  // 2️⃣ 回退到 NuxtHub KV（本地开发 / fs-lite）
  try {
    await kv.set(`${SESSION_PREFIX}${token}`, session)
    console.log('[auth] 存储后端: NuxtHub KV (回退)')
    return token
  } catch {
    console.warn('[auth] 所有存储后端不可用，返回临时 token（不持久化）')
    return token
  }
}

/** 获取会话 */
export async function getKVSession(token: string): Promise<AuthSession | null> {
  // 1️⃣ 优先 Supabase
  if (await checkSupabase()) {
    const supabase = getSupabaseAdmin()!
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('user_data, expires_at')
        .eq('id', token)
        .maybeSingle()

      if (!error && data) {
        if (Date.now() > data.expires_at) {
          await supabase.from('sessions').delete().eq('id', token)
          return null
        }
        return { user: data.user_data as SessionUser, expires: data.expires_at }
      }
    } catch { /* 回退到 KV */ }
  }

  // 2️⃣ 回退到 NuxtHub KV
  try {
    const session = await kv.get<AuthSession>(`${SESSION_PREFIX}${token}`)
    if (!session) return null
    if (Date.now() > session.expires) {
      await kv.del(`${SESSION_PREFIX}${token}`)
      return null
    }
    return session
  } catch {
    return null
  }
}

/** 销毁会话 */
export async function destroyKVSession(token: string): Promise<void> {
  if (await checkSupabase()) {
    const supabase = getSupabaseAdmin()!
    await supabase.from('sessions').delete().eq('id', token)
  }
  try {
    await kv.del(`${SESSION_PREFIX}${token}`)
  } catch { /* 忽略 */ }
}

/** 从 cookie 提取 token */
export function getAuthToken(event: any): string | null {
  const cookieHeader = event.headers?.get('cookie') || event.node?.req?.headers?.cookie || ''
  if (!cookieHeader) return null
  const match = cookieHeader.match(/(?:^|;\s*)session_token=([^;]+)/)
  return match ? match[1] : null
}

/** 获取当前用户会话 */
export async function getUserSession(event: any): Promise<{ user: SessionUser | null }> {
  const token = getAuthToken(event)
  if (!token) return { user: null }
  const session = await getKVSession(token)
  if (!session) return { user: null }
  return { user: session.user }
}
