import { A } from "ts-toolbelt";

import { FromSchema } from "index";

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
