import { JSONSchema7TypeName } from "json-schema";
import { M } from "ts-algebra";

import { JSONSchema7 } from "../definitions";

import { ParseSchemaOptions } from "./index";
import { ParseObjectSchema, ObjectSchema } from "./object";
import { ParseArraySchema, ArraySchema } from "./array";

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
