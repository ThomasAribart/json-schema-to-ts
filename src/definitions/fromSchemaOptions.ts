import { DeserializationPattern } from "./deserializationPattern";

export type FromSchemaOptions = {
  parseNotKeyword?: boolean;
  parseIfThenElseKeywords?: boolean;
  definitionsPath?: string;
  deserialize?: DeserializationPattern[] | false;
};

export type FromSchemaDefaultOptions = {
  parseNotKeyword: false;
  parseIfThenElseKeywords: false;
  definitionsPath: "$defs";
  deserialize: false;
};
