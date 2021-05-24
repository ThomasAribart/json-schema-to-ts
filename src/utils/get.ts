import { L } from "ts-toolbelt";

/**
 * Returns the value at key `K` in object `O`, `F` if `K` misses from object
 *
 * @param O Object
 * @param K Property key
 * @param F _(optional:_ `never` _)_ Fallback type
 * @return Type
 */
export type Get<O, K, F = never> = K extends keyof O ? O[K] : F;

/**
 * Returns the value at path `P` in object `O`, `F` if `P` misses from object
 *
 * @param O Object
 * @param P Path
 * @param F _(optional:_ `never` _)_ Fallback type
 * @return Type
 */
export type DeepGet<O, P extends L.List, F = never> = {
  continue: L.Head<P> extends keyof O ? DeepGet<O[L.Head<P>], L.Tail<P>, F> : F;
  stop: O;
}[P extends [any, ...L.List] ? "continue" : "stop"];
