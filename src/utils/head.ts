/**
 * Returns the first element of a tuple `T`
 *
 * @param T Tuple
 * @return Type
 */
export type Head<T> = T extends any[] ? T[0] : never;
