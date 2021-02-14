import { A, B, U } from "ts-toolbelt";

import { Union, Values } from "../union";
import { Intersect } from "../intersection";

import { Exclude } from ".";

export type DistributeUnion<U, E> = Union<RecurseOnUnion<Values<U>, E>>;

type RecurseOnUnion<V, E> = V extends infer T ? Exclude<T, E> : never;

export type ExcludeUnion<V, U> = A.Equals<Values<U>, never> extends B.True
  ? V
  : ExcludeUnionValue<V, U.Last<Values<U>>, U>;

type ExcludeUnionValue<V, L, U> = Intersect<
  Exclude<V, L>,
  Exclude<V, Union<U.Exclude<Values<U>, L>>>
>;
