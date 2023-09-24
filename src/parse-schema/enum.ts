import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";

/**
 * JSON schemas of enums (i.e. types with finite cardinalities)
 * @example
 * const enumSchema = {
 *  enum: ["foo", "bar"]
 * }
 */
export type EnumSchema = JSONSchema7 & { enum: unknown[] };

export type ParseEnumSchema<
  SCHEMA extends EnumSchema,
  OPTIONS extends ParseSchemaOptions,
> = M.$Intersect<ParseEnum<SCHEMA>, ParseSchema<Omit<SCHEMA, "enum">, OPTIONS>>;

type ParseEnum<SCHEMA extends EnumSchema> = M.Enum<SCHEMA["enum"][number]>;
