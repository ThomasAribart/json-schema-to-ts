/* eslint-disable max-lines */
import type { $JSONSchema, JSONSchemaType } from "./jsonSchema";

/**
 * JSON Schema extension (i.e. additional custom fields)
 */
export type JSONSchemaExtension = Record<string, unknown>;

/**
 * Extended JSON Schema type constraint
 * @param EXTENSION JSONSchema7Extension
 * @returns Type
 */
export type ExtendedJSONSchema<
  EXTENSION extends JSONSchemaExtension = JSONSchemaExtension,
> =
  | boolean
  | (Readonly<{
      // Needed to have extended JSON schemas actually extend the JSONSchema type constraint at all time
      [$JSONSchema]?: $JSONSchema;

      $id?: string | undefined;
      $ref?: string | undefined;
      /**
       * Meta schema
       *
       * Recommended values:
       * - 'http://json-schema.org/schema#'
       * - 'http://json-schema.org/hyper-schema#'
       * - 'http://json-schema.org/draft-07/schema#'
       * - 'http://json-schema.org/draft-07/hyper-schema#'
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-5
       */
      $schema?: string | undefined;
      $comment?: string | undefined;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1
       */
      type?: JSONSchemaType | readonly JSONSchemaType[];
      const?: unknown;
      enum?: unknown;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.2
       */
      multipleOf?: number | undefined;
      maximum?: number | undefined;
      exclusiveMaximum?: number | undefined;
      minimum?: number | undefined;
      exclusiveMinimum?: number | undefined;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.3
       */
      maxLength?: number | undefined;
      minLength?: number | undefined;
      pattern?: string | undefined;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.4
       */
      items?:
        | ExtendedJSONSchema<EXTENSION>
        | readonly ExtendedJSONSchema<EXTENSION>[];
      additionalItems?: ExtendedJSONSchema<EXTENSION>;
      contains?: ExtendedJSONSchema<EXTENSION>;
      maxItems?: number | undefined;
      minItems?: number | undefined;
      uniqueItems?: boolean | undefined;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5
       */
      maxProperties?: number | undefined;
      minProperties?: number | undefined;
      required?: readonly string[];
      properties?: Readonly<Record<string, ExtendedJSONSchema<EXTENSION>>>;
      patternProperties?: Readonly<
        Record<string, ExtendedJSONSchema<EXTENSION>>
      >;
      additionalProperties?: ExtendedJSONSchema<EXTENSION>;
      dependencies?: Readonly<
        Record<string, ExtendedJSONSchema<EXTENSION> | readonly string[]>
      >;
      propertyNames?: ExtendedJSONSchema<EXTENSION>;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.6
       */
      if?: ExtendedJSONSchema<EXTENSION>;
      then?: ExtendedJSONSchema<EXTENSION>;
      else?: ExtendedJSONSchema<EXTENSION>;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.7
       */
      allOf?: readonly ExtendedJSONSchema<EXTENSION>[];
      anyOf?: readonly ExtendedJSONSchema<EXTENSION>[];
      oneOf?: readonly ExtendedJSONSchema<EXTENSION>[];
      not?: ExtendedJSONSchema<EXTENSION>;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
       */
      format?: string | undefined;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-8
       */
      contentMediaType?: string | undefined;
      contentEncoding?: string | undefined;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-9
       */
      definitions?: Readonly<Record<string, ExtendedJSONSchema<EXTENSION>>>;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-10
       */
      title?: string | undefined;
      description?: string | undefined;
      // Required to allow array values in default field
      // https://github.com/ThomasAribart/json-schema-to-ts/issues/80
      default?: unknown;
      readOnly?: boolean | undefined;
      writeOnly?: boolean | undefined;
      // Required to avoid applying Readonly to Array interface, which results in invalid type (Array is treated as Object):
      // https://github.com/ThomasAribart/json-schema-to-ts/issues/48
      // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0e40d820c92ec6457854fa6726bbff2ffea4e7dd/types/json-schema/index.d.ts#L590
      // https://github.com/microsoft/TypeScript/issues/3496#issuecomment-128553540
      examples?: readonly unknown[];

      // Additional field from OpenAPI Spec, supported by JSON-Schema
      nullable?: boolean;
    }> &
      Readonly<Partial<EXTENSION>>);

/**
 * Extended JSON Schema with reference type constraint
 * @param EXTENSION JSONSchema7Extension
 * @returns Type
 */
export type ExtendedJSONSchemaReference<
  EXTENSION extends JSONSchemaExtension = JSONSchemaExtension,
> = ExtendedJSONSchema<EXTENSION> & Readonly<{ $id: string }>;

/**
 * Unextends a tuple of extended JSON Schemas
 * @param EXTENSION JSONSchema7Extension
 * @param EXTENDED_SCHEMAS ExtendedJSONSchema[]
 * @returns ExtendedJSONSchema[]
 */
type UnextendJSONSchemaTuple<
  EXTENSION extends JSONSchemaExtension,
  EXTENDED_SCHEMAS extends ExtendedJSONSchema<EXTENSION>[],
> = EXTENDED_SCHEMAS extends [
  infer EXTENDED_SCHEMAS_HEAD,
  ...infer EXTENDED_SCHEMAS_TAIL,
]
  ? EXTENDED_SCHEMAS_HEAD extends ExtendedJSONSchema<EXTENSION>
    ? EXTENDED_SCHEMAS_TAIL extends ExtendedJSONSchema<EXTENSION>[]
      ? [
          UnextendJSONSchema<EXTENSION, EXTENDED_SCHEMAS_HEAD>,
          ...UnextendJSONSchemaTuple<EXTENSION, EXTENDED_SCHEMAS_TAIL>,
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
type UnextendJSONSchemaRecord<
  EXTENSION extends JSONSchemaExtension,
  EXTENDED_SCHEMA_RECORD extends Record<string, unknown>,
> = {
  [KEY in keyof EXTENDED_SCHEMA_RECORD]: EXTENDED_SCHEMA_RECORD[KEY] extends ExtendedJSONSchema<EXTENSION>
    ? UnextendJSONSchema<EXTENSION, EXTENDED_SCHEMA_RECORD[KEY]>
    : EXTENDED_SCHEMA_RECORD[KEY];
};

/**
 * Given an extended JSON Schema, recursively appends the `$JSONSchema7` symbol as optional property to have it actually extend the JSONSchema type constraint at all time
 * @param EXTENSION JSONSchema7Extension
 * @param EXTENDED_SCHEMA_RECORD ExtendedJSONSchema
 * @returns ExtendedJSONSchema
 */
export type UnextendJSONSchema<
  EXTENSION extends JSONSchemaExtension,
  EXTENDED_SCHEMA,
> = EXTENDED_SCHEMA extends boolean
  ? EXTENDED_SCHEMA
  : {
      [KEY in
        | $JSONSchema
        | keyof EXTENDED_SCHEMA]: KEY extends keyof EXTENDED_SCHEMA
        ? EXTENDED_SCHEMA extends { [K in KEY]: ExtendedJSONSchema<EXTENSION> }
          ? UnextendJSONSchema<EXTENSION, EXTENDED_SCHEMA[KEY]>
          : EXTENDED_SCHEMA extends {
                [K in KEY]: ExtendedJSONSchema<EXTENSION>[];
              }
            ? number extends EXTENDED_SCHEMA[KEY]["length"]
              ? UnextendJSONSchema<EXTENSION, EXTENDED_SCHEMA[KEY][number]>[]
              : EXTENDED_SCHEMA[KEY] extends ExtendedJSONSchema<EXTENSION>[]
                ? UnextendJSONSchemaTuple<EXTENSION, EXTENDED_SCHEMA[KEY]>
                : never
            : EXTENDED_SCHEMA extends { [K in KEY]: Record<string, unknown> }
              ? UnextendJSONSchemaRecord<EXTENSION, EXTENDED_SCHEMA[KEY]>
              : EXTENDED_SCHEMA[KEY]
        : KEY extends $JSONSchema
          ? $JSONSchema
          : never;
    };
