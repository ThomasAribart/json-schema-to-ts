import type { M } from "ts-algebra";

import type { JSONSchema } from "~/definitions";
import type { Writable } from "~/type-utils";

import type { ParseSchema, ParseSchemaOptions } from "./index";

/**
 * JSON schemas of constants (i.e. types with cardinalities of 1)
 * @example
 * const constSchema = {
 *  const: "foo"
 * }
 */
export type ConstSchema = JSONSchema & Readonly<{ const: unknown }>;

/**
 * Recursively parses a constant JSON schema to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param CONST_SCHEMA JSONSchema (constant)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseConstSchema<
  CONST_SCHEMA extends ConstSchema,
  OPTIONS extends ParseSchemaOptions,
> = M.$Intersect<
  ParseConst<CONST_SCHEMA>,
  ParseSchema<Omit<CONST_SCHEMA, "const">, OPTIONS>
>;

/**
 * Parses a constant JSON schema to a meta-type.
 * @param CONST_SCHEMA JSONSchema (constant)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
type ParseConst<CONST_SCHEMA extends ConstSchema> = M.Const<
  Writable<CONST_SCHEMA["const"]>
>;
