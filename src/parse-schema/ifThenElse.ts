import { M } from "ts-algebra";

import { JSONSchema7 } from "../definitions";

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
  T = S extends { then: JSONSchema7 }
    ? M.$Intersect<
        ParseSchema<I, O>,
        ParseSchema<MergeSubSchema<R, S["then"]>, O>
      >
    : ParseSchema<I, O>,
  E = S extends { else: JSONSchema7 }
    ? M.$Intersect<
        M.$Exclude<ParseSchema<R, O>, ParseSchema<I, O>>,
        ParseSchema<MergeSubSchema<R, S["else"]>, O>
      >
    : M.$Exclude<ParseSchema<R, O>, ParseSchema<I, O>>
> = M.$Intersect<M.$Union<T | E>, ParseSchema<R, O>>;
