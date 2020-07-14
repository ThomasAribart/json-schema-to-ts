export type Writeable<A> = A extends object
  ? { -readonly [K in keyof A]: Writeable<A[K]> }
  : A;
