export type Narrow<A> = A extends Promise<infer T>
  ? Promise<Narrow<T>>
  : A extends (...args: infer P) => infer R
  ? (...args: Narrow<P>) => Narrow<R>
  : A extends []
  ? []
  : A extends object
  ? { [key in keyof A]: Narrow<A[key]> }
  : A extends string | number | boolean | bigint
  ? A
  : never;
