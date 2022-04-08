import { M } from "ts-algebra";

import { JSONSchema7 } from "../definitions";

import { ParseSchema, ParseSchemaOptions } from "./index";
import { SingleTypeSchema } from "./singleType";
import { MultipleTypesSchema } from "./multipleTypes";

export type ConstSchema = JSONSchema7 & { const: unknown };

export type ParseConstSchema<
  S extends ConstSchema,
  O extends ParseSchemaOptions
> = S extends SingleTypeSchema
  ? IntersectConstAndTypeSchema<S, O>
  : S extends MultipleTypesSchema
  ? IntersectConstAndTypeSchema<S, O>
  : ParseConst<S>;

type IntersectConstAndTypeSchema<
  S extends ConstSchema & (SingleTypeSchema | MultipleTypesSchema),
  O extends ParseSchemaOptions
  // TOIMPROVE: Directly use ParseMultipleTypeSchema and ParseSingleTypeSchema
> = M.$Intersect<ParseConst<S>, ParseSchema<Omit<S, "const">, O>>;

type ParseConst<S extends ConstSchema> = M.Const<S["const"]>;
