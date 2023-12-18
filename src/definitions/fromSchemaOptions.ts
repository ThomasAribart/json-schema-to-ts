import type { JSONSchema7Reference } from "~/definitions";

import type { DeserializationPattern } from "./deserializationPattern";
import type {
  ExtendedJSONSchema7Reference,
  JSONSchema7Extension,
} from "./extendedJsonSchema7";

/**
 * FromSchema options constraints
 */
export type FromSchemaOptions = {
  parseNotKeyword?: boolean;
  parseIfThenElseKeywords?: boolean;
  references?: JSONSchema7Reference[] | false;
  deserialize?: DeserializationPattern[] | false;
};

/**
 * FromExtendedSchema options constraints
 */
export type FromExtendedSchemaOptions<EXTENSION extends JSONSchema7Extension> =
  {
    parseNotKeyword?: boolean;
    parseIfThenElseKeywords?: boolean;
    references?: ExtendedJSONSchema7Reference<EXTENSION>[] | false;
    deserialize?: DeserializationPattern[] | false;
  };

/**
 * FromSchema default options
 */
export type FromSchemaDefaultOptions = {
  parseNotKeyword: false;
  parseIfThenElseKeywords: false;
  references: false;
  deserialize: false;
};
