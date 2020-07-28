import { MergeRight } from "./utils";

type CommonProps = {
  title?: string;
  description?: string;
  default?: any;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  examples?: any[];
};

type MakeSchema<SpecificProps = {}> = MergeRight<CommonProps, SpecificProps>;

export type NullSchema = MakeSchema<{
  type: "null";
}>;

export type BooleanSchema = MakeSchema<{
  type: "boolean";
}>;

export type StringSchema = MakeSchema<{
  type: "string";
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: string;
}>;

export type IntegerSchema = MakeSchema<{
  type: "integer";
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
}>;

export type NumberSchema = MakeSchema<{
  type: "number";
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
}>;

export type ObjectSchema = MakeSchema<{
  type: "object";
  properties?: { [propertyName: string]: Schema };
  required?: any[];
  maxProperties?: number;
  minProperties?: number;
  additionalProperties?: boolean | Schema;
  propertyNames?: StringSchema;
  patternProperties?: { [pattern: string]: Schema };
  dependencies?: { [property: string]: string[] | object };
}>;

export type ArraySchema = MakeSchema<{
  type: "array";
  items?: Schema | any[];
  contains?: Schema;
  additionalItems?: boolean | Schema;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
}>;

export type AnyOfSchema = MakeSchema<{
  anyOf: any[];
}>;

export type EnumSchema = MakeSchema<{
  type?:
    | "null"
    | "boolean"
    | "string"
    | "integer"
    | "number"
    | "object"
    | "array";
  enum: any[];
}>;

export type ConstSchema = MakeSchema<{
  type?:
    | "null"
    | "boolean"
    | "string"
    | "integer"
    | "number"
    | "object"
    | "array";
  const: any;
}>;

export type Schema =
  | boolean
  | string
  | NullSchema
  | BooleanSchema
  | StringSchema
  | IntegerSchema
  | NumberSchema
  | ObjectSchema
  | ArraySchema
  | AnyOfSchema
  | EnumSchema
  | ConstSchema;
