import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

export type OneOfSchema = JSONSchema7 & { oneOf: JSONSchema7[] };

export type ParseOneOfSchema<
  P extends OneOfSchema,
  O extends ParseSchemaOptions,
> = M.$Union<RecurseOnOneOfSchema<P["oneOf"], P, O>>;

type RecurseOnOneOfSchema<
  S extends JSONSchema7[],
  P extends OneOfSchema,
  O extends ParseSchemaOptions,
  R = never,
> = S extends [infer H, ...infer T]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends JSONSchema7
    ? T extends JSONSchema7[]
      ? RecurseOnOneOfSchema<
          T,
          P,
          O,
          | R
          | M.$Intersect<
              ParseSchema<Omit<P, "oneOf">, O>,
              ParseSchema<MergeSubSchema<Omit<P, "oneOf">, H>, O>
            >
        >
      : never
    : never
  : R;
