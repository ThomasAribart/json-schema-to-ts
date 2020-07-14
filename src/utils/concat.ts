import { Head } from "./head";
import { Tail } from "./tail";
import { Prepend } from "./prepend";

export type ConcatReversed<T extends any[], R extends any[]> = {
  stop: R;
  continue: ConcatReversed<Tail<T>, Prepend<Head<T>, R>>;
}[T extends [any, ...any[]] ? "continue" : "stop"];
