import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

export type AnyOfSchema = JSONSchema7 & { anyOf: JSONSchema7[] };

export type ParseAnyOfSchema<
  SCHEMA extends AnyOfSchema,
  OPTIONS extends ParseSchemaOptions,
> = M.$Union<RecurseOnAnyOfSchema<SCHEMA["anyOf"], SCHEMA, OPTIONS>>;

type RecurseOnAnyOfSchema<
  SUB_SCHEMAS extends JSONSchema7[],
  ROOT_SCHEMA extends AnyOfSchema,
  OPTIONS extends ParseSchemaOptions,
  RESULT = never,
> = SUB_SCHEMAS extends [infer SUB_SCHEMAS_HEAD, ...infer SUB_SCHEMAS_TAIL]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    SUB_SCHEMAS_HEAD extends JSONSchema7
    ? SUB_SCHEMAS_TAIL extends JSONSchema7[]
      ? RecurseOnAnyOfSchema<
          SUB_SCHEMAS_TAIL,
          ROOT_SCHEMA,
          OPTIONS,
          | RESULT
          | M.$Intersect<
              ParseSchema<Omit<ROOT_SCHEMA, "anyOf">, OPTIONS>,
              ParseSchema<
                MergeSubSchema<Omit<ROOT_SCHEMA, "anyOf">, SUB_SCHEMAS_HEAD>,
                OPTIONS
              >
            >
        >
      : never
    : never
  : RESULT;
