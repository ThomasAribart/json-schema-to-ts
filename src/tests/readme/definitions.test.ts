import { A } from "ts-toolbelt";

import { FromSchema } from "index";

const userSchema = {
  type: "object",
  properties: {
    name: { $ref: "#/$defs/name" },
    age: { $ref: "#/$defs/age" },
  },
  required: ["name", "age"],
  additionalProperties: false,
  $defs: {
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
