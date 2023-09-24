import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

/**
 * JSON schemas of exclusive JSON schema unions
 * @example
 * const exclusiveUnionSchema = {
 *  oneOf: [
 *    { type: "number" },
 *    { enum: [1, 2, "foo"] } // => 1 & 2 are not valid
 *  ]
 * }
 */
export type OneOfSchema = JSONSchema7 & { oneOf: JSONSchema7[] };

export type ParseOneOfSchema<
  SCHEMA extends OneOfSchema,
  OPTIONS extends ParseSchemaOptions,
> = M.$Union<RecurseOnOneOfSchema<SCHEMA["oneOf"], SCHEMA, OPTIONS>>;

type RecurseOnOneOfSchema<
  SUB_SCHEMAS extends JSONSchema7[],
  ROOT_SCHEMA extends OneOfSchema,
  OPTIONS extends ParseSchemaOptions,
  RESULT = never,
> = SUB_SCHEMAS extends [infer SUB_SCHEMAS_HEAD, ...infer SUB_SCHEMAS_TAIL]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    SUB_SCHEMAS_HEAD extends JSONSchema7
    ? SUB_SCHEMAS_TAIL extends JSONSchema7[]
      ? RecurseOnOneOfSchema<
          SUB_SCHEMAS_TAIL,
          ROOT_SCHEMA,
          OPTIONS,
          | RESULT
          | M.$Intersect<
              ParseSchema<Omit<ROOT_SCHEMA, "oneOf">, OPTIONS>,
              ParseSchema<
                MergeSubSchema<Omit<ROOT_SCHEMA, "oneOf">, SUB_SCHEMAS_HEAD>,
                OPTIONS
              >
            >
        >
      : never
    : never
  : RESULT;
