/**
 * Remove an item out of a union
 * @param UNION Union
 * @returns Type
 */
export type Pop<ARRAY extends unknown[]> = ARRAY extends
  | readonly [...infer ARRAY_BODY, unknown]
  | readonly [...infer ARRAY_BODY, unknown?]
  ? ARRAY_BODY
  : ARRAY;
