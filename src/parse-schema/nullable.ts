import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";

/**
 * JSON schemas of nullable types
 * @example
 * const nullableSchema = {
 *  type: "string",
 *  nullable: true
 * }
 */
export type NullableSchema = JSONSchema7 & { nullable: boolean };

/**
 * Parses a nullable JSON schema to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param NULLABLE_SCHEMA JSONSchema (nullable)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseNullableSchema<
  NULLABLE_SCHEMA extends NullableSchema,
  OPTIONS extends ParseSchemaOptions,
  PARSED_REST_SCHEMA = ParseSchema<Omit<NULLABLE_SCHEMA, "nullable">, OPTIONS>,
> = NULLABLE_SCHEMA extends { nullable: true }
  ? M.$Union<M.Primitive<null> | PARSED_REST_SCHEMA>
  : PARSED_REST_SCHEMA;
