import type { A } from "ts-toolbelt";

import type { FromSchema } from "index";

// With additional properties

const objectWithAdditionalPropertiesSchema = {
  type: "object",
  properties: {
    foo: { type: "string" },
    bar: { type: "number" },
  },
  required: ["foo"],
} as const;

type ReceivedObjectWithAdditionalProperties = FromSchema<
  typeof objectWithAdditionalPropertiesSchema
>;
type ExpectedObjectWithAdditionalProperties = {
  [x: string]: unknown;
  foo: string;
  bar?: number;
};

type AssertObjectWithAdditionalProperties = A.Equals<
  ReceivedObjectWithAdditionalProperties,
  ExpectedObjectWithAdditionalProperties
>;
const assertObjectWithAdditionalProperties: AssertObjectWithAdditionalProperties = 1;
assertObjectWithAdditionalProperties;

// No additional properties

const objectWithoutAdditionalPropertiesSchema = {
  ...objectWithAdditionalPropertiesSchema,
  additionalProperties: false,
} as const;

type ReceivedObjectWithoutAdditionalProperties = FromSchema<
  typeof objectWithoutAdditionalPropertiesSchema
>;
type ExpectedObjectWithoutAdditionalProperties = {
  foo: string;
  bar?: number;
};

type AssertObjectWithoutAdditionalProperties = A.Equals<
  ReceivedObjectWithoutAdditionalProperties,
  ExpectedObjectWithoutAdditionalProperties
>;
const assertObjectWithoutAdditionalProperties: AssertObjectWithoutAdditionalProperties = 1;
assertObjectWithoutAdditionalProperties;

// With typed additional properties

const objectWithTypedAdditionalPropertiesSchema = {
  type: "object",
  additionalProperties: {
    type: "boolean",
  },
  patternProperties: {
    "^S": { type: "string" },
    "^I": { type: "integer" },
  },
} as const;

type ReceivedObjectWithTypedAdditionalProperties = FromSchema<
  typeof objectWithTypedAdditionalPropertiesSchema
>;
type ExpectedObjectWithTypedAdditionalProperties = {
  [x: string]: string | number | boolean;
};

type AssertObjectWithTypedAdditionalProperties = A.Equals<
  ReceivedObjectWithTypedAdditionalProperties,
  ExpectedObjectWithTypedAdditionalProperties
>;
const assertObjectWithTypedAdditionalProperties: AssertObjectWithTypedAdditionalProperties = 1;
assertObjectWithTypedAdditionalProperties;
