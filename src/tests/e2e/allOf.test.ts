import Ajv from "ajv";

import { FromSchema } from "index";

var ajv = new Ajv();

describe("AllOf schemas", () => {
  describe("Boolean and True", () => {
    const trueSchema = {
      allOf: [{ type: "boolean" }, { const: true }],
    } as const;

    type True = FromSchema<typeof trueSchema>;
    let trueInstance: True;

    it("accepts true", () => {
      trueInstance = true;
      expect(ajv.validate(trueSchema, trueInstance)).toBe(true);
    });

    it("rejects other values", () => {
      // @ts-expect-error
      trueInstance = false;
      expect(ajv.validate(trueSchema, trueInstance)).toBe(false);

      // @ts-expect-error
      trueInstance = "string";
      expect(ajv.validate(trueSchema, trueInstance)).toBe(false);
    });
  });

  describe("Along OneOf", () => {
    const appleSchema = {
      oneOf: [{ const: "apples" }, { const: 42 }],
      allOf: [{ type: "string" }, { enum: ["apples", "tomatoes"] }],
    } as const;

    type Apple = FromSchema<typeof appleSchema>;
    let appleInstance: Apple;

    it("accepts valid string", () => {
      appleInstance = "apples";
      expect(ajv.validate(appleSchema, appleInstance)).toBe(true);
    });

    it("rejects other values", () => {
      // @ts-expect-error
      appleInstance = "tomatoes";
      expect(ajv.validate(appleSchema, appleInstance)).toBe(false);

      // @ts-expect-error
      appleInstance = 43;
      expect(ajv.validate(appleSchema, appleInstance)).toBe(false);

      // @ts-expect-error
      appleInstance = true;
      expect(ajv.validate(appleSchema, appleInstance)).toBe(false);
    });
  });

  describe("Factored object properties", () => {
    describe("Open objects", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        required: ["bool"],
        allOf: [
          { properties: { num: { type: "number" } }, required: ["num"] },
          { properties: { str: { type: "string" } } },
        ],
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it("accepts objects matching parent, #1 and #2", () => {
        factoredObjInstance = { bool: true, num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);

        factoredObjInstance = {
          bool: true,
          num: 42,
          str: "string",
          other: ["any", "value"],
        };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("rejects objects not matching parent", () => {
        // @ts-expect-error
        factoredObjInstance = { num: 42, str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error
        factoredObjInstance = { bool: "not a boolean", num: 42, str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it("rejects objects not matching #1", () => {
        // @ts-expect-error
        factoredObjInstance = { bool: true, str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error
        factoredObjInstance = { bool: true, str: "str", num: "not a number" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it("rejects objects not matching #2", () => {
        // @ts-expect-error
        factoredObjInstance = { bool: true, num: 42, str: ["not", "a", "str"] };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Closed (1) to open object", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        allOf: [
          {
            properties: { num: { type: "number" } },
            required: ["num"],
            additionalProperties: false,
          },
          { properties: { str: { type: "string" } } },
        ],
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it("accepts objects matching parent, #1 and #2", () => {
        factoredObjInstance = { num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("rejects objects not matching closed #1", () => {
        // @ts-expect-error
        factoredObjInstance = {};
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error
        factoredObjInstance = { bool: true, str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Closed (2) to open object", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        allOf: [
          {
            properties: { num: { type: "number" } },
            required: ["num"],
            additionalProperties: { type: "boolean" },
          },
          { properties: { str: { type: "string" } } },
        ],
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it("accepts objects matching parent, #1 and #2", () => {
        factoredObjInstance = { num: 42, bool: true, other: false };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("rejects objects not matching #1", () => {
        // Impossible to raise error at the moment...
        factoredObjInstance = { num: 42, str: "str" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error
        factoredObjInstance = { bool: true, str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Closed (3) to open object", () => {
      const factoredObjSchema = {
        type: "object",
        allOf: [
          {
            properties: { str: { type: "string" } },
            required: ["str"],
            additionalProperties: { type: "boolean" },
          },
          { additionalProperties: { type: "string" } },
        ],
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it("accepts objects matching #1 and #2", () => {
        factoredObjInstance = { str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(true);
      });

      it("rejects objects not matching #1", () => {
        // @ts-expect-error
        factoredObjInstance = {};
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error
        factoredObjInstance = { str: "string", other: "not boolean" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it("rejects objects not matching #2", () => {
        // @ts-expect-error
        factoredObjInstance = { other: true };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Closed to open object (impossible 1)", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        allOf: [
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
        allOf: [
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

    describe("Closed to open object (impossible 3)", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        allOf: [
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

      it("rejects objects not matching #1", () => {
        // @ts-expect-error
        factoredObjInstance = { str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it("rejects objects not matching #2", () => {
        // @ts-expect-error
        factoredObjInstance = { num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Open (1) to closed object", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        allOf: [
          { properties: { str: { type: "string" } } },
          { properties: { num: { type: "number" } } },
        ],
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

    describe("Open to closed object (impossible 1)", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        allOf: [
          { properties: { str: { type: "string" } }, required: ["str"] },
          { properties: { num: { type: "number" } } },
        ],
        additionalProperties: false,
      } as const;

      type FactoredObj = FromSchema<typeof factoredObjSchema>;
      let factoredObjInstance: FactoredObj;

      it("rejects objects matching parent as #1 requires 'str' property", () => {
        // @ts-expect-error
        factoredObjInstance = {};
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error
        factoredObjInstance = { bool: true };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it("rejects objects matching #1 as parent is closed", () => {
        // @ts-expect-error
        factoredObjInstance = { str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error
        factoredObjInstance = { bool: true, str: "string" };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });

      it("rejects objects matching #2 as parent is closed", () => {
        // @ts-expect-error
        factoredObjInstance = { num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );

        // @ts-expect-error
        factoredObjInstance = { bool: true, num: 42 };
        expect(ajv.validate(factoredObjSchema, factoredObjInstance)).toBe(
          false
        );
      });
    });

    describe("Open to closed object (impossible 2)", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        allOf: [{ properties: { str: { type: "string" } }, required: ["str"] }],
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

    describe("Open to closed object (impossible 3)", () => {
      const factoredObjSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        allOf: [
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
