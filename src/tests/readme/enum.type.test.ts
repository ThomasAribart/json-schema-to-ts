import type { A } from "ts-toolbelt";

import type { FromSchema } from "~/index";

// Simple enum

const enumSchema = {
  enum: [true, 42, { foo: "bar" }],
} as const;

type ReceivedEnum = FromSchema<typeof enumSchema>;
type ExpectedEnum = true | 42 | { foo: "bar" };

type AssertEnum = A.Equals<ReceivedEnum, ExpectedEnum>;
const assertEnum: AssertEnum = 1;
assertEnum;

// TS enum

enum Food {
  Pizza = "pizza",
  Taco = "taco",
  Fries = "fries",
}

const foodSchema = {
  enum: Object.values(Food),
} as const;

type ReceivedFood = FromSchema<typeof foodSchema>;
type ExpectedFood = Food;

// Don't know why, A.Equals<ReceivedFood, ExpectedFood> returns false..
type AssertFoodLeft = A.Extends<ReceivedFood, ExpectedFood>;
const assertFoodLeft: AssertFoodLeft = 1;
assertFoodLeft;
type AssertFoodRight = A.Extends<ExpectedFood, ReceivedFood>;
const assertFoodRight: AssertFoodRight = 1;
assertFoodRight;
