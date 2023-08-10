import type { JSONSchema7 as OriginalJSONSchema7 } from "json-schema";

import { $JSONSchema7 } from "./jsonSchema7";

export type JSONSchema7Extension = Record<string, unknown>;

export type ExtendedJSONSchema7<
  EXTENSION extends JSONSchema7Extension = JSONSchema7Extension,
> =
  | boolean
  | (Omit<
      OriginalJSONSchema7,
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
      | "default"
    > & {
      const?: unknown;
      enum?: unknown;
      items?: ExtendedJSONSchema7<EXTENSION> | ExtendedJSONSchema7<EXTENSION>[];
      additionalItems?: ExtendedJSONSchema7<EXTENSION>;
      contains?: ExtendedJSONSchema7<EXTENSION>;
      properties?: Record<string, ExtendedJSONSchema7<EXTENSION>>;
      patternProperties?: Record<string, ExtendedJSONSchema7<EXTENSION>>;
      additionalProperties?: ExtendedJSONSchema7<EXTENSION>;
      dependencies?: {
        [key: string]: ExtendedJSONSchema7<EXTENSION> | string[];
      };
      propertyNames?: ExtendedJSONSchema7<EXTENSION>;
      if?: ExtendedJSONSchema7<EXTENSION>;
      then?: ExtendedJSONSchema7<EXTENSION>;
      else?: ExtendedJSONSchema7<EXTENSION>;
      allOf?: ExtendedJSONSchema7<EXTENSION>[];
      anyOf?: ExtendedJSONSchema7<EXTENSION>[];
      oneOf?: ExtendedJSONSchema7<EXTENSION>[];
      not?: ExtendedJSONSchema7<EXTENSION>;
      nullable?: boolean;
      definitions?: { [key: string]: ExtendedJSONSchema7<EXTENSION> };
      // Required to avoid applying Readonly to Array interface, which results in invalid type (Array is treated as Object):
      // https://github.com/ThomasAribart/json-schema-to-ts/issues/48
      // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0e40d820c92ec6457854fa6726bbff2ffea4e7dd/types/json-schema/index.d.ts#L590
      // https://github.com/microsoft/TypeScript/issues/3496#issuecomment-128553540
      examples?: unknown[];
      // Required to allow array values in default field
      // https://github.com/ThomasAribart/json-schema-to-ts/issues/80
      default?: unknown;
    } & Partial<EXTENSION>);

export type ExtendedJSONSchema7Reference<
  EXTENSION extends JSONSchema7Extension = JSONSchema7Extension,
> = ExtendedJSONSchema7<EXTENSION> & { $id: string };

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

type UnextendJSONSchema7Record<
  EXTENSION extends JSONSchema7Extension,
  SCHEMA_RECORD extends Record<string, unknown>,
> = {
  [KEY in keyof SCHEMA_RECORD]: SCHEMA_RECORD[KEY] extends ExtendedJSONSchema7<EXTENSION>
    ? UnextendJSONSchema7<EXTENSION, SCHEMA_RECORD[KEY]>
    : SCHEMA_RECORD[KEY];
};

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
