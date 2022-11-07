import type { A } from "ts-toolbelt";

import type { FromSchema } from "index";

const arraySchema = {
  type: "array",
  items: { type: "string" },
} as const;

type ReceivedArray = FromSchema<typeof arraySchema>;
type ExpectedArray = string[];

type AssertArray = A.Equals<ReceivedArray, ExpectedArray>;
const assertArray: AssertArray = 1;
assertArray;
