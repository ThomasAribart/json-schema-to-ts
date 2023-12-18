import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";
import type { Writable } from "~/type-utils";

import type { ParseSchema, ParseSchemaOptions } from "./index";

/**
 * JSON schemas of enums (i.e. types with finite cardinalities)
 * @example
 * const enumSchema = {
 *  enum: ["foo", "bar"]
 * }
 */
export type EnumSchema = JSONSchema7 & Readonly<{ enum: readonly unknown[] }>;

/**
 * Recursively parses an enum JSON schema to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param ENUM_SCHEMA JSONSchema (enum)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseEnumSchema<
  ENUM_SCHEMA extends EnumSchema,
  OPTIONS extends ParseSchemaOptions,
> = M.$Intersect<
  ParseEnum<ENUM_SCHEMA>,
  ParseSchema<Omit<ENUM_SCHEMA, "enum">, OPTIONS>
>;

/**
 * Parses an enum JSON schema to a meta-type.
 * @param ENUM_SCHEMA JSONSchema (enum)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
type ParseEnum<ENUM_SCHEMA extends EnumSchema> = M.Enum<
  Writable<ENUM_SCHEMA["enum"][number]>
>;
