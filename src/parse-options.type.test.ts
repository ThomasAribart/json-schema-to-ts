import { A } from "ts-toolbelt";

import { FromSchemaDefaultOptions } from "definitions";

import { ParseOptions, ParseReferences } from "./parse-options";

// ParseReferences

type StringReference = { $id: "string"; type: "string" };
type NumberReference = { $id: "number"; type: "number" };
type ObjectReference = { $id: "object"; type: "object" };
type AllReferences = [StringReference, NumberReference, ObjectReference];

type ReceivedReferences = ParseReferences<AllReferences>;
type ExpectedReferences = {
  string: StringReference;
} & {
  number: NumberReference;
} & {
  object: ObjectReference;
};

const assertReferences: A.Equals<ReceivedReferences, ExpectedReferences> = 1;
assertReferences;

// ParseOptions

type RootSchema = {};

type ReceivedOptions = ParseOptions<RootSchema, { references: AllReferences }>;
type ExpectedOptions = {
  parseNotKeyword: FromSchemaDefaultOptions["parseNotKeyword"];
  parseIfThenElseKeywords: FromSchemaDefaultOptions["parseIfThenElseKeywords"];
  deserialize: FromSchemaDefaultOptions["deserialize"];
  rootSchema: RootSchema;
  references: ParseReferences<AllReferences>;
};

const assertOptions: A.Equals<ReceivedOptions, ExpectedOptions> = 1;
assertOptions;
