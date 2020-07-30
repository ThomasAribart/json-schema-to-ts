/**
 * Remove the first element of a tuple
 *
 * Args:
 * - `Tuple`: Tuple
 */
export type Tail<T extends any[]> = ((...args: T) => void) extends (
  head: any,
  ...tail: infer R
) => void
  ? R
  : T;
