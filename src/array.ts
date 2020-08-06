import { FromWriteableSchema } from "./index";
import { Schema } from "./schema";
import {
  Head,
  Tail,
  Reverse,
  DoesExtend,
  Get,
  Prepend,
  ConcatReversed,
} from "./utils";

/**
 * Given a JSON schema of `array` type, infers the type of valid instances
 *
 * Args:
 * - `Schema`: JSON schema
 */
export type FromArraySchema<S> = "items" extends keyof S
  ? S["items"] extends Schema
    ? FromWriteableSchema<S["items"]>[]
    : S["items"] extends any[]
    ? FromTypesTuple<GetTypesTuple<S["items"]>, S>
    : "TypeError: Invalid value for items property"
  : any[];

/**
 * Given a tuple of JSON schemas, returns the (reversed) tuple of inferred types
 *
 * Args:
 * - `Shemas`: Tuple of JSON schemas
 * - `Result`: _(optional)_ Accumulated result
 */
type GetTypesTuple<S, R extends any[] = []> = {
  stop: R;
  continue: S extends any[]
    ? GetTypesTuple<Tail<S>, Prepend<FromWriteableSchema<Head<S>>, R>>
    : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];

/**
 * Apply a JSON schema `additionalItems`, `minItems` & `maxItems` directives to a (reversed) tuple of types
 *
 * Args:
 * - `Types`: Tuple of types
 * - `Schema`: JSON schema
 */
type FromTypesTuple<T, S> = T extends any[]
  ? ApplyAdditionalItems<
      ApplyBoundaries<
        T,
        "minItems" extends keyof S ? S["minItems"] : 0,
        "maxItems" extends keyof S ? S["maxItems"] : undefined
      >,
      "additionalItems" extends keyof S ? S["additionalItems"] : true
    >
  : never;

/**
 * Given a tuple, a min and a max integer values, returns the data needed to infer a tuple schema valid instance type
 *
 * Args:
 * - `Tuple`: Tuple of types to recurse on (reversed)
 * - `Min`: Minimum length of a valid extracted tuple
 * - `Max`: Maximum length of a valid extracted tuple _(possibly undefined)_
 * - `Result`: _(optional)_ Union of the extracted tuples of valid length _(possibly_ `never` _)_
 * - `HasMin`: _(optional)_ True if `Tuple` has had a length equal to `Min` during recursion
 * - `HasMax`: _(optional)_ True if `Tuple` has had a length equal to `Max` during recursion
 * - `CompleteTuple`: _(optional)_ Memorized initial value of `Tuple`
 *
 * Returns:
 * - `result` Union of the extracted tuples of valid length _(possibly_ `never` _)_
 * - `completeTuple` Memorized initial value of `Tuple`
 * - `hasEncounteredMax`: True if `Tuple` has had a length equal to `Max` during recursion
 */
type ApplyBoundaries<
  T extends any[],
  Min,
  Max,
  R = never,
  HasMin extends boolean = false,
  HasMax extends boolean = false,
  C = undefined
> = {
  stop: {
    result: Max extends undefined
      ? R | Reverse<T>
      : HasMax extends true
      ? R | Reverse<T>
      : Max extends T["length"]
      ? Reverse<T>
      : IsLongerThan<Tail<T>, Max> extends true
      ? never
      : R | Reverse<T>;
    hasEncounteredMax: HasMax extends true
      ? true
      : Max extends T["length"]
      ? true
      : IsLongerThan<Tail<T>, Max>;
    completeTuple: C;
  };
  continue: ApplyBoundaries<
    Tail<T>,
    Min,
    Max,
    T["length"] extends Max ? Reverse<T> : R | Reverse<T>,
    HasMin extends true ? true : DoesExtend<Min, T["length"]>,
    HasMax extends true ? true : DoesExtend<Max, T["length"]>,
    C extends undefined ? T : C
  >;
}[Min extends T["length"]
  ? "stop"
  : T extends [any, ...any[]]
  ? "continue"
  : "stop"];

/**
 * Given a tuple and an integer value, returns true if tuple is longer than the value
 *
 * Args:
 * - `Tuple`: Tuple
 * - `Number`: Integer value _(possibly undefined)_
 * - `Result`: _(optional)_ Accumulated result
 */
type IsLongerThan<T extends any[], N, R = false> = {
  continue: T["length"] extends N ? true : IsLongerThan<Tail<T>, N>;
  stop: T["length"] extends N ? true : R;
}[T extends [any, ...any[]] ? "continue" : "stop"];

/**
 * Given the return value of `ApplyBoundaries`, and the `additionalItems` value of a tuple schema, returns the inferred type
 *
 * Args:
 * - `Result`: Return value of `ApplyBoundaries`
 * - `AdditionalItems`: Accumulated result
 */
type ApplyAdditionalItems<R, A> = Get<R, "hasEncounteredMax"> extends true
  ? Get<R, "result">
  : A extends false
  ? Get<R, "result">
  : A extends true
  ? Get<R, "result"> | ConcatReversed<Get<R, "completeTuple">, [...any[]]>
  : A extends Schema
  ? Get<R, "completeTuple"> extends any[]
    ?
        | Get<R, "result">
        | ConcatReversed<Get<R, "completeTuple">, [...FromWriteableSchema<A>[]]>
    : never
  : never;
