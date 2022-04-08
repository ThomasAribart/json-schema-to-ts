import { M } from "ts-algebra";

import { JSONSchema7 } from "../definitions";
import { And, DoesExtend } from "../utils";

import { ConstSchema, ParseConstSchema } from "./const";
import { EnumSchema, ParseEnumSchema } from "./enum";
import { ParseSingleTypeSchema, SingleTypeSchema } from "./singleType";
import { MultipleTypesSchema, ParseMultipleTypesSchema } from "./multipleTypes";
import { AnyOfSchema, ParseAnyOfSchema } from "./anyOf";
import { OneOfSchema, ParseOneOfSchema } from "./oneOf";
import { AllOfSchema, ParseAllOfSchema } from "./allOf";
import { ParseNotSchema, NotSchema } from "./not";
import { ParseIfThenElseSchema, IfThenElseSchema } from "./ifThenElse";

export type ParseSchemaOptions = {
  parseNotKeyword: boolean;
  parseIfThenElseKeywords: boolean;
};

export type ParseSchema<
  S extends JSONSchema7,
  O extends ParseSchemaOptions
> = JSONSchema7 extends S
  ? M.Any
  : S extends true | string
  ? M.Any
  : S extends false
  ? M.Never
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
  : M.Any;
