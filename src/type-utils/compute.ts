export type Compute<A> = A extends Promise<infer T>
  ? Promise<Compute<T>>
  : A extends (...args: infer P) => infer R
  ? (...args: Compute<P>) => Compute<R>
  : A extends Set<infer V>
  ? Set<Compute<V>>
  : A extends object
  ? { [key in keyof A]: Compute<A[key]> }
  : A;
