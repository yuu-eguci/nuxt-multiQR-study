import { describe, expect, it } from 'vitest'
import { Baz, bar, foo, getMethods } from '../app/utils'

describe('utils', () => {
  it('foo は現在時刻の Date を返します', () => {
    expect(foo()).toBeInstanceOf(Date)
  })

  it('bar は BAR を返します', () => {
    expect(bar()).toBe('BAR')
  })

  it('Baz は height と width を持ちます', () => {
    expect(new Baz(1, 2)).toEqual({ height: 1, width: 2 })
  })

  it('getMethods はプロトタイプチェーン上のメソッド名を返し、 constructor を除きます', () => {
    class Parent {
      parentMethod (): void {}
    }
    class Child extends Parent {
      childMethod (): void {}
    }
    const methods = getMethods(new Child())
    expect(methods).toContain('childMethod')
    expect(methods).toContain('parentMethod')
    expect(methods).not.toContain('constructor')
  })
})
