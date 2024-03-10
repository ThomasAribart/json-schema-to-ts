import type { M } from "ts-algebra";

import type { JSONSchema } from "~/definitions";

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
export type OneOfSchema = JSONSchema &
  Readonly<{ oneOf: readonly JSONSchema[] }>;

/**
 * Recursively parses an exclusive JSON schema union to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param ONE_OF_SCHEMA JSONSchema (exclusive schema union)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseOneOfSchema<
  ONE_OF_SCHEMA extends OneOfSchema,
  OPTIONS extends ParseSchemaOptions,
> = M.$Union<
  RecurseOnOneOfSchema<ONE_OF_SCHEMA["oneOf"], ONE_OF_SCHEMA, OPTIONS>
>;

/**
 * Recursively parses a tuple of JSON schemas to the union of its parsed meta-types (merged with root schema).
 * @param SUB_SCHEMAS JSONSchema[]
 * @param ROOT_ONE_OF_SCHEMA Root JSONSchema (exclusive schema union)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
type RecurseOnOneOfSchema<
  SUB_SCHEMAS extends readonly JSONSchema[],
  ROOT_ONE_OF_SCHEMA extends OneOfSchema,
  OPTIONS extends ParseSchemaOptions,
  RESULT = never,
> = SUB_SCHEMAS extends readonly [
  infer SUB_SCHEMAS_HEAD,
  ...infer SUB_SCHEMAS_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    SUB_SCHEMAS_HEAD extends JSONSchema
    ? SUB_SCHEMAS_TAIL extends readonly JSONSchema[]
      ? RecurseOnOneOfSchema<
          SUB_SCHEMAS_TAIL,
          ROOT_ONE_OF_SCHEMA,
          OPTIONS,
          | RESULT
          | M.$Intersect<
              ParseSchema<Omit<ROOT_ONE_OF_SCHEMA, "oneOf">, OPTIONS>,
              ParseSchema<
                MergeSubSchema<
                  Omit<ROOT_ONE_OF_SCHEMA, "oneOf">,
                  SUB_SCHEMAS_HEAD
                >,
                OPTIONS
              >
            >
        >
      : never
    : never
  : RESULT;
