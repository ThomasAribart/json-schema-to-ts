import { FromWriteableSchema } from "./index";
import { Head, Tail } from "./utils";

/**
 * Given a JSON schema with the `enum` property, infers the type of valid instances
 *
 * Args:
 * - `Schema`: JSON schema
 */
export type FromEnumSchema<S> = "enum" extends keyof S
  ? S["enum"] extends any[]
    ? Extract<"const" | "type", keyof S> extends never
      ? RecurseOnEnumSchema<S["enum"]>
      : RecurseOnEnumSchema<S["enum"], FromWriteableSchema<Omit<S, "enum">>>
    : "TypeError: value of enum should be an array"
  : never;

/**
 * Given an enum, returns the union of its values that match a specified type
 *
 * Args:
 * - `Enum`: Enum to recurse on
 * - `FilterType`: _(optional)_ Removes enum values that don't extend it from result
 * - `Result`: _(optional)_ Accumulated result
 */
type RecurseOnEnumSchema<S, F = any, R = never> = {
  stop: number extends keyof S ? S[number] | R : R;
  continue: S extends any[]
    ? Head<S> extends F
      ? RecurseOnEnumSchema<Tail<S>, F, R | Head<S>>
      : RecurseOnEnumSchema<Tail<S>, F, R>
    : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
