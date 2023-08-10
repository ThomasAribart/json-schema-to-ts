import type { ParseSchemaOptions } from "../index";
import type { ReferenceSchema } from "./index";
import type { ParseReference } from "./utils";

export type ParseDefinitionSchema<
  REF_SCHEMA extends ReferenceSchema,
  OPTIONS extends ParseSchemaOptions,
  DEFINITION extends string,
> = ParseReference<
  OPTIONS["rootSchema"],
  OPTIONS,
  DEFINITION,
  Omit<REF_SCHEMA, "$ref">
>;
