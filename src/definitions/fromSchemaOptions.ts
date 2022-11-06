import type { JSONSchema7Reference } from "../index";
import type { DeserializationPattern } from "./deserializationPattern";

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
 * FromSchema default options
 */
export type FromSchemaDefaultOptions = {
  parseNotKeyword: false;
  parseIfThenElseKeywords: false;
  references: false;
  deserialize: false;
};
