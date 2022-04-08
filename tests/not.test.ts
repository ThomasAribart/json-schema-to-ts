import { FromSchema } from "index";

import { ajv } from "./ajv";

describe("Not schemas", () => {
  describe("All but boolean", () => {
    const notBoolSchema = {
      not: { type: "boolean" },
    } as const;

    // @ts-ignore This type can raise an error (in VS Code only)
    type NotBool = FromSchema<typeof notBoolSchema, { parseNotKeyword: true }>;
    let notBoolInstance: NotBool;

    it("rejects boolean", () => {
      // @ts-expect-error
      notBoolInstance = false;
      expect(ajv.validate(notBoolSchema, notBoolInstance)).toBe(false);

      // @ts-expect-error
      notBoolInstance = true;
      expect(ajv.validate(notBoolSchema, notBoolInstance)).toBe(false);
    });

    it("accepts any other value", () => {
      notBoolInstance = null;
      expect(ajv.validate(notBoolSchema, notBoolInstance)).toBe(true);

      notBoolInstance = 42;
      expect(ajv.validate(notBoolSchema, notBoolInstance)).toBe(true);

      notBoolInstance = "string";
      expect(ajv.validate(notBoolSchema, notBoolInstance)).toBe(true);

      notBoolInstance = { any: "object" };
      expect(ajv.validate(notBoolSchema, notBoolInstance)).toBe(true);

      notBoolInstance = ["any", "object"];
      expect(ajv.validate(notBoolSchema, notBoolInstance)).toBe(true);
    });
  });

  describe("Tuple of length 1 or 3", () => {
    const tupleSchema = {
      type: "array",
      items: [{ const: 1 }, { const: 2 }, { const: 3 }],
      minItems: 1,
      not: { const: [1, 2] },
    } as const;

    type Tuple = FromSchema<typeof tupleSchema, { parseNotKeyword: true }>;
    let tuple: Tuple;

    it("rejects tuple of incorrect length", () => {
      // @ts-expect-error
      tuple = [];
      expect(ajv.validate(tupleSchema, tuple)).toBe(false);

      // @ts-expect-error
      tuple = [1, 2];
      expect(ajv.validate(tupleSchema, tuple)).toBe(false);
    });

    it("accepts tuple of correct lengths", () => {
      tuple = [1];
      expect(ajv.validate(tupleSchema, tuple)).toBe(true);

      tuple = [1, 2, 3];
      expect(ajv.validate(tupleSchema, tuple)).toBe(true);
    });
  });

  describe("Tuple of length 3", () => {
    const tupleSchema = {
      type: "array",
      items: [{ const: 1 }, { const: 2 }, { const: 3 }],
      not: { maxItems: 2 },
    } as const;

    type Tuple = FromSchema<typeof tupleSchema, { parseNotKeyword: true }>;
    let tuple: Tuple;

    it("rejects tuple of incorrect length", () => {
      // @ts-expect-error
      tuple = [];
      expect(ajv.validate(tupleSchema, tuple)).toBe(false);

      // @ts-expect-error
      tuple = [1];
      expect(ajv.validate(tupleSchema, tuple)).toBe(false);

      // @ts-expect-error
      tuple = [1, 2];
      expect(ajv.validate(tupleSchema, tuple)).toBe(false);
    });

    it("accepts tuple of correct lengths", () => {
      tuple = [1, 2, 3];
      expect(ajv.validate(tupleSchema, tuple)).toBe(true);
    });
  });

  describe("Enum not const", () => {
    const correctLanguageSchema = {
      type: "string",
      enum: ["genious", "regular", "idiot"],
      not: { const: "idiot" },
    } as const;

    type CorrectLanguage = FromSchema<
      typeof correctLanguageSchema,
      { parseNotKeyword: true }
    >;
    let correctLanguage: CorrectLanguage;

    it("rejects incorrect language", () => {
      // @ts-expect-error
      correctLanguage = "idiot";
      expect(ajv.validate(correctLanguageSchema, correctLanguage)).toBe(false);
    });

    it("accepts correct language", () => {
      correctLanguage = "genious";
      expect(ajv.validate(correctLanguageSchema, correctLanguage)).toBe(true);

      correctLanguage = "regular";
      expect(ajv.validate(correctLanguageSchema, correctLanguage)).toBe(true);
    });
  });

  describe("additionalItems", () => {
    const openArraySchema1 = {
      type: "array",
      items: [{ const: 0 }, { enum: [0, 1] }],
      not: { const: [0, 0], additionalItems: false },
    } as const;

    type OpenArray1 = FromSchema<
      typeof openArraySchema1,
      { parseNotKeyword: true }
    >;
    let openArray1: OpenArray1;

    it("accepts correct item", () => {
      // Still works as additionalItems is not bound to items
      openArray1 = [0, 0, 1];
      expect(ajv.validate(openArraySchema1, openArray1)).toBe(true);
    });

    const openArraySchema2 = {
      type: "array",
      items: [{ const: 0 }, { const: 1 }],
      not: { items: [{ const: 0 }, { const: 1 }], additionalItems: false },
    } as const;

    type OpenArray2 = FromSchema<
      typeof openArraySchema2,
      { parseNotKeyword: true }
    >;
    let openArray2: OpenArray2;

    it("accepts correct item", () => {
      openArray2 = [0, 1, 2];
      expect(ajv.validate(openArraySchema2, openArray2)).toBe(true);

      // Is correctly rejected but impossible to throw right now as [] can be assigned to ...unknown[]
      openArray2 = [0, 1];
      expect(ajv.validate(openArraySchema2, openArray2)).toBe(false);
    });
  });
});
