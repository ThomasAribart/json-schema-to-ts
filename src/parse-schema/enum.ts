import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";
import type { Compute } from "~/type-utils/compute";

import type { ParseSchema, ParseSchemaOptions } from "./index";

export type EnumSchema = JSONSchema7 & { enum: unknown[] };

export type ParseEnumSchema<
  S extends EnumSchema,
  O extends ParseSchemaOptions,
> = M.$Intersect<ParseEnum<S>, ParseSchema<Omit<S, "enum">, O>>;

type ParseEnum<S extends EnumSchema> = M.Enum<Compute<S["enum"][number]>>;
