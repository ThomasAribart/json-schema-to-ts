/**
 * Remove an item out of a array
 * @param ARRAY Array
 * @returns Type
 */
export type Pop<ARRAY extends unknown[]> = ARRAY extends
  | readonly [...infer ARRAY_BODY, unknown]
  | readonly [...infer ARRAY_BODY, unknown?]
  ? ARRAY_BODY
  : ARRAY;
