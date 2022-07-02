import { JSONSchema } from "index";

// Should work with array examples
const schemaWithArrayExamples: JSONSchema = {
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
schemaWithArrayExamples;

// Should work with non-array default
const schemaWithNonArrayDefault: JSONSchema = {
  additionalProperties: true,
  type: "object",
  properties: {
    foo: {
      type: "array",
      items: { type: "string" },
      default: "thomas",
    },
  },
} as const;
schemaWithNonArrayDefault;

// Should work with array default
const schemaWithArrayDefault: JSONSchema = {
  additionalProperties: true,
  type: "object",
  properties: {
    foo: {
      type: "array",
      items: { type: "string" },
      default: ["thomas", "stan"],
    },
  },
} as const;
schemaWithArrayDefault;
