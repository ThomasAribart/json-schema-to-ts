import type { JSONSchema7TypeName } from "json-schema";
import type { M } from "ts-algebra";

import type { JSONSchema7 } from "../definitions";

import type { ParseSchemaOptions } from "./index";
import type { ParseObjectSchema, ObjectSchema } from "./object";
import type { ParseArraySchema, ArraySchema } from "./array";

export type SingleTypeSchema = JSONSchema7 & { type: JSONSchema7TypeName };

export type ParseSingleTypeSchema<
  S extends SingleTypeSchema,
  O extends ParseSchemaOptions
> = S extends { type: "null" }
  ? M.Primitive<null>
  : S extends { type: "boolean" }
  ? M.Primitive<boolean>
  : S extends { type: "integer" }
  ? M.Primitive<number>
  : S extends { type: "number" }
  ? M.Primitive<number>
  : S extends { type: "string" }
  ? M.Primitive<string>
  : S extends ArraySchema
  ? ParseArraySchema<S, O>
  : S extends ObjectSchema
  ? ParseObjectSchema<S, O>
  : M.Never;
