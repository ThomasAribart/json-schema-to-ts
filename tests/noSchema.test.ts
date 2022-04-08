import { JSONSchema7 } from "definitions";
import { FromSchema } from "index";

import { ajv } from "./ajv";

describe("No schema", () => {
  describe("Empty", () => {
    const emptySchema = {} as JSONSchema7;
    type Any = FromSchema<typeof emptySchema>;
    let anyInstance: Any;

    it("accepts any value", () => {
      anyInstance = null;
      expect(ajv.validate(emptySchema, anyInstance)).toBe(true);

      anyInstance = true;
      expect(ajv.validate(emptySchema, anyInstance)).toBe(true);

      anyInstance = "string";
      expect(ajv.validate(emptySchema, anyInstance)).toBe(true);

      anyInstance = 42;
      expect(ajv.validate(emptySchema, anyInstance)).toBe(true);

      anyInstance = { foo: "bar" };
      expect(ajv.validate(emptySchema, anyInstance)).toBe(true);

      anyInstance = ["foo", "bar"];
      expect(ajv.validate(emptySchema, anyInstance)).toBe(true);
    });
  });

  describe("True", () => {
    type Unknown = FromSchema<true>;
    let anyInstance: Unknown;

    it("accepts any value", () => {
      anyInstance = null;
      expect(ajv.validate(true, anyInstance)).toBe(true);

      anyInstance = true;
      expect(ajv.validate(true, anyInstance)).toBe(true);

      anyInstance = "string";
      expect(ajv.validate(true, anyInstance)).toBe(true);

      anyInstance = 42;
      expect(ajv.validate(true, anyInstance)).toBe(true);

      anyInstance = { foo: "bar" };
      expect(ajv.validate(true, anyInstance)).toBe(true);

      anyInstance = ["foo", "bar"];
      expect(ajv.validate(true, anyInstance)).toBe(true);
    });
  });

  describe("False", () => {
    type Never = FromSchema<false>;
    let neverInstance: Never;

    it("rejects any value", () => {
      // @ts-expect-error
      neverInstance = null;
      expect(ajv.validate(false, neverInstance)).toBe(false);

      // @ts-expect-error
      neverInstance = true;
      expect(ajv.validate(false, neverInstance)).toBe(false);

      // @ts-expect-error
      neverInstance = "string";
      expect(ajv.validate(false, neverInstance)).toBe(false);

      // @ts-expect-error
      neverInstance = 42;
      expect(ajv.validate(false, neverInstance)).toBe(false);

      // @ts-expect-error
      neverInstance = { foo: "bar" };
      expect(ajv.validate(false, neverInstance)).toBe(false);

      // @ts-expect-error
      neverInstance = ["foo", "bar"];
      expect(ajv.validate(false, neverInstance)).toBe(false);
    });
  });
});
