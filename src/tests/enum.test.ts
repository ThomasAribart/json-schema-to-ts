import Ajv from "ajv";

import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import { expectInstances } from "./helpers";

var ajv = new Ajv();

it("should validate instance listed in enum (mixed)", () => {
  const mixedEnumSchema = {
    enum: [null, true, 12, "tomatoe", { name: "dogo" }, ["foo", "bar"]],
  } as const;

  type Mixed = FromSchema<typeof mixedEnumSchema>;
  let assertMixed: DoesBothExtend<
    Mixed,
    null | true | 12 | "tomatoe" | { name: "dogo" } | ["foo", "bar"]
  >;
  assertMixed = true;

  let mixed: Mixed;
  mixed = null;
  expect(ajv.validate(mixedEnumSchema, mixed)).toBe(true);

  mixed = true;
  expect(ajv.validate(mixedEnumSchema, mixed)).toBe(true);

  mixed = 12;
  expect(ajv.validate(mixedEnumSchema, mixed)).toBe(true);

  mixed = "tomatoe";
  expect(ajv.validate(mixedEnumSchema, mixed)).toBe(true);

  mixed = { name: "dogo" };
  expect(ajv.validate(mixedEnumSchema, mixed)).toBe(true);

  mixed = ["foo", "bar"];
  expect(ajv.validate(mixedEnumSchema, mixed)).toBe(true);

  expectInstances
    .allExcept(["lNull", "booleanTrue"])
    .toBeInvalidAgainst(mixedEnumSchema);
});

it("should only validate listed string fruits (string enum)", () => {
  const fruitEnumSchema = {
    type: "string",
    enum: ["apples", "tomatoes", "bananas", true],
  } as const;

  type Fruit = FromSchema<typeof fruitEnumSchema>;
  let assertFruit: DoesBothExtend<Fruit, "apples" | "tomatoes" | "bananas">;
  assertFruit = true;

  let fruitInstance: Fruit;
  fruitInstance = "apples";
  expect(ajv.validate(fruitEnumSchema, fruitInstance)).toBe(true);

  fruitInstance = "tomatoes";
  expect(ajv.validate(fruitEnumSchema, fruitInstance)).toBe(true);

  fruitInstance = "bananas";
  expect(ajv.validate(fruitEnumSchema, fruitInstance)).toBe(true);

  expect(ajv.validate(fruitEnumSchema, true)).toBe(false);

  expectInstances
    .allExcept(["stringApples", "stringTomatoes"])
    .toBeInvalidAgainst(fruitEnumSchema);
});

it("should only validate listed numbers fruits (number enum)", () => {
  const numberEnumSchema = {
    type: "number",
    enum: [13, 42, { bad: "entry" }],
  } as const;

  type Number = FromSchema<typeof numberEnumSchema>;
  let assertNumber: DoesBothExtend<Number, 13 | 42>;
  assertNumber = true;

  let numberInstance: Number;
  numberInstance = 13;
  expect(ajv.validate(numberEnumSchema, numberInstance)).toBe(true);

  numberInstance = 42;
  expect(ajv.validate(numberEnumSchema, numberInstance)).toBe(true);

  expect(ajv.validate(numberEnumSchema, { bad: "entry" })).toBe(false);

  expectInstances.allExcept(["number42"]).toBeInvalidAgainst(numberEnumSchema);
});

it("should only validate listed cats (object enum)", () => {
  const catEnumSchema = {
    type: "object",
    enum: [
      { name: "Garfield", age: 13 },
      { name: "Billy", age: 5 },
      "testString",
    ],
  } as const;

  type Cat = FromSchema<typeof catEnumSchema>;
  let assertCat: DoesBothExtend<
    Cat,
    { name: "Garfield"; age: 13 } | { name: "Billy"; age: 5 }
  >;
  assertCat = true;

  let cat: Cat;
  cat = { name: "Garfield", age: 13 };
  expect(ajv.validate(catEnumSchema, cat)).toBe(true);

  cat = { name: "Billy", age: 5 };
  expect(ajv.validate(catEnumSchema, cat)).toBe(true);

  expectInstances.allExcept(["object2"]).toBeInvalidAgainst(catEnumSchema);
});

it("should only validate listed recipes (tuple enum)", () => {
  const recipeEnumSchema = {
    type: "array",
    enum: [
      [0, "pasta", { description: "Italian meal" }],
      [
        1,
        "pizza",
        { description: "A delicious pizza" },
        ["tomatoes", "cheese"],
      ],
      { bad: "entry" },
    ],
  } as const;

  type Recipe = FromSchema<typeof recipeEnumSchema>;
  let assertRecipe: DoesBothExtend<
    Recipe,
    | [0, "pasta", { description: "Italian meal" }]
    | [1, "pizza", { description: "A delicious pizza" }, ["tomatoes", "cheese"]]
  >;
  assertRecipe = true;

  let recipe: Recipe;
  recipe = [0, "pasta", { description: "Italian meal" }];
  expect(ajv.validate(recipeEnumSchema, recipe)).toBe(true);

  recipe = [
    1,
    "pizza",
    { description: "A delicious pizza" },
    ["tomatoes", "cheese"],
  ];
  expect(ajv.validate(recipeEnumSchema, recipe)).toBe(true);

  expectInstances
    .allExcept(["arrayTuple1", "arrayTuple2"])
    .toBeInvalidAgainst(recipeEnumSchema);
});

it("should display an TypeError message if enum is not an array", () => {
  const badSchema = {
    enum: { not: "an array" },
  } as const;

  type Error = FromSchema<typeof badSchema>;
  let assertError: DoesBothExtend<
    Error,
    "TypeError: value of enum should be an array"
  >;
  assertError = true;
});

it("should work on TS enums", () => {
  enum Food {
    Pizza = "Pizza",
    Tacos = "Tacos",
    Fries = "Fries",
  }

  const pizzaTacosSchema = {
    enum: [Food.Pizza, Food.Tacos],
  } as const;

  type PizzaTacos = FromSchema<typeof pizzaTacosSchema>;
  let assertPizzaTacos: DoesBothExtend<PizzaTacos, Food.Pizza | Food.Tacos>;
  assertPizzaTacos = true;

  const foodSchema = {
    enum: Object.values(Food),
  };

  type FoodType = FromSchema<typeof foodSchema>;
  let assertFood: DoesBothExtend<FoodType, Food>;
  assertFood = true;
});
