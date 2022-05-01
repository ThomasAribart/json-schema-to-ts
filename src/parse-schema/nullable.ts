import { M } from "ts-algebra";

import { JSONSchema7 } from "../definitions";
import { HasKeyIn } from "../utils";

export type NullableSchema = JSONSchema7 & { nullable: boolean };

import { ParseSchema, ParseSchemaOptions } from "./index";

export type ParseNullableSchema<
  S extends NullableSchema,
  O extends ParseSchemaOptions,
  R = HasKeyIn<
    // TOIMPROVE: Directly use ParseIfThenElseSchema, ParseNotSchema etc...
    S,
    "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf" | "not" | "if"
  > extends true
    ? ParseSchema<Omit<S, "nullable">, O>
    : M.Any
> = S extends { nullable: true } ? M.$Union<M.Primitive<null> | R> : R;
