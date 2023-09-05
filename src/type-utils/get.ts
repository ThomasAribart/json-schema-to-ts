/**
 * Returns the (recursively) nested value of an object for a given path. Returns `DEFAULT` if no value is found.
 * @param OBJECT Object
 * @param PATH string[]
 * @param DEFAULT Type
 * @returns Type
 */
export type DeepGet<
  OBJECT,
  PATH extends string[],
  DEFAULT = undefined,
> = PATH extends [infer PATH_HEAD, ...infer PATH_TAIL]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    PATH_HEAD extends string
    ? PATH_TAIL extends string[]
      ? PATH_HEAD extends keyof OBJECT
        ? DeepGet<OBJECT[PATH_HEAD], PATH_TAIL, DEFAULT>
        : DEFAULT
      : never
    : never
  : OBJECT;
