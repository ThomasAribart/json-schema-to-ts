import type {
  JSONSchema7TypeName,
  JSONSchema7 as OriginalJSONSchema7,
} from "json-schema";

import { $JSONSchema7 } from "./jsonSchema7";

/**
 * JSON Schema extension (i.e. additional custom fields)
 */
export type JSONSchema7Extension = Record<string, unknown>;

/**
 * Extended JSON Schema type constraint
 * @param EXTENSION JSONSchema7Extension
 * @returns Type
 */
export type ExtendedJSONSchema7<
  EXTENSION extends JSONSchema7Extension = JSONSchema7Extension,
> =
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
        type?: JSONSchema7TypeName | readonly JSONSchema7TypeName[];
        const?: unknown;
        enum?: unknown;
        items?:
          | ExtendedJSONSchema7<EXTENSION>
          | readonly ExtendedJSONSchema7<EXTENSION>[];
        additionalItems?: ExtendedJSONSchema7<EXTENSION>;
        contains?: ExtendedJSONSchema7<EXTENSION>;
        properties?: Readonly<Record<string, ExtendedJSONSchema7<EXTENSION>>>;
        required?: readonly string[];
        patternProperties?: Readonly<
          Record<string, ExtendedJSONSchema7<EXTENSION>>
        >;
        additionalProperties?: ExtendedJSONSchema7<EXTENSION>;
        dependencies?: Readonly<{
          [key: string]: ExtendedJSONSchema7<EXTENSION> | string[];
        }>;
        propertyNames?: ExtendedJSONSchema7<EXTENSION>;
        if?: ExtendedJSONSchema7<EXTENSION>;
        then?: ExtendedJSONSchema7<EXTENSION>;
        else?: ExtendedJSONSchema7<EXTENSION>;
        allOf?: readonly ExtendedJSONSchema7<EXTENSION>[];
        anyOf?: readonly ExtendedJSONSchema7<EXTENSION>[];
        oneOf?: readonly ExtendedJSONSchema7<EXTENSION>[];
        not?: ExtendedJSONSchema7<EXTENSION>;
        nullable?: boolean;
        definitions?: Readonly<{
          [key: string]: ExtendedJSONSchema7<EXTENSION>;
        }>;
        // Required to avoid applying Readonly to Array interface, which results in invalid type (Array is treated as Object):
        // https://github.com/ThomasAribart/json-schema-to-ts/issues/48
        // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0e40d820c92ec6457854fa6726bbff2ffea4e7dd/types/json-schema/index.d.ts#L590
        // https://github.com/microsoft/TypeScript/issues/3496#issuecomment-128553540
        examples?: readonly unknown[];
        // Required to allow array values in default field
        // https://github.com/ThomasAribart/json-schema-to-ts/issues/80
        default?: unknown;
      }> &
      Readonly<Partial<EXTENSION>>);

/**
 * Extended JSON Schema with reference type constraint
 * @param EXTENSION JSONSchema7Extension
 * @returns Type
 */
export type ExtendedJSONSchema7Reference<
  EXTENSION extends JSONSchema7Extension = JSONSchema7Extension,
> = ExtendedJSONSchema7<EXTENSION> & Readonly<{ $id: string }>;

/**
 * Unextends a tuple of extended JSON Schemas
 * @param EXTENSION JSONSchema7Extension
 * @param EXTENDED_SCHEMAS ExtendedJSONSchema[]
 * @returns ExtendedJSONSchema[]
 */
type UnextendJSONSchema7Tuple<
  EXTENSION extends JSONSchema7Extension,
  EXTENDED_SCHEMAS extends ExtendedJSONSchema7<EXTENSION>[],
> = EXTENDED_SCHEMAS extends [
  infer EXTENDED_SCHEMAS_HEAD,
  ...infer EXTENDED_SCHEMAS_TAIL,
]
  ? EXTENDED_SCHEMAS_HEAD extends ExtendedJSONSchema7<EXTENSION>
    ? EXTENDED_SCHEMAS_TAIL extends ExtendedJSONSchema7<EXTENSION>[]
      ? [
          UnextendJSONSchema7<EXTENSION, EXTENDED_SCHEMAS_HEAD>,
          ...UnextendJSONSchema7Tuple<EXTENSION, EXTENDED_SCHEMAS_TAIL>,
        ]
      : never
    : never
  : [];

/**
 * Unextends a record of extended JSON Schemas
 * @param EXTENSION JSONSchema7Extension
 * @param EXTENDED_SCHEMA_RECORD Record<string, ExtendedJSONSchema>
 * @returns Record<string, ExtendedJSONSchema>
 */
type UnextendJSONSchema7Record<
  EXTENSION extends JSONSchema7Extension,
  EXTENDED_SCHEMA_RECORD extends Record<string, unknown>,
> = {
  [KEY in keyof EXTENDED_SCHEMA_RECORD]: EXTENDED_SCHEMA_RECORD[KEY] extends ExtendedJSONSchema7<EXTENSION>
    ? UnextendJSONSchema7<EXTENSION, EXTENDED_SCHEMA_RECORD[KEY]>
    : EXTENDED_SCHEMA_RECORD[KEY];
};

/**
 * Given an extended JSON Schema, recursively appends the `$JSONSchema7` symbol as optional property to have it actually extend the JSONSchema type constraint at all time
 * @param EXTENSION JSONSchema7Extension
 * @param EXTENDED_SCHEMA_RECORD ExtendedJSONSchema
 * @returns ExtendedJSONSchema
 */
export type UnextendJSONSchema7<
  EXTENSION extends JSONSchema7Extension,
  EXTENDED_SCHEMA,
> = EXTENDED_SCHEMA extends boolean
  ? EXTENDED_SCHEMA
  : {
      [KEY in
        | $JSONSchema7
        | keyof EXTENDED_SCHEMA]: KEY extends keyof EXTENDED_SCHEMA
        ? EXTENDED_SCHEMA extends { [K in KEY]: ExtendedJSONSchema7<EXTENSION> }
          ? UnextendJSONSchema7<EXTENSION, EXTENDED_SCHEMA[KEY]>
          : EXTENDED_SCHEMA extends {
                [K in KEY]: ExtendedJSONSchema7<EXTENSION>[];
              }
            ? number extends EXTENDED_SCHEMA[KEY]["length"]
              ? UnextendJSONSchema7<EXTENSION, EXTENDED_SCHEMA[KEY][number]>[]
              : EXTENDED_SCHEMA[KEY] extends ExtendedJSONSchema7<EXTENSION>[]
                ? UnextendJSONSchema7Tuple<EXTENSION, EXTENDED_SCHEMA[KEY]>
                : never
            : EXTENDED_SCHEMA extends { [K in KEY]: Record<string, unknown> }
              ? UnextendJSONSchema7Record<EXTENSION, EXTENDED_SCHEMA[KEY]>
              : EXTENDED_SCHEMA[KEY]
        : KEY extends $JSONSchema7
          ? $JSONSchema7
          : never;
    };
