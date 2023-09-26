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

/**
 * Recursively parses a multiple type JSON schema to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param MULTI_TYPE_SCHEMA JSONSchema (single type)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseMultipleTypesSchema<
  MULTI_TYPE_SCHEMA extends MultipleTypesSchema,
  OPTIONS extends ParseSchemaOptions,
> = M.$Union<
  RecurseOnMixedSchema<MULTI_TYPE_SCHEMA["type"], MULTI_TYPE_SCHEMA, OPTIONS>
>;

/**
 * Recursively parses a multiple type JSON schema to the union of its types (merged with root schema).
 * @param TYPES JSONSchema7Type[]
 * @param ROOT_MULTI_TYPE_SCHEMA Root JSONSchema (multiple types)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
type RecurseOnMixedSchema<
  TYPES extends JSONSchema7TypeName[],
  ROOT_MULTI_TYPE_SCHEMA extends MultipleTypesSchema,
  OPTIONS extends ParseSchemaOptions,
  RESULT = never,
> = TYPES extends [infer TYPES_HEAD, ...infer TYPES_TAIL]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    TYPES_HEAD extends JSONSchema7TypeName
    ? TYPES_TAIL extends JSONSchema7TypeName[]
      ? RecurseOnMixedSchema<
          TYPES_TAIL,
          ROOT_MULTI_TYPE_SCHEMA,
          OPTIONS,
          | RESULT
          | ParseSchema<
              Omit<ROOT_MULTI_TYPE_SCHEMA, "type"> & { type: TYPES_HEAD },
              OPTIONS
            >
        >
      : never
    : never
  : RESULT;
