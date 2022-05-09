import { JSONSchema7Reference } from "../index";
import { DeserializationPattern } from "./deserializationPattern";

export type FromSchemaOptions = {
  parseNotKeyword?: boolean;
  parseIfThenElseKeywords?: boolean;
  references?: JSONSchema7Reference[] | false;
  deserialize?: DeserializationPattern[] | false;
};

export type FromSchemaDefaultOptions = {
  parseNotKeyword: false;
  parseIfThenElseKeywords: false;
  references: false;
  deserialize: false;
};
