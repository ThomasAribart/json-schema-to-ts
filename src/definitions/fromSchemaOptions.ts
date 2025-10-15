import type { JSONSchemaReference } from "~/definitions";

import type { DeserializationPattern } from "./deserializationPattern";
import type {
  ExtendedJSONSchemaReference,
  JSONSchemaExtension,
} from "./extendedJsonSchema";

/**
 * FromSchema options constraints
 */
export type FromSchemaOptions = {
  parseNotKeyword?: boolean;
  parseIfThenElseKeywords?: boolean;
  keepDefaultedPropertiesOptional?: boolean;
  references?: JSONSchemaReference[] | false;
  deserialize?: DeserializationPattern[] | false;
  omitAdditionalProperties?: boolean;
};

/**
 * FromExtendedSchema options constraints
 */
export type FromExtendedSchemaOptions<EXTENSION extends JSONSchemaExtension> = {
  parseNotKeyword?: boolean;
  parseIfThenElseKeywords?: boolean;
  keepDefaultedPropertiesOptional?: boolean;
  references?: ExtendedJSONSchemaReference<EXTENSION>[] | false;
  deserialize?: DeserializationPattern[] | false;
  omitAdditionalProperties?: boolean;
};

/**
 * FromSchema default options
 */
export type FromSchemaDefaultOptions = {
  parseNotKeyword: false;
  parseIfThenElseKeywords: false;
  keepDefaultedPropertiesOptional: false;
  references: false;
  deserialize: false;
  omitAdditionalProperties: false;
};
