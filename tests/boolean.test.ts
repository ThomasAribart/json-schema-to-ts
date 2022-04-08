import { FromSchema } from "index";

import { ajv } from "./ajv";

describe("Boolean schemas", () => {
  const booleanSchema = { type: "boolean" } as const;

  type Boolean = FromSchema<typeof booleanSchema>;
  let booleanInst: Boolean;

  it("accepts boolean value", () => {
    booleanInst = true;
    expect(ajv.validate(booleanSchema, booleanInst)).toBe(true);

    booleanInst = false;
    expect(ajv.validate(booleanSchema, booleanInst)).toBe(true);
  });

  it("rejects other values", () => {
    // @ts-expect-error
    booleanInst = "true";
    expect(ajv.validate(booleanSchema, booleanInst)).toBe(false);

    // @ts-expect-error
    booleanInst = 42;
    expect(ajv.validate(booleanSchema, booleanInst)).toBe(false);
  });
});
