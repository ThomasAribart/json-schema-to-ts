import { FromSchema } from "index";

import { ajv } from "./ajv";

describe("Array schemas", () => {
  describe("Arrays", () => {
    describe("Any array", () => {
      const noItemsSchema = { type: "array" } as const;

      type UnknownArray = FromSchema<typeof noItemsSchema>;
      let anyArrayInstance: UnknownArray;

      it("accepts any array", () => {
        anyArrayInstance = [];
        expect(ajv.validate(noItemsSchema, anyArrayInstance)).toBe(true);

        anyArrayInstance = [42];
        expect(ajv.validate(noItemsSchema, anyArrayInstance)).toBe(true);

        anyArrayInstance = [42, "foo"];
        expect(ajv.validate(noItemsSchema, anyArrayInstance)).toBe(true);

        anyArrayInstance = [42, "foo", { description: "bar" }];
        expect(ajv.validate(noItemsSchema, anyArrayInstance)).toBe(true);
      });

      it("rejects other values", () => {
        // @ts-expect-error
        anyArrayInstance = "not an array";
        expect(ajv.validate(noItemsSchema, anyArrayInstance)).toBe(false);
      });
    });

    describe("String array", () => {
      const stringArraySchema = {
        type: "array",
        items: { type: "string" },
      } as const;

      type StringArray = FromSchema<typeof stringArraySchema>;
      let stringArrayInstance: StringArray;

      it("accepts string arrays", () => {
        stringArrayInstance = ["foo"];
        expect(ajv.validate(stringArraySchema, stringArrayInstance)).toBe(true);

        stringArrayInstance = ["foo", "bar"];
        expect(ajv.validate(stringArraySchema, stringArrayInstance)).toBe(true);
      });

      it("rejects other values", () => {
        // @ts-expect-error
        stringArrayInstance = ["foo", "bar", { not: "a string" }];
        expect(ajv.validate(stringArraySchema, stringArrayInstance)).toBe(
          false
        );
      });
    });

    describe("Object array", () => {
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
      let fruitArrayInstance: FruitArray;

      it("accepts array of valid objects", () => {
        fruitArrayInstance = [{ name: "apple" }];
        expect(ajv.validate(fruitArraySchema, fruitArrayInstance)).toBe(true);

        fruitArrayInstance = [
          { name: "apple" },
          { name: "tomato", description: "Delicious red fruit" },
        ];
        expect(ajv.validate(fruitArraySchema, fruitArrayInstance)).toBe(true);
      });

      it("rejects array with invalid object", () => {
        fruitArrayInstance = [
          // @ts-expect-error
          { name: "apple", description: 42 },
          { name: "tomato", description: "Delicious red fruit" },
        ];
        expect(ajv.validate(fruitArraySchema, fruitArrayInstance)).toBe(false);
      });

      it("rejects array with other values", () => {
        // @ts-expect-error
        fruitArrayInstance = [{ name: "apple" }, ["not", "a", "fruit"]];
        expect(ajv.validate(fruitArraySchema, fruitArrayInstance)).toBe(false);
      });
    });
  });

  describe("Tuples", () => {
    const recipeSchema = {
      type: "array",
      items: [
        { type: "number" },
        { type: "string" },
        {
          type: "object",
          properties: { descr: { type: "string" } },
          required: ["descr"],
          additionalProperties: false,
        },
      ],
    } as const;

    describe("Base", () => {
      type Recipe = FromSchema<typeof recipeSchema>;
      let recipeInstance: Recipe;

      it("accepts valid tuple", () => {
        recipeInstance = [0, "pasta", { descr: "Italian meal" }];
        expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);
      });

      it("accepts partial tuples", () => {
        recipeInstance = [];
        expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

        recipeInstance = [0];
        expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);

        recipeInstance = [0, "pasta"];
        expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);
      });

      it("accepts tuple with additional items", () => {
        recipeInstance = [
          1,
          "pizza",
          { descr: "Delicious pizza" },
          "any value",
        ];
        expect(ajv.validate(recipeSchema, recipeInstance)).toBe(true);
      });

      it("rejects invalid tuple", () => {
        // @ts-expect-error
        recipeInstance = [1, 42, { descr: "Delicious pizza" }];
        expect(ajv.validate(recipeSchema, recipeInstance)).toBe(false);
      });

      it("rejects other values", () => {
        // @ts-expect-error
        recipeInstance = { not: "an array" };
        expect(ajv.validate(recipeSchema, recipeInstance)).toBe(false);
      });
    });

    describe("Typed additional items", () => {
      const recipeSchema2 = {
        ...recipeSchema,
        additionalItems: { type: "boolean" },
      } as const;

      type Recipe = FromSchema<typeof recipeSchema2>;
      let recipeInstance: Recipe;

      it("accepts valid tuples", () => {
        recipeInstance = [0, "pasta", { descr: "Italian meal" }];
        expect(ajv.validate(recipeSchema2, recipeInstance)).toBe(true);

        recipeInstance = [1, "pizza", { descr: "Delicious pizza" }, true];
        expect(ajv.validate(recipeSchema2, recipeInstance)).toBe(true);
      });

      it("rejects invalid tuples", () => {
        // @ts-expect-error
        recipeInstance = [1, "pizza", { descr: "Pizza !" }, "not boolean"];
        expect(ajv.validate(recipeSchema2, recipeInstance)).toBe(false);

        // @ts-expect-error
        recipeInstance = ["1", "pizza", { descr: "Delicious pizza" }];
        expect(ajv.validate(recipeSchema2, recipeInstance)).toBe(false);
      });
    });

    describe("No additional items", () => {
      const recipeSchema3 = {
        ...recipeSchema,
        additionalItems: false,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema3>;
      let recipeInstance: Recipe;

      it("accepts valid tuple", () => {
        recipeInstance = [0, "pasta", { descr: "Italian meal" }];
        expect(ajv.validate(recipeSchema3, recipeInstance)).toBe(true);
      });

      it("rejects tuple with additional items", () => {
        // @ts-expect-error
        recipeInstance = [1, "pizza", { descr: "Pizza !" }, "not allowed !"];
        expect(ajv.validate(recipeSchema3, recipeInstance)).toBe(false);
      });
    });

    describe("Min items", () => {
      const recipeSchema4 = {
        ...recipeSchema,
        minItems: 2,
        additionalItems: true,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema4>;
      let recipeInstance: Recipe;

      it("accepts tuples with > 2 items", () => {
        recipeInstance = [0, "pasta"];
        expect(ajv.validate(recipeSchema4, recipeInstance)).toBe(true);

        recipeInstance = [0, "pasta", { descr: "Italian meal" }];
        expect(ajv.validate(recipeSchema4, recipeInstance)).toBe(true);

        recipeInstance = [0, "pasta", { descr: "Italian meal" }, "any value"];
        expect(ajv.validate(recipeSchema4, recipeInstance)).toBe(true);
      });

      it("rejects tuples with < 2 items", () => {
        // @ts-expect-error
        recipeInstance = [];
        expect(ajv.validate(recipeSchema4, recipeInstance)).toBe(false);

        // @ts-expect-error
        recipeInstance = [0];
        expect(ajv.validate(recipeSchema4, recipeInstance)).toBe(false);
      });
    });

    describe("Min & Max items", () => {
      const recipeSchema5 = {
        ...recipeSchema,
        minItems: 2,
        maxItems: 3,
        additionalItems: { type: "boolean" },
      } as const;

      type Recipe = FromSchema<typeof recipeSchema5>;
      let recipeInstance: Recipe;

      it("accepts tuples with 2 or 3 items", () => {
        recipeInstance = [0, "pasta"];
        expect(ajv.validate(recipeSchema5, recipeInstance)).toBe(true);

        recipeInstance = [0, "pasta", { descr: "Italian meal" }];
        expect(ajv.validate(recipeSchema5, recipeInstance)).toBe(true);
      });

      it("rejects tuples with < 2 items", () => {
        // @ts-expect-error
        recipeInstance = [];
        expect(ajv.validate(recipeSchema5, recipeInstance)).toBe(false);

        // @ts-expect-error
        recipeInstance = [0];
        expect(ajv.validate(recipeSchema5, recipeInstance)).toBe(false);
      });

      it("rejects tuples with > 3 items", () => {
        // @ts-expect-error
        recipeInstance = [0, "pasta", { descr: "Italian meal" }, true];
        expect(ajv.validate(recipeSchema5, recipeInstance)).toBe(false);
      });
    });

    describe("Min, Max & Additional items", () => {
      const recipeSchema6 = {
        ...recipeSchema,
        minItems: 3,
        maxItems: 5,
        additionalItems: { type: "boolean" },
      } as const;

      type Recipe = FromSchema<typeof recipeSchema6>;
      let recipeInstance: Recipe;

      it("accepts valid tuples", () => {
        recipeInstance = [0, "pasta", { descr: "Italian meal" }];
        expect(ajv.validate(recipeSchema6, recipeInstance)).toBe(true);

        recipeInstance = [0, "pasta", { descr: "Italian meal" }, true];
        expect(ajv.validate(recipeSchema6, recipeInstance)).toBe(true);
      });

      it("rejects tuples with > 5 items", () => {
        // Error is not raised at the moment. Probably can be done in the future though...
        recipeInstance = [
          0,
          "pasta",
          { descr: "Italian meal" },
          true,
          false,
          true,
        ];
        expect(ajv.validate(recipeSchema6, recipeInstance)).toBe(false);
      });

      it("rejects tuples with < 3 items", () => {
        // @ts-expect-error
        recipeInstance = [0, "pasta"];
        expect(ajv.validate(recipeSchema6, recipeInstance)).toBe(false);
      });

      it("rejects tuples with invalid additional items", () => {
        // @ts-expect-error
        recipeInstance = [0, "pasta", { descr: "Italian meal" }, "not bool"];
        expect(ajv.validate(recipeSchema6, recipeInstance)).toBe(false);
      });
    });

    describe("Min items, no Additional items", () => {
      const recipeSchema7 = {
        ...recipeSchema,
        minItems: 2,
        maxItems: 5,
        additionalItems: false,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema7>;
      let recipeInstance: Recipe;

      it("accepts tuples with > 2 items", () => {
        recipeInstance = [0, "pasta"];
        expect(ajv.validate(recipeSchema7, recipeInstance)).toBe(true);

        recipeInstance = [0, "pasta", { descr: "Italian meal" }];
        expect(ajv.validate(recipeSchema7, recipeInstance)).toBe(true);
      });

      it("rejects tuples with < 2 items", () => {
        // @ts-expect-error
        recipeInstance = [0];
        expect(ajv.validate(recipeSchema7, recipeInstance)).toBe(false);
      });

      it("rejects tuple with invalid additional item", () => {
        // @ts-expect-error
        recipeInstance = [0, "pasta", { descr: "Italian meal" }, "any"];
        expect(ajv.validate(recipeSchema7, recipeInstance)).toBe(false);
      });
    });

    describe("Max items", () => {
      const recipeSchema8 = {
        ...recipeSchema,
        maxItems: 2,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema8>;
      let recipeInstance: Recipe;

      it("accepts tuples with < 2 items", () => {
        recipeInstance = [];
        expect(ajv.validate(recipeSchema8, recipeInstance)).toBe(true);

        recipeInstance = [0];
        expect(ajv.validate(recipeSchema8, recipeInstance)).toBe(true);

        recipeInstance = [0, "pasta"];
        expect(ajv.validate(recipeSchema8, recipeInstance)).toBe(true);
      });

      it("rejects tuples with > 2 items", () => {
        // @ts-expect-error
        recipeInstance = [0, "pasta", { descr: "Italian meal" }];
        expect(ajv.validate(recipeSchema8, recipeInstance)).toBe(false);
      });
    });

    describe("Min item > tuple length", () => {
      const recipeSchema9 = {
        ...recipeSchema,
        minItems: 4,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema9>;
      let recipeInstance: Recipe;

      it("accepts tuples with > 4 items", () => {
        recipeInstance = [
          0,
          "pasta",
          { descr: "Italian meal" },
          ["any", "value"],
        ];
        expect(ajv.validate(recipeSchema9, recipeInstance)).toBe(true);
      });

      it("rejects tuples with < 4 items", () => {
        // @ts-expect-error
        recipeInstance = [];
        expect(ajv.validate(recipeSchema9, recipeInstance)).toBe(false);

        // @ts-expect-error
        recipeInstance = [0];
        expect(ajv.validate(recipeSchema9, recipeInstance)).toBe(false);

        // @ts-expect-error
        recipeInstance = [0, "pasta"];
        expect(ajv.validate(recipeSchema9, recipeInstance)).toBe(false);

        // Error is not raised at the moment. Probably can be done in the future though...
        recipeInstance = [0, "pasta", { descr: "Italian meal" }];
        expect(ajv.validate(recipeSchema9, recipeInstance)).toBe(false);
      });
    });

    describe("Min item > closed tuple length", () => {
      const recipeSchema10 = {
        ...recipeSchema,
        minItems: 4,
        additionalItems: false,
      } as const;

      type Recipe = FromSchema<typeof recipeSchema10>;
      let recipeInstance: Recipe;

      it("rejects any tuple", () => {
        // @ts-expect-error
        recipeInstance = [0, "pasta", { descr: "Italian meal" }];
        expect(ajv.validate(recipeSchema10, recipeInstance)).toBe(false);

        // @ts-expect-error
        recipeInstance = [0, "pasta", { descr: "Italian meal" }, "any"];
        expect(ajv.validate(recipeSchema10, recipeInstance)).toBe(false);
      });
    });
  });
});
