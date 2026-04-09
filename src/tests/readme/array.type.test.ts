import type { A } from "ts-toolbelt";

import type { FromSchema } from "~/index";

const arraySchema = {
  type: "array",
  items: { type: "string" },
} as const;

type ReceivedArray = FromSchema<typeof arraySchema>;
type ExpectedArray = string[];

type AssertArray = A.Equals<ReceivedArray, ExpectedArray>;
const assertArray: AssertArray = 1;
assertArray;

// Fixed-length array (minItems === maxItems) should produce a tuple
const fixedLengthArraySchema = {
  type: "array",
  items: { type: "string" },
  minItems: 2,
  maxItems: 2,
} as const;

type ReceivedFixedArray = FromSchema<typeof fixedLengthArraySchema>;
type ExpectedFixedArray = [string, string];

type AssertFixedArray = A.Equals<ReceivedFixedArray, ExpectedFixedArray>;
const assertFixedArray: AssertFixedArray = 1;
assertFixedArray;

// Range array (minItems !== maxItems) should still produce T[]
const rangeArraySchema = {
  type: "array",
  items: { type: "number" },
  minItems: 1,
  maxItems: 3,
} as const;

type ReceivedRangeArray = FromSchema<typeof rangeArraySchema>;
type ExpectedRangeArray = number[];

type AssertRangeArray = A.Equals<ReceivedRangeArray, ExpectedRangeArray>;
const assertRangeArray: AssertRangeArray = 1;
assertRangeArray;
