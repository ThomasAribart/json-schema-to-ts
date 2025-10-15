import type { M } from "ts-algebra";

import type { DeserializationPattern, JSONSchema } from "~/definitions";
import type { And, DoesExtend } from "~/type-utils";

import type { AllOfSchema, ParseAllOfSchema } from "./allOf";
import type { AnyOfSchema, ParseAnyOfSchema } from "./anyOf";
import type { ConstSchema, ParseConstSchema } from "./const";
import type { DeserializeSchema } from "./deserialize";
import type { EnumSchema, ParseEnumSchema } from "./enum";
import type { IfThenElseSchema, ParseIfThenElseSchema } from "./ifThenElse";
import type {
  MultipleTypesSchema,
  ParseMultipleTypesSchema,
} from "./multipleTypes";
import type { NotSchema, ParseNotSchema } from "./not";
import type { NullableSchema, ParseNullableSchema } from "./nullable";
import type { OneOfSchema, ParseOneOfSchema } from "./oneOf";
import type { ParseReferenceSchema, ReferencingSchema } from "./references";
import type { ParseSingleTypeSchema, SingleTypeSchema } from "./singleType";

/**
 * Type constraint for the ParseSchema options
 */
export type ParseSchemaOptions = {
  /**
   * Wether to parse negated schemas or not (false by default)
   */
  parseNotKeyword: boolean;
  /**
   * Wether to parse ifThenElse schemas or not (false by default)
   */
  parseIfThenElseKeywords: boolean;
  /**
   * Wether to keep object defaulted properties optional or not (false by default)
   */
  keepDefaultedPropertiesOptional: boolean;
  /**
   * The initial schema provided to `ParseSchema`
   */
  rootSchema: JSONSchema;
  /**
   * To refer external schemas by ids
   */
  references: Record<string, JSONSchema>;
  /**
   * To override inferred types if some pattern is matched
   */
  deserialize: DeserializationPattern[] | false;
  /**
   * Ignore additionalProperties value and always infer closed objects
   */
  omitAdditionalProperties: boolean;
};

/**
 * Recursively parses a JSON schema to a meta-type. Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param SCHEMA JSON schema
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseSchema<
  SCHEMA extends JSONSchema,
  OPTIONS extends ParseSchemaOptions,
  RESULT = JSONSchema extends SCHEMA
    ? M.Any
    : SCHEMA extends true | string
      ? M.Any
      : SCHEMA extends false
        ? M.Never
        : SCHEMA extends NullableSchema
          ? ParseNullableSchema<SCHEMA, OPTIONS>
          : SCHEMA extends ReferencingSchema
            ? ParseReferenceSchema<SCHEMA, OPTIONS>
            : And<
                  DoesExtend<OPTIONS["parseIfThenElseKeywords"], true>,
                  DoesExtend<SCHEMA, IfThenElseSchema>
                > extends true
              ? SCHEMA extends IfThenElseSchema
                ? ParseIfThenElseSchema<SCHEMA, OPTIONS>
                : never
              : And<
                    DoesExtend<OPTIONS["parseNotKeyword"], true>,
                    DoesExtend<SCHEMA, NotSchema>
                  > extends true
                ? SCHEMA extends NotSchema
                  ? ParseNotSchema<SCHEMA, OPTIONS>
                  : never
                : SCHEMA extends AllOfSchema
                  ? ParseAllOfSchema<SCHEMA, OPTIONS>
                  : SCHEMA extends OneOfSchema
                    ? ParseOneOfSchema<SCHEMA, OPTIONS>
                    : SCHEMA extends AnyOfSchema
                      ? ParseAnyOfSchema<SCHEMA, OPTIONS>
                      : SCHEMA extends EnumSchema
                        ? ParseEnumSchema<SCHEMA, OPTIONS>
                        : SCHEMA extends ConstSchema
                          ? ParseConstSchema<SCHEMA, OPTIONS>
                          : SCHEMA extends MultipleTypesSchema
                            ? ParseMultipleTypesSchema<SCHEMA, OPTIONS>
                            : SCHEMA extends SingleTypeSchema
                              ? ParseSingleTypeSchema<SCHEMA, OPTIONS>
                              : M.Any,
> = OPTIONS extends { deserialize: DeserializationPattern[] }
  ? M.$Intersect<DeserializeSchema<SCHEMA, OPTIONS>, RESULT>
  : RESULT;
