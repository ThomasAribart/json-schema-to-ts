/**
 * Returns `true` if type `A` extends type `B`, `false` if not
 *
 * @param A Type
 * @param B Type
 * @return Boolean
 */
export type DoesExtend<A, B> = [A] extends [B] ? true : false;
