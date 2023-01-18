export type Reverse<L extends unknown[]> = L extends [infer H, ...infer T]
  ? [...Reverse<T>, H]
  : L;
