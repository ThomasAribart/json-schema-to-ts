/**
 * Recursively sets all type properties as readonly
 *
 * @param T Type
 * @return Type
 */
export type DeepReadonly<T> = T extends Record<
  string | number | symbol,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;
