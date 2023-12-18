import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

/**
 * JSON schemas of JSON schema exclusions
 * @example
 * const exclusionSchema = {
 *  type: "string",
 *  not: {
 *    enum: ["Bummer", "Silly", "Lazy sod !"]
 *  }
 * }
 */
export type NotSchema = JSONSchema7 & Readonly<{ not: JSONSchema7 }>;

/**
 * Any possible meta-type
 */
type AllTypes = M.Union<
  | M.Primitive<null>
  | M.Primitive<boolean>
  | M.Primitive<number>
  | M.Primitive<string>
  | M.Array
  | M.Object<{}, never, M.Any>
>;

/**
 * Recursively parses a JSON schema exclusion to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param NOT_SCHEMA JSONSchema (exclusion)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseNotSchema<
  NOT_SCHEMA extends NotSchema,
  OPTIONS extends ParseSchemaOptions,
  PARSED_REST_SCHEMA = ParseSchema<Omit<NOT_SCHEMA, "not">, OPTIONS>,
  EXCLUSION = M.$Exclude<
    PARSED_REST_SCHEMA extends M.AnyType
      ? M.$Intersect<AllTypes, PARSED_REST_SCHEMA>
      : PARSED_REST_SCHEMA,
    ParseSchema<
      MergeSubSchema<Omit<NOT_SCHEMA, "not">, NOT_SCHEMA["not"]>,
      OPTIONS
    >
  >,
> = EXCLUSION extends M.Never ? PARSED_REST_SCHEMA : EXCLUSION;
