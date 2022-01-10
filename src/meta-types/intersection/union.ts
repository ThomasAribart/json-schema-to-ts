import { Get } from "../../utils";

import { MetaType, Never, Error } from "..";
import { Union, Values } from "../union";

import { ClearIntersections, Intersect } from "./index";

export type ClearUnionIntersections<A> = Union<
  ClearUnionValuesIntersections<Values<A>>
>;

type ClearUnionValuesIntersections<V> = V extends infer T
  ? ClearIntersections<T>
  : never;

export type IntersectUnion<A, B> = {
  any: A;
  never: Never;
  const: DistributeIntersection<A, B>;
  enum: DistributeIntersection<A, B>;
  primitive: DistributeIntersection<A, B>;
  brandedPrimitive: DistributeIntersection<A, B>;
  array: DistributeIntersection<A, B>;
  tuple: DistributeIntersection<A, B>;
  object: DistributeIntersection<A, B>;
  union: DistributeIntersection<A, B>;
  exclusion: DistributeIntersection<A, B>;
  intersection: Error<"Cannot intersect intersection">;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];

export type DistributeIntersection<A, B> = Union<RecurseOnUnion<Values<A>, B>>;

type RecurseOnUnion<V, B> = V extends infer T ? Intersect<T, B> : never;
