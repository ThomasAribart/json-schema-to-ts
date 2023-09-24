import type { JSONSchema7TypeName } from "json-schema";
import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";

/**
 * JSON schemas of type unions
 * @example
 * const typeUnionSchema = {
 *  type: ["number", "string"]
 * }
 */
export type MultipleTypesSchema = JSONSchema7 & { type: JSONSchema7TypeName[] };

export type ParseMultipleTypesSchema<
  SCHEMA extends MultipleTypesSchema,
  OPTIONS extends ParseSchemaOptions,
> = M.$Union<RecurseOnMixedSchema<SCHEMA["type"], SCHEMA, OPTIONS>>;

type RecurseOnMixedSchema<
  TYPES extends JSONSchema7TypeName[],
  ROOT_SCHEMA extends MultipleTypesSchema,
  OPTIONS extends ParseSchemaOptions,
  RESULT = never,
> = TYPES extends [infer TYPES_HEAD, ...infer TYPES_TAIL]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    TYPES_HEAD extends JSONSchema7TypeName
    ? TYPES_TAIL extends JSONSchema7TypeName[]
      ? RecurseOnMixedSchema<
          TYPES_TAIL,
          ROOT_SCHEMA,
          OPTIONS,
          | RESULT
          | ParseSchema<
              Omit<ROOT_SCHEMA, "type"> & { type: TYPES_HEAD },
              OPTIONS
            >
        >
      : never
    : never
  : RESULT;
