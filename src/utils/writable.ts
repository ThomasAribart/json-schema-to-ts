/**
 * Recursively sets all type properties as writable (non-readonly)
 *
 * @param T Type
 * @return Type
 */
export type DeepWritable<T> = { -readonly [P in keyof T]: DeepWritable<T[P]> };
