import Ajv from "ajv";

import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import * as instances from "./instances";
import { expectInstances } from "./helpers";

var ajv = new Ajv();

it("should derive correct types for string schema", () => {
  const stringSchema = { type: "string" } as const;

  type String = FromSchema<typeof stringSchema>;

  let assertString: DoesBothExtend<String, string>;
  assertString = true;

  let stringInstance: String;
  stringInstance = instances.stringApples;
  expect(ajv.validate(stringSchema, stringInstance)).toBe(true);

  stringInstance = instances.stringTomatoes;
  expect(ajv.validate(stringSchema, stringInstance)).toBe(true);

  expectInstances
    .allExcept(["stringApples", "stringTomatoes"])
    .toBeInvalidAgainst(stringSchema);
});
