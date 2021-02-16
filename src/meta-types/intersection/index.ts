import { DoesExtend, Get } from "../../utils";

import { Resolve, MetaType, Never, Error } from "..";
import { ErrorType } from "../error";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { IntersectPrimitive } from "./primitive";
import { ClearArrIntersections, IntersectArr } from "./array";
import { ClearTupleIntersections, IntersectTuple } from "./tuple";
import { ClearObjectIntersections, IntersectObject } from "./object";
import { ClearUnionIntersections, IntersectUnion } from "./union";
import { ClearExclusionIntersections, IntersectExclusion } from "./exclusion";
import { IsRepresentable } from "../utils";

export type IntersectionType = "intersection";

export type Intersection<L, R> = {
  type: IntersectionType;
  left: L;
  right: R;
};

export type IsIntersection<I> = DoesExtend<Get<I, "type">, IntersectionType>;

export type Left<I> = Get<I, "left">;

export type Right<I> = Get<I, "right">;

export type ResolveIntersection<T> = Resolve<ClearIntersections<T>>;

export type ClearIntersections<T> = {
  any: T;
  never: T;
  const: T;
  enum: T;
  primitive: T;
  array: ClearArrIntersections<T>;
  tuple: ClearTupleIntersections<T>;
  object: ClearObjectIntersections<T>;
  union: ClearUnionIntersections<T>;
  intersection: Intersect<
    ClearIntersections<Left<T>>,
    ClearIntersections<Right<T>>
  >;
  exclusion: ClearExclusionIntersections<T>;
  error: T;
  errorMissingType: Error<"Missing type property">;
}[Get<T, "type"> extends MetaType ? Get<T, "type"> : "errorMissingType"];

export type Intersect<A, B> = {
  any: B;
  never: Get<B, "type"> extends ErrorType ? B : Never;
  const: IntersectConst<A, B>;
  enum: IntersectEnum<A, B>;
  primitive: IntersectPrimitive<A, B>;
  array: IntersectArr<A, B>;
  tuple: IntersectTuple<A, B>;
  object: IntersectObject<A, B>;
  union: IntersectUnion<A, B>;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: IntersectExclusion<A, B>;
  error: A;
  errorMissingType: Error<"Missing type property">;
}[Get<A, "type"> extends MetaType ? Get<A, "type"> : "errorMissingType"];

export type IsIntersectionRepresentable<A> = IsRepresentable<
  ClearIntersections<A>
>;
