import type { JSONSchema7 as OriginalJSONSchema7 } from "json-schema";

import { $JSONSchema7 } from "./jsonSchema7";

export type JSONSchema7Extension = Record<string, unknown>;

export type ExtendedJSONSchema7<
  E extends JSONSchema7Extension = JSONSchema7Extension,
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
      items?: ExtendedJSONSchema7<E> | ExtendedJSONSchema7<E>[];
      additionalItems?: ExtendedJSONSchema7<E>;
      contains?: ExtendedJSONSchema7<E>;
      properties?: Record<string, ExtendedJSONSchema7<E>>;
      patternProperties?: Record<string, ExtendedJSONSchema7<E>>;
      additionalProperties?: ExtendedJSONSchema7<E>;
      dependencies?: {
        [key: string]: ExtendedJSONSchema7<E> | string[];
      };
      propertyNames?: ExtendedJSONSchema7<E>;
      if?: ExtendedJSONSchema7<E>;
      then?: ExtendedJSONSchema7<E>;
      else?: ExtendedJSONSchema7<E>;
      allOf?: ExtendedJSONSchema7<E>[];
      anyOf?: ExtendedJSONSchema7<E>[];
      oneOf?: ExtendedJSONSchema7<E>[];
      not?: ExtendedJSONSchema7<E>;
      nullable?: boolean;
      definitions?: { [key: string]: ExtendedJSONSchema7<E> };
      // Required to avoid applying Readonly to Array interface, which results in invalid type (Array is treated as Object):
      // https://github.com/ThomasAribart/json-schema-to-ts/issues/48
      // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0e40d820c92ec6457854fa6726bbff2ffea4e7dd/types/json-schema/index.d.ts#L590
      // https://github.com/microsoft/TypeScript/issues/3496#issuecomment-128553540
      examples?: unknown[];
      // Required to allow array values in default field
      // https://github.com/ThomasAribart/json-schema-to-ts/issues/80
      default?: unknown;
    } & Partial<E>);

export type ExtendedJSONSchema7Reference<
  E extends JSONSchema7Extension = JSONSchema7Extension,
> = ExtendedJSONSchema7<E> & { $id: string };

type UnextendJSONSchema7Tuple<
  E extends JSONSchema7Extension,
  S extends ExtendedJSONSchema7<E>[],
> = S extends [infer H, ...infer T]
  ? H extends ExtendedJSONSchema7<E>
    ? T extends ExtendedJSONSchema7<E>[]
      ? [UnextendJSONSchema7<E, H>, ...UnextendJSONSchema7Tuple<E, T>]
      : never
    : never
  : [];

type UnextendJSONSchema7Record<
  E extends JSONSchema7Extension,
  S extends Record<string, unknown>,
> = {
  [key in keyof S]: S[key] extends ExtendedJSONSchema7<E>
    ? UnextendJSONSchema7<E, S[key]>
    : S[key];
};

export type UnextendJSONSchema7<
  E extends JSONSchema7Extension,
  S extends ExtendedJSONSchema7<E>,
> = S extends boolean
  ? S
  : {
      [key in $JSONSchema7 | keyof S]: key extends keyof S
        ? S extends { [k in key]: ExtendedJSONSchema7<E> }
          ? UnextendJSONSchema7<E, S[key]>
          : S extends { [k in key]: ExtendedJSONSchema7<E>[] }
          ? number extends S[key]["length"]
            ? UnextendJSONSchema7<E, S[key][number]>[]
            : S[key] extends ExtendedJSONSchema7<E>[]
            ? UnextendJSONSchema7Tuple<E, S[key]>
            : never
          : S extends { [k in key]: Record<string, unknown> }
          ? UnextendJSONSchema7Record<E, S[key]>
          : S[key]
        : key extends $JSONSchema7
        ? $JSONSchema7
        : never;
    };
