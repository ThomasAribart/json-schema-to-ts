import { Get, And } from "../../utils";

import { MetaType, Never, Error } from "..";
import { Object, Values, Required, IsOpen, OpenProps } from "../object";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { DistributeIntersection } from "./union";
import { IntersectExclusion } from "./exclusion";
import { ClearIntersections, Intersect } from "./index";

export type ClearObjectIntersections<
  A,
  V = ClearObjectValuesIntersections<Values<A>>,
  N = NeverKeys<V>,
  O = ClearIntersections<OpenProps<A>>
> = Required<A> extends Exclude<Required<A>, N>
  ? Object<
      {
        [key in Exclude<keyof V, N>]: V[key];
      },
      Required<A>,
      O extends Never ? false : IsOpen<A>,
      O
    >
  : Never;

type ClearObjectValuesIntersections<V> = {
  [key in keyof V]: ClearIntersections<V[key]>;
};

export type IntersectObject<A, B> = {
  any: A;
  never: Never;
  const: IntersectConst<B, A>;
  enum: IntersectEnum<B, A>;
  primitive: Never;
  brandedPrimitive: Never;
  array: Never;
  tuple: Never;
  object: IntersectObjects<A, B>;
  union: DistributeIntersection<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  exclusion: IntersectExclusion<B, A>;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];

type IntersectObjects<
  A,
  B,
  V = IntersectValues<A, B>,
  N = NeverKeys<V>,
  O = IntersectOpenProps<A, B>
> = Required<A> | Required<B> extends Exclude<Required<A> | Required<B>, N>
  ? Object<
      {
        [key in Exclude<keyof V, N>]: V[key];
      },
      Required<A> | Required<B>,
      O extends Never ? false : And<IsOpen<A>, IsOpen<B>>,
      O
    >
  : Never;

type IntersectValues<A, B> = {
  [key in keyof Values<A> | keyof Values<B>]: key extends keyof Values<A>
    ? key extends keyof Values<B>
      ? Intersect<Values<A>[key], Values<B>[key]>
      : IsOpen<B> extends true
      ? Intersect<Values<A>[key], OpenProps<B>>
      : Never
    : key extends keyof Values<B>
    ? IsOpen<A> extends true
      ? Intersect<OpenProps<A>, Values<B>[key]>
      : Never
    : Never;
};

type NeverKeys<O> = {
  [key in keyof O]: O[key] extends Never ? key : never;
}[keyof O];

type IntersectOpenProps<A, B> = Intersect<OpenProps<A>, OpenProps<B>>;
