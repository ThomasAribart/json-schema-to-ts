import type { M } from "ts-algebra";

import type { DeserializationPattern, JSONSchema7 } from "~/definitions";
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
import type { ParseReferenceSchema, ReferenceSchema } from "./references";
import type { ParseSingleTypeSchema, SingleTypeSchema } from "./singleType";

export type ParseSchemaOptions = {
  parseNotKeyword: boolean;
  parseIfThenElseKeywords: boolean;
  rootSchema: JSONSchema7;
  references: Record<string, JSONSchema7>;
  deserialize: DeserializationPattern[] | false;
};

export type ParseSchema<
  SCHEMA extends JSONSchema7,
  OPTIONS extends ParseSchemaOptions,
  RESULT = JSONSchema7 extends SCHEMA
    ? M.Any
    : SCHEMA extends true | string
    ? M.Any
    : SCHEMA extends false
    ? M.Never
    : SCHEMA extends NullableSchema
    ? ParseNullableSchema<SCHEMA, OPTIONS>
    : SCHEMA extends ReferenceSchema
    ? ParseReferenceSchema<SCHEMA, OPTIONS>
    : And<
        DoesExtend<OPTIONS["parseIfThenElseKeywords"], true>,
        DoesExtend<SCHEMA, IfThenElseSchema>
      > extends true
    ? // TOIMPROVE: Not cast here (rather use a ParseNonIfThenElseSchema twice)
      SCHEMA extends IfThenElseSchema
      ? ParseIfThenElseSchema<SCHEMA, OPTIONS>
      : never
    : And<
        DoesExtend<OPTIONS["parseNotKeyword"], true>,
        DoesExtend<SCHEMA, NotSchema>
      > extends true
    ? // TOIMPROVE: Not cast here (rather use a ParseNonNotSchema twice)
      SCHEMA extends NotSchema
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
