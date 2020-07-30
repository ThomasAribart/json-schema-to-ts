/**
 * Returns `true` if type `A` extends type `B`, `false` if not
 *
 * Args:
 * - `A`: Type `A`
 * - `B`: Type `B`
 */
export type DoesExtend<A, B> = A extends B ? true : false;

/**
 * Returns `true` if both types extend each other, `false` if not
 *
 * Args:
 * - `A`: Type `A`
 * - `B`: Type `B`
 */
export type DoesBothExtend<A, B> = DoesExtend<A, B> extends true
  ? DoesExtend<B, A>
  : false;
