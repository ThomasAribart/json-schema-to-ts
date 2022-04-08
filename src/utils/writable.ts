/**
 * Recursively sets all type properties as writable (non-readonly)
 *
 * @param T Type
 * @return Type
 */
export type Writable<T> = { -readonly [P in keyof T]: Writable<T[P]> };
