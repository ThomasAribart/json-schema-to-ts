import { Head } from "./head";
import { Tail } from "./tail";

/**
 * Returns the property value of an object `O`, `F` if property key misses from object
 *
 * @param O Object
 * @param K Property key
 * @param F _(optional:_ `never` _)_ Fallback type
 * @return Type
 */
export type Get<O, K, F = never> = K extends keyof O ? O[K] : F;

export type GetRec<O, K> = {
  continue: GetRec<Get<O, Head<K>>, Tail<K>>;
  stop: O;
}[K extends [any, ...any[]] ? "continue" : "stop"];
