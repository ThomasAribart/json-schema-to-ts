import { FromSchema } from "index";

const schemaWithArrayExamples = {
  additionalProperties: true,
  type: "object",
  properties: {
    foo: { type: "string" },
  },
  examples: [
    {
      foo: "bar",
      someInt: 1,
      someArray: [],
    },
  ],
} as const;

// Should work with array examples
type Result = FromSchema<typeof schemaWithArrayExamples>;
const result: Result = {};
result;
