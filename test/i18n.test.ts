import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const keys = (obj: object, prefix = ''): string[] =>
  Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`])

describe('i18n/locales', () => {
  it('ja と en は同じキーを持ちます', () => {
    const ja = JSON.parse(readFileSync('i18n/locales/ja.json', 'utf8'))
    const en = JSON.parse(readFileSync('i18n/locales/en.json', 'utf8'))
    expect(keys(en).sort()).toEqual(keys(ja).sort())
  })
})
