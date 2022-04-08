import { JSONSchema7 as $JSONSchema7 } from "json-schema";

export type JSONSchema7 =
  | boolean
  | (Omit<
      $JSONSchema7,
      | "const"
      | "enum"
      | "items"
      | "additionalItems"
      | "contains"
      | "properties"
      | "patternProperties"
      | "additionalProperties"
      | "dependencies"
      | "propertyNames"
      | "if"
      | "then"
      | "else"
      | "allOf"
      | "anyOf"
      | "oneOf"
      | "not"
      | "definitions"
    > & {
      const?: unknown;
      enum?: unknown;
      items?: JSONSchema7 | JSONSchema7[];
      additionalItems?: JSONSchema7;
      contains?: JSONSchema7;
      properties?: Record<string, JSONSchema7>;
      patternProperties?: Record<string, JSONSchema7>;
      additionalProperties?: JSONSchema7;
      dependencies?: {
        [key: string]: JSONSchema7 | string[];
      };
      propertyNames?: JSONSchema7;
      if?: JSONSchema7;
      then?: JSONSchema7;
      else?: JSONSchema7;
      allOf?: JSONSchema7[];
      anyOf?: JSONSchema7[];
      oneOf?: JSONSchema7[];
      not?: JSONSchema7;
      definitions?: { [key: string]: JSONSchema7 };
    });
