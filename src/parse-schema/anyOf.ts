import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

export type AnyOfSchema = JSONSchema7 & { anyOf: JSONSchema7[] };

export type ParseAnyOfSchema<
  S extends AnyOfSchema,
  O extends ParseSchemaOptions,
> = M.$Union<RecurseOnAnyOfSchema<S["anyOf"], S, O>>;

type RecurseOnAnyOfSchema<
  S extends JSONSchema7[],
  P extends AnyOfSchema,
  O extends ParseSchemaOptions,
  R = never,
> = S extends [infer H, ...infer T]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends JSONSchema7
    ? T extends JSONSchema7[]
      ? RecurseOnAnyOfSchema<
          T,
          P,
          O,
          | R
          | M.$Intersect<
              ParseSchema<Omit<P, "anyOf">, O>,
              ParseSchema<MergeSubSchema<Omit<P, "anyOf">, H>, O>
            >
        >
      : never
    : never
  : R;
