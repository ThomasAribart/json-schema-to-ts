import { Head } from "./head";
import { Tail } from "./tail";
import { Prepend } from "./prepend";

export type Reverse<T extends any[], R extends any[] = []> = {
  stop: R;
  continue: Reverse<Tail<T>, Prepend<Head<T>, R>>;
}[T extends [any, ...any[]] ? "continue" : "stop"];
