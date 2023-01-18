import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

export type AllOfSchema = JSONSchema7 & { allOf: JSONSchema7[] };

export type ParseAllOfSchema<
  P extends AllOfSchema,
  O extends ParseSchemaOptions,
> = RecurseOnAllOfSchema<P["allOf"], P, O, ParseSchema<Omit<P, "allOf">, O>>;

type RecurseOnAllOfSchema<
  S extends JSONSchema7[],
  P extends AllOfSchema,
  O extends ParseSchemaOptions,
  R,
> = S extends [infer H, ...infer T]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends JSONSchema7
    ? T extends JSONSchema7[]
      ? RecurseOnAllOfSchema<
          T,
          P,
          O,
          M.$Intersect<ParseSchema<MergeSubSchema<Omit<P, "allOf">, H>, O>, R>
        >
      : never
    : never
  : R;
