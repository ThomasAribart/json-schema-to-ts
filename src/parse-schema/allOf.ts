import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { JSONSchema7 } from "../definitions";

import { ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema } from "./utils";

export type AllOfSchema = JSONSchema7 & { allOf: JSONSchema7[] };

export type ParseAllOfSchema<
  P extends AllOfSchema,
  O extends ParseSchemaOptions
> = RecurseOnAllOfSchema<P["allOf"], P, O, ParseSchema<Omit<P, "allOf">, O>>;

type RecurseOnAllOfSchema<
  S extends JSONSchema7[],
  P extends AllOfSchema,
  O extends ParseSchemaOptions,
  R
> = {
  stop: R;
  continue: RecurseOnAllOfSchema<
    L.Tail<S>,
    P,
    O,
    M.$Intersect<ParseSchema<MergeSubSchema<Omit<P, "allOf">, L.Head<S>>, O>, R>
  >;
}[S extends [any, ...any[]] ? "continue" : "stop"];
