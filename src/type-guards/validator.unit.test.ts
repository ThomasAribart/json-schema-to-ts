import { A } from "ts-toolbelt";

import { ajv } from "./ajv.util.test";
import { petSchema, Pet } from "./schema.util.test";
import { $Validator, wrapValidatorAsTypeGuard } from "./validator";

const $validate: $Validator = (schema, data) => ajv.validate(schema, data);

const validate = wrapValidatorAsTypeGuard($validate);

describe("Validator", () => {
  it("accepts valid data", () => {
    const validData: unknown = { name: "Dogo", age: 13 };
    expect(validate(petSchema, validData)).toBe(true);
  });

  it("rejects invalid data", () => {
    const invalidData: unknown = { name: 13, age: "13" };

    const assertInvalidPet: A.Equals<typeof invalidData, unknown> = 1;
    assertInvalidPet;

    if (validate(petSchema, invalidData)) {
      const assertValidPet: A.Equals<typeof invalidData, Pet> = 1;
      assertValidPet;
    }

    expect(validate(petSchema, invalidData)).toBe(false);
  });
});
