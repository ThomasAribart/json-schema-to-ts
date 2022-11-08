import type { JSONSchema7TypeName } from "json-schema";
import type { M } from "ts-algebra";
import type { L } from "ts-toolbelt";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";

export type MultipleTypesSchema = JSONSchema7 & { type: JSONSchema7TypeName[] };

export type ParseMultipleTypesSchema<
  P extends MultipleTypesSchema,
  O extends ParseSchemaOptions,
> = M.$Union<RecurseOnMixedSchema<P["type"], P, O>>;

type RecurseOnMixedSchema<
  S extends JSONSchema7TypeName[],
  P extends MultipleTypesSchema,
  O extends ParseSchemaOptions,
  R = never,
> = {
  stop: R;
  continue: RecurseOnMixedSchema<
    L.Tail<S>,
    P,
    O,
    R | ParseSchema<Omit<P, "type"> & { type: L.Head<S> }, O>
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}[S extends [any, ...any[]] ? "continue" : "stop"];
