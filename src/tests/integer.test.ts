import Ajv from "ajv";

import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import * as instances from "./instances";
import { expectInstances } from "./helpers";

var ajv = new Ajv();

it("should derive correct types for integer schema", () => {
  const integerSchema = { type: "integer" } as const;

  type Number = FromSchema<typeof integerSchema>;

  let assertNumber: DoesBothExtend<Number, number>;
  assertNumber = true;

  let integerInstance: Number;
  integerInstance = instances.number42;
  expect(ajv.validate(integerSchema, integerInstance)).toBe(true);

  integerInstance = instances.number43;
  expect(ajv.validate(integerSchema, integerInstance)).toBe(true);

  expectInstances
    .allExcept(["number42", "number43"])
    .toBeInvalidAgainst(integerSchema);
});
