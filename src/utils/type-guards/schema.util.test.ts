import type { FromSchema } from "~/index";

export const petSchema = {
  type: "object",
  properties: {
    age: { type: "integer" },
    name: { type: "string" },
  },
  required: ["age", "name"],
  additionalProperties: false,
} as const;

export type Pet = FromSchema<typeof petSchema>;
