/**
 * Inserts an element at the start of a tuple
 *
 * Args:
 * - `Element`: Element to insert
 * - `Tuple`: Tuple
 */
export type Prepend<E, T extends any[]> = ((
  element: E,
  ...tail: T
) => void) extends (...tuple: infer R) => void
  ? R
  : never;
