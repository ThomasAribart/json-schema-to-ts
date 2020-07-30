/**
 * Recursively remove the `readonly` directive from an object properties
 *
 * Args:
 * - `Object`: Object
 */
export type Writeable<O> = O extends object
  ? { -readonly [K in keyof O]: Writeable<O[K]> }
  : O;
