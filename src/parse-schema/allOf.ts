import { L } from "ts-toolbelt";

import { Any, Intersection } from "../meta-types";
import { Get, HasKeyIn } from "../utils";

import { ParseSchema } from ".";
import { MergeSubSchema } from "./utils";

export type ParseAllOfSchema<S> = RecurseOnAllOfSchema<
  Get<S, "allOf">,
  S,
  HasKeyIn<S, "enum" | "const" | "type" | "anyOf" | "oneOf"> extends true
    ? ParseSchema<Omit<S, "allOf">>
    : Any
>;

type RecurseOnAllOfSchema<V, S, R> = {
  stop: R;
  continue: V extends L.List
    ? RecurseOnAllOfSchema<
        L.Tail<V>,
        S,
        Intersection<
          ParseSchema<MergeSubSchema<Omit<S, "allOf">, L.Head<V>>>,
          R
        >
      >
    : never;
}[V extends [any, ...L.List] ? "continue" : "stop"];
