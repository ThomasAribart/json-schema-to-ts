import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";

export type ObjectSchema = JSONSchema7 & { type: "object" };

export type ParseObjectSchema<
  SCHEMA extends ObjectSchema,
  OPTIONS extends ParseSchemaOptions,
> = SCHEMA extends { properties: Record<string, JSONSchema7> }
  ? M.$Object<
      {
        [KEY in keyof SCHEMA["properties"]]: ParseSchema<
          SCHEMA["properties"][KEY],
          OPTIONS
        >;
      },
      GetRequired<SCHEMA>,
      GetOpenProps<SCHEMA, OPTIONS>
    >
  : M.$Object<{}, GetRequired<SCHEMA>, GetOpenProps<SCHEMA, OPTIONS>>;

type GetRequired<SCHEMA extends ObjectSchema> = SCHEMA extends {
  required: ReadonlyArray<string>;
}
  ? SCHEMA["required"][number]
  : never;

type GetOpenProps<
  SCHEMA extends ObjectSchema,
  OPTIONS extends ParseSchemaOptions,
> = SCHEMA extends { additionalProperties: JSONSchema7 }
  ? SCHEMA extends { patternProperties: Record<string, JSONSchema7> }
    ? AdditionalAndPatternProps<
        SCHEMA["additionalProperties"],
        SCHEMA["patternProperties"],
        OPTIONS
      >
    : ParseSchema<SCHEMA["additionalProperties"], OPTIONS>
  : SCHEMA extends { patternProperties: Record<string, JSONSchema7> }
  ? PatternProps<SCHEMA["patternProperties"], OPTIONS>
  : M.Any;

type PatternProps<
  PATTERN_PROPERTY_SCHEMAS extends Record<string, JSONSchema7>,
  OPTIONS extends ParseSchemaOptions,
> = M.$Union<
  {
    [KEY in keyof PATTERN_PROPERTY_SCHEMAS]: ParseSchema<
      PATTERN_PROPERTY_SCHEMAS[KEY],
      OPTIONS
    >;
  }[keyof PATTERN_PROPERTY_SCHEMAS]
>;

type AdditionalAndPatternProps<
  ADDITIONAL_ITEMS_SCHEMA extends JSONSchema7,
  PATTERN_PROPERTY_SCHEMAS extends Record<string, JSONSchema7>,
  OPTIONS extends ParseSchemaOptions,
> = ADDITIONAL_ITEMS_SCHEMA extends boolean
  ? PatternProps<PATTERN_PROPERTY_SCHEMAS, OPTIONS>
  : M.$Union<
      | ParseSchema<ADDITIONAL_ITEMS_SCHEMA, OPTIONS>
      | {
          [KEY in keyof PATTERN_PROPERTY_SCHEMAS]: ParseSchema<
            PATTERN_PROPERTY_SCHEMAS[KEY],
            OPTIONS
          >;
        }[keyof PATTERN_PROPERTY_SCHEMAS]
    >;
