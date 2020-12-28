import Ajv from "ajv";

import { FromSchema } from "index";

var ajv = new Ajv();

describe("Not schemas", () => {
  describe("All but boolean", () => {
    const notBoolSchema = {
      not: { type: "boolean" },
    } as const;

    type NotBool = FromSchema<typeof notBoolSchema>;
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

    type Tuple = FromSchema<typeof tupleSchema>;
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

    type Tuple = FromSchema<typeof tupleSchema>;
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

    type CorrectLanguage = FromSchema<typeof correctLanguageSchema>;
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
});
