/**
 * Returns `true` if type `A` extends type `B`, `false` if not
 *
 * @param A Type
 * @param B Type
 * @return Boolean
 */
export type DoesExtend<TYPE_A, TYPE_B> = [TYPE_A] extends [TYPE_B]
  ? true
  : false;
