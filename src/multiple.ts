import { FromWriteableSchema } from "./index";
import { Head, Tail, MergeRight } from "./utils";

export type FromMultipleSchema<S> = "type" extends keyof S
  ? S["type"] extends [any, ...any[]]
    ? RecurseOnMultipleSchema<S["type"], S>
    : "TypeError: Invalid type value. Did you forget to use the 'as const' directive?"
  : never;

type RecurseOnMultipleSchema<T, S, R = never> = {
  stop: R;
  continue: T extends any[]
    ? RecurseOnMultipleSchema<
        Tail<T>,
        S,
        R | FromWriteableSchema<MergeRight<S, { type: Head<T> }>>
      >
    : never;
}[T extends [any, ...any[]] ? "continue" : "stop"];
