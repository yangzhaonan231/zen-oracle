// server/api/setup-sessions.post.ts
// 创建 sessions 表（仅在 Supabase 中执行一次即可）
import pg from 'pg'

export default defineEventHandler(async () => {
  const url = process.env.KV_POSTGRES_URL
  if (!url) {
    throw createError({ statusCode: 500, message: '未配置 KV_POSTGRES_URL 环境变量' })
  }

  const pool = new pg.Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false }
  })

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_data JSONB NOT NULL DEFAULT '{}',
        expires_at BIGINT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `)

    // 验证
    const { rows } = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_name = 'sessions'"
    )

    return {
      success: true,
      message: rows.length > 0
        ? 'sessions 表已就绪'
        : '表创建失败，请检查 Supabase 连接'
    }
  } catch (err: any) {
    throw createError({ statusCode: 500, message: err.message })
  } finally {
    await pool.end()
  }
})
