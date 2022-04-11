import { A } from "ts-toolbelt";

import { FromSchema } from "index";

const constSchema = {
  const: "foo",
} as const;

type ReceivedConst = FromSchema<typeof constSchema>;
type ExpectedConst = "foo";

type AssertConst = A.Equals<ReceivedConst, ExpectedConst>;
const assertConst: AssertConst = 1;
assertConst;
