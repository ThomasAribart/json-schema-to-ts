import type {
  DeserializationPattern,
  FromSchemaDefaultOptions,
  FromSchemaOptions,
  JSONSchema7,
  JSONSchema7Reference,
} from "./definitions";

/**
 * Index schema references by their $id property and make them writable.
 * @param SCHEMA_REFERENCES JSONSchema7Reference[]
 * @returns Record<string, JSONSchema7Reference>
 */
export type IndexReferencesById<
  SCHEMA_REFERENCES extends readonly JSONSchema7Reference[],
> = {
  [REF_SCHEMA in SCHEMA_REFERENCES[number] as REF_SCHEMA["$id"]]: REF_SCHEMA;
};

/**
 * Slightly transforms `FromSchema` options to valid `ParseSchema` options.
 * @param SCHEMA_REFERENCES JSONSchema7Reference[]
 * @param OPTIONS FromSchemaOptions
 * @returns ParseSchemaOptions
 */
export type ParseOptions<
  ROOT_SCHEMA extends JSONSchema7,
  OPTIONS extends FromSchemaOptions,
> = {
  parseNotKeyword: OPTIONS["parseNotKeyword"] extends boolean
    ? OPTIONS["parseNotKeyword"]
    : FromSchemaDefaultOptions["parseNotKeyword"];
  parseIfThenElseKeywords: OPTIONS["parseIfThenElseKeywords"] extends boolean
    ? OPTIONS["parseIfThenElseKeywords"]
    : FromSchemaDefaultOptions["parseIfThenElseKeywords"];
  keepDefaultedPropertiesOptional: OPTIONS["keepDefaultedPropertiesOptional"] extends boolean
    ? OPTIONS["keepDefaultedPropertiesOptional"]
    : FromSchemaDefaultOptions["keepDefaultedPropertiesOptional"];
  rootSchema: ROOT_SCHEMA;
  references: OPTIONS["references"] extends JSONSchema7Reference[]
    ? IndexReferencesById<OPTIONS["references"]>
    : {};
  deserialize: OPTIONS["deserialize"] extends DeserializationPattern[] | false
    ? OPTIONS["deserialize"]
    : FromSchemaDefaultOptions["deserialize"];
};
