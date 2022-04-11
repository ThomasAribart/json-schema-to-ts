import { A } from "ts-toolbelt";

import { FromSchema } from "index";

// With additional items

const tupleWithAdditionalItemsSchema = {
  type: "array",
  items: [{ type: "boolean" }, { type: "string" }],
} as const;

type ReceivedTupleWithAdditionalItems = FromSchema<
  typeof tupleWithAdditionalItemsSchema
>;
type ExpectedTupleWithAdditionalItems =
  | []
  | [boolean]
  | [boolean, string]
  | [boolean, string, ...unknown[]];

type AssertTupleWithAdditionalItems = A.Equals<
  ReceivedTupleWithAdditionalItems,
  ExpectedTupleWithAdditionalItems
>;
const assertTupleWithAdditionalItems: AssertTupleWithAdditionalItems = 1;
assertTupleWithAdditionalItems;

// No additional items

const tupleWithoutAdditionalItemsSchema = {
  type: "array",
  items: [{ type: "boolean" }, { type: "string" }],
  additionalItems: false,
} as const;

type ReceivedTupleWithoutAdditionalItems = FromSchema<
  typeof tupleWithoutAdditionalItemsSchema
>;
type ExpectedTupleWithoutAdditionalItems = [] | [boolean] | [boolean, string];

type AssertTupleWithoutAdditionalItems = A.Equals<
  ReceivedTupleWithoutAdditionalItems,
  ExpectedTupleWithoutAdditionalItems
>;
const assertTupleWithoutAdditionalItems: AssertTupleWithoutAdditionalItems = 1;
assertTupleWithoutAdditionalItems;

// Typed additional items

const tupleWithTypedAdditionalItemsSchema = {
  type: "array",
  items: [{ type: "boolean" }, { type: "string" }],
  additionalItems: { type: "number" },
} as const;

type ReceivedTupleWithTypedAdditionalItems = FromSchema<
  typeof tupleWithTypedAdditionalItemsSchema
>;
type ExpectedTupleWithTypedAdditionalItems =
  | []
  | [boolean]
  | [boolean, string]
  | [boolean, string, ...number[]];

type AssertTupleWithTypedAdditionalItems = A.Equals<
  ReceivedTupleWithTypedAdditionalItems,
  ExpectedTupleWithTypedAdditionalItems
>;
const assertTupleWithTypedAdditionalItems: AssertTupleWithTypedAdditionalItems = 1;
assertTupleWithTypedAdditionalItems;

// Min & max items

const tupleWithMinAndMaxLengthSchema = {
  type: "array",
  items: [{ type: "boolean" }, { type: "string" }],
  minItems: 1,
  maxItems: 2,
} as const;

type ReceivedTupleWithMinAndMaxLength = FromSchema<
  typeof tupleWithMinAndMaxLengthSchema
>;
type ExpectedTupleWithMinAndMaxLength = [boolean] | [boolean, string];

type AssertTupleWithMinAndMaxLength = A.Equals<
  ReceivedTupleWithMinAndMaxLength,
  ExpectedTupleWithMinAndMaxLength
>;
const assertTupleWithMinAndMaxLength: AssertTupleWithMinAndMaxLength = 1;
assertTupleWithMinAndMaxLength;
