// NOTE: provide で返したものは、 nuxtApp.$debug と、コンポーネント内の this.$debug で使えます。
//       型も自動で付きます。 https://nuxt.com/docs/4.x/directory-structure/app/plugins#providing-helpers
export default defineNuxtPlugin(() => {
  return {
    provide: {
      // 開発環境でのみ console.log する関数です。
      debug: (...args: unknown[]): void => {
        if (import.meta.dev) {
          console.log(...args)
        }
      }
    }
  }
})
