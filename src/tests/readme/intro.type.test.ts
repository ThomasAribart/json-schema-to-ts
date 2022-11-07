import type { A } from "ts-toolbelt";

import type { FromSchema } from "index";
import { asConst } from "utils/asConst";

// Dog

const dogSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
    hobbies: { type: "array", items: { type: "string" } },
    favoriteFood: { enum: ["pizza", "taco", "fries"] },
  },
  required: ["name", "age"],
} as const;

type ReceivedDog = FromSchema<typeof dogSchema>;
type ExpectedDog = {
  [key: string]: unknown;
  hobbies?: string[];
  favoriteFood?: "pizza" | "taco" | "fries";
  name: string;
  age: number;
};

type AssertDog = A.Equals<ReceivedDog, ExpectedDog>;
const assertDog: AssertDog = 1;
assertDog;

// With asConst util

const dogSchemaB = asConst({
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
    hobbies: { type: "array", items: { type: "string" } },
    favoriteFood: { enum: ["pizza", "taco", "fries"] },
  },
  required: ["name", "age"],
});

type ReceivedDog2 = FromSchema<typeof dogSchemaB>;

type AssertDog2 = A.Equals<ReceivedDog2, ExpectedDog>;
const assertDog2: AssertDog2 = 1;
assertDog2;

// Address (impossible schema)

const addressSchema = {
  type: "object",
  allOf: [
    {
      properties: {
        street: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
      },
      required: ["street", "city", "state"],
    },
    {
      properties: {
        type: { enum: ["residential", "business"] },
      },
    },
  ],
  additionalProperties: false,
} as const;

type ReceivedAddress = FromSchema<typeof addressSchema>;
type ExpectedAddress = never;

type AssertAddress = A.Equals<ReceivedAddress, ExpectedAddress>;
const assertAddress: AssertAddress = 1;
assertAddress;
