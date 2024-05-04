export const $JSONSchema = Symbol("$JSONSchema");
/**
 * Symbol used to make extended JSON schemas actually extend the JSONSchema type constraint at all time
 */
export type $JSONSchema = typeof $JSONSchema;

/**
 * JSON Schema type
 */
export type JSONSchemaType =
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "object"
  | "array"
  | "null";

/**
 * JSON Schema type constraint
 */
export type JSONSchema =
  | boolean
  | Readonly<{
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
      items?: JSONSchema | readonly JSONSchema[];
      additionalItems?: JSONSchema;
      contains?: JSONSchema;
      maxItems?: number | undefined;
      minItems?: number | undefined;
      uniqueItems?: boolean | undefined;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5
       */
      maxProperties?: number | undefined;
      minProperties?: number | undefined;
      required?: readonly string[];
      properties?: Readonly<Record<string, JSONSchema>>;
      patternProperties?: Readonly<Record<string, JSONSchema>>;
      additionalProperties?: JSONSchema;
      unevaluatedProperties?: JSONSchema;
      dependencies?: Readonly<Record<string, JSONSchema | readonly string[]>>;
      propertyNames?: JSONSchema;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.6
       */
      if?: JSONSchema;
      then?: JSONSchema;
      else?: JSONSchema;

      /**
       * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.7
       */
      allOf?: readonly JSONSchema[];
      anyOf?: readonly JSONSchema[];
      oneOf?: readonly JSONSchema[];
      not?: JSONSchema;

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
      definitions?: Readonly<Record<string, JSONSchema>>;

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
    }>;

/**
 * JSON Schema with reference type constraint
 */
export type JSONSchemaReference = JSONSchema & Readonly<{ $id: string }>;
