import { FromWriteableSchema } from "./index";
import { Schema } from "./schema";
import { Head, Tail, Prepend, ConcatReversed, ShortenReversed } from "./utils";

export type FromArraySchema<S> = "type" extends keyof S
  ? S["type"] extends "array"
    ? "items" extends keyof S
      ? S["items"] extends Schema
        ? FromWriteableSchema<S["items"]>[]
        : RecurseOnTupleSchema<
            S["items"],
            "additionalItems" extends keyof S ? S["additionalItems"] : true
          >
      : any[]
    : never
  : never;

type RecurseOnTupleSchema<S, A, R extends any[] = []> = {
  stop: A extends false
    ? ShortenReversed<R>
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
