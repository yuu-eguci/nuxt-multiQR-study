// export function 形式で utils を定義するサンプル。

export function foo (): Date {
  return new Date()
}

export function bar (): string {
  return 'BAR'
}

// インスタンスを与えると、それが含むメソッドの一覧を返します。
export function getMethods (obj: object): string[] {
  const getOwnMethods = (obj: object) =>
    Object.entries(Object.getOwnPropertyDescriptors(obj))
      .filter(([name, {value}]) => typeof value === 'function' && name !== 'constructor')
      .map(([name]) => name)
  const _getMethods = (o: object, methods: string[]): string[] =>
    o === Object.prototype ? methods : _getMethods(Object.getPrototypeOf(o), methods.concat(getOwnMethods(o)))
  return _getMethods(obj, [])
}
