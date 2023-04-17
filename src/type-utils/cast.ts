/**
 * Cast A to B
 *
 * @param A Type
 * @param B Type
 * @return B
 */
export type Cast<A, B> = A extends B ? A : never;
