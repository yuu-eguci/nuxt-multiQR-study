import { describe, expect, it } from 'vitest'
import { resolveBaseURL } from '../shared/baseURL'

describe('resolveBaseURL', () => {
  it('ROUTER_BASE が空なら / を返します', () => {
    expect(resolveBaseURL('')).toBe('/')
    expect(resolveBaseURL(undefined)).toBe('/')
  })

  it('ROUTER_BASE があればそのまま返します', () => {
    expect(resolveBaseURL('/nuxt-multiQR-study/')).toBe('/nuxt-multiQR-study/')
  })
})
