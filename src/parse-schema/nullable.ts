import { M } from "ts-algebra";

import { JSONSchema7 } from "../definitions";

export type NullableSchema = JSONSchema7 & { nullable: boolean };

import { ParseSchema, ParseSchemaOptions } from "./index";

export type ParseNullableSchema<
  S extends NullableSchema,
  O extends ParseSchemaOptions,
  R = ParseSchema<Omit<S, "nullable">, O>
> = S extends { nullable: true } ? M.$Union<M.Primitive<null> | R> : R;
