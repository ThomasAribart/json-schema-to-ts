import type { JSONSchema7TypeName } from "json-schema";
import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseArraySchema, ArraySchema } from "./array";
import type { ParseSchemaOptions } from "./index";
import type { ParseObjectSchema, ObjectSchema } from "./object";

export type SingleTypeSchema = JSONSchema7 & { type: JSONSchema7TypeName };

export type ParseSingleTypeSchema<
  SCHEMA extends SingleTypeSchema,
  OPTIONS extends ParseSchemaOptions,
> = SCHEMA extends { type: "null" }
  ? M.Primitive<null>
  : SCHEMA extends { type: "boolean" }
  ? M.Primitive<boolean>
  : SCHEMA extends { type: "integer" }
  ? M.Primitive<number>
  : SCHEMA extends { type: "number" }
  ? M.Primitive<number>
  : SCHEMA extends { type: "string" }
  ? M.Primitive<string>
  : SCHEMA extends ArraySchema
  ? ParseArraySchema<SCHEMA, OPTIONS>
  : SCHEMA extends ObjectSchema
  ? ParseObjectSchema<SCHEMA, OPTIONS>
  : M.Never;
