/**
 * Returns `true` if type `A` extends type `B`, `false` if not
 *
 * @param A Type
 * @param B Type
 * @return Boolean
 */
export type DoesExtend<A, B> = A extends B ? true : false;

type ArrayKeys = keyof [];

/**
 * Returns `true` if type is object, `false` if not (excludes arrays)
 *
 * @param T Type
 * @return Boolean
 */
export type IsObject<T> = T extends object
  ? ArrayKeys extends Extract<keyof T, ArrayKeys>
    ? false
    : true
  : false;

/**
 * Returns `true` if type is array, `false` if not (excludes objects)
 *
 * @param T Type
 * @return Boolean
 */
export type IsArray<T> = T extends object
  ? ArrayKeys extends Extract<keyof T, ArrayKeys>
    ? true
    : false
  : false;
