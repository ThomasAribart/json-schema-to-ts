import Ajv from "ajv";

import { FromSchema } from "index";

var ajv = new Ajv();

describe("OneOf schemas", () => {
  describe("Boolean or String", () => {
    const oneOfSchema = {
      oneOf: [{ type: "boolean" }, { type: "string" }],
    } as const;

    type StringBoolOrNumber = FromSchema<typeof oneOfSchema>;
    let boolOrStringInstance: StringBoolOrNumber;

    it("accepts boolean or string value", () => {
      boolOrStringInstance = "string";
      expect(ajv.validate(oneOfSchema, boolOrStringInstance)).toBe(true);

      boolOrStringInstance = true;
      expect(ajv.validate(oneOfSchema, boolOrStringInstance)).toBe(true);
    });

    it("rejects other values", () => {
      // @ts-expect-error
      boolOrStringInstance = 42;
      expect(ajv.validate(oneOfSchema, boolOrStringInstance)).toBe(false);
    });
  });

  describe("Along AnyOf", () => {
    const anyOfSchema = {
      anyOf: [{ type: "string" }, { const: 42 }],
      oneOf: [{ type: "boolean" }, { type: "string" }, { type: "number" }],
    } as const;

    type Enum = FromSchema<typeof anyOfSchema>;
    let enumInstance: Enum;

    it("accepts string values or 42", () => {
      enumInstance = "apples";
      expect(ajv.validate(anyOfSchema, enumInstance)).toBe(true);

      enumInstance = "tomatoes";
      expect(ajv.validate(anyOfSchema, enumInstance)).toBe(true);

      enumInstance = 42;
      expect(ajv.validate(anyOfSchema, enumInstance)).toBe(true);
    });

    it("rejects other values", () => {
      // @ts-expect-error
      enumInstance = 43;
      expect(ajv.validate(anyOfSchema, enumInstance)).toBe(false);

      // @ts-expect-error
      enumInstance = true;
      expect(ajv.validate(anyOfSchema, enumInstance)).toBe(false);
    });
  });

  describe("Factored object properties", () => {
    describe("Open objects", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        required: ["bool"],
        oneOf: [
          { properties: { num: { type: "number" } }, required: ["num"] },
          { properties: { str: { type: "string" } }, required: ["str"] },
        ],
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it("accepts objects matching only #1", () => {
        factoredObjInstance = { bool: true, num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("accepts objects matching only #2", () => {
        factoredObjInstance = { bool: true, str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("rejects objects matching both", () => {
        // Impossible to raise error at the moment...
        factoredObjInstance = { bool: true, num: 42, str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it("rejects objects matching neither", () => {
        // @ts-expect-error: Missing 'num' or 'str' property
        factoredObjInstance = { bool: true };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error: Bool should be boolean
        factoredObjInstance = { bool: "true" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error: Bool is required
        factoredObjInstance = { num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error: Bool is required
        factoredObjInstance = { str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Closed (1) to open object", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        oneOf: [
          {
            properties: { num: { type: "number" } },
            required: ["num"],
            additionalProperties: false,
          },
          { properties: { str: { type: "string" } }, required: ["str"] },
        ],
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it("accepts objects matching only #1", () => {
        factoredObjInstance = { num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("accepts objects matching only #2", () => {
        factoredObjInstance = { bool: true, str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("rejects objects matching neither", () => {
        // @ts-expect-error: Missing 'num' of 'str' property
        factoredObjInstance = {};
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Closed (2) to open object", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        oneOf: [
          {
            properties: { num: { type: "number" } },
            required: ["num"],
            additionalProperties: false,
          },
          {
            properties: { str: { type: "string" } },
            additionalProperties: false,
          },
        ],
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it("accepts objects matching only #1", () => {
        factoredObjInstance = { num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("accepts objects matching only #2", () => {
        factoredObjInstance = {};
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);

        factoredObjInstance = { str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("rejects objects matching neither", () => {
        // @ts-expect-error
        factoredObjInstance = { num: 42, bool: true };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error
        factoredObjInstance = { str: "string", bool: true };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Closed to open object (impossible 1)", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        oneOf: [
          {
            properties: { num: { type: "number" } },
            required: ["num"],
            additionalProperties: false,
          },
        ],
        required: ["bool"],
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it('rejects object matching child schema as parent requires "bool" prop', () => {
        // @ts-expect-error
        factoredObjInstance = { num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it("rejects object matching parent schema as child is closed", () => {
        // @ts-expect-error
        factoredObjInstance = { num: 42, bool: true };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Closed to open object (impossible 2)", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        oneOf: [
          {
            properties: { num: { type: "number" }, bool: { type: "string" } },
            required: ["num"],
            additionalProperties: false,
          },
        ],
        required: ["bool"],
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it("rejects non-boolean bool prop (required by parent)", () => {
        // @ts-expect-error
        factoredObjInstance = { num: 42, bool: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it("rejects non-string bool prop (required by child)", () => {
        // @ts-expect-error
        factoredObjInstance = { num: 42, bool: true };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Open (1) to closed object", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        oneOf: [{ properties: { str: { type: "string" } } }],
        required: ["bool"],
        additionalProperties: false,
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it("accepts valid object", () => {
        factoredObjInstance = { bool: true };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("rejects invalid object", () => {
        // @ts-expect-error: "bool" prop is required by parent
        factoredObjInstance = { str: "str" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error: "str" is not allowed as additional property
        factoredObjInstance = { bool: true, str: "str" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Open (2) to closed object", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        oneOf: [
          { properties: { str: { type: "string" } }, required: ["str"] },
          { properties: { num: { type: "number" } } },
        ],
        additionalProperties: false,
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      factoredObjInstance = {};
      expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);

      it("accepts objects matching #2", () => {
        factoredObjInstance = { bool: true };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("rejects objects matching #1 as parent is closed", () => {
        // @ts-expect-error: "str" is not allowed as additionalProperty
        factoredObjInstance = { str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error: event with bool present
        factoredObjInstance = { bool: true, str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it("rejects objects matching neigher", () => {
        // @ts-expect-error: "num" is not allowed as additionalProperty
        factoredObjInstance = { num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error: event with bool present
        factoredObjInstance = { bool: true, num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Open to closed object (impossible 1)", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        oneOf: [{ properties: { str: { type: "string" } }, required: ["str"] }],
        required: ["bool"],
        additionalProperties: false,
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it('rejects object having "str" child schema as parent is closed', () => {
        // @ts-expect-error
        factoredObjInstance = { bool: true, str: "str" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it('rejects object not having "str" property as it is required by child', () => {
        // @ts-expect-error
        factoredObjInstance = { bool: true };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it('rejects object not having "bool" property as it is required by parent', () => {
        // @ts-expect-error: Parent requires 'bool' property
        factoredObjInstance = { str: "str" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Open to closed object (impossible 2)", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        oneOf: [
          {
            properties: { str: { type: "string" } },
            additionalProperties: false,
          },
        ],
        required: ["bool"],
        additionalProperties: false,
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it('rejects object with "bool" property as child is closed', () => {
        // @ts-expect-error
        factoredObjInstance = { bool: true };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it('rejects object with "str" property as parent is closed', () => {
        // @ts-expect-error
        factoredObjInstance = { str: "str" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it("rejects object with both at the time", () => {
        // @ts-expect-error
        factoredObjInstance = { bool: true, str: "str" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });
  });
  // TODO: Test tuples
});
