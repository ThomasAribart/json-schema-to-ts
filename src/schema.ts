import { UnsafeMergeRec } from "./utils";

type CommonProps = {
  title?: string;
  description?: string;
  default?: any;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  examples?: any[];
};

type MakeSchema<SpecificProps = {}> = UnsafeMergeRec<
  CommonProps,
  SpecificProps
>;

type NullSchema = MakeSchema<{
  type: "null";
}>;

type BooleanSchema = MakeSchema<{
  type: "boolean";
}>;

type StringSchema = MakeSchema<{
  type: "string";
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  format?: string;
}>;

type IntegerSchema = MakeSchema<{
  type: "integer";
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
}>;

type NumberSchema = MakeSchema<{
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

type ArraySchema = MakeSchema<{
  type: "array";
  items?: Schema | any[];
  contains?: Schema;
  additionalItems?: boolean | Schema;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
}>;

type AnyOfSchema = MakeSchema<{
  anyOf: any[];
}>;

type ConstSchema = MakeSchema<{
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

type EnumSchema = MakeSchema<{
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
