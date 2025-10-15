import { expectTypeOf } from "expect-type";

import type { FromSchema } from "~/index";

import { ajv } from "./ajv.util.test";

describe("Object schemas", () => {
  describe("Any object", () => {
    const petSchema = { type: "object" } as const;

    type Pet = FromSchema<typeof petSchema>;
    let petInstance: Pet;

    it("accepts empty object", () => {
      petInstance = {};
      expect(ajv.validate(petSchema, petInstance)).toBe(true);
    });

    it("accepts any object", () => {
      petInstance = { any: "value" };
      expect(ajv.validate(petSchema, petInstance)).toBe(true);
    });

    it("rejects other values", () => {
      // @ts-expect-error
      petInstance = ["not", "an", "object"];
      expect(ajv.validate(petSchema, petInstance)).toBe(false);
    });
  });

  describe("Additional properties", () => {
    const setSchema = {
      type: "object",
      additionalProperties: { type: "boolean" },
    } as const;

    type Set = FromSchema<typeof setSchema>;
    let setInstance: Set;

    it("accepts object with boolean values", () => {
      setInstance = { a: true, b: false };
      expect(ajv.validate(setSchema, setInstance)).toBe(true);
    });

    it("rejects object with other values", () => {
      // @ts-expect-error
      setInstance = { a: 42 };
      expect(ajv.validate(setSchema, setInstance)).toBe(false);
    });

    describe("with omitAdditionalProperties option", () => {
      it("rejects additional properties", () => {
        type Set2 = FromSchema<
          typeof setSchema,
          { omitAdditionalProperties: true }
        >;

        expectTypeOf<Set2>().toEqualTypeOf<{}>();
      });
    });
  });

  describe("Pattern properties", () => {
    const strOrNumObjSchema = {
      type: "object",
      patternProperties: {
        "^S": { type: "string" },
        "^I": { type: "integer" },
      },
      additionalProperties: false,
    } as const;

    type StrOrNumObj = FromSchema<typeof strOrNumObjSchema>;
    let objInstance: StrOrNumObj;

    it("accepts object with str or number values", () => {
      objInstance = { S: "str", I: 42 };
      expect(ajv.validate(strOrNumObjSchema, objInstance)).toBe(true);
    });

    it("rejects object with boolean value", () => {
      // @ts-expect-error
      objInstance = { B: true, S: "str", I: 42 };
      expect(ajv.validate(strOrNumObjSchema, objInstance)).toBe(false);
    });
  });

  describe("Additional + Pattern properties", () => {
    const boolStrOrNumObjSchema = {
      type: "object",
      additionalProperties: { type: "boolean" },
      patternProperties: {
        "^S": { type: "string" },
        "^I": { type: "number" },
      },
    } as const;

    type BoolStrOrNumObj = FromSchema<typeof boolStrOrNumObjSchema>;
    let objInstance: BoolStrOrNumObj;

    it("accepts object with str, number or boolean values", () => {
      objInstance = { B: true, S: "str", I: 42 };
      expect(ajv.validate(boolStrOrNumObjSchema, objInstance)).toBe(true);
    });

    it("rejects object with null value", () => {
      // @ts-expect-error
      objInstance = { B: true, S: "str", I: 42, N: null };
      expect(ajv.validate(boolStrOrNumObjSchema, objInstance)).toBe(false);
    });

    describe("with omitAdditionalProperties option", () => {
      it("rejects object with boolean value", () => {
        type Set = FromSchema<
          typeof boolStrOrNumObjSchema,
          { omitAdditionalProperties: true }
        >;

        expectTypeOf<Set>().toEqualTypeOf<{}>();
      });
    });
  });

  describe("Unevaluated properties", () => {
    const setSchema = {
      type: "object",
      unevaluatedProperties: { type: "boolean" },
    } as const;

    type Set = FromSchema<typeof setSchema>;
    let setInstance: Set;

    it("accepts object with boolean values", () => {
      setInstance = { a: true, b: false };
      expect(ajv.validate(setSchema, setInstance)).toBe(true);
    });

    it("rejects object with other values", () => {
      // We do not handle this case for the moment
      // @ts-NOT-expect-error
      setInstance = { a: 42 };
      expect(ajv.validate(setSchema, setInstance)).toBe(false);
    });

    it("prioritizes additionalProperties and/or patternProterties if one is specified", () => {
      const setSchema2 = {
        type: "object",
        additionalProperties: { type: "boolean" },
        unevaluatedProperties: { const: false },
      } as const;

      type Set2 = FromSchema<typeof setSchema2>;
      const setInstance2: Set2 = { foo: true };

      expect(ajv.validate(setSchema2, setInstance2)).toBe(true);

      const setSchema3 = {
        type: "object",
        patternProperties: {
          "^f": { type: "boolean" },
        },
        unevaluatedProperties: { const: false },
      } as const;

      type Set3 = FromSchema<typeof setSchema3>;
      const setInstance3: Set3 = { foo: true };

      expect(ajv.validate(setSchema3, setInstance3)).toBe(true);
    });
  });

  describe("Properties", () => {
    const catSchema = {
      type: "object",
      properties: { age: { type: "number" }, name: { type: "string" } },
      additionalProperties: false,
    } as const;

    type Cat = FromSchema<typeof catSchema>;
    let catInstance: Cat;

    it("accepts empty object", () => {
      catInstance = {};
      expect(ajv.validate(catSchema, catInstance)).toBe(true);
    });

    it("accept object with correct properties", () => {
      catInstance = { name: "Garfield", age: 42 };
      expect(ajv.validate(catSchema, catInstance)).toBe(true);
    });

    it("rejects object with additional property", () => {
      // @ts-expect-error
      catInstance = { name: "Garfield", age: 42, other: true };
      expect(ajv.validate(catSchema, catInstance)).toBe(false);
    });

    it("rejects object with invalid property", () => {
      // @ts-expect-error
      catInstance = { age: "not a number" };
      expect(ajv.validate(catSchema, catInstance)).toBe(false);
    });
  });

  describe("Required", () => {
    const dogSchema = {
      type: "object",
      properties: {
        age: { type: "number" },
        name: { type: "string" },
        hobbies: { type: "array", items: { type: "string" } },
        other: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
            },
            required: ["title"],
            additionalProperties: false,
          },
        },
      },
      required: ["name", "age", "hobbies"],
      additionalProperties: false,
    } as const;

    type Dog = FromSchema<typeof dogSchema>;
    let dogInstance: Dog;

    it("accepts object with required & valid properties", () => {
      dogInstance = {
        name: "Dogo",
        age: 13,
        hobbies: ["barking", "urinating"],
      };
      expect(ajv.validate(dogSchema, dogInstance)).toBe(true);
    });

    it("accepts object with non-required & valid properties", () => {
      dogInstance = {
        name: "Dogo",
        age: 13,
        hobbies: ["barking", "urinating"],
        other: [
          { title: "Likes Pizza" },
          { title: "Address", description: "42, bark street" },
        ],
      };
      expect(ajv.validate(dogSchema, dogInstance)).toBe(true);
    });

    it("rejects object missing required property", () => {
      // @ts-expect-error
      dogInstance = { name: "Dogo", age: 13 };
      expect(ajv.validate(dogSchema, dogInstance)).toBe(false);
    });

    it("rejects object with invalid property", () => {
      dogInstance = {
        name: "Dogo",
        age: 13,
        hobbies: ["barking", "urinating"],
        other: [
          { title: "Likes Pizza" },
          // @ts-expect-error
          { title: "Address", description: 42 },
        ],
      };
      expect(ajv.validate(dogSchema, dogInstance)).toBe(false);
    });
  });

  describe("Required + Additional properties", () => {
    const addressSchema = {
      type: "object",
      properties: {
        number: { type: "number" },
        streetName: { type: "string" },
        streetType: {
          type: "string",
          enum: ["Street", "Avenue", "Boulevard"],
        },
      },
      required: ["number", "streetName", "streetType", "direction"],
    } as const;

    type Address = FromSchema<typeof addressSchema>;
    let addressInstance: Address;

    it("accepts object with required & valid properties", () => {
      addressInstance = {
        number: 13,
        streetName: "Champs Elysées",
        streetType: "Avenue",
        direction: ["any", "value"],
      };
      expect(ajv.validate(addressSchema, addressInstance)).toBe(true);
    });

    it("accepts object with additional properties", () => {
      addressInstance = {
        number: 13,
        streetName: "Champs Elysées",
        streetType: "Avenue",
        direction: "NW",
        additionalProperty: ["any", "value"],
      };
      expect(ajv.validate(addressSchema, addressInstance)).toBe(true);
    });

    it("rejects object with missing required properties", () => {
      // @ts-expect-error
      addressInstance = {
        number: 13,
        streetName: "Champs Elysées",
        streetType: "Avenue",
      };
      expect(ajv.validate(addressSchema, addressInstance)).toBe(false);
    });

    describe("with omitAdditionalProperties option", () => {
      it("rejects object with additional properties", () => {
        type Address2 = FromSchema<
          typeof addressSchema,
          { omitAdditionalProperties: true }
        >;

        const addressInstance2: Address2 = {
          number: 13,
          streetName: "Champs Elysées",
          streetType: "Avenue",
          direction: "NW",
          // @ts-expect-error
          additionalProperty: ["any", "value"],
        };
        expect(ajv.validate(addressSchema, addressInstance2)).toBe(true);
      });
    });
  });

  describe("Required + Typed additional properties", () => {
    const addressSchema = {
      type: "object",
      properties: {
        number: { type: "number" },
        streetName: { type: "string" },
        streetType: {
          type: "string",
          enum: ["Street", "Avenue", "Boulevard"],
        },
      },
      required: ["number", "streetName", "streetType"],
      additionalProperties: { type: "string" },
    } as const;

    type Address = FromSchema<typeof addressSchema>;
    let addressInstance: Address;

    it("accepts object with required & valid properties", () => {
      addressInstance = {
        number: 13,
        streetName: "Champs Elysées",
        streetType: "Avenue",
      };
      expect(ajv.validate(addressSchema, addressInstance)).toBe(true);
    });

    it("accepts object with valid additional properties", () => {
      addressInstance = {
        number: 13,
        streetName: "Champs Elysées",
        streetType: "Avenue",
        direction: "NW",
      };
      expect(ajv.validate(addressSchema, addressInstance)).toBe(true);
    });

    it("rejects object with invalid additional properties", () => {
      // Error cannot be raised at the moment...
      addressInstance = {
        number: 13,
        streetName: "Champs Elysées",
        streetType: "Avenue",
        // Requires string value for 'direction'
        direction: 42,
      };
      expect(ajv.validate(addressSchema, addressInstance)).toBe(false);
    });

    describe("with omitAdditionalProperties option", () => {
      it("rejects object with valid additional properties", () => {
        type Address2 = FromSchema<
          typeof addressSchema,
          { omitAdditionalProperties: true }
        >;

        const addressInstance2: Address2 = {
          number: 13,
          streetName: "Champs Elysées",
          streetType: "Avenue",
          // @ts-expect-error
          additionalProperty: "additionalProperty",
        };
        expect(ajv.validate(addressSchema, addressInstance2)).toBe(true);
      });
    });
  });

  describe("Required missing in properties", () => {
    const addressSchema = {
      type: "object",
      properties: {
        number: { type: "number" },
        streetName: { type: "string" },
      },
      required: ["number", "streetName", "streetType"],
      additionalProperties: false,
    } as const;

    type Address = FromSchema<typeof addressSchema>;
    let addressInstance: Address;

    it("rejects any value", () => {
      // @ts-expect-error
      addressInstance = { number: 42, streetName: "Champs Elysées" };
      expect(ajv.validate(addressSchema, addressInstance)).toBe(false);

      // @ts-expect-error
      addressInstance = { number: 42, streetName: "Str", streetType: "Any" };
      expect(ajv.validate(addressSchema, addressInstance)).toBe(false);
    });
  });
});
