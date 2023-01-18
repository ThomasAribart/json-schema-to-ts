export type Tail<L extends unknown[]> = L extends readonly []
  ? L
  : L extends readonly [unknown?, ...infer T]
  ? T
  : L;
