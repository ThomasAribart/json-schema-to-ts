import type { O } from "ts-toolbelt";

/**
 * Recursively sets all type properties as readonly
 *
 * @param T Type
 * @return Type
 */
export type DeepReadonly<T> = T extends O.Object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;
