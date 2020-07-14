import Ajv from "ajv";

import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import * as instances from "./instances";
import { expectInstances } from "./helpers";

var ajv = new Ajv();

describe("null const", () => {
  it("should only validate null", () => {
    const nullSchema = {
      const: null,
    } as const;

    type Null = FromSchema<typeof nullSchema>;
    let assertNull: DoesBothExtend<Null, null>;
    assertNull = true;

    let nullInstance: Null;
    nullInstance = instances.lNull;
    expect(ajv.validate(nullSchema, nullInstance)).toBe(true);

    expectInstances.allExcept(["lNull"]).toBeInvalidAgainst(nullSchema);
  });

  it("should only validate null (with added type)", () => {
    const nullSchema = {
      type: "null",
      const: null,
    } as const;

    type Null = FromSchema<typeof nullSchema>;
    let assertNull: DoesBothExtend<Null, null>;
    assertNull = true;

    let nullInstance: Null;
    nullInstance = instances.lNull;
    expect(ajv.validate(nullSchema, nullInstance)).toBe(true);

    expectInstances.allExcept(["lNull"]).toBeInvalidAgainst(nullSchema);
  });

  it("should not work with other type (string)", () => {
    const invalidSchema = {
      type: "string",
      const: null,
    } as const;

    expectInstances.allExcept([]).toBeInvalidAgainst(invalidSchema);
  });
});

describe("boolean const", () => {
  it("should only validate true", () => {
    const trueSchema = {
      const: true,
    } as const;

    type True = FromSchema<typeof trueSchema>;
    let assertTrue: DoesBothExtend<True, true>;
    assertTrue = true;

    let trueInstance: True;
    trueInstance = instances.booleanTrue;
    expect(ajv.validate(trueSchema, trueInstance)).toBe(true);

    expectInstances.allExcept(["booleanTrue"]).toBeInvalidAgainst(trueSchema);
  });

  it("should only validate false (with added type)", () => {
    const falseSchema = {
      type: "boolean",
      const: false,
    } as const;

    type False = FromSchema<typeof falseSchema>;
    let assertFalse: DoesBothExtend<False, false>;
    assertFalse = true;

    let falseInstance: False;
    falseInstance = instances.booleanFalse;
    expect(ajv.validate(falseSchema, falseInstance)).toBe(true);

    expectInstances.allExcept(["booleanFalse"]).toBeInvalidAgainst(falseSchema);
  });

  it("should not work with other type (string)", () => {
    const invalidSchema = {
      type: "string",
      const: true,
    } as const;

    expectInstances.allExcept([]).toBeInvalidAgainst(invalidSchema);
  });
});

describe("string const", () => {
  it("should only validate correct string", () => {
    const applesSchema = {
      const: "apples",
    } as const;

    type Apples = FromSchema<typeof applesSchema>;
    let assertApples: DoesBothExtend<Apples, "apples">;
    assertApples = true;

    let applesInstance: Apples;
    applesInstance = instances.stringApples;
    expect(ajv.validate(applesSchema, applesInstance)).toBe(true);

    expectInstances
      .allExcept(["stringApples"])
      .toBeInvalidAgainst(applesSchema);
  });

  it("should only validate correct string (with added type)", () => {
    const tomatoesSchema = {
      type: "string",
      const: "tomatoes",
    } as const;

    type Tomatoes = FromSchema<typeof tomatoesSchema>;
    let assertTomatoes: DoesBothExtend<Tomatoes, "tomatoes">;
    assertTomatoes = true;

    let tomatoesInstance: Tomatoes;
    tomatoesInstance = instances.stringTomatoes;
    expect(ajv.validate(tomatoesSchema, tomatoesInstance)).toBe(true);

    expectInstances
      .allExcept(["stringTomatoes"])
      .toBeInvalidAgainst(tomatoesSchema);
  });

  it("should not work with other type (integer)", () => {
    const invalidSchema = {
      type: "integer",
      const: true,
    } as const;

    expectInstances.allExcept([]).toBeInvalidAgainst(invalidSchema);
  });
});

describe("integer const", () => {
  it("should only validate 42", () => {
    const fortyTwoSchema = {
      const: 42,
    } as const;

    type FortyTwo = FromSchema<typeof fortyTwoSchema>;
    let assertFortyTwo: DoesBothExtend<FortyTwo, 42>;
    assertFortyTwo = true;

    let fortyTwoInstance: FortyTwo;
    fortyTwoInstance = instances.number42;
    expect(ajv.validate(fortyTwoSchema, fortyTwoInstance)).toBe(true);

    expectInstances.allExcept(["number42"]).toBeInvalidAgainst(fortyTwoSchema);
  });

  it("should only validate 43 (with added type)", () => {
    const fortyThreeSchema = {
      type: "integer",
      const: 43,
    } as const;

    type FortyThree = FromSchema<typeof fortyThreeSchema>;
    let assertFortyThree: DoesBothExtend<FortyThree, 43>;
    assertFortyThree = true;

    let fortyThreeInstance: FortyThree;
    fortyThreeInstance = instances.number43;
    expect(ajv.validate(fortyThreeSchema, fortyThreeInstance)).toBe(true);

    expectInstances
      .allExcept(["number43"])
      .toBeInvalidAgainst(fortyThreeSchema);
  });

  it("should not work with other type (object)", () => {
    const invalidSchema = {
      type: "object",
      const: 42,
    } as const;

    expectInstances.allExcept([]).toBeInvalidAgainst(invalidSchema);
  });
});

describe("number const", () => {
  it("should only validate 42.5", () => {
    const fortyTwoHalfSchema = {
      const: 42.5,
    } as const;

    type FortyTwoHalf = FromSchema<typeof fortyTwoHalfSchema>;
    let assertFortyTwoHalf: DoesBothExtend<FortyTwoHalf, 42.5>;
    assertFortyTwoHalf = true;

    let fortyTwoHalfInstance: FortyTwoHalf;
    fortyTwoHalfInstance = instances.number42half;
    expect(ajv.validate(fortyTwoHalfSchema, fortyTwoHalfInstance)).toBe(true);

    expectInstances
      .allExcept(["number42half"])
      .toBeInvalidAgainst(fortyTwoHalfSchema);
  });

  it("should only validate 42.5 (with added type)", () => {
    const fortyTwoHalfSchema = {
      type: "number",
      const: 42.5 as 42.5,
    } as const;

    type FortyTwoHalf = FromSchema<typeof fortyTwoHalfSchema>;
    let assertFortyTwoHalf: DoesBothExtend<FortyTwoHalf, 42.5>;
    assertFortyTwoHalf = true;

    let fortyTwoHalfInstance: FortyTwoHalf;
    fortyTwoHalfInstance = instances.number42half;
    expect(ajv.validate(fortyTwoHalfSchema, fortyTwoHalfInstance)).toBe(true);

    expectInstances
      .allExcept(["number42half"])
      .toBeInvalidAgainst(fortyTwoHalfSchema);
  });

  it("should not work with other type (object)", () => {
    const invalidSchema = {
      type: "object",
      const: 42.5,
    } as const;

    expectInstances.allExcept([]).toBeInvalidAgainst(invalidSchema);
  });
});

describe("object const", () => {
  it("should only validate dogo", () => {
    const dogoSchema = {
      const: { name: "Dogo", age: 13, hobbies: ["barking", "urinating"] },
    } as const;

    type Dogo = FromSchema<typeof dogoSchema>;
    let assertDogo: DoesBothExtend<
      Dogo,
      { name: "Dogo"; age: 13; hobbies: ["barking", "urinating"] }
    >;
    assertDogo = true;

    let dogoInstance: Dogo;
    dogoInstance = { name: "Dogo", age: 13, hobbies: ["barking", "urinating"] };
    expect(ajv.validate(dogoSchema, dogoInstance)).toBe(true);

    expectInstances.allExcept(["object3"]).toBeInvalidAgainst(dogoSchema);
  });

  it("should only validate dogo (with added type)", () => {
    const dogoSchema = {
      type: "object",
      const: { name: "Dogo", age: 13, hobbies: ["barking", "urinating"] },
    } as const;

    type Dogo = FromSchema<typeof dogoSchema>;
    let assertDogo: DoesBothExtend<
      Dogo,
      { name: "Dogo"; age: 13; hobbies: ["barking", "urinating"] }
    >;
    assertDogo = true;

    let dogoInstance: Dogo;
    dogoInstance = { name: "Dogo", age: 13, hobbies: ["barking", "urinating"] };
    expect(ajv.validate(dogoSchema, dogoInstance)).toBe(true);

    expectInstances.allExcept(["object3"]).toBeInvalidAgainst(dogoSchema);
  });

  it("should not work with other type (array)", () => {
    const invalidSchema = {
      type: "array",
      const: { name: "Dogo", age: 13, hobbies: ["barking", "urinating"] },
    } as const;

    expectInstances.allExcept([]).toBeInvalidAgainst(invalidSchema);
  });
});

describe("array const", () => {
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

  it("should only validate pizza recipe", () => {
    const pizzaRecipeSchema = {
      const: [
        1,
        "pizza",
        { description: "A delicious pizza" },
        ["tomatoes", "cheese"],
      ],
    } as const;

    type PizzaRecipe = FromSchema<typeof pizzaRecipeSchema>;
    let assertPizzaRecipe: DoesBothExtend<PizzaRecipe, typeof pizzaRecipe>;
    assertPizzaRecipe = true;

    let pizzaRecipeInstance: PizzaRecipe;
    pizzaRecipeInstance = pizzaRecipe;
    expect(ajv.validate(pizzaRecipeSchema, pizzaRecipeInstance)).toBe(true);

    expectInstances
      .allExcept(["arrayTuple2"])
      .toBeInvalidAgainst(pizzaRecipeSchema);
  });

  it("should only validate pizza recipe (with added type)", () => {
    const pizzaRecipeSchema = {
      type: "array",
      const: [
        1,
        "pizza",
        { description: "A delicious pizza" },
        ["tomatoes", "cheese"],
      ],
    } as const;

    type PizzaRecipe = FromSchema<typeof pizzaRecipeSchema>;
    let assertPizzaRecipe: DoesBothExtend<PizzaRecipe, typeof pizzaRecipe>;
    assertPizzaRecipe = true;

    let pizzaRecipeInstance: PizzaRecipe;
    pizzaRecipeInstance = pizzaRecipe;
    expect(ajv.validate(pizzaRecipeSchema, pizzaRecipeInstance)).toBe(true);

    expectInstances
      .allExcept(["arrayTuple2"])
      .toBeInvalidAgainst(pizzaRecipeSchema);
  });

  it("should not work with other type (object)", () => {
    const invalidSchema = {
      type: "object",
      const: [
        1,
        "pizza",
        { description: "A delicious pizza" },
        ["tomatoes", "cheese"],
      ],
    } as const;

    expectInstances.allExcept([]).toBeInvalidAgainst(invalidSchema);
  });
});
