// POST /api/setup-kv — 一键创建 Supabase contacts 表
import { Pool } from 'pg'

export default defineEventHandler(async () => {
  const pgUrl = process.env.KV_POSTGRES_URL
  const supabaseUrl = process.env.KV_SUPABASE_URL

  if (!pgUrl && !supabaseUrl) {
    return {
      success: false,
      mode: 'none',
      message: '未检测到 KV_POSTGRES_URL 或 KV_SUPABASE_URL 环境变量'
    }
  }

  // 1️⃣ 先通过 Supabase REST API 检查表是否已存在
  const key = process.env.KV_SUPABASE_SERVICE_ROLE_KEY
  if (supabaseUrl && key) {
    try {
      await $fetch(`${supabaseUrl}/rest/v1/contacts?select=id&limit=0`, {
        headers: {
          Authorization: `Bearer ${key}`,
          apikey: key
        }
      })
      return {
        success: true,
        mode: 'supabase',
        message: '✅ contacts 表已存在，无需创建',
        status: 'ready'
      }
    } catch {
      // 表不存在 → 继续
    }
  }

  // 2️⃣ 使用 PostgreSQL 直连创建表
  if (!pgUrl) {
    return {
      success: false,
      mode: 'supabase',
      message: '缺少 KV_POSTGRES_URL，无法自动建表',
      status: 'no_pg_url',
      sql: getCreateTableSQL()
    }
  }

  const pool = new Pool({
    connectionString: pgUrl,
    ssl: { rejectUnauthorized: false },
    max: 1
  })

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_contacts_created_at
        ON contacts (created_at DESC)
    `)

    return {
      success: true,
      mode: 'supabase',
      message: '✅ contacts 表已通过 PostgreSQL 直连创建成功！',
      status: 'created'
    }
  } catch (pgError: any) {
    return {
      success: false,
      mode: 'supabase',
      message: '⚠️ 建表失败，请手动在 Supabase SQL Editor 中执行',
      status: 'pg_error',
      sql: getCreateTableSQL(),
      supabaseUrl: supabaseUrl,
      error: pgError.message || String(pgError)
    }
  } finally {
    await pool.end()
  }
})

function getCreateTableSQL() {
  return `-- 请在 Supabase SQL Editor (https://ozmlnfaxvwcckvofdryh.supabase.co) 中执行：
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at
  ON contacts (created_at DESC);`
}
