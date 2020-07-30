import { FromAnyOfSchema } from "./anyOf";
import { FromEnumSchema } from "./enum";
import { FromConstSchema } from "./const";
import { FromMixedSchema } from "./mixed";
import { FromObjectSchema } from "./object";
import { FromArraySchema } from "./array";
import { Writeable } from "./utils";

/**
 * Given a JSON schema defined with the `as const` statement, infers the type of valid instances
 *
 * Args:
 * - `Schema`: JSON schema
 */
export type FromSchema<S> = FromReadonlySchema<S>;

type FromReadonlySchema<S> = FromWriteableSchema<Writeable<S>>;

export type FromWriteableSchema<S> = {
  any: any;
  never: never;
  anyOf: FromAnyOfSchema<S>;
  enum: FromEnumSchema<S>;
  const: FromConstSchema<S>;
  mixed: FromMixedSchema<S>;
  null: null;
  boolean: boolean;
  number: number;
  string: string;
  object: FromObjectSchema<S>;
  array: FromArraySchema<S>;
  structureError: "TypeError: Invalid schema structure";
  typeError: "TypeError: Invalid type value. Did you forget to use the 'as const' directive?";
}[InferSchemaType<S>];

type InferSchemaType<S> = S extends true | string
  ? "any"
  : S extends false
  ? "never"
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
    : "typeError"
  : "structureError";
