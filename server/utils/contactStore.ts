// server/utils/contactStore.ts
// 共享存储：本地开发回退，生产环境使用 Vercel KV

import { kv } from '@vercel/kv'

// 模块级单例（同一进程内共享）
const localStore = new Map<string, any>()
const localList: string[] = []

export function hasKV() {
  return !!(process.env.KV_URL && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

export async function saveContact(id: string, data: any) {
  if (hasKV()) {
    await kv.set(id, data)
    await kv.lpush('contacts:list', id)
  } else {
    localStore.set(id, data)
    localList.unshift(id)
    console.log('📬 [本地存储] 收到表单提交：', data)
  }
}

export async function getContacts(limit = 50) {
  if (hasKV()) {
    const ids = await kv.lrange('contacts:list', 0, limit - 1)
    const contacts: any[] = []
    for (const id of ids) {
      const data = await kv.get(id)
      if (data) contacts.push({ id, ...(data as object) })
    }
    return contacts
  } else {
    // 本地开发：从内存返回
    return localList.slice(0, limit).map(id => ({
      id,
      ...localStore.get(id),
    }))
  }
}
