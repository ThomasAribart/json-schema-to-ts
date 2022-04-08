import { FromSchema } from "index";

import { ajv } from "./ajv";

describe("Number schemas", () => {
  const numberSchema = { type: "number" } as const;

  type Number = FromSchema<typeof numberSchema>;
  let numberInstance: Number;

  it("accepts any number value", () => {
    numberInstance = 42;
    expect(ajv.validate(numberSchema, numberInstance)).toBe(true);
  });

  it("rejects other values", () => {
    // @ts-expect-error
    numberInstance = ["not", "a", "number"];
    expect(ajv.validate(numberSchema, numberInstance)).toBe(false);
  });
});
