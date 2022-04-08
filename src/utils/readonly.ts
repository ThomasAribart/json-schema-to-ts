import { O } from "ts-toolbelt";

/**
 * Recursively sets all type properties as readonly
 *
 * @param T Type
 * @return Type
 */
export type Readonly<T> = T extends O.Object
  ? { readonly [P in keyof T]: Readonly<T[P]> }
  : T;
