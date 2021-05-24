import { L } from "ts-toolbelt";

import { Prepend } from "./prepend";

/**
 * Reverses a tuple `T`
 *
 * @param T Tuple
 * @return Tuple
 */
export type Reverse<T extends L.List, R extends L.List = []> = {
  stop: R;
  continue: Reverse<L.Tail<T>, Prepend<L.Head<T>, R>>;
}[T extends [any, ...L.List] ? "continue" : "stop"];
