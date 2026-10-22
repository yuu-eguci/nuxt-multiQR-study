import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'
import { copyOpenCv } from '../scripts/copy-opencv.mjs'

const require = createRequire(import.meta.url)

describe('copyOpenCv', () => {
  it('@techstark/opencv-js の opencv.js を static/opencv/ へコピーします', () => {
    const staticDir = mkdtempSync(join(tmpdir(), 'nuxt-multiqr-static-'))
    const copied = copyOpenCv(staticDir)
    expect(copied).toBe(join(staticDir, 'opencv', 'opencv.js'))
    expect(readFileSync(copied).equals(readFileSync(require.resolve('@techstark/opencv-js')))).toBe(true)
  })
})

describe('/qr-reader の OpenCV.js', () => {
  it('同じオリジンの static/opencv/opencv.js を読み込みます', () => {
    const page = readFileSync('pages/qr-reader/index.vue', 'utf8')
    expect(page).toContain('src: `${process.env.ROUTER_BASE}opencv/opencv.js`')
    expect(page).not.toContain('https://docs.opencv.org/')
  })
})
