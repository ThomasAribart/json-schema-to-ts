import { L } from "ts-toolbelt";

/**
 * Filters out the values of a tuple `T` that don't extend type `F`
 *
 * Preserves the tuple original order
 *
 * @param T Tuple
 * @param F Type
 * @return Tuple
 */
export type FilterExtending<T extends L.List, F, R extends L.List = []> = {
  continue: FilterExtending<
    L.Tail<T>,
    F,
    L.Head<T> extends F ? L.Prepend<R, L.Head<T>> : R
  >;
  stop: L.Reverse<R>;
}[T extends [any, ...L.List] ? "continue" : "stop"];
