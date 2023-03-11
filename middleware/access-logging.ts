import { Middleware } from '@nuxt/types'

const myMiddleware: Middleware = (context): void => {
  context.app.$debug(JSON.stringify({
    hereIs: 'middleware/access-logging',
    fullPathIs: context.route.fullPath
  }))
}

export default myMiddleware
