import type { JSONSchema7Reference } from "~/index";

import type { DeserializationPattern } from "./deserializationPattern";
import type {
  JSONSchema7Extension,
  ExtendedJSONSchema7Reference,
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
export type FromExtendedSchemaOptions<E extends JSONSchema7Extension> = {
  parseNotKeyword?: boolean;
  parseIfThenElseKeywords?: boolean;
  references?: ExtendedJSONSchema7Reference<E>[] | false;
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
