import { FromSchema } from "index";

import { ajv } from "./ajv";

describe("Enum schemas", () => {
  describe("Empty enum", () => {
    const emptyEnumSchema = { enum: [] } as const;

    type Never = FromSchema<typeof emptyEnumSchema>;
    let neverInstance: Never;

    it("rejects any value", () => {
      // @ts-expect-error
      neverInstance = null;
      expect(() => ajv.validate(emptyEnumSchema, neverInstance)).toThrow();

      // @ts-expect-error
      neverInstance = true;
      expect(() => ajv.validate(emptyEnumSchema, neverInstance)).toThrow();

      // @ts-expect-error
      neverInstance = "string";
      expect(() => ajv.validate(emptyEnumSchema, neverInstance)).toThrow();

      // @ts-expect-error
      neverInstance = 42;
      expect(() => ajv.validate(emptyEnumSchema, neverInstance)).toThrow();

      // @ts-expect-error
      neverInstance = { foo: "bar" };
      expect(() => ajv.validate(emptyEnumSchema, neverInstance)).toThrow();

      // @ts-expect-error
      neverInstance = ["foo", "bar"];
      expect(() => ajv.validate(emptyEnumSchema, neverInstance)).toThrow();
    });
  });

  describe("Mixed", () => {
    const mixedEnumSchema = {
      enum: [null, true, 12, "tomatoe", { name: "dogo" }, ["foo", "bar"]],
    } as const;

    type Mixed = FromSchema<typeof mixedEnumSchema>;
    let mixedInstance: Mixed;

    it("accepts any listed value", () => {
      mixedInstance = null;
      expect(ajv.validate(mixedEnumSchema, mixedInstance)).toBe(true);

      mixedInstance = true;
      expect(ajv.validate(mixedEnumSchema, mixedInstance)).toBe(true);

      mixedInstance = 12;
      expect(ajv.validate(mixedEnumSchema, mixedInstance)).toBe(true);

      mixedInstance = "tomatoe";
      expect(ajv.validate(mixedEnumSchema, mixedInstance)).toBe(true);

      mixedInstance = { name: "dogo" };
      expect(ajv.validate(mixedEnumSchema, mixedInstance)).toBe(true);

      mixedInstance = ["foo", "bar"];
      expect(ajv.validate(mixedEnumSchema, mixedInstance)).toBe(true);
    });

    it("rejects other values", () => {
      // @ts-expect-error
      mixedInstance = false;
      expect(ajv.validate(mixedEnumSchema, mixedInstance)).toBe(false);

      // @ts-expect-error
      mixedInstance = 13;
      expect(ajv.validate(mixedEnumSchema, mixedInstance)).toBe(false);

      // @ts-expect-error
      mixedInstance = "apples";
      expect(ajv.validate(mixedEnumSchema, mixedInstance)).toBe(false);

      // @ts-expect-error
      mixedInstance = { name: "dingo" };
      expect(ajv.validate(mixedEnumSchema, mixedInstance)).toBe(false);

      // @ts-expect-error
      mixedInstance = ["foo", "baz"];
      expect(ajv.validate(mixedEnumSchema, mixedInstance)).toBe(false);
    });
  });

  describe("String enum", () => {
    const fruitEnumSchema = {
      type: "string",
      enum: ["apples", "tomatoes", "bananas", true],
    } as const;

    type Fruit = FromSchema<typeof fruitEnumSchema>;
    let fruitInstance: Fruit;

    it("accepts valid string", () => {
      fruitInstance = "apples";
      expect(ajv.validate(fruitEnumSchema, fruitInstance)).toBe(true);

      fruitInstance = "tomatoes";
      expect(ajv.validate(fruitEnumSchema, fruitInstance)).toBe(true);

      fruitInstance = "bananas";
      expect(ajv.validate(fruitEnumSchema, fruitInstance)).toBe(true);
    });

    it("rejects other values", () => {
      // @ts-expect-error
      fruitInstance = true;
      expect(ajv.validate(fruitEnumSchema, true)).toBe(false);

      // @ts-expect-error
      fruitInstance = 42;
      expect(ajv.validate(fruitEnumSchema, true)).toBe(false);
    });
  });

  describe("Number enum", () => {
    const numberEnumSchema = {
      type: "number",
      enum: [13, 42, { not: "a number" }],
    } as const;

    type Number = FromSchema<typeof numberEnumSchema>;
    let numberInstance: Number;

    it("accepts valid number", () => {
      numberInstance = 13;
      expect(ajv.validate(numberEnumSchema, numberInstance)).toBe(true);

      numberInstance = 42;
      expect(ajv.validate(numberEnumSchema, numberInstance)).toBe(true);
    });

    it("rejects other values", () => {
      // @ts-expect-error
      numberInstance = { not: "a number" };
      expect(ajv.validate(numberEnumSchema, numberInstance)).toBe(false);
    });
  });

  describe("Tuple enum", () => {
    const recipeEnumSchema = {
      type: "array",
      enum: [
        [0, "pasta", { descr: "Italian meal" }],
        [1, "pizza", { descr: "A delicious pizza" }, ["tomatoes", "cheese"]],
        { not: "a recipe" },
      ],
    } as const;

    type Recipe = FromSchema<typeof recipeEnumSchema>;
    let recipe: Recipe;

    it("accepts valid tuples", () => {
      recipe = [0, "pasta", { descr: "Italian meal" }];
      expect(ajv.validate(recipeEnumSchema, recipe)).toBe(true);

      recipe = [
        1,
        "pizza",
        { descr: "A delicious pizza" },
        ["tomatoes", "cheese"],
      ];
      expect(ajv.validate(recipeEnumSchema, recipe)).toBe(true);
    });

    it("rejects other values", () => {
      // @ts-expect-error
      recipe = { not: "a recipe" };
      expect(ajv.validate(recipeEnumSchema, recipe)).toBe(false);

      // @ts-expect-error
      recipe = ["not", "a", "recipe"];
      expect(ajv.validate(recipeEnumSchema, recipe)).toBe(false);
    });
  });

  describe("Object enum", () => {
    const catEnumSchema = {
      type: "object",
      enum: [
        { name: "Garfield", age: 13 },
        { name: "Billy", age: 5 },
        "not a cat",
      ],
    } as const;

    type Cat = FromSchema<typeof catEnumSchema>;
    let catInstance: Cat;

    it("accepts valid objects", () => {
      catInstance = { name: "Garfield", age: 13 };
      expect(ajv.validate(catEnumSchema, catInstance)).toBe(true);

      catInstance = { name: "Billy", age: 5 };
      expect(ajv.validate(catEnumSchema, catInstance)).toBe(true);
    });

    it("rejects invalid object", () => {
      // @ts-expect-error
      catInstance = { name: "Billy", age: 6 };
      expect(ajv.validate(catEnumSchema, catInstance)).toBe(false);
    });

    it("rejects non-object values", () => {
      // @ts-expect-error
      catInstance = "not a cat";
      expect(ajv.validate(catEnumSchema, catInstance)).toBe(false);

      // @ts-expect-error
      catInstance = 42;
      expect(ajv.validate(catEnumSchema, catInstance)).toBe(false);
    });
  });

  describe("TS enums", () => {
    enum Food {
      Pizza = "Pizza",
      Tacos = "Tacos",
      Fries = "Fries",
    }

    it("infers correct partial enum", () => {
      const pizzaTacosSchema = {
        enum: [Food.Pizza, Food.Tacos],
      } as const;

      type PizzaTacos = FromSchema<typeof pizzaTacosSchema>;
      let pizzaOrTacos: PizzaTacos;

      pizzaOrTacos = Food.Pizza;
      expect(ajv.validate(pizzaTacosSchema, pizzaOrTacos)).toBe(true);

      pizzaOrTacos = Food.Tacos;
      expect(ajv.validate(pizzaTacosSchema, pizzaOrTacos)).toBe(true);

      // @ts-expect-error
      pizzaOrTacos = Food.Fries;
      expect(ajv.validate(pizzaTacosSchema, pizzaOrTacos)).toBe(false);
    });

    it("reconstructs whole enum", () => {
      const foodSchema = {
        enum: Object.values(Food),
      };

      type FoodType = FromSchema<typeof foodSchema>;
      let food: FoodType;

      food = Food.Pizza;
      expect(ajv.validate(foodSchema, food)).toBe(true);

      food = Food.Tacos;
      expect(ajv.validate(foodSchema, food)).toBe(true);

      food = Food.Fries;
      expect(ajv.validate(foodSchema, food)).toBe(true);

      // @ts-expect-error
      food = "Not a food";
      expect(ajv.validate(foodSchema, food)).toBe(false);
    });
  });

  describe("TS enums (with type)", () => {
    enum Food {
      Pizza = "Pizza",
      Tacos = "Tacos",
      Fries = "Fries",
    }

    it("infers correct enum", () => {
      const foodSchema = {
        type: "string",
        enum: Object.values(Food),
      } as const;

      type FoodType = FromSchema<typeof foodSchema>;
      let food: FoodType;

      food = Food.Pizza;
      expect(ajv.validate(foodSchema, food)).toBe(true);

      food = Food.Tacos;
      expect(ajv.validate(foodSchema, food)).toBe(true);

      food = Food.Fries;
      expect(ajv.validate(foodSchema, food)).toBe(true);

      // @ts-expect-error
      food = "Not a food";
      expect(ajv.validate(foodSchema, food)).toBe(false);
    });
  });
});
