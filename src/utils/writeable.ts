/**
 * Recursively remove the `readonly` directive from an object properties or tuple items
 *
 * @param O Object / Tuple
 * @return Object / Tuple
 */
export type WriteableRec<O> = O extends object
  ? { -readonly [K in keyof O]: WriteableRec<O[K]> }
  : O;
