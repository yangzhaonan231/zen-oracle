// server/utils/contactStore.ts
// 共享存储：本地开发回退，生产环境使用 Vercel KV

// 模块级单例（同一进程内共享）
const localStore = new Map<string, any>()
const localList: string[] = []

export function hasKV() {
  return !!(process.env.KV_URL && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

async function getKV() {
  if (hasKV()) {
    try {
      const { kv } = await import('@vercel/kv')
      // 测试连接
      await kv.ping()
      return kv
    } catch {
      console.warn('⚠️ Vercel KV 连接失败，回退到内存存储')
      return null
    }
  }
  return null
}

export async function saveContact(id: string, data: any) {
  const kvClient = await getKV()
  if (kvClient) {
    await kvClient.set(id, data)
    await kvClient.lpush('contacts:list', id)
  } else {
    localStore.set(id, data)
    localList.unshift(id)
    console.log('📬 [内存存储] 收到表单提交：', data)
  }
}

export async function getContacts(limit = 50) {
  const kvClient = await getKV()
  if (kvClient) {
    const ids = await kvClient.lrange('contacts:list', 0, limit - 1)
    const contacts: any[] = []
    for (const id of ids) {
      const data = await kvClient.get(id)
      if (data) contacts.push({ id, ...(data as object) })
    }
    return contacts
  } else {
    return localList.slice(0, limit).map(id => ({
      id,
      ...localStore.get(id),
    }))
  }
}
