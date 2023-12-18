import type {
  JSONSchema7TypeName,
  JSONSchema7 as OriginalJSONSchema7,
} from "json-schema";

export const $JSONSchema7 = Symbol("$JSONSchema7");
/**
 * Symbol used to make extended JSON schemas actually extend the JSONSchema type constraint at all time
 */
export type $JSONSchema7 = typeof $JSONSchema7;

/**
 * JSON Schema type constraint
 */
export type JSONSchema7 =
  | boolean
  | (Omit<
      OriginalJSONSchema7,
      | "type"
      | "const"
      | "enum"
      | "items"
      | "additionalItems"
      | "contains"
      | "properties"
      | "required"
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
      | "default"
    > &
      Readonly<{
        // Needed to have extended JSON schemas actually extend the JSONSchema type constraint at all time
        [$JSONSchema7]?: $JSONSchema7;
        type?: JSONSchema7TypeName | readonly JSONSchema7TypeName[];
        const?: unknown;
        enum?: unknown;
        items?: JSONSchema7 | readonly JSONSchema7[];
        additionalItems?: JSONSchema7;
        contains?: JSONSchema7;
        properties?: Readonly<Record<string, JSONSchema7>>;
        required?: readonly string[];
        patternProperties?: Readonly<Record<string, JSONSchema7>>;
        additionalProperties?: JSONSchema7;
        dependencies?: Readonly<
          Record<string, JSONSchema7 | readonly string[]>
        >;
        propertyNames?: JSONSchema7;
        if?: JSONSchema7;
        then?: JSONSchema7;
        else?: JSONSchema7;
        allOf?: readonly JSONSchema7[];
        anyOf?: readonly JSONSchema7[];
        oneOf?: readonly JSONSchema7[];
        not?: JSONSchema7;
        nullable?: boolean;
        definitions?: Readonly<Record<string, JSONSchema7>>;
        // Required to avoid applying Readonly to Array interface, which results in invalid type (Array is treated as Object):
        // https://github.com/ThomasAribart/json-schema-to-ts/issues/48
        // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0e40d820c92ec6457854fa6726bbff2ffea4e7dd/types/json-schema/index.d.ts#L590
        // https://github.com/microsoft/TypeScript/issues/3496#issuecomment-128553540
        examples?: readonly unknown[];
        // Required to allow array values in default field
        // https://github.com/ThomasAribart/json-schema-to-ts/issues/80
        default?: unknown;
      }>);

/**
 * JSON Schema with reference type constraint
 */
export type JSONSchema7Reference = JSONSchema7 & Readonly<{ $id: string }>;
