import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MultipleTypesSchema } from "./multipleTypes";
import type { SingleTypeSchema } from "./singleType";

/**
 * JSON schemas of constants (i.e. types with cardinalities of 1)
 * @example
 * const constSchema = {
 *  const: "foo"
 * }
 */
export type ConstSchema = JSONSchema7 & { const: unknown };

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
> = CONST_SCHEMA extends SingleTypeSchema
  ? IntersectConstAndTypeSchema<CONST_SCHEMA, OPTIONS>
  : CONST_SCHEMA extends MultipleTypesSchema
  ? IntersectConstAndTypeSchema<CONST_SCHEMA, OPTIONS>
  : ParseConst<CONST_SCHEMA>;

/**
 * Intersects the parsed meta-type of a constant JSON schema to the rest of the schema (only when a `type` keyword has been used).
 * @param CONST_SCHEMA JSONSchema (constant & single/multiple type)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
type IntersectConstAndTypeSchema<
  CONST_SCHEMA extends ConstSchema & (SingleTypeSchema | MultipleTypesSchema),
  OPTIONS extends ParseSchemaOptions,
  // TOIMPROVE: Directly use ParseMultipleTypeSchema and ParseSingleTypeSchema
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
  CONST_SCHEMA["const"]
>;
