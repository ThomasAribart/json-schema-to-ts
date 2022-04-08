import { A } from "ts-toolbelt";

import { FromSchema } from "index";

const petSchema = {
  type: "object",
  properties: {
    animal: { enum: ["cat", "dog"] },
    dogBreed: { enum: ["poodle"] },
    catBreed: { enum: ["persan"] },
  },
  required: ["animal"],
  additionalProperties: false,
  if: {
    properties: {
      animal: { const: "dog" },
    },
  },
  then: {
    required: ["dogBreed"],
    not: { required: ["catBreed"] },
  },
  else: {
    required: ["catBreed"],
    not: { required: ["dogBreed"] },
  },
} as const;

type ReceivedPet = FromSchema<
  typeof petSchema,
  { parseIfThenElseKeywords: true }
>;
type ExpectedPet =
  | {
      catBreed?: "persan" | undefined;
      animal: "dog";
      dogBreed: "poodle";
    }
  | {
      dogBreed?: "poodle" | undefined;
      animal: "cat" | "dog";
      catBreed: "persan";
    };

type AssertPet = A.Equals<ReceivedPet, ExpectedPet>;
const assertPet: AssertPet = 1;
assertPet;
