import { FromSchema } from "index";

import { ajv } from "./ajv";

describe("String schemas", () => {
  const stringSchema = { type: "string" } as const;

  type String = FromSchema<typeof stringSchema>;
  let stringInstance: String;

  it("accepts any string value", () => {
    stringInstance = "apples";
    expect(ajv.validate(stringSchema, stringInstance)).toBe(true);
  });

  it("rejects other values", () => {
    // @ts-expect-error
    stringInstance = 42;
    expect(ajv.validate(stringSchema, stringInstance)).toBe(false);
  });
});
