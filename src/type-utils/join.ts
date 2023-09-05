/**
 * Join a tuple of strings together
 * @param STRINGS String[]
 * @param SEPARATOR String
 * @returns String
 */
export type Join<
  STRINGS extends string[],
  SEPARATOR extends string = ",",
> = STRINGS extends []
  ? ""
  : STRINGS extends [string]
  ? `${STRINGS[0]}`
  : STRINGS extends [string, ...infer STRINGS_TAIL]
  ? STRINGS_TAIL extends string[]
    ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
      `${STRINGS[0]}${SEPARATOR}${Join<STRINGS_TAIL, SEPARATOR>}`
    : never
  : string;
