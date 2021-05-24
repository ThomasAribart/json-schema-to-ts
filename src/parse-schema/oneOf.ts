import { L } from "ts-toolbelt";

import { Intersection, Union, Error } from "../meta-types";
import { Get, HasKeyIn, Merge } from "../utils";

import { ParseSchema } from ".";
import { MergeSubSchema, RemoveInvalidAdditionalItems } from "./utils";

export type ParseOneOfSchema<S, O = Get<S, "oneOf">> = O extends L.List
  ? Union<RecurseOnOneOfSchema<O, S>>
  : Error<"'oneOf' property should be an array">;

type RecurseOnOneOfSchema<S extends L.List, P, R = never> = {
  stop: R;
  continue: RecurseOnOneOfSchema<
    L.Tail<S>,
    P,
    | R
    | (HasKeyIn<P, "enum" | "const" | "type" | "anyOf"> extends true
        ? Intersection<
            ParseSchema<Omit<P, "oneOf">>,
            ParseSchema<MergeSubSchema<Omit<P, "oneOf">, L.Head<S>>>
          >
        : ParseSchema<
            Merge<Omit<P, "oneOf">, RemoveInvalidAdditionalItems<L.Head<S>>>
          >)
  >;
}[S extends [any, ...L.List] ? "continue" : "stop"];
