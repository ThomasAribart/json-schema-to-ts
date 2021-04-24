import { Head } from "./head.d.ts";
import { Tail } from "./tail.d.ts";
import { Prepend } from "./prepend.d.ts";
/**
 * Reverses a tuple `T`
 *
 * @param T Tuple
 * @return Tuple
 */
export declare type Reverse<T, R extends any[] = []> = {
    stop: R;
    continue: T extends any[] ? Reverse<Tail<T>, Prepend<Head<T>, R>> : never;
}[T extends [any, ...any[]] ? "continue" : "stop"];
