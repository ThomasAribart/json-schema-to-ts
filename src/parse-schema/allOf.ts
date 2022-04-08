import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { JSONSchema7 } from "../definitions";
import { HasKeyIn } from "../utils";

import { ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema } from "./utils";

export type AllOfSchema = JSONSchema7 & { allOf: JSONSchema7[] };

export type ParseAllOfSchema<
  P extends AllOfSchema,
  O extends ParseSchemaOptions
> = RecurseOnAllOfSchema<
  P["allOf"],
  P,
  O,
  // TOIMPROVE: Directly use ParseOneOfSchema, ParseAnyOfSchema etc...
  HasKeyIn<P, "enum" | "const" | "type" | "anyOf" | "oneOf"> extends true
    ? ParseSchema<Omit<P, "allOf">, O>
    : M.Any
>;

type RecurseOnAllOfSchema<
  S extends JSONSchema7[],
  P extends AllOfSchema,
  O extends ParseSchemaOptions,
  R extends any
> = {
  stop: R;
  continue: RecurseOnAllOfSchema<
    L.Tail<S>,
    P,
    O,
    M.$Intersect<ParseSchema<MergeSubSchema<Omit<P, "allOf">, L.Head<S>>, O>, R>
  >;
}[S extends [any, ...any[]] ? "continue" : "stop"];
