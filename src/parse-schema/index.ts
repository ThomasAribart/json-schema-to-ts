import type { M } from "ts-algebra";

import type { DeserializationPattern, JSONSchema7 } from "~/definitions";
import type { And, DoesExtend } from "~/type-utils";

import type { AllOfSchema, ParseAllOfSchema } from "./allOf";
import type { AnyOfSchema, ParseAnyOfSchema } from "./anyOf";
import type { ConstSchema, ParseConstSchema } from "./const";
import type { DeserializeSchema } from "./deserialize";
import type { EnumSchema, ParseEnumSchema } from "./enum";
import type { ParseIfThenElseSchema, IfThenElseSchema } from "./ifThenElse";
import type {
  MultipleTypesSchema,
  ParseMultipleTypesSchema,
} from "./multipleTypes";
import type { ParseNotSchema, NotSchema } from "./not";
import type { NullableSchema, ParseNullableSchema } from "./nullable";
import type { OneOfSchema, ParseOneOfSchema } from "./oneOf";
import type { ReferenceSchema, ParseReferenceSchema } from "./references";
import type { ParseSingleTypeSchema, SingleTypeSchema } from "./singleType";

export type ParseSchemaOptions = {
  parseNotKeyword: boolean;
  parseIfThenElseKeywords: boolean;
  rootSchema: JSONSchema7;
  references: Record<string, JSONSchema7>;
  deserialize: DeserializationPattern[] | false;
};

export type ParseSchema<
  S extends JSONSchema7,
  O extends ParseSchemaOptions,
  P = JSONSchema7 extends S
    ? M.Any
    : S extends true | string
    ? M.Any
    : S extends false
    ? M.Never
    : S extends NullableSchema
    ? ParseNullableSchema<S, O>
    : S extends ReferenceSchema
    ? ParseReferenceSchema<S, O>
    : And<
        DoesExtend<O["parseIfThenElseKeywords"], true>,
        DoesExtend<S, IfThenElseSchema>
      > extends true
    ? // TOIMPROVE: Not cast here (rather use a ParseNonIfThenElseSchema twice)
      S extends IfThenElseSchema
      ? ParseIfThenElseSchema<S, O>
      : never
    : And<
        DoesExtend<O["parseNotKeyword"], true>,
        DoesExtend<S, NotSchema>
      > extends true
    ? // TOIMPROVE: Not cast here (rather use a ParseNonNotSchema twice)
      S extends NotSchema
      ? ParseNotSchema<S, O>
      : never
    : S extends AllOfSchema
    ? ParseAllOfSchema<S, O>
    : S extends OneOfSchema
    ? ParseOneOfSchema<S, O>
    : S extends AnyOfSchema
    ? ParseAnyOfSchema<S, O>
    : S extends EnumSchema
    ? ParseEnumSchema<S, O>
    : S extends ConstSchema
    ? ParseConstSchema<S, O>
    : S extends MultipleTypesSchema
    ? ParseMultipleTypesSchema<S, O>
    : S extends SingleTypeSchema
    ? ParseSingleTypeSchema<S, O>
    : M.Any,
> = O extends { deserialize: DeserializationPattern[] }
  ? M.$Intersect<DeserializeSchema<S, O>, P>
  : P;
