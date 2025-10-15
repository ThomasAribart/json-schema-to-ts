import type { A } from "ts-toolbelt";

import type { FromSchemaDefaultOptions } from "~/definitions";

import type { IndexReferencesById, ParseOptions } from "./parse-options";

// ParseReferences

type StringReference = { $id: "string"; type: "string" };
type NumberReference = { $id: "number"; type: "number" };
type ObjectReference = { $id: "object"; type: "object" };
type AllReferences = [StringReference, NumberReference, ObjectReference];

type ReceivedReferences = IndexReferencesById<AllReferences>;
type ExpectedReferences = {
  string: StringReference;
  number: NumberReference;
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
  keepDefaultedPropertiesOptional: FromSchemaDefaultOptions["keepDefaultedPropertiesOptional"];
  deserialize: FromSchemaDefaultOptions["deserialize"];
  rootSchema: RootSchema;
  references: IndexReferencesById<AllReferences>;
  omitAdditionalProperties: FromSchemaDefaultOptions["omitAdditionalProperties"];
};

const assertOptions: A.Equals<ReceivedOptions, ExpectedOptions> = 1;
assertOptions;
