import Ajv from "ajv";

import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import * as instances from "./instances";
import { expectInstances } from "./helpers";

var ajv = new Ajv();

it("should derive correct types for number schema", () => {
  const numberSchema = { type: "number" } as const;

  type Number = FromSchema<typeof numberSchema>;

  let assertNumber: DoesBothExtend<Number, number>;
  assertNumber = true;

  let numberInstance: Number;
  numberInstance = instances.number42;
  expect(ajv.validate(numberSchema, numberInstance)).toBe(true);

  numberInstance = instances.number42half;
  expect(ajv.validate(numberSchema, numberInstance)).toBe(true);

  expectInstances
    .allExcept(["number42", "number42half", "number43"])
    .toBeInvalidAgainst(numberSchema);
});
