import { A } from "ts-toolbelt";

import { FromSchema } from "index";

const userSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: {
      type: "string",
      format: "email",
    },
    birthDate: {
      type: "string",
      format: "date-time",
    },
  },
  required: ["name", "email", "birthDate"],
  additionalProperties: false,
} as const;

type Email = string & { brand: "email" };

type ReceivedUser = FromSchema<
  typeof userSchema,
  {
    deserialize: [
      {
        pattern: {
          type: "string";
          format: "email";
        };
        output: Email;
      },
      {
        pattern: {
          type: "string";
          format: "date-time";
        };
        output: Date;
      }
    ];
  }
>;
type ExpectedUser = {
  name: string;
  email: Email;
  birthDate: Date;
};

type AssertUser = A.Equals<ReceivedUser, ExpectedUser>;
const assertUser: AssertUser = 1;
assertUser;
