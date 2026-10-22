// .env.* の ROUTER_BASE を Nuxt の app.baseURL に変換します。
export function resolveBaseURL (routerBase: string | undefined): string {
  return routerBase || '/'
}
