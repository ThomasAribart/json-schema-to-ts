import { L } from "ts-toolbelt";

import { Union, Error } from "../meta-types";
import { Get, DeepMergeUnsafe } from "../utils";

import { ParseSchema } from ".";

export type ParseMixedSchema<S, T = Get<S, "type">> = T extends L.List
  ? Union<RecurseOnMixedSchema<T, S>>
  : Error<"Mixed schema 'type' property should be an array">;

type RecurseOnMixedSchema<T extends L.List, S, R = never> = {
  stop: R;
  continue: RecurseOnMixedSchema<
    L.Tail<T>,
    S,
    R | ParseSchema<DeepMergeUnsafe<S, { type: L.Head<T> }>>
  >;
}[T extends [any, ...L.List] ? "continue" : "stop"];
