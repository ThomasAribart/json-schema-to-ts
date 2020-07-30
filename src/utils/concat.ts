import { Head } from "./head";
import { Tail } from "./tail";
import { Prepend } from "./prepend";

/**
 * Concatenate the reverse of tuple `A` to tuple `B`
 *
 * Args:
 * - `A`: Tuple `A`
 * - `B`: Tuple `B`
 */
export type ConcatReversed<A, B extends any[]> = {
  stop: B;
  continue: A extends any[]
    ? ConcatReversed<Tail<A>, Prepend<Head<A>, B>>
    : never;
}[A extends [any, ...any[]] ? "continue" : "stop"];
