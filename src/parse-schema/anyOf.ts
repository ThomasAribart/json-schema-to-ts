import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

/**
 * JSON schemas of JSON schema unions
 * @example
 * const unionSchema = {
 *  anyOf: [
 *    { type: "number" },
 *    { type: "string" }
 *  ]
 * }
 */
export type AnyOfSchema = JSONSchema7 &
  Readonly<{ anyOf: readonly JSONSchema7[] }>;

/**
 * Recursively parses a JSON schema union to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param ANY_OF_SCHEMA JSONSchema (schema union)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseAnyOfSchema<
  ANY_OF_SCHEMA extends AnyOfSchema,
  OPTIONS extends ParseSchemaOptions,
> = M.$Union<
  RecurseOnAnyOfSchema<ANY_OF_SCHEMA["anyOf"], ANY_OF_SCHEMA, OPTIONS>
>;

/**
 * Recursively parses a tuple of JSON schemas to the union of its parsed meta-types (merged with root schema).
 * @param SUB_SCHEMAS JSONSchema[]
 * @param ROOT_ANY_OF_SCHEMA Root JSONSchema (schema union)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
type RecurseOnAnyOfSchema<
  SUB_SCHEMAS extends readonly JSONSchema7[],
  ROOT_ANY_OF_SCHEMA extends AnyOfSchema,
  OPTIONS extends ParseSchemaOptions,
  RESULT = never,
> = SUB_SCHEMAS extends readonly [
  infer SUB_SCHEMAS_HEAD,
  ...infer SUB_SCHEMAS_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    SUB_SCHEMAS_HEAD extends JSONSchema7
    ? SUB_SCHEMAS_TAIL extends readonly JSONSchema7[]
      ? RecurseOnAnyOfSchema<
          SUB_SCHEMAS_TAIL,
          ROOT_ANY_OF_SCHEMA,
          OPTIONS,
          | RESULT
          | M.$Intersect<
              ParseSchema<Omit<ROOT_ANY_OF_SCHEMA, "anyOf">, OPTIONS>,
              ParseSchema<
                MergeSubSchema<
                  Omit<ROOT_ANY_OF_SCHEMA, "anyOf">,
                  SUB_SCHEMAS_HEAD
                >,
                OPTIONS
              >
            >
        >
      : never
    : never
  : RESULT;
