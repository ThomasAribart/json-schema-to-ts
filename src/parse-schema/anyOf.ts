import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { JSONSchema7 } from "../definitions";
import { HasKeyIn, Merge } from "../utils";

import { ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema, RemoveInvalidAdditionalItems } from "./utils";

export type AnyOfSchema = JSONSchema7 & { anyOf: JSONSchema7[] };

export type ParseAnyOfSchema<
  S extends AnyOfSchema,
  O extends ParseSchemaOptions
> = M.$Union<RecurseOnAnyOfSchema<S["anyOf"], S, O>>;

type RecurseOnAnyOfSchema<
  S extends JSONSchema7[],
  P extends AnyOfSchema,
  O extends ParseSchemaOptions,
  R extends any = never
> = {
  stop: R;
  continue: RecurseOnAnyOfSchema<
    L.Tail<S>,
    P,
    O,
    | R
    // TOIMPROVE: Directly use ParseEnumSchema, ParseConstSchema etc...
    | (HasKeyIn<P, "enum" | "const" | "type"> extends true
        ? M.$Intersect<
            ParseSchema<Omit<P, "anyOf">, O>,
            ParseSchema<MergeSubSchema<Omit<P, "anyOf">, L.Head<S>>, O>
          >
        : ParseSchema<
            Merge<Omit<P, "anyOf">, RemoveInvalidAdditionalItems<L.Head<S>>>,
            O
          >)
  >;
}[S extends [any, ...any[]] ? "continue" : "stop"];
