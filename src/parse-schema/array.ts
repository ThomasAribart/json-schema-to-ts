import type { M } from "ts-algebra";
import type { L } from "ts-toolbelt";

import type { JSONSchema7 } from "~/definitions";
import type { DoesExtend } from "~/type-utils";

import type { ParseSchema, ParseSchemaOptions } from "./index";

export type ArraySchema = JSONSchema7 & { type: "array" };

type SimpleArraySchema = JSONSchema7 & {
  type: "array";
  items: JSONSchema7;
};

type TupleSchema = JSONSchema7 & { type: "array"; items: JSONSchema7[] };

export type ParseArraySchema<
  S extends ArraySchema,
  O extends ParseSchemaOptions,
> = S extends SimpleArraySchema
  ? M.$Array<ParseSchema<S["items"], O>>
  : S extends TupleSchema
  ? M.$Union<FromTreeTuple<ParseTuple<S["items"], O>, S, O>>
  : M.$Array;

type ParseTuple<
  S extends JSONSchema7[],
  O extends ParseSchemaOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  R extends any[] = [],
> = S extends [infer H, ...infer T]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends JSONSchema7
    ? T extends JSONSchema7[]
      ? ParseTuple<T, O, L.Prepend<R, ParseSchema<H, O>>>
      : never
    : never
  : R;

type FromTreeTuple<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends any[],
  S extends ArraySchema,
  O extends ParseSchemaOptions,
> = ApplyAdditionalItems<
  ApplyBoundaries<
    T,
    S extends { minItems: number } ? S["minItems"] : 0,
    S extends { maxItems: number } ? S["maxItems"] : undefined
  >,
  S extends { additionalItems: JSONSchema7 } ? S["additionalItems"] : true,
  O
>;

type ApplyBoundaries<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends any[],
  Min extends number,
  Max extends number | undefined,
  R = never,
  HasMin extends boolean = false,
  HasMax extends boolean = false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  C extends any[] = T,
> = {
  stop: {
    result: Max extends undefined
      ? R | M.$Tuple<L.Reverse<T>>
      : HasMax extends true
      ? R | M.$Tuple<L.Reverse<T>>
      : Max extends T["length"]
      ? M.$Tuple<L.Reverse<T>>
      : IsLongerThan<L.Tail<T>, Max> extends true
      ? never
      : R | M.$Tuple<L.Reverse<T>>;
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
      ? M.$Tuple<L.Reverse<T>>
      : R | M.$Tuple<L.Reverse<T>>,
    HasMin extends true ? true : DoesExtend<Min, T["length"]>,
    HasMax extends true ? true : DoesExtend<Max, T["length"]>,
    C
  >;
}[Min extends T["length"]
  ? "stop"
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends [any, ...any[]]
  ? "continue"
  : "stop"];

type IsLongerThan<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends any[],
  N extends number | undefined,
  R extends boolean = false,
> = {
  continue: N extends undefined
    ? false
    : T["length"] extends N
    ? true
    : IsLongerThan<L.Tail<T>, N>;
  stop: T["length"] extends N ? true : R;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}[T extends [any, ...any[]] ? "continue" : "stop"];

type ApplyAdditionalItems<
  R extends {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any;
    hasEncounteredMin: boolean;
    hasEncounteredMax: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    completeTuple: any[];
  },
  A extends JSONSchema7,
  O extends ParseSchemaOptions,
> = R extends { hasEncounteredMax: true }
  ? R extends { hasEncounteredMin: true }
    ? R["result"]
    : M.Never
  : A extends false
  ? R extends { hasEncounteredMin: true }
    ? R["result"]
    : M.Never
  : A extends true
  ? R extends { hasEncounteredMin: true }
    ? R["result"] | M.$Tuple<L.Reverse<R["completeTuple"]>, M.Any>
    : M.$Tuple<L.Reverse<R["completeTuple"]>, M.Any>
  : R["hasEncounteredMin"] extends true
  ? R["result"] | M.$Tuple<L.Reverse<R["completeTuple"]>, ParseSchema<A, O>>
  : M.$Tuple<L.Reverse<R["completeTuple"]>, ParseSchema<A, O>>;
