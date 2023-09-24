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

export type ParseAllOfSchema<
  SCHEMA extends AllOfSchema,
  OPTIONS extends ParseSchemaOptions,
> = RecurseOnAllOfSchema<
  SCHEMA["allOf"],
  SCHEMA,
  OPTIONS,
  ParseSchema<Omit<SCHEMA, "allOf">, OPTIONS>
>;

type RecurseOnAllOfSchema<
  SUB_SCHEMAS extends JSONSchema7[],
  ROOT_SCHEMA extends AllOfSchema,
  OPTIONS extends ParseSchemaOptions,
  PARSED_ROOT_SCHEMA,
> = SUB_SCHEMAS extends [infer SUB_SCHEMAS_HEAD, ...infer SUB_SCHEMAS_TAIL]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    SUB_SCHEMAS_HEAD extends JSONSchema7
    ? SUB_SCHEMAS_TAIL extends JSONSchema7[]
      ? RecurseOnAllOfSchema<
          SUB_SCHEMAS_TAIL,
          ROOT_SCHEMA,
          OPTIONS,
          M.$Intersect<
            ParseSchema<
              MergeSubSchema<Omit<ROOT_SCHEMA, "allOf">, SUB_SCHEMAS_HEAD>,
              OPTIONS
            >,
            PARSED_ROOT_SCHEMA
          >
        >
      : never
    : never
  : PARSED_ROOT_SCHEMA;
