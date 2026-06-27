// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxthub/core',
    '@nuxtjs/seo'
  ],

  hub: {
    db: 'sqlite',
    kv: true,
    blob: true
  },

  // ====== SEO 全局配置 (Day 8) ======
  site: {
    name: 'Zen Oracle',
    description: '融合八字命理、堪舆风水、奇门遁甲与脑神经科学，探索东方智慧与现代科学的交汇点。',
    url: 'https://zen-oracle.vercel.app',
    defaultLocale: 'zh-CN',
  },

  // OG Image: 使用静态图片，禁用动态渲染
  ogImage: {
    enabled: false,
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  // 环境变量声明
  // 命名规则：驼峰 apiKey ← 环境变量 NUXT_API_KEY
  runtimeConfig: {
    // 服务端专用（不会暴露给浏览器）
    resendApiKey: '', // NUXT_RESEND_API_KEY — Day 8 邮件通知
    lemonsqueezyApiKey: '', // NUXT_LEMONSQUEEZY_API_KEY — Day 9 Lemon Squeezy 支付
    lemonsqueezyWebhookSecret: '', // NUXT_LEMONSQUEEZY_WEBHOOK_SECRET — Day 9 Webhook 签名验证

    // 客户端也能用（须 NUXT_PUBLIC_ 前缀）
    public: {
      siteName: 'Zen Oracle',
      appUrl: 'http://localhost:3000',
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
