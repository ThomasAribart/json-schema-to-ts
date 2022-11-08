import type { ParseSchemaOptions } from "../index";
import type { ReferenceSchema } from "./index";
import type { ParseReference } from "./utils";

export type ParseDefinitionSchema<
  S extends ReferenceSchema,
  O extends ParseSchemaOptions,
  P extends string,
> = ParseReference<O["rootSchema"], O, P, Omit<S, "$ref">>;
