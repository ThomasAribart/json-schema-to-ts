import { FromSchema } from "index";

import { ajv } from "./ajv";

describe("Mixed types schemas", () => {
  describe("Primitives", () => {
    const simpleTypesSchema = {
      type: ["null", "boolean", "integer"],
    } as const;

    type Simple = FromSchema<typeof simpleTypesSchema>;
    let simpleInstance: Simple;

    it("accepts null value", () => {
      simpleInstance = null;
      expect(ajv.validate(simpleTypesSchema, simpleInstance)).toBe(true);
    });

    it("accepts boolean value", () => {
      simpleInstance = true;
      expect(ajv.validate(simpleTypesSchema, simpleInstance)).toBe(true);
    });

    it("accepts number value", () => {
      simpleInstance = 42;
      expect(ajv.validate(simpleTypesSchema, simpleInstance)).toBe(true);
    });

    it("rejects string value", () => {
      // @ts-expect-error
      simpleInstance = "string";
      expect(ajv.validate(simpleTypesSchema, simpleInstance)).toBe(false);
    });

    it("rejects array value", () => {
      // @ts-expect-error
      simpleInstance = [null, true, 3];
      expect(ajv.validate(simpleTypesSchema, simpleInstance)).toBe(false);
    });
  });

  describe("Number or array", () => {
    const complexTypesSchema = {
      type: ["number", "array"],
      items: { type: "string" },
    } as const;

    type Complex = FromSchema<typeof complexTypesSchema>;
    let complexInstance: Complex;

    it("accepts number value", () => {
      complexInstance = 42;
      expect(ajv.validate(complexTypesSchema, complexInstance)).toBe(true);
    });

    it("accepts string array value", () => {
      complexInstance = ["apples", "tomatoes"];
      expect(ajv.validate(complexTypesSchema, complexInstance)).toBe(true);
    });

    it("rejects string or number array value", () => {
      // @ts-expect-error
      complexInstance = ["apples", 42];
      expect(ajv.validate(complexTypesSchema, complexInstance)).toBe(false);
    });

    it("rejects other value", () => {
      // @ts-expect-error
      complexInstance = { not: "a number", neither: ["a", "string", "array"] };
      expect(ajv.validate(complexTypesSchema, complexInstance)).toBe(false);
    });
  });

  describe("Tuple or object", () => {
    const uberComplexTypesSchema = {
      type: ["array", "object"],
      items: [
        { type: "number" },
        { type: "string" },
        {
          type: "object",
          properties: { descr: { type: "string" } },
          required: ["descr"],
        },
      ],
      additionalItems: false,
      properties: { name: { type: "string" }, description: { type: "string" } },
      required: ["name"],
    } as const;

    type UberComplex = FromSchema<typeof uberComplexTypesSchema>;
    let uberComplexInstance: UberComplex;

    it("accepts object with required & valid properties", () => {
      uberComplexInstance = { name: "Garfield" };
      expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(
        true
      );

      uberComplexInstance = { name: "Garfield", description: "a cool cat" };
      expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(
        true
      );
    });

    it("rejects object with invalid property", () => {
      // @ts-expect-error
      uberComplexInstance = { name: "Garfield", description: 42 };
      expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(
        false
      );
    });

    it("accepts tuples with valid values", () => {
      uberComplexInstance = [];
      expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(
        true
      );

      uberComplexInstance = [42];
      expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(
        true
      );

      uberComplexInstance = [42, "foo"];
      expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(
        true
      );

      uberComplexInstance = [42, "foo", { descr: "bar" }];
      expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(
        true
      );
    });

    it("rejects tuple with invalid value", () => {
      // @ts-expect-error
      uberComplexInstance = ["42", "foo", { descr: "bar" }];
      expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(
        false
      );
    });

    it("rejects tuple with additional items", () => {
      // @ts-expect-error
      uberComplexInstance = [42, "foo", { descr: "bar" }, "baz"];
      expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(
        false
      );
    });
  });
});
