/**
 * Return `true` if `A` and `B` extend `true`, `false` otherwise
 * @param A Type
 * @param B Type
 * @returns Boolean
 */
export type And<CONDITION_A, CONDITION_B> = CONDITION_A extends true
  ? CONDITION_B extends true
    ? true
    : false
  : false;
