import { FromSchema } from "index";

import { ajv } from "./ajv";

describe("Integer schemas", () => {
  const integerSchema = { type: "integer" } as const;

  type Number = FromSchema<typeof integerSchema>;
  let integerInstance: Number;

  it("accepts any integer value", () => {
    integerInstance = 42;
    expect(ajv.validate(integerSchema, integerInstance)).toBe(true);
  });

  it("rejects other values", () => {
    // @ts-expect-error
    integerInstance = "not a number";
    expect(ajv.validate(integerSchema, integerInstance)).toBe(false);
  });
});
