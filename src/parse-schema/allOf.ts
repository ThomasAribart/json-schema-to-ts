import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

/**
 * JSON schemas of JSON schema intersections
 * @example
 * const intersectionSchema = {
 *  allOf: [
 *    { type: "number" },
 *    { enum: [1, 2, "foo"] }
 *  ]
 * }
 */
export type AllOfSchema = JSONSchema7 & { allOf: JSONSchema7[] };

/**
 * Recursively parses a JSON schema intersection to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param ALL_OF_SCHEMA JSONSchema (exclusive schema union)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseAllOfSchema<
  ALL_OF_SCHEMA extends AllOfSchema,
  OPTIONS extends ParseSchemaOptions,
> = RecurseOnAllOfSchema<
  ALL_OF_SCHEMA["allOf"],
  ALL_OF_SCHEMA,
  OPTIONS,
  ParseSchema<Omit<ALL_OF_SCHEMA, "allOf">, OPTIONS>
>;

/**
 * Recursively parses a tuple of JSON schemas to the intersection of its parsed meta-types (merged with root schema).
 * @param SUB_SCHEMAS JSONSchema[]
 * @param ROOT_ALL_OF_SCHEMA Root JSONSchema (schema union)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
type RecurseOnAllOfSchema<
  SUB_SCHEMAS extends JSONSchema7[],
  ROOT_ALL_OF_SCHEMA extends AllOfSchema,
  OPTIONS extends ParseSchemaOptions,
  PARSED_ROOT_ALL_OF_SCHEMA,
> = SUB_SCHEMAS extends [infer SUB_SCHEMAS_HEAD, ...infer SUB_SCHEMAS_TAIL]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    SUB_SCHEMAS_HEAD extends JSONSchema7
    ? SUB_SCHEMAS_TAIL extends JSONSchema7[]
      ? RecurseOnAllOfSchema<
          SUB_SCHEMAS_TAIL,
          ROOT_ALL_OF_SCHEMA,
          OPTIONS,
          M.$Intersect<
            ParseSchema<
              MergeSubSchema<
                Omit<ROOT_ALL_OF_SCHEMA, "allOf">,
                SUB_SCHEMAS_HEAD
              >,
              OPTIONS
            >,
            PARSED_ROOT_ALL_OF_SCHEMA
          >
        >
      : never
    : never
  : PARSED_ROOT_ALL_OF_SCHEMA;
