import { Head } from "./head.d.ts";
import { Tail } from "./tail.d.ts";
import { Prepend } from "./prepend.d.ts";
import { Reverse } from "./reverse.d.ts";
/**
 * Filters out the values of a tuple `T` that don't extend type `F`
 *
 * Preserves the tuple original order
 *
 * @param T Tuple
 * @param F Type
 * @return Tuple
 */
export declare type FilterExtending<T, F, R extends any[] = []> = {
    continue: FilterExtending<Tail<T>, F, Head<T> extends F ? Prepend<Head<T>, R> : R>;
    stop: Reverse<R>;
}[T extends [any, ...any[]] ? "continue" : "stop"];
