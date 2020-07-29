import Ajv from "ajv";

import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import * as instances from "./instances";
import { expectInstances } from "./helpers";

var ajv = new Ajv();

describe("array schema", () => {
  it("without items", () => {
    const noItemsSchema = { type: "array" } as const;

    type NoItems = FromSchema<typeof noItemsSchema>;

    let assertNoItems: DoesBothExtend<NoItems, any[]>;
    assertNoItems = true;

    let noItemsInstance: NoItems;
    noItemsInstance = instances.arrayMixed1;
    expect(ajv.validate(noItemsSchema, noItemsInstance)).toBe(true);

    noItemsInstance = instances.arrayMixed2;
    expect(ajv.validate(noItemsSchema, noItemsInstance)).toBe(true);

    expectInstances
      .allExcept([
        "arrayMixed1",
        "arrayMixed2",
        "arrayString1",
        "arrayString2",
        "arrayObject1",
        "arrayObject2",
        "arrayTuple1",
        "arrayTuple2",
        "arrayTuple3",
      ])
      .toBeInvalidAgainst(noItemsSchema);
  });

  it("string array", () => {
    const stringArraySchema = {
      type: "array",
      items: { type: "string" },
    } as const;

    type StringArray = FromSchema<typeof stringArraySchema>;

    let assertStringArray: DoesBothExtend<StringArray, string[]>;
    assertStringArray = true;

    let stringArrayInstance: StringArray;
    stringArrayInstance = instances.arrayString1;
    expect(ajv.validate(stringArraySchema, stringArrayInstance)).toBe(true);

    stringArrayInstance = instances.arrayString2;
    expect(ajv.validate(stringArraySchema, stringArrayInstance)).toBe(true);

    expectInstances
      .allExcept(["arrayString1", "arrayString2"])
      .toBeInvalidAgainst(stringArraySchema);
  });

  it("object array", () => {
    const fruitArraySchema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
        },
        required: ["name"],
      },
    } as const;

    type FruitArray = FromSchema<typeof fruitArraySchema>;

    let assertFruitArray: DoesBothExtend<
      FruitArray,
      { name: string; description?: string }[]
    >;
    assertFruitArray = true;

    let fruitArrayInstance: FruitArray;
    fruitArrayInstance = instances.arrayObject1;
    expect(ajv.validate(fruitArraySchema, fruitArrayInstance)).toBe(true);

    fruitArrayInstance = instances.arrayObject2;
    expect(ajv.validate(fruitArraySchema, fruitArrayInstance)).toBe(true);

    expectInstances
      .allExcept(["arrayObject1", "arrayObject2"])
      .toBeInvalidAgainst(fruitArraySchema);
  });

  describe("tuple array", () => {
    const recipeSchema = {
      type: "array",
      items: [
        { type: "number" },
        { type: "string" },
        {
          type: "object",
          properties: { description: { type: "string" } },
          required: ["description"],
        },
        {
          type: "array",
          items: { type: "string" },
        },
      ],
    } as const;

    it("allow additional items", () => {
      type Recipe = FromSchema<typeof recipeSchema>;

      let assertTupleArray: DoesBothExtend<
        Recipe,
        | []
        | [number]
        | [number, string]
        | [number, string, { description: string }]
        | [number, string, { description: string }, string[]]
        | [number, string, { description: string }, string[], ...any[]]
      >;
      assertTupleArray = true;

      let recipeInstance: Recipe;
      recipeInstance = [];
      expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

      recipeInstance = [0];
      expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

      recipeInstance = [0, "pasta"];
      expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple1;
      expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple2;
      expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple3;
      expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

      expectInstances
        .allExcept(["arrayTuple1", "arrayTuple2", "arrayTuple3"])
        .toBeInvalidAgainst(recipeSchema);
    });

    it("allow additional items of given type", () => {
      const recipeSchema2 = {
        ...recipeSchema,
        additionalItems: {
          type: "boolean",
        },
      } as const;

      type Recipe = FromSchema<typeof recipeSchema2>;

      let assertTupleArray: DoesBothExtend<
        Recipe,
        | []
        | [number]
        | [number, string]
        | [number, string, { description: string }]
        | [number, string, { description: string }, string[]]
        | [number, string, { description: string }, string[], ...boolean[]]
      >;
      assertTupleArray = true;

      let recipeInstance: Recipe;
      recipeInstance = [];
      expect(ajv.validate(recipeSchema2, recipeInstance)).toBe(true);

      recipeInstance = [0];
      expect(ajv.validate(recipeSchema2, recipeInstance)).toBe(true);

      recipeInstance = [0, "pasta"];
      expect(ajv.validate(recipeSchema2, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple1;
      expect(ajv.validate(recipeSchema2, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple2;
      expect(ajv.validate(recipeSchema2, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple3;
      expect(ajv.validate(recipeSchema2, recipeInstance)).toBe(true);

      expectInstances
        .allExcept(["arrayTuple1", "arrayTuple2", "arrayTuple3"])
        .toBeInvalidAgainst(recipeSchema2);
    });

    it("disallow additional items", () => {
      const recipeSchema3 = {
        ...recipeSchema,
        additionalItems: false,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema3>;

      let assertTupleArray: DoesBothExtend<
        Recipe,
        | []
        | [number]
        | [number, string]
        | [number, string, { description: string }]
        | [number, string, { description: string }, string[]]
      >;
      assertTupleArray = true;

      let recipeInstance: Recipe;
      recipeInstance = [];
      expect(ajv.validate(recipeSchema3, recipeInstance)).toBe(true);

      recipeInstance = [0];
      expect(ajv.validate(recipeSchema3, recipeInstance)).toBe(true);

      recipeInstance = [0, "pasta"];
      expect(ajv.validate(recipeSchema3, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple1;
      expect(ajv.validate(recipeSchema3, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple2;
      expect(ajv.validate(recipeSchema3, recipeInstance)).toBe(true);

      expectInstances
        .allExcept(["arrayTuple1", "arrayTuple2", "arrayTuple3"])
        .toBeInvalidAgainst(recipeSchema3);
    });

    it("with min items", () => {
      const recipeSchema4 = {
        ...recipeSchema,
        minItems: 2,
        additionalItems: true,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema4>;

      let assertTupleArray: DoesBothExtend<
        Recipe,
        | [number, string]
        | [number, string, { description: string }]
        | [number, string, { description: string }, string[]]
        | [number, string, { description: string }, string[], ...any[]]
      >;
      assertTupleArray = true;

      let recipeInstance: Recipe;
      recipeInstance = [0, "pasta"];
      expect(ajv.validate(recipeSchema4, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple1;
      expect(ajv.validate(recipeSchema4, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple2;
      expect(ajv.validate(recipeSchema4, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple3;
      expect(ajv.validate(recipeSchema4, recipeInstance)).toBe(true);

      expectInstances
        .allExcept(["arrayTuple1", "arrayTuple2", "arrayTuple3"])
        .toBeInvalidAgainst(recipeSchema4);
    });

    it("with min items and max items", () => {
      const recipeSchema5 = {
        ...recipeSchema,
        minItems: 2,
        maxItems: 3,
        additionalItems: true,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema5>;

      let assertTupleArray: DoesBothExtend<
        Recipe,
        [number, string] | [number, string, { description: string }]
      >;
      assertTupleArray = true;

      let recipeInstance: Recipe;
      recipeInstance = [0, "pasta"];
      expect(ajv.validate(recipeSchema5, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple1;
      expect(ajv.validate(recipeSchema5, recipeInstance)).toBe(true);

      expectInstances
        .allExcept(["arrayTuple1"])
        .toBeInvalidAgainst(recipeSchema5);
    });

    it("with min items and additionalItems", () => {
      const recipeSchema7 = {
        ...recipeSchema,
        minItems: 2,
        maxItems: 5,
        additionalItems: { type: "boolean" },
      } as const;

      type Recipe = FromSchema<typeof recipeSchema7>;

      let assertTupleArray: DoesBothExtend<
        Recipe,
        | [number, string]
        | [number, string, { description: string }]
        | [number, string, { description: string }, string[]]
        | [number, string, { description: string }, string[], ...boolean[]]
      >;
      assertTupleArray = true;

      let recipeInstance: Recipe;
      recipeInstance = [0, "pasta"];
      expect(ajv.validate(recipeSchema7, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple1;
      expect(ajv.validate(recipeSchema7, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple2;
      expect(ajv.validate(recipeSchema7, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple3;
      expect(ajv.validate(recipeSchema7, recipeInstance)).toBe(true);

      expectInstances
        .allExcept(["arrayTuple1", "arrayTuple2", "arrayTuple3"])
        .toBeInvalidAgainst(recipeSchema7);
    });

    it("with min items and no additionalItems", () => {
      const recipeSchema8 = {
        ...recipeSchema,
        minItems: 2,
        maxItems: 5,
        additionalItems: false,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema8>;

      let assertTupleArray: DoesBothExtend<
        Recipe,
        | [number, string]
        | [number, string, { description: string }]
        | [number, string, { description: string }, string[]]
      >;
      assertTupleArray = true;

      let recipeInstance: Recipe;
      recipeInstance = [0, "pasta"];
      expect(ajv.validate(recipeSchema8, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple1;
      expect(ajv.validate(recipeSchema8, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple2;
      expect(ajv.validate(recipeSchema8, recipeInstance)).toBe(true);

      expectInstances
        .allExcept(["arrayTuple1", "arrayTuple2"])
        .toBeInvalidAgainst(recipeSchema8);
    });

    it("with max items", () => {
      const recipeSchema9 = {
        ...recipeSchema,
        maxItems: 2,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema9>;

      let assertTupleArray: DoesBothExtend<
        Recipe,
        [] | [number] | [number, string]
      >;
      assertTupleArray = true;

      let recipeInstance: Recipe;
      recipeInstance = [];
      expect(ajv.validate(recipeSchema9, recipeInstance)).toBe(true);

      recipeInstance = [0];
      expect(ajv.validate(recipeSchema9, recipeInstance)).toBe(true);

      recipeInstance = [0, "pasta"];
      expect(ajv.validate(recipeSchema9, recipeInstance)).toBe(true);

      expectInstances.allExcept([]).toBeInvalidAgainst(recipeSchema9);
    });
  });
});
