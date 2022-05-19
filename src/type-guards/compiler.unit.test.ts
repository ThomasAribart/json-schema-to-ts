import { A } from "ts-toolbelt";

import { ajv } from "./ajv.util.test";
import { petSchema, Pet } from "./schema.util.test";
import { $Compiler, wrapCompilerAsTypeGuard } from "./compiler";

const $compile: $Compiler = (schema) => ajv.compile(schema);

const compile = wrapCompilerAsTypeGuard($compile);

const isPet = compile(petSchema);

describe("Compiler", () => {
  it("accepts valid data", () => {
    const validData: unknown = { name: "Dogo", age: 13 };
    expect(isPet(validData)).toBe(true);
  });

  it("rejects invalid data", () => {
    const invalidData: unknown = { name: 13, age: "13" };

    const assertInvalidPet: A.Equals<typeof invalidData, unknown> = 1;
    assertInvalidPet;

    if (isPet(invalidData)) {
      const assertValidPet: A.Equals<typeof invalidData, Pet> = 1;
      assertValidPet;
    }

    expect(isPet(invalidData)).toBe(false);
  });
});
