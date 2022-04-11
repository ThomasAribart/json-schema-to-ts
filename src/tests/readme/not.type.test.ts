import { A } from "ts-toolbelt";

import { FromSchema } from "index";

// Tuple

const tupleSchema = {
  type: "array",
  items: [{ const: 1 }, { const: 2 }],
  additionalItems: false,
  not: {
    const: [1],
  },
} as const;

type ReceivedTuple = FromSchema<typeof tupleSchema, { parseNotKeyword: true }>;
type ExpectedTuple = [] | [1, 2];

type AssertTuple = A.Equals<ReceivedTuple, ExpectedTuple>;
const assertTuple: AssertTuple = 1;
assertTuple;

// Primitive

const primitiveTypeSchema = {
  not: {
    type: ["array", "object"],
  },
} as const;

type ReceivedPrimitive = FromSchema<
  typeof primitiveTypeSchema,
  { parseNotKeyword: true }
>;
type ExpectedPrimitive = null | boolean | number | string;

type AssertPrimitive = A.Equals<ReceivedPrimitive, ExpectedPrimitive>;
const assertPrimitive: AssertPrimitive = 1;
assertPrimitive;

// Propagatable object exclusion

const petSchema = {
  type: "object",
  properties: {
    animal: { enum: ["cat", "dog", "boat"] },
  },
  not: {
    properties: { animal: { const: "boat" } },
  },
  required: ["animal"],
  additionalProperties: false,
} as const;

type ReceivedPet = FromSchema<typeof petSchema, { parseNotKeyword: true }>;
type ExpectedPet = { animal: "cat" | "dog" };

type AssertPet = A.Equals<ReceivedPet, ExpectedPet>;
const assertPet: AssertPet = 1;
assertPet;

// Propagatable

const petSchema2 = {
  type: "object",
  properties: {
    animal: { enum: ["cat", "dog"] },
    color: { enum: ["black", "brown", "white"] },
  },
  not: {
    const: { animal: "cat", color: "white" },
  },
  required: ["animal", "color"],
  additionalProperties: false,
} as const;

type ReceivedPet2 = FromSchema<typeof petSchema2, { parseNotKeyword: true }>;
type ExpectedPet2 = {
  animal: "cat" | "dog";
  color: "black" | "brown" | "white";
};

type AssertPet2 = A.Equals<ReceivedPet2, ExpectedPet2>;
const assertPet2: AssertPet2 = 1;
assertPet2;

// Number

const oddNumberSchema = {
  type: "number",
  not: { multipleOf: 2 },
} as const;

type ReceivedOddNumber = FromSchema<
  typeof oddNumberSchema,
  { parseNotKeyword: true }
>;
type ExpectedOddNumber = number;

type AssertOddNumber = A.Equals<ReceivedOddNumber, ExpectedOddNumber>;
const assertOddNumber: AssertOddNumber = 1;
assertOddNumber;

// Incorrect

const incorrectSchema = {
  type: "number",
  not: { bogus: "option" },
} as const;

type ReceivedIncorrect = FromSchema<
  // @ts-expect-error
  typeof incorrectSchema,
  { parseNotKeyword: true }
>;
type ExpectedIncorrect = unknown;

type AssertIncorrect = A.Equals<ReceivedIncorrect, ExpectedIncorrect>;
const assertIncorrect: AssertIncorrect = 1;
assertIncorrect;

// Refinment types

const goodLanguageSchema = {
  type: "string",
  not: {
    enum: ["Bummer", "Silly", "Lazy sod !"],
  },
} as const;

type ReceivedGoodLanguage = FromSchema<
  typeof goodLanguageSchema,
  { parseNotKeyword: true }
>;
type ExpectedGoodLanguage = string;

type AssertGoodLanguage = A.Equals<ReceivedGoodLanguage, ExpectedGoodLanguage>;
const assertGoodLanguage: AssertGoodLanguage = 1;
assertGoodLanguage;
