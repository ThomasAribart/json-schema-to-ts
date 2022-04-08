import { M } from "ts-algebra";

import { JSONSchema7 } from "../definitions";
import { HasKeyIn } from "../utils";

import { ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema } from "./utils";

export type IfThenElseSchema = JSONSchema7 & {
  if: JSONSchema7;
  then?: JSONSchema7;
  else?: JSONSchema7;
};

export type ParseIfThenElseSchema<
  S extends IfThenElseSchema,
  O extends ParseSchemaOptions,
  R extends JSONSchema7 = Omit<S, "if" | "then" | "else">,
  I extends JSONSchema7 = MergeSubSchema<R, S["if"]>,
  T extends any = S extends { then: JSONSchema7 }
    ? M.$Intersect<
        ParseSchema<I, O>,
        ParseSchema<MergeSubSchema<R, S["then"]>, O>
      >
    : ParseSchema<I, O>,
  // TOIMPROVE: Stating that E extends any causes infinite loop error
  E = M.$Exclude<
    S extends { else: JSONSchema7 }
      ? ParseSchema<MergeSubSchema<R, S["else"]>, O>
      : ParseSchema<R, O>,
    ParseSchema<I, O>
  >
  // TOIMPROVE: Directly use ParseAllOfSchema, ParseOneOfSchema etc...
> = HasKeyIn<
  S,
  "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf" | "not"
> extends true
  ? M.$Intersect<M.$Union<T | E>, ParseSchema<R, O>>
  : M.$Union<T | E>;
