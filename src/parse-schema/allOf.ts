import type { M } from "ts-algebra";
import type { L } from "ts-toolbelt";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

export type AllOfSchema = JSONSchema7 & { allOf: JSONSchema7[] };

export type ParseAllOfSchema<
  P extends AllOfSchema,
  O extends ParseSchemaOptions,
> = RecurseOnAllOfSchema<P["allOf"], P, O, ParseSchema<Omit<P, "allOf">, O>>;

type RecurseOnAllOfSchema<
  S extends JSONSchema7[],
  P extends AllOfSchema,
  O extends ParseSchemaOptions,
  R,
> = {
  stop: R;
  continue: RecurseOnAllOfSchema<
    L.Tail<S>,
    P,
    O,
    M.$Intersect<ParseSchema<MergeSubSchema<Omit<P, "allOf">, L.Head<S>>, O>, R>
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}[S extends [any, ...any[]] ? "continue" : "stop"];
