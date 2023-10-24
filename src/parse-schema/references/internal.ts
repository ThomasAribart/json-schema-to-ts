import type { ParseSchemaOptions } from "../index";
import type { ReferencingSchema } from "./index";
import type { ParseReference } from "./utils";

/**
 * Recursively parses a JSON schema referencing another part of its root JSON schema (through its `$ref` property) to a meta-type.
 * @param REFERENCING_SCHEMA JSONSchema (referencing)
 * @param OPTIONS Parsing options
 * @param DEFINITION String
 * @returns Meta-type
 */
export type ParseInternalReferenceSchema<
  REFERENCING_SCHEMA extends ReferencingSchema,
  OPTIONS extends ParseSchemaOptions,
  PATH extends string,
> = ParseReference<
  Omit<REFERENCING_SCHEMA, "$ref">,
  OPTIONS,
  OPTIONS["rootSchema"],
  PATH
>;
