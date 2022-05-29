import { A } from "ts-toolbelt";

import { JSONSchema } from "../index";

import { ajv } from "./ajv.util.test";
import { petSchema, Pet } from "./schema.util.test";
import { $Validator, wrapValidatorAsTypeGuard } from "./validator";

const $validate: $Validator = (schema, data) => ajv.validate(schema, data);
const validate = wrapValidatorAsTypeGuard($validate);

type ValidationOptions = [{ shouldThrow: boolean }];
const $validateWithOptions: $Validator<ValidationOptions> = (
  schema,
  data,
  validationOptions
) => {
  const { shouldThrow } = validationOptions;
  const isValid = ajv.validate(schema, data);

  if (isValid) return true;

  if (shouldThrow) {
    throw new Error();
  }

  return false;
};
const validateWithOptions = wrapValidatorAsTypeGuard($validateWithOptions);

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

  it("accepts valid data (with validationOptions)", () => {
    const validData: unknown = { name: "Dogo", age: 13 };

    const assertOptions: A.Equals<
      Parameters<typeof validateWithOptions>,
      [JSONSchema, unknown, ...ValidationOptions]
    > = 1;
    assertOptions;

    expect(
      validateWithOptions(petSchema, validData, { shouldThrow: true })
    ).toBe(true);
  });

  it("rejects invalid data (with validationOptions)", () => {
    const invalidData: unknown = { name: 13, age: "13" };
    const validationOptions = { shouldThrow: false };

    const assertInvalidPet: A.Equals<typeof invalidData, unknown> = 1;
    assertInvalidPet;

    if (validateWithOptions(petSchema, invalidData, validationOptions)) {
      const assertValidPet: A.Equals<typeof invalidData, Pet> = 1;
      assertValidPet;
    }

    expect(validateWithOptions(petSchema, invalidData, validationOptions)).toBe(
      false
    );
  });
});
