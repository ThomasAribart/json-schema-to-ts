import { FromSchema } from "index";

import { ajv } from "./ajv";

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
      const objectSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        required: ["bool"],
        oneOf: [
          { properties: { num: { type: "number" } }, required: ["num"] },
          { properties: { str: { type: "string" } }, required: ["str"] },
        ],
      } as const;

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("accepts objects matching only #1", () => {
        objectInstance = { bool: true, num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);
      });

      it("accepts objects matching only #2", () => {
        objectInstance = { bool: true, str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);
      });

      it("rejects objects matching both", () => {
        // Impossible to raise error at the moment...
        objectInstance = { bool: true, num: 42, str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects objects matching neither", () => {
        // @ts-expect-error: Missing 'num' or 'str' property
        objectInstance = { bool: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error: Bool should be boolean
        objectInstance = { bool: "true" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error: Bool is required
        objectInstance = { num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error: Bool is required
        objectInstance = { str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Open to open object (impossible)", () => {
      const objectSchema = {
        type: "object",
        properties: { str: { type: "string" } },
        required: ["str"],
        oneOf: [{ additionalProperties: { type: "boolean" } }],
      } as const;

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("rejects object not matching child", () => {
        // @ts-expect-error
        objectInstance = { str: "str" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects objects not matching parent", () => {
        // @ts-expect-error
        objectInstance = { str: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Closed (1) to open object", () => {
      const objectSchema = {
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

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("accepts objects matching only #1", () => {
        objectInstance = { num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);
      });

      it("accepts objects matching only #2", () => {
        objectInstance = { bool: true, str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);
      });

      it("rejects objects matching neither", () => {
        // @ts-expect-error: Missing 'num' of 'str' property
        objectInstance = {};
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Closed (2) to open object", () => {
      const objectSchema = {
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

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("accepts objects matching only #1", () => {
        objectInstance = { num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);
      });

      it("accepts objects matching only #2", () => {
        objectInstance = {};
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);

        objectInstance = { str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);
      });

      it("rejects objects matching neither", () => {
        // @ts-expect-error
        objectInstance = { num: 42, bool: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error
        objectInstance = { str: "string", bool: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Closed to open object (impossible 1)", () => {
      const objectSchema = {
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

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it('rejects object matching child schema as parent requires "bool" prop', () => {
        // @ts-expect-error
        objectInstance = { num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects object matching parent schema as child is closed", () => {
        // @ts-expect-error
        objectInstance = { num: 42, bool: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Closed to open object (impossible 2)", () => {
      const objectSchema = {
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

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("rejects non-boolean bool prop (required by parent)", () => {
        // @ts-expect-error
        objectInstance = { num: 42, bool: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects non-string bool prop (required by child)", () => {
        // @ts-expect-error
        objectInstance = { num: 42, bool: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Open (1) to closed object", () => {
      const objectSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        oneOf: [{ properties: { str: { type: "string" } } }],
        required: ["bool"],
        additionalProperties: false,
      } as const;

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("accepts valid object", () => {
        objectInstance = { bool: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);
      });

      it("rejects invalid object", () => {
        // @ts-expect-error: "bool" prop is required by parent
        objectInstance = { str: "str" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error: "str" is not allowed as additional property
        objectInstance = { bool: true, str: "str" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Open (2) to closed object", () => {
      const objectSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        oneOf: [
          { properties: { str: { type: "string" } }, required: ["str"] },
          { properties: { num: { type: "number" } } },
        ],
        additionalProperties: false,
      } as const;

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      objectInstance = {};
      expect(ajv.validate(objectSchema, objectInstance)).toBe(true);

      it("accepts objects matching #2", () => {
        objectInstance = { bool: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);
      });

      it("rejects objects matching #1 as parent is closed", () => {
        // @ts-expect-error: "str" is not allowed as additionalProperty
        objectInstance = { str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error: event with bool present
        objectInstance = { bool: true, str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects objects matching neigher", () => {
        // @ts-expect-error: "num" is not allowed as additionalProperty
        objectInstance = { num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error: event with bool present
        objectInstance = { bool: true, num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Open to closed object (impossible 1)", () => {
      const objectSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        oneOf: [{ properties: { str: { type: "string" } }, required: ["str"] }],
        required: ["bool"],
        additionalProperties: false,
      } as const;

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it('rejects object having "str" child schema as parent is closed', () => {
        // @ts-expect-error
        objectInstance = { bool: true, str: "str" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it('rejects object not having "str" property as it is required by child', () => {
        // @ts-expect-error
        objectInstance = { bool: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it('rejects object not having "bool" property as it is required by parent', () => {
        // @ts-expect-error: Parent requires 'bool' property
        objectInstance = { str: "str" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Open to closed object (impossible 2)", () => {
      const objectSchema = {
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

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it('rejects object with "bool" property as child is closed', () => {
        // @ts-expect-error
        objectInstance = { bool: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it('rejects object with "str" property as parent is closed', () => {
        // @ts-expect-error
        objectInstance = { str: "str" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects object with both at the time", () => {
        // @ts-expect-error
        objectInstance = { bool: true, str: "str" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });
  });

  describe("Factored tuple properties", () => {
    describe("Open tuples", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }],
        oneOf: [
          { items: [{ const: "num" }, { type: "number" }] },
          { items: [{ const: "bool" }, { type: "boolean" }] },
        ],
      } as const;

      type Tuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: Tuple;

      it("accepts tuples matching #1", () => {
        tupleInstance = ["num"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["num", 42];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("accepts tuples matching #2", () => {
        tupleInstance = ["bool"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["bool", true];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects tuples matching neither", () => {
        // @ts-expect-error: First item should be "num"/"bool"
        tupleInstance = ["not num/bool"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error: Second item should be number
        tupleInstance = ["num", true];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error: Second item should be bool
        tupleInstance = ["bool", 42];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Open tuples (2)", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }],
        additionalItems: { type: "boolean" },
        oneOf: [
          { items: [{ const: "num" }, { type: "number" }] },
          { items: [{ const: "bool" }, { type: "boolean" }] },
        ],
      } as const;

      type Tuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: Tuple;

      it("accepts tuples matching #1", () => {
        tupleInstance = ["num"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("accepts tuples matching #2", () => {
        tupleInstance = ["bool"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["bool", true];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects tuples not matching parent", () => {
        // @ts-expect-error: Second item cannot exist (should be bool AND number)
        tupleInstance = ["num", 42];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Open tuples (3)", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }],
        additionalItems: { type: "boolean" },
        oneOf: [
          {
            items: [{ type: "string" }],
            additionalItems: { type: "number" },
          },
        ],
      } as const;

      type Tuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: Tuple;

      it("accepts tuples matching parent and child", () => {
        tupleInstance = ["str"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects tuples with additional items as child and parent don't match", () => {
        // @ts-expect-error: Second item cannot exist (should be bool AND number)
        tupleInstance = ["num", 42];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error: Second item cannot exist (should be bool AND number)
        tupleInstance = ["num", true];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Closed (1) to open tuple", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }],
        oneOf: [
          { items: [{ const: "stop" }], additionalItems: false },
          { items: [{ const: "continue" }] },
        ],
      } as const;

      type Tuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: Tuple;

      it("accepts tuples matching #1", () => {
        tupleInstance = ["stop"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("accepts tuples matching #2", () => {
        tupleInstance = ["continue"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["continue", { any: "value" }];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects tuples matching neither", () => {
        // @ts-expect-error: First item should be "stop"/"continue"
        tupleInstance = ["invalid value"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error: Second item is denied
        tupleInstance = ["stop", { any: "value" }];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Closed (2) to open tuple", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }],
        oneOf: [
          {
            items: [{ const: "num" }, { type: "number" }],
            additionalItems: false,
            minItems: 2,
          },
          {
            items: [{ const: "bool" }, { type: "boolean" }],
            additionalItems: false,
            minItems: 1,
          },
        ],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("accepts tuples matching #1", () => {
        tupleInstance = ["num", 42];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("accepts tuples matching #2", () => {
        tupleInstance = ["bool"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["bool", true];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects tuples matching neither", () => {
        // @ts-expect-error: Third item is denied
        tupleInstance = ["num", 42, "additional item"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error: Third item is denied
        tupleInstance = ["bool", true, "additional item"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Closed to open tuple (impossible 1)", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "number" }, { type: "number" }],
        minItems: 2,
        oneOf: [{ items: [{ type: "number" }], additionalItems: false }],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("rejects tuple matching child schema as parent requires 2 items", () => {
        // @ts-expect-error
        tupleInstance = [0];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });

      it("rejects tuple matching parent schema as child is closed", () => {
        // @ts-expect-error
        tupleInstance = [0, 1];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Closed to open tuple (impossible 2)", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }, { type: "boolean" }],
        minItems: 2,
        oneOf: [
          {
            items: [{ type: "string" }, { type: "number" }],
            additionalItems: false,
          },
        ],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("rejects non-boolean second item (required by parent)", () => {
        // @ts-expect-error
        tupleInstance = ["string", 42];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });

      it("rejects non-number second item (required by child)", () => {
        // @ts-expect-error
        tupleInstance = ["string", true];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Open (1) to closed tuple", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }],
        minItems: 1,
        additionalItems: false,
        oneOf: [
          { items: [{ const: "apple" }] },
          { items: [{ enum: ["tomato", "banana"] }] },
        ],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("accepts valid tuple", () => {
        tupleInstance = ["apple"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["tomato"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["banana"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects invalid tuple", () => {
        // @ts-expect-error: One item is required by parent
        tupleInstance = [];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error: Additional items are denied
        tupleInstance = ["apple", "tomato"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Open (2) to closed tuple", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }],
        additionalItems: false,
        oneOf: [
          { items: [{ const: "several" }, { const: "items" }], minItems: 2 },
          { items: [{ const: "only one" }] },
        ],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("accepts tuples matching #2", () => {
        tupleInstance = [];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["only one"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects tuples matching #1 as parent is closed", () => {
        // @ts-expect-error: Second item is not allowed as additionalProperty
        tupleInstance = ["several", "items"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error: second item is missing
        tupleInstance = ["several"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Open (3) to closed tuple", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }, { type: "boolean" }],
        minItems: 2,
        additionalItems: false,
        oneOf: [{ items: [{ const: "can have additionalItems" }] }],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("accepts tuples matching parent and child", () => {
        tupleInstance = ["can have additionalItems", true];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects invalid tuples", () => {
        // @ts-expect-error: Second item is required by parent
        tupleInstance = ["can have additionalItems"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error: First item should be child's const
        tupleInstance = ["no child const"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Open to closed tuple (impossible)", () => {
      const factoredTupleSchema = {
        type: "array",
        items: [{ type: "string" }, { type: "boolean" }],
        minItems: 2,
        additionalItems: false,
        oneOf: [
          { items: [{ type: "string" }], additionalItems: { type: "number" } },
        ],
      } as const;

      type FactoredTuple = FromSchema<typeof factoredTupleSchema>;
      let tupleInstance: FactoredTuple;

      it("rejects tuple having number second item as parent requires boolean", () => {
        // @ts-expect-error
        tupleInstance = ["str", 42];
        expect(ajv.validate(factoredTupleSchema, tupleInstance)).toBe(false);
      });

      it("rejects tuple having boolean second item as child requires number", () => {
        // @ts-expect-error
        tupleInstance = ["str", true];
        expect(ajv.validate(factoredTupleSchema, tupleInstance)).toBe(false);
      });

      it("rejects object not having second items as it is required by parent", () => {
        // @ts-expect-error
        tupleInstance = ["str"];
        expect(ajv.validate(factoredTupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Incorrect schema", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }],
        oneOf: [{ additionalItems: { type: "boolean" } }],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("accepts tuples with any additional items", () => {
        tupleInstance = [
          "can have additionalItems",
          'yes, because "items" is missing in oneOf schema',
        ];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });
    });

    describe("Min/max items", () => {
      const factoredTupleSchema = {
        type: "array",
        items: [{ type: "string" }, { type: "number" }, { type: "boolean" }],
        oneOf: [{ minItems: 3 }, { maxItems: 1 }],
      } as const;

      type FactoredTuple = FromSchema<typeof factoredTupleSchema>;
      let factoredTupleInstance: FactoredTuple;

      it("accepts tuples with <= 1 items", () => {
        factoredTupleInstance = [];
        expect(ajv.validate(factoredTupleSchema, factoredTupleInstance)).toBe(
          true
        );

        factoredTupleInstance = ["0"];
        expect(ajv.validate(factoredTupleSchema, factoredTupleInstance)).toBe(
          true
        );
      });

      it("accepts tuples with >= 3 items", () => {
        factoredTupleInstance = ["0", 1, true];
        expect(ajv.validate(factoredTupleSchema, factoredTupleInstance)).toBe(
          true
        );

        factoredTupleInstance = ["0", 1, true, "any"];
        expect(ajv.validate(factoredTupleSchema, factoredTupleInstance)).toBe(
          true
        );
      });

      it("rejects tuples with 2 items", () => {
        // @ts-expect-error: Tuples should not have 2 items
        factoredTupleInstance = ["0", 1];
        expect(ajv.validate(factoredTupleSchema, factoredTupleInstance)).toBe(
          false
        );
      });
    });
  });
});
