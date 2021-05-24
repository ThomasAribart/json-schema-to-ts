import { L } from "ts-toolbelt";

import { Prepend } from "./prepend";
import { Reverse } from "./reverse";

/**
 * Concatenate the reverse of tuple `A` to tuple `B`
 *
 * @param A Tuple
 * @param B Tuple
 * @return Tuple
 */
export type ConcatReversed<A extends L.List, B extends L.List> = {
  stop: B;
  continue: ConcatReversed<L.Tail<A>, Prepend<L.Head<A>, B>>;
}[A extends [any, ...L.List] ? "continue" : "stop"];

/**
 * Concatenate tuple `A` to tuple `B`
 *
 * @param A Tuple
 * @param B Tuple
 * @return Tuple
 */
export type Concat<A extends L.List, B extends L.List> = ConcatReversed<
  Reverse<A>,
  B
>;
