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
    it("allow additional items", () => {
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

    it("disallow additional items", () => {
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
        additionalItems: false,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema>;

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
      expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

      recipeInstance = [0];
      expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

      recipeInstance = [0, "pasta"];
      expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple1;
      expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

      recipeInstance = instances.arrayTuple2;
      expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

      expectInstances
        .allExcept(["arrayTuple1", "arrayTuple2"])
        .toBeInvalidAgainst(recipeSchema);
    });
  });
});
