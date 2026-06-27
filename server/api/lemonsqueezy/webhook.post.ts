// server/api/lemonsqueezy/webhook.post.ts
// Day 9 — Lemon Squeezy Webhook：付款成功 → 自动记录订阅
import { createHmac, timingSafeEqual } from 'node:crypto'
import { initLemonSqueezy } from '../../utils/lemonsqueezy'
import { getSupabaseAdmin } from '../../utils/supabase'

/**
 * 验证 Lemon Squeezy Webhook 签名
 * Lemon Squeezy 使用 HMAC-SHA256，签名放在 X-Signature header 中
 */
function verifySignature(body: string, signature: string, secret: string): boolean {
  if (!signature || !secret) return false

  try {
    const hmac = createHmac('sha256', secret)
    const digest = hmac.update(body).digest('hex')

    // 使用 timing-safe 比较防止时序攻击
    const sigBuffer = Buffer.from(signature)
    const digestBuffer = Buffer.from(digest)

    if (sigBuffer.length !== digestBuffer.length) return false
    return timingSafeEqual(sigBuffer, digestBuffer)
  } catch {
    return false
  }
}

/** 根据 product/variant ID 映射套餐名 */
function getPlanName(eventName: string, productName: string): string {
  // 优先用产品名判断
  const name = (productName || '').toLowerCase()
  if (name.includes('进阶') || name.includes('advanced') || name.includes('pro')) return 'pro'
  if (name.includes('大师') || name.includes('master') || name.includes('enterprise')) return 'enterprise'
  return 'unknown'
}

export default defineEventHandler(async (event) => {
  // 1. 初始化 SDK
  initLemonSqueezy()

  // 2. 读取签名和请求体
  const signature = getHeader(event, 'x-signature') as string | undefined
  const body = await readRawBody(event)

  if (!signature || !body) {
    throw createError({ statusCode: 400, message: '缺少签名或请求体' })
  }

  // 3. 验证签名
  const config = useRuntimeConfig()
  const webhookSecret = config.lemonsqueezyWebhookSecret

  if (!webhookSecret) {
    console.error('[LemonSqueezy] 未配置 NUXT_LEMONSQUEEZY_WEBHOOK_SECRET')
    throw createError({ statusCode: 500, message: '服务器未配置 Webhook 密钥' })
  }

  if (!verifySignature(body, signature, webhookSecret)) {
    console.warn('[LemonSqueezy] 签名验证失败')
    throw createError({ statusCode: 401, message: '签名验证失败' })
  }

  // 4. 解析事件
  let payload: any
  try {
    payload = JSON.parse(body)
  } catch {
    throw createError({ statusCode: 400, message: '请求体 JSON 解析失败' })
  }

  const eventName = payload.meta?.event_name || ''
  const eventData = payload.data
  const attributes = eventData?.attributes || {}
  const userEmail = attributes.user_email || attributes.email || ''

  console.log(`[LemonSqueezy] 收到事件: ${eventName}，用户: ${userEmail}`)

  // 5. 处理订单创建事件（新订阅付款）
  if (eventName === 'order_created') {
    const productName = attributes.first_order_item?.product_name
      || attributes.product_name
      || ''

    const plan = getPlanName(eventName, productName)
    const orderId = eventData.id || ''
    const variantId = attributes.first_order_item?.variant_id || ''

    if (userEmail) {
      const supabase = getSupabaseAdmin()

      if (supabase) {
        const { error } = await supabase
          .from('subscriptions')
          .upsert({
            email: userEmail,
            lemonsqueezy_order_id: orderId,
            variant_id: variantId,
            plan,
            status: 'active',
            subscribed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'email'
          })

        if (error) {
          console.error('[LemonSqueezy] 保存订阅失败:', error.message)
        } else {
          console.log(`[LemonSqueezy] ✅ 订阅已保存: ${userEmail} → ${plan}`)
        }
      } else {
        console.warn('[LemonSqueezy] Supabase 不可用，订阅未持久化')
      }
    }
  }

  // 6. 处理订阅状态变更
  if (eventName === 'subscription_updated') {
    const status = attributes.status || ''

    if (userEmail) {
      const supabase = getSupabaseAdmin()

      if (supabase) {
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: mapStatus(status),
            updated_at: new Date().toISOString(),
          })
          .eq('email', userEmail)

        if (error) {
          console.error('[LemonSqueezy] 更新订阅状态失败:', error.message)
        } else {
          console.log(`[LemonSqueezy] 订阅状态更新: ${userEmail} → ${status}`)
        }
      }
    }
  }

  // 7. 处理订阅到期/取消
  if (eventName === 'subscription_expired' || eventName === 'subscription_cancelled') {
    if (userEmail) {
      const supabase = getSupabaseAdmin()

      if (supabase) {
        await supabase
          .from('subscriptions')
          .update({
            status: eventName === 'subscription_expired' ? 'expired' : 'cancelled',
            updated_at: new Date().toISOString(),
          })
          .eq('email', userEmail)

        console.log(`[LemonSqueezy] 订阅${eventName === 'subscription_expired' ? '到期' : '取消'}: ${userEmail}`)
      }
    }
  }

  return { received: true }
})

/** 将 Lemon Squeezy 状态映射到数据库状态 */
function mapStatus(lsStatus: string): string {
  const map: Record<string, string> = {
    active: 'active',
    on_trial: 'trialing',
    paused: 'paused',
    past_due: 'past_due',
    unpaid: 'unpaid',
    cancelled: 'cancelled',
    expired: 'expired',
  }
  return map[lsStatus] || lsStatus
}
