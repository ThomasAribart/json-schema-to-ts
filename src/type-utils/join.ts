export type Join<S extends string[], D extends string = ","> = S extends []
  ? ""
  : S extends [string]
  ? `${S[0]}`
  : S extends [string, ...infer T]
  ? T extends string[]
    ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
      `${S[0]}${D}${Join<T, D>}`
    : never
  : string;
