import type { A } from "ts-toolbelt";

import type { FromSchema } from "index";

const nullableSchema = {
  type: "string",
  nullable: true,
} as const;

type ReceivedNullable = FromSchema<typeof nullableSchema>;
type ExpectedNullable = string | null;

type AssertNullable = A.Equals<ReceivedNullable, ExpectedNullable>;
const assertNullable: AssertNullable = 1;
assertNullable;
