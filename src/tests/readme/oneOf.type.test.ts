import type { A } from "ts-toolbelt";

import type { FromSchema } from "~/index";

const catSchema = {
  type: "object",
  oneOf: [
    {
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
    {
      properties: {
        color: { enum: ["black", "brown", "white"] },
      },
    },
  ],
} as const;

type ReceivedCat = FromSchema<typeof catSchema>;
type ExpectedCat =
  | {
      [x: string]: unknown;
      name: string;
    }
  | {
      [x: string]: unknown;
      color?: "black" | "brown" | "white";
    };

type AssertCat = A.Equals<ReceivedCat, ExpectedCat>;
const assertCat: AssertCat = 1;
assertCat;

// Cannot raise error at the moment
const invalidCat: ReceivedCat = { name: "Garfield" };
invalidCat;
