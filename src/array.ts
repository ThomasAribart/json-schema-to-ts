import { FromWriteableSchema } from "./index";
import { Schema, ArraySchema } from "./schema";
import { Head, Tail, Prepend, ConcatReversed, ShortenReversed } from "./utils";

export type FromArraySchema<S> = S extends ArraySchema
  ? "items" extends keyof S
    ? S["items"] extends Schema
      ? FromWriteableSchema<S["items"]>[]
      : S["items"] extends Schema[]
      ? RecurseOnTupleSchema<
          S["items"],
          "additionalItems" extends keyof S ? S["additionalItems"] : true
        >
      : "TypeError: Invalid value for items property"
    : any[]
  : never;

type RecurseOnTupleSchema<S, A, R extends any[] = []> = {
  stop: A extends false
    ? ShortenReversed<R>
    : A extends Schema
    ? ShortenReversed<R> | ConcatReversed<R, [...FromWriteableSchema<A>[]]>
    : ShortenReversed<R> | ConcatReversed<R, [...any[]]>;
  continue: S extends any[]
    ? Head<S> extends Schema
      ? RecurseOnTupleSchema<
          Tail<S>,
          A,
          Prepend<FromWriteableSchema<Head<S>>, R>
        >
      : never
    : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
