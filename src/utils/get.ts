/**
 * Returns the property of an object, `never` if property misses from object
 *
 * Args:
 * - `Object`: Object
 * - `Property`: Property name
 */
export type Get<O, P extends string> = P extends keyof O ? O[P] : never;
