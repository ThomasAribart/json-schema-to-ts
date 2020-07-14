export type DoesExtend<A, B> = A extends B ? true : false;

export type DoesBothExtend<A, B> = DoesExtend<A, B> extends true
  ? DoesExtend<B, A>
  : false;
