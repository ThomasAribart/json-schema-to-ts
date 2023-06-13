import type { A } from "ts-toolbelt";

import type { FromSchema } from "~/index";

const addressSchema = {
  type: "object",
  allOf: [
    {
      properties: {
        address: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
      },
      required: ["address", "city", "state"],
    },
    {
      properties: {
        type: { enum: ["residential", "business"] },
      },
    },
  ],
} as const;

type ReceivedAddress = FromSchema<typeof addressSchema>;
type ExpectedAddress = {
  [x: string]: unknown;
  address: string;
  city: string;
  state: string;
  type?: "residential" | "business";
};

type AssertAddress = A.Equals<ReceivedAddress, ExpectedAddress>;
const assertAddress: AssertAddress = 1;
assertAddress;

// https://www.jsonschemavalidator.net/s/OWVtPurE
const addressSchemaWithUnevaluatedProperties = {
  type: "object",
  allOf: [
    {
      properties: {
        address: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
      },
      required: ["address", "city", "state"],
    },
    {
      properties: {
        type: { enum: ["residential", "business"] },
      },
    },
  ],
  unevaluatedProperties: false,
} as const;

type ReceivedAddressWithUnevaluatedProperties = FromSchema<
  typeof addressSchemaWithUnevaluatedProperties
>;
type ExpectedAddressWithUnevaluatedProperties = {
  address: string;
  city: string;
  state: string;
  type?: "residential" | "business";
};

type AssertAddressWithUnevaluatedProperties = A.Equals<
  ReceivedAddressWithUnevaluatedProperties,
  ExpectedAddressWithUnevaluatedProperties
>;
const assertAddressWithUnevaluatedProperties: AssertAddressWithUnevaluatedProperties = 1;
assertAddressWithUnevaluatedProperties;
