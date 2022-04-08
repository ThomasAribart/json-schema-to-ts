import { FromSchema } from "index";

import { ajv } from "./ajv";

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
      const objectSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        required: ["bool"],
        allOf: [
          { properties: { num: { type: "number" } }, required: ["num"] },
          { properties: { str: { type: "string" } } },
        ],
      } as const;

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("accepts objects matching parent, #1 and #2", () => {
        objectInstance = { bool: true, num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);

        objectInstance = {
          bool: true,
          num: 42,
          str: "string",
          other: ["any", "value"],
        };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);
      });

      it("rejects objects not matching parent", () => {
        // @ts-expect-error
        objectInstance = { num: 42, str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error
        objectInstance = { bool: "not a boolean", num: 42, str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects objects not matching #1", () => {
        // @ts-expect-error
        objectInstance = { bool: true, str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error
        objectInstance = { bool: true, str: "str", num: "not a number" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects objects not matching #2", () => {
        // @ts-expect-error
        objectInstance = { bool: true, num: 42, str: ["not", "a", "str"] };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Open to open object (impossible)", () => {
      const objectSchema = {
        type: "object",
        properties: { str: { type: "string" } },
        required: ["str"],
        allOf: [{ additionalProperties: { type: "boolean" } }],
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
        allOf: [
          {
            properties: { num: { type: "number" } },
            required: ["num"],
            additionalProperties: false,
          },
          { properties: { str: { type: "string" } } },
        ],
      } as const;

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("accepts objects matching parent, #1 and #2", () => {
        objectInstance = { num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);
      });

      it("rejects objects not matching closed #1", () => {
        // @ts-expect-error
        objectInstance = {};
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error
        objectInstance = { bool: true, str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Closed (2) to open object", () => {
      const objectSchema = {
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

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("accepts objects matching parent, #1 and #2", () => {
        objectInstance = { num: 42, bool: true, other: false };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);

        objectInstance = { num: 42, str: undefined };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects objects not matching #1", () => {
        // @ts-expect-error
        objectInstance = { num: 42, str: "str" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error
        objectInstance = { bool: true, str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Closed (3) to open object", () => {
      const objectSchema = {
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

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("accepts objects matching #1 and #2", () => {
        objectInstance = { str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(true);
      });

      it("rejects objects not matching #1", () => {
        // @ts-expect-error
        objectInstance = {};
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error
        objectInstance = { str: "string", other: "not boolean" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects objects not matching #2", () => {
        // @ts-expect-error
        objectInstance = { other: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Closed to open object (impossible 1)", () => {
      const objectSchema = {
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
        allOf: [
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

    describe("Closed to open object (impossible 3)", () => {
      const objectSchema = {
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

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("rejects objects not matching #1", () => {
        // @ts-expect-error
        objectInstance = { str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects objects not matching #2", () => {
        // @ts-expect-error
        objectInstance = { num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Open (1) to closed object", () => {
      const objectSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        allOf: [
          { properties: { str: { type: "string" } } },
          { properties: { num: { type: "number" } } },
        ],
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

    describe("Open to closed object (impossible 1)", () => {
      const objectSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        allOf: [
          { properties: { str: { type: "string" } }, required: ["str"] },
          { properties: { num: { type: "number" } } },
        ],
        additionalProperties: false,
      } as const;

      type FactoredObj = FromSchema<typeof objectSchema>;
      let objectInstance: FactoredObj;

      it("rejects objects matching parent as #1 requires 'str' property", () => {
        // @ts-expect-error
        objectInstance = {};
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error
        objectInstance = { bool: true };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects objects matching #1 as parent is closed", () => {
        // @ts-expect-error
        objectInstance = { str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error
        objectInstance = { bool: true, str: "string" };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });

      it("rejects objects matching #2 as parent is closed", () => {
        // @ts-expect-error
        objectInstance = { num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);

        // @ts-expect-error
        objectInstance = { bool: true, num: 42 };
        expect(ajv.validate(objectSchema, objectInstance)).toBe(false);
      });
    });

    describe("Open to closed object (impossible 2)", () => {
      const objectSchema = {
        type: "object",
        properties: { bool: { type: "boolean" } },
        allOf: [{ properties: { str: { type: "string" } }, required: ["str"] }],
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

    describe("Open to closed object (impossible 3)", () => {
      const objectSchema = {
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
        allOf: [
          { items: [{ const: "apple" }, { type: "number" }] },
          { items: [{ enum: ["apple", "banana"] }, { type: "boolean" }] },
        ],
      } as const;

      type Tuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: Tuple;

      it("accepts valid tuples", () => {
        tupleInstance = [];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["apple"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects tuples matching only #1", () => {
        // @ts-expect-error
        tupleInstance = ["apple", 42];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });

      it("rejects tuples matching only #2", () => {
        // @ts-expect-error
        tupleInstance = ["apple", true];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Open tuples (2)", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }],
        additionalItems: { type: "boolean" },
        allOf: [
          { items: [{ const: "apple" }] },
          { items: [{ enum: ["apple", "banana"] }, { type: "boolean" }] },
        ],
      } as const;

      type Tuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: Tuple;

      it("accepts valid tuples", () => {
        tupleInstance = [];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["apple"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["apple", true];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["apple", true, false];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects invalid tuples", () => {
        // @ts-expect-error
        tupleInstance = ["apple", 42];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Open tuples (3)", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }],
        additionalItems: { type: "boolean" },
        allOf: [
          { items: [{ type: "string" }], additionalItems: { type: "number" } },
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
        allOf: [
          { items: [{ const: "stop" }], additionalItems: false },
          { items: [{ enum: ["stop", "continue"] }] },
        ],
      } as const;

      type Tuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: Tuple;

      it("accepts tuples matching #1 AND #2", () => {
        tupleInstance = ["stop"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects tuples matching only #2", () => {
        // @ts-expect-error
        tupleInstance = ["continue"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error
        tupleInstance = ["continue", { any: "value" }];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Closed (2) to open tuple", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }],
        allOf: [
          {
            items: [{ const: "continue" }, { type: "number" }],
            additionalItems: false,
            minItems: 2,
          },
          {
            items: [{ anyOf: [{ const: "stop" }, { const: "continue" }] }],
            minItems: 1,
          },
        ],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("accepts tuples matching #1 AND #2", () => {
        tupleInstance = ["continue", 42];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects tuples not matching #2", () => {
        // @ts-expect-error
        tupleInstance = ["continue"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error
        tupleInstance = ["continue", 42, false];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Closed to open tuple (impossible 1)", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "number" }, { type: "number" }],
        minItems: 2,
        allOf: [{ items: [{ type: "number" }], additionalItems: false }],
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
        allOf: [
          {
            items: [{ type: "string" }],
            additionalItems: { type: "number" },
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
        allOf: [
          { items: [{ const: "apple" }] },
          { items: [{ enum: ["apple", "tomato", "banana"] }] },
        ],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("accepts valid tuple", () => {
        tupleInstance = ["apple"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects invalid tuple", () => {
        // @ts-expect-error: Doesn't match #2
        tupleInstance = ["tomato"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error: Doesn't match #2
        tupleInstance = ["banana"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

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
        items: [{ type: "string" }, { type: "boolean" }],
        minItems: 2,
        additionalItems: false,
        allOf: [{ items: [{ const: "can have additionalItems" }] }],
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
        allOf: [
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
        allOf: [{ additionalItems: { type: "boolean" } }],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("accepts tuples with any additional items", () => {
        tupleInstance = [
          "can have additionalItems",
          'yes, because "items" is missing in anyOf schema',
        ];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });
    });

    describe("Min/max items", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }, { type: "number" }, { type: "boolean" }],
        allOf: [{ minItems: 1 }, { maxItems: 2 }],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("accepts tuples with 1 or 2 items", () => {
        tupleInstance = ["0"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);

        tupleInstance = ["0", 1];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(true);
      });

      it("rejects tuples of other lengths", () => {
        // @ts-expect-error
        tupleInstance = [];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error
        tupleInstance = ["0", 1, true];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error
        tupleInstance = ["0", 1, true, { any: "value" }];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });

    describe("Min/max items (impossible)", () => {
      const tupleSchema = {
        type: "array",
        items: [{ type: "string" }, { type: "number" }, { type: "boolean" }],
        allOf: [{ minItems: 3 }, { maxItems: 1 }],
      } as const;

      type FactoredTuple = FromSchema<typeof tupleSchema>;
      let tupleInstance: FactoredTuple;

      it("rejects tuples of any length", () => {
        // @ts-expect-error
        tupleInstance = [];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error
        tupleInstance = ["0"];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error
        tupleInstance = ["0", 1];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error
        tupleInstance = ["0", 1, true];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);

        // @ts-expect-error
        tupleInstance = ["0", 1, true, { any: "value" }];
        expect(ajv.validate(tupleSchema, tupleInstance)).toBe(false);
      });
    });
  });
});
