// server/utils/auth.ts
// 基于 Nuxt Hub KV 的简易会话系统
import { randomBytes } from 'node:crypto'

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
const SESSION_TTL = 7 * 24 * 60 * 60 * 1000

/** 生成安全的 session token */
export function generateToken(): string {
  return randomBytes(32).toString('hex')
}

/** 创建会话并存储到 KV */
export async function createKVSession(user: SessionUser): Promise<string> {
  const token = generateToken()
  const session: AuthSession = { user, expires: Date.now() + SESSION_TTL }
  await kv.set(`${SESSION_PREFIX}${token}`, session)
  return token
}

/** 从 token 获取会话 */
export async function getKVSession(token: string): Promise<AuthSession | null> {
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
  await kv.del(`${SESSION_PREFIX}${token}`)
}

/** 从 cookie 提取 token */
export function getAuthToken(event: any): string | null {
  const cookieHeader = event.headers?.get('cookie') || event.node?.req?.headers?.cookie || ''
  if (!cookieHeader) return null
  const match = cookieHeader.match(/(?:^|;\s*)session_token=([^;]+)/)
  return match ? match[1] : null
}

/** 获取当前用户会话（API 路由用） — 对标教程 getUserSession(event) */
export async function getUserSession(event: any): Promise<{ user: SessionUser | null }> {
  const token = getAuthToken(event)
  if (!token) return { user: null }
  const session = await getKVSession(token)
  if (!session) return { user: null }
  return { user: session.user }
}
