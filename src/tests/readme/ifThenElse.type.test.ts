import type { A } from "ts-toolbelt";

import type { FromSchema } from "~/index";

enum DogBreed {
  poodle = "poodle",
}

enum CatBreed {
  persan = "persan",
}

const petSchema = {
  type: "object",
  properties: {
    animal: { enum: ["cat", "dog"] },
    dogBreed: { enum: Object.values(DogBreed) },
    catBreed: { enum: Object.values(CatBreed) },
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
      animal: "dog";
      dogBreed: DogBreed;
      catBreed?: CatBreed | undefined;
    }
  | {
      animal: "cat";
      catBreed: CatBreed;
      dogBreed?: DogBreed | undefined;
    };

type AssertPet = A.Equals<ReceivedPet, ExpectedPet>;
const assertPet: AssertPet = 1;
assertPet;
