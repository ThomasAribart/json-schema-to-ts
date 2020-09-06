import { Litteral, Any, Never } from "../meta-types";
import { HasKeyIn } from "../utils";

import { ParseAnyOfSchema } from "./anyOf";
import { ParseEnumSchema } from "./enum";
import { ParseConstSchema } from "./const";
import { ParseMixedSchema } from "./mixed";
import { ParseObjectSchema } from "./object";
import { ParseArrSchema } from "./array";

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
}[InferSchemaType<S>];

type InferSchemaType<S> = S extends true | string
  ? "any"
  : S extends false
  ? "never"
  : HasKeyIn<S, "anyOf"> extends true
  ? "anyOf"
  : HasKeyIn<S, "enum"> extends true
  ? "enum"
  : HasKeyIn<S, "const"> extends true
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
