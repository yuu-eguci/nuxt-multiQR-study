// @techstark/opencv-js の opencv.js を public/opencv/ へコピーします。
// docs.opencv.org の opencv.js は別オリジンからの読み込みが拒否されるため、同じオリジンから配信します。
import { copyFileSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)

export function copyOpenCv (staticDir) {
  const dest = join(staticDir, 'opencv', 'opencv.js')
  mkdirSync(dirname(dest), { recursive: true })
  copyFileSync(require.resolve('@techstark/opencv-js'), dest)
  return dest
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  copyOpenCv(join(dirname(fileURLToPath(import.meta.url)), '..', 'public'))
}
