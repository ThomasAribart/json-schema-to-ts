/**
 * Recursively sets all type properties as readonly
 * @param TYPE Type
 * @returns Type
 */
export type DeepReadonly<TYPE> = TYPE extends Record<
  string | number | symbol,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>
  ? { readonly [KEY in keyof TYPE]: DeepReadonly<TYPE[KEY]> }
  : TYPE;
