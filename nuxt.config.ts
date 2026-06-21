// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxthub/core'
  ],

  hub: {
    db: 'sqlite',
    kv: true,
    blob: true
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  // 环境变量声明（动手2）
  // 命名规则：驼峰 apiKey ← 环境变量 NUXT_API_KEY
  runtimeConfig: {
    // 服务端专用（不会暴露给浏览器）
    // apiKey: '',
    // resendKey: '',

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
