// NOTE: ファイル名に .global を付けると、全ページに適用される middleware になります。
export default defineNuxtRouteMiddleware((to) => {
  useNuxtApp().$debug(JSON.stringify({
    hereIs: 'middleware/access-logging',
    fullPathIs: to.fullPath
  }))
})
