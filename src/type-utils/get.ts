export type DeepGet<O, P extends string[], D = undefined> = P extends [
  infer H,
  ...infer T,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends string
    ? T extends string[]
      ? H extends keyof O
        ? DeepGet<O[H], T, D>
        : D
      : never
    : never
  : O;
