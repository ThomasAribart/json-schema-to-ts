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
export type NotSchema = JSONSchema7 & {
  not: JSONSchema7;
};

type AllTypes = M.Union<
  | M.Primitive<null>
  | M.Primitive<boolean>
  | M.Primitive<number>
  | M.Primitive<string>
  | M.Array
  | M.Object<{}, never, M.Any>
>;

export type ParseNotSchema<
  SCHEMA extends NotSchema,
  OPTIONS extends ParseSchemaOptions,
  PARSED_REST_SCHEMA = ParseSchema<Omit<SCHEMA, "not">, OPTIONS>,
  EXCLUSION = M.$Exclude<
    PARSED_REST_SCHEMA extends M.AnyType
      ? M.$Intersect<AllTypes, PARSED_REST_SCHEMA>
      : PARSED_REST_SCHEMA,
    ParseSchema<MergeSubSchema<Omit<SCHEMA, "not">, SCHEMA["not"]>, OPTIONS>
  >,
> = EXCLUSION extends M.Never ? PARSED_REST_SCHEMA : EXCLUSION;
