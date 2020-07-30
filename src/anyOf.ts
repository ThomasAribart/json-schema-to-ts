import { FromWriteableSchema } from "./index";
import { Tail, Head } from "./utils";

/**
 * Given a JSON schema with the `anyOf` property, infers the type of valid instances
 *
 * Args:
 * - `Schema`: JSON schema
 */
export type FromAnyOfSchema<S> = "anyOf" extends keyof S
  ? S["anyOf"] extends any[]
    ? Extract<"enum" | "const" | "type", keyof S> extends never
      ? RecurseOnAnyOfSchema<S["anyOf"]>
      : RecurseOnAnyOfSchema<S["anyOf"], FromWriteableSchema<Omit<S, "anyOf">>>
    : "TypeError: Value of anyOf should be an array"
  : never;

/**
 * Given an tuple of JSON schema, returns the union of inferred types (can be intersected with a filter type)
 *
 * Args:
 * - `Schemas`: Tuple of JSON schemas to recurse on
 * - `Filter`: _(optional)_ Filter type (intersected with the result)
 * - `Result`: _(optional)_ Accumulated result
 */
type RecurseOnAnyOfSchema<S, F = unknown, R = never> = {
  stop: R & F;
  continue: S extends any[]
    ? RecurseOnAnyOfSchema<Tail<S>, F, R | FromWriteableSchema<Head<S>>>
    : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
