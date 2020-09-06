import { Union } from "../meta-types";
import { Get, Head, Tail, UnsafeMergeRec } from "../utils";

import { ParseSchema } from ".";

export type ParseMixedSchema<S> = Union<
  RecurseOnMixedSchema<Get<S, "type">, S>
>;

type RecurseOnMixedSchema<T, S, R = never> = {
  stop: R;
  continue: T extends any[]
    ? RecurseOnMixedSchema<
        Tail<T>,
        S,
        R | ParseSchema<UnsafeMergeRec<S, { type: Head<T> }>>
      >
    : never;
}[T extends [any, ...any[]] ? "continue" : "stop"];
