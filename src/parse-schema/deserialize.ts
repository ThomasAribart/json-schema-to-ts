import type { M } from "ts-algebra";

import type { DeserializationPattern, JSONSchema7 } from "~/definitions";

import type { ParseSchemaOptions } from "./index";

/**
 * Apply deserialization patterns to a JSON schema
 * @param SCHEMA JSONSchema
 * @param OPTIONS Parsing options (with deserialization patterns)
 * @returns Meta-type
 */
export type DeserializeSchema<
  SCHEMA extends JSONSchema7,
  OPTIONS extends Omit<ParseSchemaOptions, "deserialize"> & {
    deserialize: DeserializationPattern[];
  },
> = RecurseOnDeserializationPatterns<SCHEMA, OPTIONS["deserialize"]>;

/**
 * Recursively apply deserialization patterns to a JSON schema
 * @param SCHEMA JSONSchema
 * @param DESERIALIZATION_PATTERNS DeserializationPattern[]
 * @returns Meta-type
 */
type RecurseOnDeserializationPatterns<
  SCHEMA extends JSONSchema7,
  DESERIALIZATION_PATTERNS extends DeserializationPattern[],
  RESULT = M.Any,
> = DESERIALIZATION_PATTERNS extends [
  infer DESERIALIZATION_PATTERNS_HEAD,
  ...infer DESERIALIZATION_PATTERNS_TAIL,
]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    DESERIALIZATION_PATTERNS_HEAD extends DeserializationPattern
    ? DESERIALIZATION_PATTERNS_TAIL extends DeserializationPattern[]
      ? RecurseOnDeserializationPatterns<
          SCHEMA,
          DESERIALIZATION_PATTERNS_TAIL,
          SCHEMA extends DESERIALIZATION_PATTERNS_HEAD["pattern"]
            ? M.$Intersect<
                M.Any<true, DESERIALIZATION_PATTERNS_HEAD["output"]>,
                RESULT
              >
            : RESULT
        >
      : never
    : never
  : RESULT;
