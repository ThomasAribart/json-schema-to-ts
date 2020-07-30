import { FromWriteableSchema } from "./index";
import { Head, Tail, MergeRight } from "./utils";

/**
 * Given a JSON schema of mixed types, infers the type of valid instances
 *
 * Args:
 * - `Schema`: JSON schema
 */
export type FromMixedSchema<S> = "type" extends keyof S
  ? S["type"] extends [any, ...any[]]
    ? RecurseOnMixedSchema<S["type"], S>
    : "TypeError: Invalid type value. Did you forget to use the 'as const' directive?"
  : never;

/**
 * Given an array of JSON schema types, returns the union of inferred types
 *
 * Args:
 * - `Types`: Array of JSON schema types to recurse on
 * - `Schema`: Original JSON schema _(properties are used to infer complete types)_
 * - `Result`: _(optional)_ Accumulated result
 */
type RecurseOnMixedSchema<T, S, R = never> = {
  stop: R;
  continue: T extends any[]
    ? RecurseOnMixedSchema<
        Tail<T>,
        S,
        R | FromWriteableSchema<MergeRight<S, { type: Head<T> }>>
      >
    : never;
}[T extends [any, ...any[]] ? "continue" : "stop"];
