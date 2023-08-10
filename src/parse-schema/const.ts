import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MultipleTypesSchema } from "./multipleTypes";
import type { SingleTypeSchema } from "./singleType";

export type ConstSchema = JSONSchema7 & { const: unknown };

export type ParseConstSchema<
  SCHEMA extends ConstSchema,
  OPTIONS extends ParseSchemaOptions,
> = SCHEMA extends SingleTypeSchema
  ? IntersectConstAndTypeSchema<SCHEMA, OPTIONS>
  : SCHEMA extends MultipleTypesSchema
  ? IntersectConstAndTypeSchema<SCHEMA, OPTIONS>
  : ParseConst<SCHEMA>;

type IntersectConstAndTypeSchema<
  SCHEMA extends ConstSchema & (SingleTypeSchema | MultipleTypesSchema),
  OPTIONS extends ParseSchemaOptions,
  // TOIMPROVE: Directly use ParseMultipleTypeSchema and ParseSingleTypeSchema
> = M.$Intersect<
  ParseConst<SCHEMA>,
  ParseSchema<Omit<SCHEMA, "const">, OPTIONS>
>;

type ParseConst<S extends ConstSchema> = M.Const<S["const"]>;
