import type { A } from "ts-toolbelt";

import type { FromSchema } from "index";

const primitiveTypeSchema = {
  type: "null",
} as const;

type ExpectedPrimitive = null;
type ReceivedPrimitive = FromSchema<typeof primitiveTypeSchema>;

type AssertPrimitive = A.Equals<ExpectedPrimitive, ReceivedPrimitive>;
const assertPrimitive: AssertPrimitive = 1;
assertPrimitive;

const primitiveTypesSchema = {
  type: ["null", "string"],
} as const;

type ExpectedPrimitives = null | string;
type ReceivedPrimitives = FromSchema<typeof primitiveTypesSchema>;

type AssertPrimitives = A.Equals<ExpectedPrimitives, ReceivedPrimitives>;
const assertPrimitives: AssertPrimitives = 1;
assertPrimitives;
