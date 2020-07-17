import { FromEnumSchema } from "./enum";
import { FromConstSchema } from "./const";
import { FromObjectSchema } from "./object";
import { FromArraySchema } from "./array";
import { Writeable } from "./utils";

export type FromSchema<S> = FromReadonlySchema<S>;

type FromReadonlySchema<S> = FromWriteableSchema<Writeable<S>>;

export type FromWriteableSchema<S> = {
  any: any;
  never: never;
  enum: FromEnumSchema<S>;
  const: FromConstSchema<S>;
  null: null;
  boolean: boolean;
  string: string;
  number: number;
  object: FromObjectSchema<S>;
  array: FromArraySchema<S>;
  structureError: "TypeError: Invalid schema structure";
  typeError: 'TypeError: type value should be "null", "boolean", "integer", "number", "string", "object" or "array"';
}[InferSchemaType<S>];

type InferSchemaType<S> = S extends true | string
  ? "any"
  : S extends false
  ? "never"
  : "enum" extends keyof S
  ? "enum"
  : "const" extends keyof S
  ? "const"
  : "type" extends keyof S
  ? S["type"] extends "null"
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
