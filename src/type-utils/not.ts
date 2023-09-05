/**
 * Return `true` if `BOOL` extends `false`, `false` if `BOOL` extends `true`, `never` otherwise
 * @param BOOL Boolean
 * @returns Boolean
 */
export type Not<BOOL> = BOOL extends false
  ? true
  : BOOL extends true
  ? false
  : never;
