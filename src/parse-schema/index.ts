import { Litteral, Any, Never } from "../meta-types";

import { ParseConstSchema } from "./const";
import { ParseEnumSchema } from "./enum";
import { ParseMixedSchema } from "./mixed";
import { ParseArrSchema } from "./array";
import { ParseObjectSchema } from "./object";
import { ParseAnyOfSchema } from "./anyOf";
import { ParseOneOfSchema } from "./oneOf";

export type ParseSchema<S> = {
  any: Any;
  never: Never;
  null: Litteral<null>;
  boolean: Litteral<boolean>;
  number: Litteral<number>;
  string: Litteral<string>;
  mixed: ParseMixedSchema<S>;
  object: ParseObjectSchema<S>;
  array: ParseArrSchema<S>;
  const: ParseConstSchema<S>;
  enum: ParseEnumSchema<S>;
  anyOf: ParseAnyOfSchema<S>;
  oneOf: ParseOneOfSchema<S>;
}[InferSchemaType<S>];

type InferSchemaType<S> = S extends true | string
  ? "any"
  : S extends false
  ? "never"
  : "oneOf" extends keyof S
  ? "oneOf"
  : "anyOf" extends keyof S
  ? "anyOf"
  : "enum" extends keyof S
  ? "enum"
  : "const" extends keyof S
  ? "const"
  : "type" extends keyof S
  ? S["type"] extends any[]
    ? "mixed"
    : S["type"] extends "null"
    ? "null"
    : S["type"] extends "boolean"
    ? "boolean"
    : S["type"] extends "integer" | "number"
    ? "number"
    : S["type"] extends "string"
    ? "string"
    : S["type"] extends "object"
    ? "object"
    : S["type"] extends "array"
    ? "array"
    : "never"
  : "any";
