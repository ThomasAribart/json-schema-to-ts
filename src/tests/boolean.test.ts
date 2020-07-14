import Ajv from "ajv";

import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import * as instances from "./instances";
import { expectInstances } from "./helpers";

var ajv = new Ajv();

it("should derive correct types for boolean schema", () => {
  const booleanSchema = { type: "boolean" } as const;

  type Boolean = FromSchema<typeof booleanSchema>;

  let assertBoolean: DoesBothExtend<Boolean, boolean>;
  assertBoolean = true;

  let booleanInst: Boolean;
  booleanInst = instances.booleanTrue;
  expect(ajv.validate(booleanSchema, booleanInst)).toBe(true);

  booleanInst = instances.booleanFalse;
  expect(ajv.validate(booleanSchema, booleanInst)).toBe(true);

  expectInstances
    .allExcept(["booleanTrue", "booleanFalse"])
    .toBeInvalidAgainst(booleanSchema);
});
