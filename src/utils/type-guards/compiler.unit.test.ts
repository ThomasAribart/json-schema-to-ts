import type { A } from "ts-toolbelt";

import type { JSONSchema } from "../../index";

import { ajv } from "./ajv.util.test";
import { petSchema, Pet } from "./schema.util.test";
import { $Compiler, wrapCompilerAsTypeGuard } from "./compiler";

const $compile: $Compiler = (schema) => ajv.compile(schema);
const compile = wrapCompilerAsTypeGuard($compile);
const isPet = compile(petSchema);

type CompilingOtions = [{ fastCompile: boolean }];
type ValidationOptions = [{ shouldThrow: boolean }];
const $compileWithOptions: $Compiler<CompilingOtions, ValidationOptions> = (
  schema,
  compilingOptions
) => {
  const { fastCompile } = compilingOptions;

  const validator = ajv.compile(schema, fastCompile);

  return (data, validationOptions) => {
    const { shouldThrow } = validationOptions;
    const isValid = validator(data);

    if (isValid) return true;

    if (shouldThrow) {
      throw new Error();
    }

    return false;
  };
};
const compileWithOptions = wrapCompilerAsTypeGuard($compileWithOptions);
const isPetWithOptions = compileWithOptions(petSchema, { fastCompile: true });

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

  it("accepts valid data (with validationOptions)", () => {
    const validData: unknown = { name: "Dogo", age: 13 };

    const assertCompilerOptions: A.Equals<
      Parameters<typeof compileWithOptions>,
      [JSONSchema, ...CompilingOtions]
    > = 1;
    assertCompilerOptions;

    const assertValidatorOptions: A.Equals<
      Parameters<typeof isPetWithOptions>,
      [unknown, ...ValidationOptions]
    > = 1;
    assertValidatorOptions;

    expect(isPetWithOptions(validData, { shouldThrow: true })).toBe(true);
  });

  it("rejects invalid data (with validationOptions)", () => {
    const invalidData: unknown = { name: 13, age: "13" };
    const validationOptions = { shouldThrow: false };

    const assertInvalidPet: A.Equals<typeof invalidData, unknown> = 1;
    assertInvalidPet;

    if (isPetWithOptions(invalidData, validationOptions)) {
      const assertValidPet: A.Equals<typeof invalidData, Pet> = 1;
      assertValidPet;
    }

    expect(isPetWithOptions(invalidData, validationOptions)).toBe(false);
  });
});
