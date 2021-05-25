import { A, L } from "ts-toolbelt";

import { Arr, Tuple, Union, Error } from "../meta-types";
import { DoesExtend, Get, IsObject } from "../utils";

import { ParseSchema } from ".";

export type ParseArrSchema<S> = "items" extends keyof S
  ? IsObject<S["items"]> extends true
    ? Arr<ParseSchema<S["items"]>>
    : S["items"] extends L.List
    ? // 🔧 TOIMPROVE: Not cast here
      Union<FromTreeTuple<ParseTuple<A.Cast<S["items"], L.List>>, S>>
    : Error<'Invalid value in "items" property'>
  : Arr;

export type ParseTuple<S extends L.List, R extends L.List = []> = {
  stop: R;
  continue: ParseTuple<L.Tail<S>, L.Prepend<R, ParseSchema<L.Head<S>>>>;
}[S extends [any, ...L.List] ? "continue" : "stop"];

type FromTreeTuple<T extends L.List, S> = ApplyAdditionalItems<
  ApplyBoundaries<
    T,
    "minItems" extends keyof S ? S["minItems"] : 0,
    "maxItems" extends keyof S ? S["maxItems"] : undefined
  >,
  "additionalItems" extends keyof S ? S["additionalItems"] : true
>;

type ApplyBoundaries<
  T extends L.List,
  Min,
  Max,
  R = never,
  HasMin extends boolean = false,
  HasMax extends boolean = false,
  C = T
> = {
  stop: {
    result: Max extends undefined
      ? R | Tuple<L.Reverse<T>, false>
      : HasMax extends true
      ? R | Tuple<L.Reverse<T>, false>
      : Max extends T["length"]
      ? Tuple<L.Reverse<T>, false>
      : IsLongerThan<L.Tail<T>, Max> extends true
      ? never
      : R | Tuple<L.Reverse<T>, false>;
    hasEncounteredMin: DoesExtend<Min, T["length"]>;
    hasEncounteredMax: HasMax extends true
      ? true
      : Max extends T["length"]
      ? true
      : IsLongerThan<L.Tail<T>, Max>;
    completeTuple: C;
  };
  continue: ApplyBoundaries<
    L.Tail<T>,
    Min,
    Max,
    T["length"] extends Max
      ? Tuple<L.Reverse<T>, false>
      : R | Tuple<L.Reverse<T>, false>,
    HasMin extends true ? true : DoesExtend<Min, T["length"]>,
    HasMax extends true ? true : DoesExtend<Max, T["length"]>,
    C
  >;
}[Min extends T["length"]
  ? "stop"
  : T extends [any, ...L.List]
  ? "continue"
  : "stop"];

type IsLongerThan<T extends L.List, N, R = false> = {
  continue: T["length"] extends N ? true : IsLongerThan<L.Tail<T>, N>;
  stop: T["length"] extends N ? true : R;
}[T extends [any, ...L.List] ? "continue" : "stop"];

type ApplyAdditionalItems<R, A> = Get<R, "hasEncounteredMax"> extends true
  ? Get<R, "hasEncounteredMin"> extends true
    ? Get<R, "result">
    : Error<'"minItems" property is lower than "maxItems"'>
  : A extends false
  ? Get<R, "hasEncounteredMin"> extends true
    ? Get<R, "result">
    : Error<'"minItems" property is higher than allowed number of items'>
  : A extends true
  ? Get<R, "hasEncounteredMin"> extends true
    ?
        | Get<R, "result">
        | Tuple<L.Reverse<A.Cast<Get<R, "completeTuple">, L.List>>>
    : // 🔧 TOIMPROVE: Not cast here
      Tuple<L.Reverse<A.Cast<Get<R, "completeTuple">, L.List>>>
  : IsObject<A> extends true
  ? Get<R, "hasEncounteredMin"> extends true
    ?
        | Get<R, "result">
        | Tuple<
            // 🔧 TOIMPROVE: Not cast here
            L.Reverse<A.Cast<Get<R, "completeTuple">, L.List>>,
            true,
            ParseSchema<A>
          >
    : Tuple<
        // 🔧 TOIMPROVE: Not cast here
        L.Reverse<A.Cast<Get<R, "completeTuple">, L.List>>,
        true,
        ParseSchema<A>
      >
  : Error<'Invalid value in "additionalItems" property'>;
