import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";

/**
 * JSON schemas of objects
 * @example
 * const objectSchema = {
 *  type: "object",
 *  properties: {
 *    color: {
 *      type: "string"
 *    }
 *  }
 * }
 */
export type ObjectSchema = JSONSchema7 & Readonly<{ type: "object" }>;

/**
 * Parses an object JSON schema to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param OBJECT_SCHEMA JSONSchema (object type)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseObjectSchema<
  OBJECT_SCHEMA extends ObjectSchema,
  OPTIONS extends ParseSchemaOptions,
> = OBJECT_SCHEMA extends Readonly<{
  properties: Readonly<Record<string, JSONSchema7>>;
}>
  ? M.$Object<
      {
        [KEY in keyof OBJECT_SCHEMA["properties"]]: ParseSchema<
          OBJECT_SCHEMA["properties"][KEY],
          OPTIONS
        >;
      },
      GetRequired<OBJECT_SCHEMA>,
      GetOpenProps<OBJECT_SCHEMA, OPTIONS>
    >
  : M.$Object<
      {},
      GetRequired<OBJECT_SCHEMA>,
      GetOpenProps<OBJECT_SCHEMA, OPTIONS>
    >;

/**
 * Extracts the required keys of an object JSON schema
 * @param OBJECT_SCHEMA JSONSchema (object type)
 * @returns String
 */
type GetRequired<OBJECT_SCHEMA extends ObjectSchema> =
  OBJECT_SCHEMA extends Readonly<{ required: ReadonlyArray<string> }>
    ? OBJECT_SCHEMA["required"][number]
    : never;

/**
 * Extracts and parses the additional and pattern properties (if any exists) of an object JSON schema
 * @param OBJECT_SCHEMA JSONSchema (object type)
 * @param OPTIONS Parsing options
 * @returns String
 */
type GetOpenProps<
  OBJECT_SCHEMA extends ObjectSchema,
  OPTIONS extends ParseSchemaOptions,
> = OBJECT_SCHEMA extends Readonly<{ additionalProperties: JSONSchema7 }>
  ? OBJECT_SCHEMA extends Readonly<{
      patternProperties: Record<string, JSONSchema7>;
    }>
    ? AdditionalAndPatternProps<
        OBJECT_SCHEMA["additionalProperties"],
        OBJECT_SCHEMA["patternProperties"],
        OPTIONS
      >
    : ParseSchema<OBJECT_SCHEMA["additionalProperties"], OPTIONS>
  : OBJECT_SCHEMA extends Readonly<{
        patternProperties: Record<string, JSONSchema7>;
      }>
    ? PatternProps<OBJECT_SCHEMA["patternProperties"], OPTIONS>
    : M.Any;

/**
 * Extracts and parses the pattern properties of an object JSON schema
 * @param PATTERN_PROPERTY_SCHEMAS Record<string, JSONSchema>
 * @param OPTIONS Parsing options
 * @returns String
 */
type PatternProps<
  PATTERN_PROPERTY_SCHEMAS extends Readonly<Record<string, JSONSchema7>>,
  OPTIONS extends ParseSchemaOptions,
> = M.$Union<
  {
    [KEY in keyof PATTERN_PROPERTY_SCHEMAS]: ParseSchema<
      PATTERN_PROPERTY_SCHEMAS[KEY],
      OPTIONS
    >;
  }[keyof PATTERN_PROPERTY_SCHEMAS]
>;

/**
 * Extracts, parses and unify the additional and pattern properties of an object JSON schema into a single meta-type
 * @param ADDITIONAL_PROPERTIES_SCHEMA JSONSchema
 * @param PATTERN_PROPERTY_SCHEMAS Record<string, JSONSchema>
 * @param OPTIONS Parsing options
 * @returns String
 */
type AdditionalAndPatternProps<
  ADDITIONAL_PROPERTIES_SCHEMA extends JSONSchema7,
  PATTERN_PROPERTY_SCHEMAS extends Readonly<Record<string, JSONSchema7>>,
  OPTIONS extends ParseSchemaOptions,
> = ADDITIONAL_PROPERTIES_SCHEMA extends boolean
  ? PatternProps<PATTERN_PROPERTY_SCHEMAS, OPTIONS>
  : M.$Union<
      | ParseSchema<ADDITIONAL_PROPERTIES_SCHEMA, OPTIONS>
      | {
          [KEY in keyof PATTERN_PROPERTY_SCHEMAS]: ParseSchema<
            PATTERN_PROPERTY_SCHEMAS[KEY],
            OPTIONS
          >;
        }[keyof PATTERN_PROPERTY_SCHEMAS]
    >;
