import { M } from "ts-algebra";
import { A } from "ts-toolbelt";

import { JSONSchema7 } from "../definitions";

import { ParseSchema, ParseSchemaOptions } from "./index";

export type EnumSchema = JSONSchema7 & { enum: unknown[] };

export type ParseEnumSchema<
  S extends EnumSchema,
  O extends ParseSchemaOptions
> = M.$Intersect<ParseEnum<S>, ParseSchema<Omit<S, "enum">, O>>;

type ParseEnum<S extends EnumSchema> = M.Enum<A.Compute<S["enum"][number]>>;
