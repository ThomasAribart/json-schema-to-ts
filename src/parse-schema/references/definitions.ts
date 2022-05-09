import { ParseSchemaOptions } from "../index";

import { ReferenceSchema } from ".";
import { ParseReference } from "./utils";

export type ParseDefinitionSchema<
  S extends ReferenceSchema,
  O extends ParseSchemaOptions,
  P extends string
> = ParseReference<O["rootSchema"], O, P, Omit<S, "$ref">>;
