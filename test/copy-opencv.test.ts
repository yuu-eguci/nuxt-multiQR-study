import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'
import { copyOpenCv } from '../scripts/copy-opencv.mjs'

const require = createRequire(import.meta.url)

describe('copyOpenCv', () => {
  it('@techstark/opencv-js の opencv.js を public/opencv/ へコピーします', () => {
    const publicDir = mkdtempSync(join(tmpdir(), 'nuxt-multiqr-public-'))
    const copied = copyOpenCv(publicDir)
    expect(copied).toBe(join(publicDir, 'opencv', 'opencv.js'))
    expect(readFileSync(copied).equals(readFileSync(require.resolve('@techstark/opencv-js')))).toBe(true)
  })
})

describe('/qr-reader の OpenCV.js', () => {
  it('同じオリジンの baseURL 直下の opencv/opencv.js を読み込みます', () => {
    const page = readFileSync('app/pages/qr-reader/index.vue', 'utf8')
    expect(page).toContain('src: `${useRuntimeConfig().app.baseURL}opencv/opencv.js`')
    expect(page).not.toContain('https://docs.opencv.org/')
  })
})
