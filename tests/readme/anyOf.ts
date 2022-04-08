import { A } from "ts-toolbelt";

import { FromSchema } from "index";

// Regular

const regularAnyOfSchema = {
  anyOf: [
    { type: "string" },
    {
      type: "array",
      items: { type: "string" },
    },
  ],
} as const;

type ReceivedRegularAnyOf = FromSchema<typeof regularAnyOfSchema>;

type ExpectedRegularAnyOf = string | string[];

type AssertRegularAnyOf = A.Equals<ReceivedRegularAnyOf, ExpectedRegularAnyOf>;
const assertRegularAnyOf: AssertRegularAnyOf = 1;
assertRegularAnyOf;

// Factored

const factoredAnyOfSchema = {
  type: "object",
  properties: {
    bool: { type: "boolean" },
  },
  required: ["bool"],
  anyOf: [
    {
      properties: {
        str: { type: "string" },
      },
      required: ["str"],
    },
    {
      properties: {
        num: { type: "number" },
      },
    },
  ],
} as const;

type ReceivedFactoredAnyOf = FromSchema<typeof factoredAnyOfSchema>;

type ExpectedFactoredAnyOf =
  | {
      [x: string]: unknown;
      bool: boolean;
      str: string;
    }
  | {
      [x: string]: unknown;
      bool: boolean;
      num?: number;
    };

type AssertFactoredAnyOf = A.Equals<
  ReceivedFactoredAnyOf,
  ExpectedFactoredAnyOf
>;
const assertFactoredAnyOf: AssertFactoredAnyOf = 1;
assertFactoredAnyOf;
