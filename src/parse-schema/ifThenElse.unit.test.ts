import type { A } from "ts-toolbelt";

import type { FromSchema } from "~/index";

import { ajv } from "./ajv.util.test";

describe("If/Then/Else schemas", () => {
  describe("if, then & else", () => {
    const petSchema = {
      type: "object",
      properties: {
        type: { enum: ["cat", "dog"] },
        dogRace: { type: "string" },
        catRace: { type: "string" },
      },
      required: ["type"],
      if: { properties: { type: { const: "dog" } } },
      then: {
        required: ["dogRace"],
      },
      else: {
        required: ["catRace"],
      },
    } as const;

    type Pet = FromSchema<typeof petSchema, { parseIfThenElseKeywords: true }>;
    let petInstance: Pet;

    it("accepts valid dogs", () => {
      petInstance = { type: "dog", dogRace: "poodle" };
      expect(ajv.validate(petSchema, petInstance)).toBe(true);
    });

    it("accepts valid cats", () => {
      petInstance = { type: "cat", catRace: "persan" };
      expect(ajv.validate(petSchema, petInstance)).toBe(true);
    });

    it("rejects invalid dogs/cats", () => {
      // @ts-expect-error
      petInstance = { type: "dog" };
      expect(ajv.validate(petSchema, petInstance)).toBe(false);

      // @ts-expect-error
      petInstance = { type: "dog", catRace: "persan" };
      expect(ajv.validate(petSchema, petInstance)).toBe(false);

      // @ts-expect-error
      petInstance = { type: "cat" };
      expect(ajv.validate(petSchema, petInstance)).toBe(false);

      // @ts-expect-error
      petInstance = { type: "cat", dogRace: "poodle" };
      expect(ajv.validate(petSchema, petInstance)).toBe(false);

      // @ts-expect-error
      petInstance = { type: "duck" };
      expect(ajv.validate(petSchema, petInstance)).toBe(false);
    });
  });

  describe("only if & then", () => {
    const petSchema = {
      type: "object",
      properties: {
        type: { enum: ["cat", "dog"] },
        dogRace: { type: "string" },
        catRace: { type: "string" },
      },
      required: ["type"],
      if: { properties: { type: { const: "dog" } } },
      then: {
        required: ["dogRace"],
      },
    } as const;

    type Pet = FromSchema<typeof petSchema, { parseIfThenElseKeywords: true }>;
    let petInstance: Pet;

    it("accepts valid dogs", () => {
      petInstance = { type: "dog", dogRace: "poodle" };
      expect(ajv.validate(petSchema, petInstance)).toBe(true);
    });

    it("accepts valid cats", () => {
      petInstance = { type: "cat" };
      expect(ajv.validate(petSchema, petInstance)).toBe(true);

      petInstance = { type: "cat", catRace: "persan" };
      expect(ajv.validate(petSchema, petInstance)).toBe(true);

      petInstance = { type: "cat", dogRace: "poodle" };
      expect(ajv.validate(petSchema, petInstance)).toBe(true);
    });

    it("rejects invalid dogs/cats", () => {
      // @ts-expect-error
      petInstance = { type: "dog" };
      expect(ajv.validate(petSchema, petInstance)).toBe(false);

      // @ts-expect-error
      petInstance = { type: "dog", catRace: "persan" };
      expect(ajv.validate(petSchema, petInstance)).toBe(false);

      // @ts-expect-error
      petInstance = { type: "duck" };
      expect(ajv.validate(petSchema, petInstance)).toBe(false);
    });
  });

  describe("only if & else", () => {
    const petSchema = {
      type: "object",
      properties: {
        type: { enum: ["cat", "dog"] },
        dogRace: { type: "string" },
        catRace: { type: "string" },
      },
      required: ["type"],
      if: { properties: { type: { const: "dog" } } },
      else: {
        required: ["catRace"],
      },
    } as const;

    type Pet = FromSchema<typeof petSchema, { parseIfThenElseKeywords: true }>;
    let petInstance: Pet;

    it("accepts valid dogs", () => {
      petInstance = { type: "dog" };
      expect(ajv.validate(petSchema, petInstance)).toBe(true);

      petInstance = { type: "dog", dogRace: "poodle" };
      expect(ajv.validate(petSchema, petInstance)).toBe(true);

      petInstance = { type: "dog", catRace: "persan" };
      expect(ajv.validate(petSchema, petInstance)).toBe(true);
    });

    it("accepts valid cats", () => {
      petInstance = { type: "cat", catRace: "persan" };
      expect(ajv.validate(petSchema, petInstance)).toBe(true);
    });

    it("rejects invalid dogs/cats", () => {
      // @ts-expect-error
      petInstance = { type: "cat" };
      expect(ajv.validate(petSchema, petInstance)).toBe(false);

      // @ts-expect-error
      petInstance = { type: "cat", dogRace: "poodle" };
      expect(ajv.validate(petSchema, petInstance)).toBe(false);

      // @ts-expect-error
      petInstance = { type: "duck" };
      expect(ajv.validate(petSchema, petInstance)).toBe(false);
    });
  });

  describe("Closed to closed object (unevaluated properties)", () => {
    // Example from https://json-schema.org/understanding-json-schema/reference/object#unevaluatedproperties
    const addressSchema = {
      type: "object",
      properties: {
        street_address: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        type: { enum: ["residential", "business"] },
      },
      required: ["street_address", "city", "state", "type"],
      if: {
        type: "object",
        properties: {
          type: { const: "business" },
        },
        required: ["type"],
      },
      then: {
        properties: {
          department: { type: "string" },
        },
      },
      unevaluatedProperties: false,
    } as const;

    type Address = FromSchema<
      typeof addressSchema,
      { parseIfThenElseKeywords: true }
    >;
    let address: Address;

    type ExpectedAddress =
      | {
          street_address: string;
          city: string;
          state: string;
          type: "business";
          department?: string | undefined;
        }
      | {
          street_address: string;
          city: string;
          state: string;
          type: "residential";
        };
    type AssertAddress = A.Equals<Address, ExpectedAddress>;
    const assertAddress: AssertAddress = 1;
    assertAddress;

    it("accepts valid objects", () => {
      address = {
        street_address: "1600 Pennsylvania Avenue NW",
        city: "Washington",
        state: "DC",
        type: "business",
        department: "HR",
      };
      expect(ajv.validate(addressSchema, address)).toBe(true);
    });

    it("rejects unevaluated properties", () => {
      address = {
        street_address: "1600 Pennsylvania Avenue NW",
        city: "Washington",
        state: "DC",
        type: "residential",
        // @ts-expect-error
        department: "HR",
      };
      expect(ajv.validate(addressSchema, address)).toBe(false);
    });
  });

  describe("additional items (incorrect)", () => {
    const petSchema = {
      type: "array",
      items: [
        { enum: ["cat", "dog"] },
        { enum: ["poodle", "beagle", "husky"] },
      ],
      if: {
        items: [{ const: "dog" }],
      },
      then: { minItems: 2, additionalItems: false },
      else: { maxItems: 1 },
    } as const;

    type Pet = FromSchema<typeof petSchema, { parseIfThenElseKeywords: true }>;
    let petInstance: Pet;

    it("rejects invalid dog instances", () => {
      // @ts-expect-error
      petInstance = ["dog"];
      expect(ajv.validate(petSchema, petInstance)).toBe(false);

      // accepts additionalItems as additionalItems is not bound to items
      petInstance = ["dog", "poodle", "other"];
      expect(ajv.validate(petSchema, petInstance)).toBe(true);
    });
  });

  describe("additional items (correct)", () => {
    const petSchema = {
      type: "array",
      items: [
        { enum: ["cat", "dog"] },
        { enum: ["poodle", "beagle", "husky"] },
      ],
      if: {
        items: [{ const: "dog" }],
      },
      then: { items: [{ const: "dog" }], additionalItems: false },
    } as const;

    type Pet = FromSchema<typeof petSchema, { parseIfThenElseKeywords: true }>;
    let petInstance: Pet;

    it("rejects invalid dog instances", () => {
      petInstance = ["dog"];
      expect(ajv.validate(petSchema, petInstance)).toBe(true);

      // @ts-expect-error
      petInstance = ["dog", "poodle", "other"];
      expect(ajv.validate(petSchema, petInstance)).toBe(false);
    });
  });
});
