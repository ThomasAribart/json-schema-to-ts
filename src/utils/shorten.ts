import { Tail } from "./tail";
import { Reverse } from "./reverse";

export type ShortenReversed<T extends any[], R = []> = {
  stop: R;
  continue: ShortenReversed<Tail<T>, R | Reverse<T>>;
}[T extends [any, ...any[]] ? "continue" : "stop"];
