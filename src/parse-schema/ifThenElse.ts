import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

/**
 * JSON schemas of conditionally applied JSON schemas
 * @example
 * const conditionalSchema = {
 *  type: "object",
 *  if: {
 *    properties: {
 *      petKind: {
 *        const: "dog"
 *      }
 *    }
 *  },
 *  then: {
 *    required: ["bark"]
 *  },
 *  else: {
 *    required: ["meow"]
 *  }
 * }
 */
export type IfThenElseSchema = JSONSchema7 & {
  if: JSONSchema7;
  then?: JSONSchema7;
  else?: JSONSchema7;
};

/**
 * Recursively parses a conditionally applied JSON schema to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param IF_THEN_ELSE_SCHEMA JSONSchema (conditioned)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseIfThenElseSchema<
  IF_THEN_ELSE_SCHEMA extends IfThenElseSchema,
  OPTIONS extends ParseSchemaOptions,
  REST_SCHEMA extends JSONSchema7 = Omit<
    IF_THEN_ELSE_SCHEMA,
    "if" | "then" | "else"
  >,
  IF_SCHEMA extends JSONSchema7 = MergeSubSchema<
    REST_SCHEMA,
    IF_THEN_ELSE_SCHEMA["if"]
  >,
  PARSED_THEN_SCHEMA = IF_THEN_ELSE_SCHEMA extends { then: JSONSchema7 }
    ? M.$Intersect<
        ParseSchema<IF_SCHEMA, OPTIONS>,
        ParseSchema<
          MergeSubSchema<REST_SCHEMA, IF_THEN_ELSE_SCHEMA["then"]>,
          OPTIONS
        >
      >
    : ParseSchema<IF_SCHEMA, OPTIONS>,
  PARSED_ELSE_SCHEMA = IF_THEN_ELSE_SCHEMA extends { else: JSONSchema7 }
    ? M.$Intersect<
        M.$Exclude<
          ParseSchema<REST_SCHEMA, OPTIONS>,
          ParseSchema<IF_SCHEMA, OPTIONS>
        >,
        ParseSchema<
          MergeSubSchema<REST_SCHEMA, IF_THEN_ELSE_SCHEMA["else"]>,
          OPTIONS
        >
      >
    : M.$Exclude<
        ParseSchema<REST_SCHEMA, OPTIONS>,
        ParseSchema<IF_SCHEMA, OPTIONS>
      >,
> = M.$Intersect<
  M.$Union<PARSED_THEN_SCHEMA | PARSED_ELSE_SCHEMA>,
  ParseSchema<REST_SCHEMA, OPTIONS>
>;
