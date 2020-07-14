import { FromObjectSchema } from "./object";
import { FromArraySchema } from "./array";
import { FromConstSchema } from "./const";
import { FromEnumSchema } from "./enum";
import { Writeable } from "./utils";

export type FromSchema<S> = FromReadonlySchema<S>;

type FromReadonlySchema<S> = FromWriteableSchema<Writeable<S>>;

export type FromWriteableSchema<S> = {
  any: any;
  never: never;
  null: null;
  boolean: boolean;
  string: string;
  number: number;
  object: FromObjectSchema<S>;
  array: FromArraySchema<S>;
  const: FromConstSchema<S>;
  enum: FromEnumSchema<S>;
}[InferSchemaType<S>];

type InferSchemaType<S> = S extends true | string
  ? "any"
  : S extends false
  ? "never"
  : "const" extends keyof S
  ? "const"
  : "enum" extends keyof S
  ? "enum"
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
    : never
  : never;
