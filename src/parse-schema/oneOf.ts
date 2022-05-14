import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { JSONSchema7 } from "../definitions";

import { ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema } from "./utils";

export type OneOfSchema = JSONSchema7 & { oneOf: JSONSchema7[] };

export type ParseOneOfSchema<
  P extends OneOfSchema,
  O extends ParseSchemaOptions
> = M.$Union<RecurseOnOneOfSchema<P["oneOf"], P, O>>;

type RecurseOnOneOfSchema<
  S extends JSONSchema7[],
  P extends OneOfSchema,
  O extends ParseSchemaOptions,
  R = never
> = {
  stop: R;
  continue: RecurseOnOneOfSchema<
    L.Tail<S>,
    P,
    O,
    | R
    | M.$Intersect<
        ParseSchema<Omit<P, "oneOf">, O>,
        ParseSchema<MergeSubSchema<Omit<P, "oneOf">, L.Head<S>>, O>
      >
  >;
}[S extends [any, ...any[]] ? "continue" : "stop"];
