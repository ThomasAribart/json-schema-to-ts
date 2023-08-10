export type Reverse<ARRAY extends unknown[]> = ARRAY extends [
  infer ARRAY_HEAD,
  ...infer ARRAY_TAIL,
]
  ? [...Reverse<ARRAY_TAIL>, ARRAY_HEAD]
  : ARRAY;
