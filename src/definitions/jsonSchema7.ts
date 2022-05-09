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
      | "examples"
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
      nullable?: boolean;
      definitions?: { [key: string]: JSONSchema7 };
      // Required to avoid applying Readonly to Array interface, which results in invalid type (Array is treated as Object):
      // https://github.com/ThomasAribart/json-schema-to-ts/issues/48
      // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0e40d820c92ec6457854fa6726bbff2ffea4e7dd/types/json-schema/index.d.ts#L590
      // https://github.com/microsoft/TypeScript/issues/3496#issuecomment-128553540
      examples?: unknown[];
    });

export type JSONSchema7Reference = JSONSchema7 & { $id: string };
