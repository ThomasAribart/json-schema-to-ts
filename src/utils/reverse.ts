import { Head } from "./head";
import { Tail } from "./tail";
import { Prepend } from "./prepend";

/**
 * Reverses a tuple
 *
 * Args:
 * - `Tuple`: Tuple
 * - `Result`: _(optional)_ Reversed tuple
 */
export type Reverse<T extends any[], R extends any[] = []> = {
  stop: R;
  continue: Reverse<Tail<T>, Prepend<Head<T>, R>>;
}[T extends [any, ...any[]] ? "continue" : "stop"];
