import { A } from "ts-toolbelt";

import { FromSchema } from "index";

const userSchema = {
  $id: "http://example.com/schemas/user.json",
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
  },
  required: ["name", "age"],
  additionalProperties: false,
} as const;

const usersSchema = {
  type: "array",
  items: {
    $ref: "http://example.com/schemas/user.json",
  },
} as const;

type ReceivedUsers = FromSchema<
  typeof usersSchema,
  { references: [typeof userSchema] }
>;
type ExpectedUsers = {
  name: string;
  age: number;
}[];

type AssertUsers = A.Equals<ReceivedUsers, ExpectedUsers>;
const assertUser: AssertUsers = 1;
assertUser;

const anotherUserSchema = {
  $id: "http://example.com/schemas/users.json",
  type: "array",
  items: { $ref: "user.json" },
} as const;

type ReceivedUsers2 = FromSchema<
  typeof anotherUserSchema,
  { references: [typeof userSchema] }
>;
type ExpectedUsers2 = {
  name: string;
  age: number;
}[];

type AssertUsers2 = A.Equals<ReceivedUsers2, ExpectedUsers2>;
const assertUser2: AssertUsers2 = 1;
assertUser2;
