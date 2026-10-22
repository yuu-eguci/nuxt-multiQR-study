import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// 2026-10-21 の Node.js セキュリティリリースで修正された 24.x の版です。
// https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
const PATCHED_NODE_24 = '24.22.1'

const read = (path: string): string => readFileSync(path, 'utf8')
const packageJson = JSON.parse(read('package.json'))

describe('Node.js のバージョン指定', () => {
  it('.node-version がパッチ済みの 24 LTS を指しています', () => {
    expect(read('.node-version').trim()).toBe(PATCHED_NODE_24)
  })

  it('package.json の engines と volta が .node-version と一致しています', () => {
    expect(packageJson.engines.node).toBe(`>=${PATCHED_NODE_24} <25`)
    expect(packageJson.volta.node).toBe(PATCHED_NODE_24)
  })

  it('Dockerfile のベースイメージが同じ Node.js を使います', () => {
    const froms = read('Dockerfile').match(/^FROM .+$/gm) ?? []
    expect(froms.length).toBeGreaterThan(0)
    for (const from of froms) {
      expect(from).toMatch(new RegExp(`^FROM node:${PATCHED_NODE_24.replace(/\./g, '\\.')}-`))
    }
  })

  it('GitHub Actions は .node-version から Node.js を決めます', () => {
    for (const workflow of ['ci.yml', 'cd-github-pages.yml']) {
      const yaml = read(`.github/workflows/${workflow}`)
      expect(yaml).toContain('node-version-file: .node-version')
      expect(yaml).not.toMatch(/node-version:\s*\d/)
    }
  })
})

describe('GitHub Pages への deploy', () => {
  it('push では実行されず、手動実行のみです', () => {
    const yaml = read('.github/workflows/cd-github-pages.yml')
    const on = yaml.split(/^on:\s*$/m)[1].split(/^\S/m)[0]
    expect(on).toMatch(/^\s+workflow_dispatch:/m)
    expect(on).not.toMatch(/^\s+push:/m)
  })
})

describe('package.json の scripts', () => {
  it('build / generate は .env.local_ を読み込みます', () => {
    expect(packageJson.scripts.build).toBe('ENV=local_ nuxt build')
    expect(packageJson.scripts.generate).toBe('ENV=local_ nuxt generate')
    expect(packageJson.scripts.start).toBe('ENV=local_ nuxt start')
  })
})
