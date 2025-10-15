import type {
  DeserializationPattern,
  FromSchemaDefaultOptions,
  FromSchemaOptions,
  JSONSchema,
  JSONSchemaReference,
} from "./definitions";

/**
 * Index schema references by their $id property and make them writable.
 * @param SCHEMA_REFERENCES JSONSchemaReference[]
 * @returns Record<string, JSONSchemaReference>
 */
export type IndexReferencesById<
  SCHEMA_REFERENCES extends readonly JSONSchemaReference[],
> = {
  [REF_SCHEMA in SCHEMA_REFERENCES[number] as REF_SCHEMA["$id"]]: REF_SCHEMA;
};

/**
 * Slightly transforms `FromSchema` options to valid `ParseSchema` options.
 * @param SCHEMA_REFERENCES JSONSchemaReference[]
 * @param OPTIONS FromSchemaOptions
 * @returns ParseSchemaOptions
 */
export type ParseOptions<
  ROOT_SCHEMA extends JSONSchema,
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
  references: OPTIONS["references"] extends JSONSchemaReference[]
    ? IndexReferencesById<OPTIONS["references"]>
    : {};
  deserialize: OPTIONS["deserialize"] extends DeserializationPattern[] | false
    ? OPTIONS["deserialize"]
    : FromSchemaDefaultOptions["deserialize"];
  omitAdditionalProperties: OPTIONS["omitAdditionalProperties"] extends boolean
    ? OPTIONS["omitAdditionalProperties"]
    : FromSchemaDefaultOptions["omitAdditionalProperties"];
};
