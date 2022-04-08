import { JSONSchema7TypeName } from "json-schema";
import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { JSONSchema7 } from "../definitions";

import { ParseSchema, ParseSchemaOptions } from "./index";

export type MultipleTypesSchema = JSONSchema7 & { type: JSONSchema7TypeName[] };

export type ParseMultipleTypesSchema<
  P extends MultipleTypesSchema,
  O extends ParseSchemaOptions
> = M.$Union<RecurseOnMixedSchema<P["type"], P, O>>;

type RecurseOnMixedSchema<
  S extends JSONSchema7TypeName[],
  P extends MultipleTypesSchema,
  O extends ParseSchemaOptions,
  R extends any = never
> = {
  stop: R;
  continue: RecurseOnMixedSchema<
    L.Tail<S>,
    P,
    O,
    R | ParseSchema<Omit<P, "type"> & { type: L.Head<S> }, O>
  >;
}[S extends [any, ...any[]] ? "continue" : "stop"];
