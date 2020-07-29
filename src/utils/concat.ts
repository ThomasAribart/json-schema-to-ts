import { Head } from "./head";
import { Tail } from "./tail";
import { Prepend } from "./prepend";

export type ConcatReversed<T, R extends any[]> = {
  stop: R;
  continue: T extends any[]
    ? ConcatReversed<Tail<T>, Prepend<Head<T>, R>>
    : never;
}[T extends [any, ...any[]] ? "continue" : "stop"];
