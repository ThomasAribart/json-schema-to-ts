import { A, L } from "ts-toolbelt";

import { Get, And } from "../../utils";

import { MetaType, Never, Tuple, Error } from "..";
import { Values as ArrValues } from "../array";
import { Values, IsOpen, OpenProps } from "../tuple";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { DistributeIntersection } from "./union";
import { IntersectExclusion } from "./exclusion";
import { ClearIntersections, Intersect } from ".";

export type ClearTupleIntersections<T, O = ClearIntersections<OpenProps<T>>> =
  Tuple<
    // 🔧 TOIMPROVE: Not cast here
    ClearTupleValuesIntersections<A.Cast<Values<T>, L.List>>,
    O extends Never ? false : IsOpen<T>,
    O
  >;

type ClearTupleValuesIntersections<V extends L.List, R extends L.List = []> = {
  stop: L.Reverse<R>;
  continue: ClearTupleValuesIntersections<
    L.Tail<V>,
    L.Prepend<R, ClearIntersections<L.Head<V>>>
  >;
}[V extends [any, ...L.List] ? "continue" : "stop"];

export type IntersectTuple<A, B> = {
  any: A;
  never: Never;
  const: IntersectConst<B, A>;
  enum: IntersectEnum<B, A>;
  primitive: Never;
  array: IntersectTupleToArray<A, B>;
  tuple: IntersectTuples<A, B>;
  object: Never;
  union: DistributeIntersection<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: IntersectExclusion<B, A>;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];

type IntersectTupleToArray<
  T,
  A,
  V extends L.List = IntersectTupleToArrValues<
    // 🔧 TOIMPROVE: Not cast here
    A.Cast<Values<T>, L.List>,
    ArrValues<A>
  >,
  N = HasNeverValue<V>,
  O = Intersect<OpenProps<T>, ArrValues<A>>
> = N extends true
  ? Never
  : Tuple<
      V,
      IsOpen<T> extends true ? (O extends Never ? false : true) : false,
      O
    >;

type IntersectTupleToArrValues<V extends L.List, T, R extends L.List = []> = {
  stop: L.Reverse<R>;
  continue: R extends L.List
    ? IntersectTupleToArrValues<
        L.Tail<V>,
        T,
        L.Prepend<R, Intersect<L.Head<V>, T>>
      >
    : never;
}[V extends [any, ...L.List] ? "continue" : "stop"];

type HasNeverValue<V extends L.List, R = false> = {
  stop: R;
  continue: L.Head<V> extends Never ? true : HasNeverValue<L.Tail<V>>;
}[V extends [any, ...L.List] ? "continue" : "stop"];

type IntersectTuples<
  A,
  B,
  V extends L.List = IntersectTupleValues<
    // 🔧 TOIMPROVE: Not cast here
    A.Cast<Values<A>, L.List>,
    // 🔧 TOIMPROVE: Not cast here
    A.Cast<Values<B>, L.List>,
    IsOpen<A>,
    IsOpen<B>,
    OpenProps<A>,
    OpenProps<B>
  >,
  N = HasNeverValue<V>,
  O = Intersect<OpenProps<A>, OpenProps<B>>
> = N extends true
  ? Never
  : Tuple<V, O extends Never ? false : And<IsOpen<A>, IsOpen<B>>, O>;

type IntersectTupleValues<
  V1 extends L.List,
  V2 extends L.List,
  O1,
  O2,
  P1,
  P2,
  R extends L.List = []
> = {
  stop: L.Reverse<R>;
  continue1: IntersectTupleValues<
    L.Tail<V1>,
    V2,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<R, O2 extends true ? Intersect<L.Head<V1>, P2> : Never>
  >;
  continue2: IntersectTupleValues<
    V1,
    L.Tail<V2>,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<R, O1 extends true ? Intersect<L.Head<V2>, P1> : Never>
  >;
  continueBoth: IntersectTupleValues<
    L.Tail<V1>,
    L.Tail<V2>,
    O1,
    O2,
    P1,
    P2,
    L.Prepend<R, Intersect<L.Head<V1>, L.Head<V2>>>
  >;
}[V1 extends [any, ...L.List]
  ? V2 extends [any, ...L.List]
    ? "continueBoth"
    : "continue1"
  : V2 extends [any, ...L.List]
  ? "continue2"
  : "stop"];
