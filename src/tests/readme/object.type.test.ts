import type { A } from "ts-toolbelt";

import type { FromSchema } from "~/index";

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

// Mixed schema

const mixedObjectSchema = {
  type: "object",
  properties: {
    foo: { enum: ["bar", "baz"] },
  },
  additionalProperties: { type: "string" },
} as const;

type ReceivedMixedObject = FromSchema<typeof mixedObjectSchema>;
type ExpectedMixedObject = { [x: string]: unknown; foo?: "bar" | "baz" };

type AssertMixedObject = A.Equals<ReceivedMixedObject, ExpectedMixedObject>;
const assertMixedObject: AssertMixedObject = 1;
assertMixedObject;

// Unevaluated properties schema

const closedObjectSchema = {
  type: "object",
  allOf: [
    {
      properties: {
        foo: { type: "string" },
      },
      required: ["foo"],
    },
    {
      properties: {
        bar: { type: "number" },
      },
    },
  ],
  unevaluatedProperties: false,
} as const;

type ReceivedClosedObject = FromSchema<typeof closedObjectSchema>;
type ExpectedClosedObject = { foo: string; bar?: number };

type AssertClosedObject = A.Equals<ReceivedClosedObject, ExpectedClosedObject>;
const assertClosedObject: AssertClosedObject = 1;
assertClosedObject;

const openObjectSchema = {
  type: "object",
  unevaluatedProperties: {
    type: "boolean",
  },
} as const;

type ReceivedOpenObject = FromSchema<typeof openObjectSchema>;
type ExpectedOpenObject = { [x: string]: unknown };

type AssertOpenObject = A.Equals<ReceivedOpenObject, ExpectedOpenObject>;
const assertOpenObject: AssertOpenObject = 1;
assertOpenObject;

// Defaulted property

const objectWithDefaultedPropertySchema = {
  type: "object",
  properties: {
    foo: { type: "string", default: "bar" },
  },
  additionalProperties: false,
} as const;

type ReceivedObjectWithDefaultedProperty = FromSchema<
  typeof objectWithDefaultedPropertySchema
>;
type ExpectedObjectWithDefaultedProperty = { foo: string };
type AssertObjectWithDefaultedProperty = A.Equals<
  ReceivedObjectWithDefaultedProperty,
  ExpectedObjectWithDefaultedProperty
>;
const assertObjectWithDefaultedProperty: AssertObjectWithDefaultedProperty = 1;
assertObjectWithDefaultedProperty;

type ReceivedObjectWithDefaultedProperty2 = FromSchema<
  typeof objectWithDefaultedPropertySchema,
  { keepDefaultedPropertiesOptional: true }
>;
type ExpectedObjectWithDefaultedProperty2 = { foo?: string };
type AssertObjectWithDefaultedProperty2 = A.Equals<
  ReceivedObjectWithDefaultedProperty2,
  ExpectedObjectWithDefaultedProperty2
>;
const assertObjectWithDefaultedProperty2: AssertObjectWithDefaultedProperty2 = 1;
assertObjectWithDefaultedProperty2;

// With omitAdditionalProperties option

const openObjectSchema2 = {
  type: "object",
  additionalProperties: true,
  properties: {
    foo: { type: "string" },
  },
} as const;

type ReceivedOpenObjectWithOmitAdditionalPropertiesOption = FromSchema<
  typeof openObjectSchema2,
  { omitAdditionalProperties: true }
>;
type ExpectedOpenObjectWithOmitAdditionalPropertiesOption = {
  foo?: string;
};

type AssertOpenObjectWithOmitAdditionalPropertiesOption = A.Equals<
  ReceivedOpenObjectWithOmitAdditionalPropertiesOption,
  ExpectedOpenObjectWithOmitAdditionalPropertiesOption
>;

const assertOpenObjectWithOmitAdditionalPropertiesOption: AssertOpenObjectWithOmitAdditionalPropertiesOption = 1;
assertOpenObjectWithOmitAdditionalPropertiesOption;
