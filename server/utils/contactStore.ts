// server/utils/contactStore.ts
// 多后端共享存储：Supabase Postgres KV → Redis KV → 内存回退
import { getSupabaseAdmin } from './supabase'

// ============================================================
// 内存回退层（开发环境 / 所有 KV 不可用时）
// ============================================================
const localStore = new Map<string, any>()
const localList: string[] = []

// ============================================================
// 环境检测
// ============================================================
export function hasRedisKV() {
  return !!(process.env.KV_URL && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

export function hasSupabaseKV() {
  return !!(process.env.KV_SUPABASE_URL && process.env.KV_SUPABASE_SERVICE_ROLE_KEY)
}

/** 兼容旧 API：是否任一 KV 可用 */
export function hasKV() {
  return hasRedisKV() || hasSupabaseKV()
}

// ============================================================
// Supabase 客户端（使用共享单例）
// ============================================================
function getSupabase() {
  return getSupabaseAdmin()
}

// ============================================================
// Redis KV 客户端
// ============================================================
async function getRedisKV() {
  if (!hasRedisKV()) return null
  try {
    const { kv } = await import('@vercel/kv')
    await kv.ping()
    console.log('✅ [KV] 存储模式: Vercel Redis KV')
    return kv
  } catch {
    console.warn('⚠️ [KV] Vercel Redis KV 连接失败，将回退到其他存储')
    return null
  }
}

// ============================================================
// 公共 API
// ============================================================

export async function saveContact(id: string, data: any) {
  // 1️⃣ 优先 Supabase Postgres KV
  const supabase = getSupabase()
  if (supabase) {
    const { error } = await supabase.from('contacts').upsert({
      id,
      data,
      created_at: new Date().toISOString()
    })

    if (!error) {
      console.log('📬 [Supabase] 保存成功:', data.name || data.email)
      return
    }

    // 表不存在 (Postgres error code 42P01)
    if (error.code === '42P01' || error.message?.includes('does not exist')) {
      console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.warn('⚠️  Supabase contacts 表尚未创建！')
      console.warn('   请在 Supabase SQL Editor 中执行:')
      console.warn('')
      console.warn('   CREATE TABLE IF NOT EXISTS contacts (')
      console.warn('     id TEXT PRIMARY KEY,')
      console.warn('     data JSONB NOT NULL DEFAULT \'{}\',')
      console.warn('     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()')
      console.warn('   );')
      console.warn('')
      console.warn('   或调用 POST /api/setup-kv 自动创建。')
      console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    } else {
      console.warn('⚠️ [Supabase] 保存失败:', error.message)
    }
    // Supabase 失败 → 继续尝试下一个后端
  }

  // 2️⃣ 尝试 Redis KV
  const redisKV = await getRedisKV()
  if (redisKV) {
    await redisKV.set(id, data)
    await redisKV.lpush('contacts:list', id)
    console.log('📬 [Redis] 保存成功:', data.name || data.email)
    return
  }

  // 3️⃣ 内存回退
  localStore.set(id, data)
  localList.unshift(id)
  console.log('📬 [内存] 收到表单提交:', data.name || data.email)
}

export async function getContacts(limit = 50) {
  // 1️⃣ 优先 Supabase
  const supabase = getSupabase()
  if (supabase) {
    const { data, error } = await supabase
      .from('contacts')
      .select('id, data')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (!error && data) {
      console.log(`📋 [Supabase] 查询成功: ${data.length} 条记录`)
      return data.map(row => ({ id: row.id, ...(row.data as object) }))
    }

    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.warn('⚠️ [Supabase] contacts 表不存在，请调用 POST /api/setup-kv 创建')
      } else {
        console.warn('⚠️ [Supabase] 查询失败:', error.message)
      }
    }
  }

  // 2️⃣ 尝试 Redis KV
  const redisKV = await getRedisKV()
  if (redisKV) {
    const ids = await redisKV.lrange('contacts:list', 0, limit - 1)
    const contacts: any[] = []
    for (const id of ids) {
      const record = await redisKV.get(id)
      if (record) contacts.push({ id, ...(record as object) })
    }
    return contacts
  }

  // 3️⃣ 内存回退
  return localList.slice(0, limit).map(id => ({
    id,
    ...localStore.get(id)
  }))
}
