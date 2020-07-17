import Ajv from "ajv";

import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import * as instances from "./instances";
import { expectInstances } from "./helpers";

var ajv = new Ajv();

describe("anyOf schema", () => {
  it("should only validate boolean, string or number", () => {
    const anyOfSchema = {
      anyOf: [{ type: "boolean" }, { type: "string" }],
    } as const;

    type StringBoolOrNumber = FromSchema<typeof anyOfSchema>;

    let assertStringBoolOrNumber: DoesBothExtend<
      StringBoolOrNumber,
      boolean | string
    >;
    assertStringBoolOrNumber = true;

    let boolOrStringInstance: StringBoolOrNumber;
    boolOrStringInstance = instances.booleanTrue;
    expect(ajv.validate(anyOfSchema, boolOrStringInstance)).toBe(true);

    boolOrStringInstance = instances.stringApples;
    expect(ajv.validate(anyOfSchema, boolOrStringInstance)).toBe(true);

    expectInstances
      .allExcept([
        "booleanFalse",
        "booleanTrue",
        "stringApples",
        "stringTomatoes",
      ])
      .toBeInvalidAgainst(anyOfSchema);
  });

  it("should only validate value in enum", () => {
    const applesSchema = {
      enum: ["apples", 42],
      anyOf: [{ type: "boolean" }, { type: "string" }],
    } as const;

    type Apples = FromSchema<typeof applesSchema>;

    let assertApple: DoesBothExtend<Apples, "apples">;
    assertApple = true;

    let applesInstance: Apples;
    applesInstance = instances.stringApples;
    expect(ajv.validate(applesSchema, applesInstance)).toBe(true);

    expectInstances
      .allExcept(["stringApples"])
      .toBeInvalidAgainst(applesSchema);
  });

  it("should only validate value in type and enum", () => {
    const typeEnumAnyOfSchema = {
      type: "string",
      enum: ["apples", 42],
      anyOf: [{ type: "boolean" }, { type: "string" }, { type: "number" }],
    } as const;

    type Apples = FromSchema<typeof typeEnumAnyOfSchema>;

    let assertApple: DoesBothExtend<Apples, "apples">;
    assertApple = true;

    let applesInstance: Apples;
    applesInstance = instances.stringApples;
    expect(ajv.validate(typeEnumAnyOfSchema, applesInstance)).toBe(true);

    expectInstances
      .allExcept(["stringApples"])
      .toBeInvalidAgainst(typeEnumAnyOfSchema);
  });

  it("should display a TypeError if anyOf is not an array", () => {
    const badSchema = {
      anyOf: { not: "an array" },
    } as const;

    type TypeError = FromSchema<typeof badSchema>;
    let assertTypeError: DoesBothExtend<
      TypeError,
      "TypeError: Value of anyOf should be an array"
    >;
    assertTypeError = true;
  });
});
