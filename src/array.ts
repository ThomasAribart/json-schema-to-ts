import { FromWriteableSchema } from "./index";
import { Schema } from "./schema";
import {
  Head,
  Tail,
  Reverse,
  DoesExtend,
  Get,
  Prepend,
  ConcatReversed,
} from "./utils";

export type FromArraySchema<S> = "items" extends keyof S
  ? S["items"] extends Schema
    ? FromWriteableSchema<S["items"]>[]
    : S["items"] extends any[]
    ? FromTypesTuple<GetTypesTuple<S["items"]>, S>
    : "TypeError: Invalid value for items property"
  : any[];

type GetTypesTuple<I, R extends any[] = []> = {
  stop: R;
  continue: I extends any[]
    ? GetTypesTuple<Tail<I>, Prepend<FromWriteableSchema<Head<I>>, R>>
    : never;
}[I extends [any, ...any[]] ? "continue" : "stop"];

type FromTypesTuple<I, S> = I extends any[]
  ? ApplyAdditionalItems<
      ApplyBoundaries<
        I,
        "minItems" extends keyof S ? S["minItems"] : 0,
        "maxItems" extends keyof S ? S["maxItems"] : undefined
      >,
      "additionalItems" extends keyof S ? S["additionalItems"] : true
    >
  : never;

type ApplyBoundaries<
  T extends any[],
  Min,
  Max,
  R = never,
  HasMin extends boolean = false,
  HasMax extends boolean = false,
  C = undefined
> = {
  stop: {
    result: Max extends undefined
      ? R | Reverse<T>
      : HasMax extends true
      ? R | Reverse<T>
      : Max extends T["length"]
      ? Reverse<T>
      : AreBoundariesInvalid<Tail<T>, Max> extends true
      ? never
      : R | Reverse<T>;
    hasEncounteredMax: HasMax extends true
      ? true
      : Max extends T["length"]
      ? true
      : AreBoundariesInvalid<Tail<T>, Max>;
    completeTuple: C;
  };
  continue: ApplyBoundaries<
    Tail<T>,
    Min,
    Max,
    T["length"] extends Max ? Reverse<T> : R | Reverse<T>,
    HasMin extends true ? true : DoesExtend<Min, T["length"]>,
    HasMax extends true ? true : DoesExtend<Max, T["length"]>,
    C extends undefined ? T : C
  >;
}[Min extends T["length"]
  ? "stop"
  : T extends [any, ...any[]]
  ? "continue"
  : "stop"];

type AreBoundariesInvalid<T extends any[], Max, R = true> = {
  continue: T["length"] extends Max
    ? AreBoundariesInvalid<Tail<T>, Max>
    : false;
  stop: T["length"] extends Max ? R : false;
}[T extends [any, ...any[]] ? "continue" : "stop"];

type ApplyAdditionalItems<R, A> = Get<R, "hasEncounteredMax"> extends true
  ? Get<R, "result">
  : A extends false
  ? Get<R, "result">
  : A extends true
  ? Get<R, "result"> | ConcatReversed<Get<R, "completeTuple">, [...any[]]>
  : A extends Schema
  ? Get<R, "completeTuple"> extends any[]
    ?
        | Get<R, "result">
        | ConcatReversed<Get<R, "completeTuple">, [...FromWriteableSchema<A>[]]>
    : never
  : never;
