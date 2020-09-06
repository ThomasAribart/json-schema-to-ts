import Ajv from "ajv";

import { FromSchema } from "index";

var ajv = new Ajv();

describe("No schema", () => {
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

  describe("String", () => {
    // No need to test validation here, string = schema ref
    type Unknown = FromSchema<string>;
    let unknownInstance: Unknown;

    it("accepts any value", () => {
      unknownInstance = null;
      unknownInstance = true;
      unknownInstance = "string";
      unknownInstance = 42;
      unknownInstance = { foo: "bar" };
      unknownInstance = ["foo", "bar"];
      unknownInstance;
    });
  });

  describe('"foo"', () => {
    // No need to test validation here, string = schema ref
    type Unknown = FromSchema<"foo">;
    let unknownInstance: Unknown;

    it("accepts any value", () => {
      unknownInstance = null;
      unknownInstance = true;
      unknownInstance = "string";
      unknownInstance = 42;
      unknownInstance = { foo: "bar" };
      unknownInstance = ["foo", "bar"];
      unknownInstance;
    });
  });
});
