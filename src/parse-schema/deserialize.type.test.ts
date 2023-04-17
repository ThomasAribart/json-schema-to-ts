import type { M } from "ts-algebra";
import type { A } from "ts-toolbelt";

import type {
  ExtendedJSONSchema,
  FromExtendedSchema,
  FromSchema,
} from "~/index";
import type { ParseOptions } from "~/parse-options";

import type { DeserializeSchema } from "./deserialize";

type DatePattern = { type: "string"; format: "date-time" };
type DeserializeDates = { pattern: DatePattern; output: Date };

type BrandedPattern = { type: "string"; branded: "event-id" };
type DeserializeBranded = {
  pattern: BrandedPattern;
  output: { brand: "event-id" };
};

// Non-serialized

type StringSchema = { type: "string" };

const parseNonSerialized: A.Equals<
  DeserializeSchema<
    StringSchema,
    ParseOptions<StringSchema, { deserialize: [DeserializeDates] }>
  >,
  M.Any
> = 1;
parseNonSerialized;

const assertNonSerialized: A.Equals<
  FromSchema<StringSchema, { deserialize: [DeserializeDates] }>,
  string
> = 1;
assertNonSerialized;

// Serialized string

const parseSerialized: A.Equals<
  DeserializeSchema<
    DatePattern,
    ParseOptions<DatePattern, { deserialize: [DeserializeDates] }>
  >,
  M.Any<true, Date>
> = 1;
parseSerialized;

const assertSerialized: A.Equals<
  FromSchema<DatePattern, { deserialize: [DeserializeDates] }>,
  Date
> = 1;
assertSerialized;

// Deep serialized string

type DeepSerializedSchema = {
  type: "object";
  properties: {
    date: DatePattern;
  };
  required: ["date"];
  additionalProperties: false;
};

const parseDeepNonSerialized: A.Equals<
  DeserializeSchema<
    DeepSerializedSchema,
    ParseOptions<DeepSerializedSchema, { deserialize: [DeserializeDates] }>
  >,
  M.Any
> = 1;
parseDeepNonSerialized;

const assertDeepSerialized: A.Equals<
  FromSchema<DeepSerializedSchema, { deserialize: [DeserializeDates] }>,
  { date: Date }
> = 1;
assertDeepSerialized;

// Double serialized string

type DoublePattern = DatePattern & BrandedPattern;

const parseDoubleSerialized: A.Equals<
  DeserializeSchema<
    DoublePattern,
    ParseOptions<
      DoublePattern,
      { deserialize: [DeserializeDates, DeserializeBranded] }
    >
  >,
  M.Any<true, Date & { brand: "event-id" }>
> = 1;
parseDoubleSerialized;

const assertDoubleSerialized: A.Equals<
  FromSchema<
    DoublePattern,
    { deserialize: [DeserializeDates, DeserializeBranded] }
  >,
  Date & { brand: "event-id" }
> = 1;
assertDoubleSerialized;

// Extended

type Extension = { customId: string };
type Extended = ExtendedJSONSchema<Extension>;

const extendedSchema: Extended = {
  customId: "foo",
};
extendedSchema;

const extendedObjectSchema: Extended = {
  type: "object",
  properties: {
    foo: { customId: "foo" },
  },
};
extendedObjectSchema;

const invalidSchema: Extended = {
  // @ts-expect-error
  badId: "bar",
};
invalidSchema;

const assertExtendedSerialized: A.Equals<
  FromExtendedSchema<
    Extension,
    {
      type: "object";
      properties: {
        foo: { customId: "foo" };
        bar: { customId: "bar" };
      };
      required: ["foo", "bar"];
      additionalProperties: false;
    },
    {
      deserialize: [
        {
          pattern: { customId: "foo" };
          output: string;
        },
        {
          pattern: { customId: "bar" };
          output: number;
        },
      ];
    }
  >,
  { foo: string; bar: number }
> = 1;
assertExtendedSerialized;
