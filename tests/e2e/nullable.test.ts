import Ajv from "ajv";

import { FromSchema } from "index";

var ajv = new Ajv();

describe("Nullable schemas", () => {
  const stringSchema = { type: "string", nullable: false } as const;

  type String = FromSchema<typeof stringSchema>;
  let stringInstance: String;

  const nullableStringSchema = { type: "string", nullable: true } as const;
  type nullableString = FromSchema<typeof nullableStringSchema>;
  let nullableStringInstance: nullableString;

  it("non-nullable accepts any string value", () => {
    stringInstance = "apples";
    expect(ajv.validate(stringSchema, stringInstance)).toBe(true);
  });

  it("non-nullable rejects null", () => {
    // @ts-expect-error
    stringInstance = null;
    expect(ajv.validate(stringSchema, stringInstance)).toBe(false);
  });

  it("nullable accepts any string value", () => {
    nullableStringInstance = "apples";
    expect(ajv.validate(nullableStringSchema, nullableStringInstance)).toBe(true);
  });

  it("nullable accepts null", () => {
    nullableStringInstance = null;
    expect(ajv.validate(nullableStringSchema, nullableStringInstance)).toBe(true);
  });
});
