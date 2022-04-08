import { FromSchema } from "index";

import { ajv } from "./ajv";

describe("Const schemas", () => {
  describe("Null", () => {
    const null1Schema = {
      const: null,
    } as const;

    const null2Schema = {
      type: "null",
      const: null,
    } as const;

    type Null1 = FromSchema<typeof null1Schema>;
    let null1Instance: Null1;

    type Null2 = FromSchema<typeof null2Schema>;
    let null2Instance: Null2;

    it("accepts null", () => {
      null1Instance = null;
      expect(ajv.validate(null1Schema, null1Instance)).toBe(true);

      null2Instance = null;
      expect(ajv.validate(null2Schema, null2Instance)).toBe(true);
    });

    it("rejects other values", () => {
      // @ts-expect-error
      null1Instance = "not null";
      expect(ajv.validate(null1Schema, null1Instance)).toBe(false);

      // @ts-expect-error
      null2Instance = 42;
      expect(ajv.validate(null2Schema, null2Instance)).toBe(false);
    });

    it('returns never if "type" and "const" are incompatible', () => {
      const invalidSchema = {
        type: "string",
        const: null,
      } as const;

      type Never = FromSchema<typeof invalidSchema>;
      let neverInstance: Never;

      // @ts-expect-error
      neverInstance = null;
      expect(ajv.validate(false, neverInstance)).toBe(false);

      // @ts-expect-error
      neverInstance = true;
      expect(ajv.validate(false, neverInstance)).toBe(false);

      // @ts-expect-error
      neverInstance = "string";
      expect(ajv.validate(false, neverInstance)).toBe(false);

      // @ts-expect-error
      neverInstance = 42;
      expect(ajv.validate(false, neverInstance)).toBe(false);

      // @ts-expect-error
      neverInstance = { foo: "bar" };
      expect(ajv.validate(false, neverInstance)).toBe(false);

      // @ts-expect-error
      neverInstance = ["foo", "bar"];
      expect(ajv.validate(false, neverInstance)).toBe(false);
    });
  });
});

describe("Boolean", () => {
  it("only validates true", () => {
    const trueSchema = {
      const: true,
    } as const;

    type True = FromSchema<typeof trueSchema>;
    let trueInstance: True;

    trueInstance = true;
    expect(ajv.validate(trueSchema, trueInstance)).toBe(true);

    // @ts-expect-error
    trueInstance = false;
    expect(ajv.validate(trueSchema, trueInstance)).toBe(false);

    // @ts-expect-error
    trueInstance = "true";
    expect(ajv.validate(trueSchema, trueInstance)).toBe(false);
  });

  it("should only validate false (with added type)", () => {
    const falseSchema = {
      type: "boolean",
      const: false,
    } as const;

    type False = FromSchema<typeof falseSchema>;
    let falseInstance: False;

    falseInstance = false;
    expect(ajv.validate(falseSchema, falseInstance)).toBe(true);

    // @ts-expect-error
    falseInstance = true;
    expect(ajv.validate(falseSchema, falseInstance)).toBe(false);

    // @ts-expect-error
    falseInstance = "false";
    expect(ajv.validate(falseSchema, falseInstance)).toBe(false);
  });
});

describe("String", () => {
  const applesSchema = {
    const: "apples",
  } as const;

  type Apples = FromSchema<typeof applesSchema>;
  let applesInstance: Apples;

  it("accepts 'apples'", () => {
    applesInstance = "apples";
    expect(ajv.validate(applesSchema, applesInstance)).toBe(true);
  });

  it("rejects invalid string", () => {
    // @ts-expect-error
    applesInstance = "tomatoes";
    expect(ajv.validate(applesSchema, applesInstance)).toBe(false);
  });

  it("rejects other values", () => {
    // @ts-expect-error
    applesInstance = 42;
    expect(ajv.validate(applesSchema, applesInstance)).toBe(false);
  });

  const tomatoesSchema = {
    type: "string",
    const: "tomatoes",
  } as const;

  type Tomatoes = FromSchema<typeof tomatoesSchema>;
  let tomatoesInstance: Tomatoes;

  it("accepts 'tomatoes' (with added type)", () => {
    tomatoesInstance = "tomatoes";
    expect(ajv.validate(tomatoesSchema, tomatoesInstance)).toBe(true);
  });

  it("rejects invalid string (with added type)", () => {
    // @ts-expect-error
    tomatoesInstance = "apples";
    expect(ajv.validate(tomatoesSchema, tomatoesInstance)).toBe(false);
  });
});

describe("Integer", () => {
  const fortyTwoSchema = {
    const: 42,
  } as const;

  type FortyTwo = FromSchema<typeof fortyTwoSchema>;
  let fortyTwoInstance: FortyTwo;

  it("accepts 42", () => {
    fortyTwoInstance = 42;
    expect(ajv.validate(fortyTwoSchema, fortyTwoInstance)).toBe(true);
  });

  it("rejects other number", () => {
    // @ts-expect-error
    fortyTwoInstance = 43;
    expect(ajv.validate(fortyTwoSchema, fortyTwoInstance)).toBe(false);
  });

  it("rejects other values", () => {
    // @ts-expect-error
    fortyTwoInstance = "42";
    expect(ajv.validate(fortyTwoSchema, fortyTwoInstance)).toBe(false);
  });
});

describe("Object", () => {
  const dogoSchema = {
    const: { name: "Dogo", age: 13, hobbies: ["barking", "urinating"] },
  } as const;

  type Dogo = FromSchema<typeof dogoSchema>;
  let dogoInstance: Dogo;

  it("accepts correct object", () => {
    dogoInstance = { name: "Dogo", age: 13, hobbies: ["barking", "urinating"] };
    expect(ajv.validate(dogoSchema, dogoInstance)).toBe(true);
  });

  it("rejects invalid object", () => {
    // @ts-expect-error
    dogoInstance = { name: "Doga", age: 13, hobbies: ["barking", "urinating"] };
    expect(ajv.validate(dogoSchema, dogoInstance)).toBe(false);
  });
});

describe("Array", () => {
  const pizzaRecipe = [
    1,
    "pizza",
    { description: "A delicious pizza" },
    ["tomatoes", "cheese"],
  ] as [
    1,
    "pizza",
    { description: "A delicious pizza" },
    ["tomatoes", "cheese"]
  ];

  const pizzaRecipeSchema = {
    const: pizzaRecipe,
  } as const;

  type PizzaRecipe = FromSchema<typeof pizzaRecipeSchema>;
  let pizzaRecipeInstance: PizzaRecipe;

  it("accepts valid array", () => {
    pizzaRecipeInstance = pizzaRecipe;
    expect(ajv.validate(pizzaRecipeSchema, pizzaRecipeInstance)).toBe(true);
  });

  it("rejects invalid array", () => {
    pizzaRecipeInstance = [
      // @ts-expect-error
      2,
      "pizza",
      { description: "A delicious pizza" },
      ["tomatoes", "cheese"],
    ];
    expect(ajv.validate(pizzaRecipeSchema, pizzaRecipeInstance)).toBe(false);
  });
});
