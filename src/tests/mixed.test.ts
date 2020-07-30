import Ajv from "ajv";

import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import * as instances from "./instances";
import { expectInstances } from "./helpers";

var ajv = new Ajv();

it("should derive correct type for multiple simple types schema", () => {
  const simpleTypesSchema = {
    type: ["null", "boolean", "integer"],
  } as const;

  type Simple = FromSchema<typeof simpleTypesSchema>;

  let assertSimple: DoesBothExtend<Simple, null | boolean | number>;
  assertSimple = true;

  let simpleInstance: Simple;
  simpleInstance = instances.lNull;
  expect(ajv.validate(simpleTypesSchema, simpleInstance)).toBe(true);

  simpleInstance = instances.booleanFalse;
  expect(ajv.validate(simpleTypesSchema, simpleInstance)).toBe(true);

  simpleInstance = instances.booleanTrue;
  expect(ajv.validate(simpleTypesSchema, simpleInstance)).toBe(true);

  simpleInstance = instances.number42;
  expect(ajv.validate(simpleTypesSchema, simpleInstance)).toBe(true);

  simpleInstance = instances.number43;
  expect(ajv.validate(simpleTypesSchema, simpleInstance)).toBe(true);

  expectInstances
    .allExcept(["lNull", "booleanFalse", "booleanTrue", "number42", "number43"])
    .toBeInvalidAgainst(simpleTypesSchema);
});

it("should derive correct type for number of string array", () => {
  const complexTypesSchema = {
    type: ["number", "array"],
    items: { type: "string" },
  } as const;

  type Complex = FromSchema<typeof complexTypesSchema>;

  let assertComplex: DoesBothExtend<Complex, number | string[]>;
  assertComplex = true;

  let complexInstance: Complex;
  complexInstance = instances.number42;
  expect(ajv.validate(complexTypesSchema, complexInstance)).toBe(true);

  complexInstance = instances.number42half;
  expect(ajv.validate(complexTypesSchema, complexInstance)).toBe(true);

  complexInstance = instances.number43;
  expect(ajv.validate(complexTypesSchema, complexInstance)).toBe(true);

  complexInstance = instances.arrayString1;
  expect(ajv.validate(complexTypesSchema, complexInstance)).toBe(true);

  complexInstance = instances.arrayString2;
  expect(ajv.validate(complexTypesSchema, complexInstance)).toBe(true);

  expectInstances
    .allExcept([
      "number42",
      "number42half",
      "number43",
      "arrayString1",
      "arrayString2",
    ])
    .toBeInvalidAgainst(complexTypesSchema);
});

it("should derive correct type for tuple or object", () => {
  const uberComplexTypesSchema = {
    type: ["array", "object"],
    items: [
      { type: "number" },
      { type: "string" },
      {
        type: "object",
        properties: { description: { type: "string" } },
        required: ["description"],
      },
    ],
    additionalItems: false,
    properties: { name: { type: "string" }, description: { type: "string" } },
    required: ["name"],
  } as const;

  type UberComplex = FromSchema<typeof uberComplexTypesSchema>;

  let assertUberComplex: DoesBothExtend<
    UberComplex,
    | []
    | [number]
    | [number, string]
    | [number, string, { description: string }]
    | { name: string; description?: string }
  >;
  assertUberComplex = true;

  let uberComplexInstance: UberComplex;
  uberComplexInstance = instances.object1;
  expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(true);

  uberComplexInstance = instances.object2;
  expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(true);

  uberComplexInstance = instances.object3;
  expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(true);

  uberComplexInstance = instances.object4;
  expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(true);

  uberComplexInstance = instances.object5;
  expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(true);

  uberComplexInstance = instances.arrayTuple1;
  expect(ajv.validate(uberComplexTypesSchema, uberComplexInstance)).toBe(true);

  expectInstances
    .allExcept([
      "object1",
      "object2",
      "object3",
      "object4",
      "object5",
      "arrayTuple1",
    ])
    .toBeInvalidAgainst(uberComplexTypesSchema);
});
