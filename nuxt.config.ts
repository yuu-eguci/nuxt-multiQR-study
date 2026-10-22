import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { resolveBaseURL } from './shared/baseURL'

// .env.* は `nuxt dev --dotenv .env.local_` のように --dotenv で切り替えます。
export default defineNuxtConfig({
  compatibilityDate: '2026-10-22',

  // Disable server-side rendering: https://nuxt.com/docs/4.x/guide/concepts/rendering
  ssr: false,

  app: {
    // dotenv.
    baseURL: resolveBaseURL(process.env.ROUTER_BASE),
    head: {
      titleTemplate: '%s - nuxt-multiQR-study',
      title: 'nuxt-multiQR-study',
      htmlAttrs: {
        lang: 'ja'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${resolveBaseURL(process.env.ROUTER_BASE)}favicon.ico` }
      ]
    }
  },

  css: ['@mdi/font/css/materialdesignicons.css', 'vuetify/styles'],

  build: {
    transpile: ['vuetify']
  },

  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: [
      { code: 'ja', name: 'Japanese', language: 'ja-JP', file: 'ja.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' }
    ],
    defaultLocale: 'ja',
    strategy: 'no_prefix'
  },

  vite: {
    // https://vuetifyjs.com/en/getting-started/installation/#manual-steps
    plugins: [vuetify({ autoImport: true })],
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },

  typescript: {
    strict: true
  }
})
