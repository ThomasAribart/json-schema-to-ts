import type { A } from "ts-toolbelt";

import type { FromSchema } from "~/index";

const userSchema = {
  type: "object",
  properties: {
    name: { $ref: "#/definitions/name" },
    age: { $ref: "#/definitions/age" },
  },
  required: ["name", "age"],
  additionalProperties: false,
  definitions: {
    name: { type: "string" },
    age: { type: "integer" },
  },
} as const;

type ReceivedUser = FromSchema<typeof userSchema>;
type ExpectedUser = {
  name: string;
  age: number;
};

type AssertUser = A.Equals<ReceivedUser, ExpectedUser>;
const assertUser: AssertUser = 1;
assertUser;
