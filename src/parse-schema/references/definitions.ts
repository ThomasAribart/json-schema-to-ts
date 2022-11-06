import type { ParseSchemaOptions } from "../index";

import type { ReferenceSchema } from ".";
import type { ParseReference } from "./utils";

export type ParseDefinitionSchema<
  S extends ReferenceSchema,
  O extends ParseSchemaOptions,
  P extends string
> = ParseReference<O["rootSchema"], O, P, Omit<S, "$ref">>;
