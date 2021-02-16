import { Get, Head, Tail, Prepend, Concat, Reverse } from "../utils";

import { Resolve, Any } from ".";
import { IsRepresentable } from "./utils";

export type TupleType = "tuple";

export type Tuple<V, O = true, P = Any> = {
  type: TupleType;
  values: V;
  isOpen: O;
  openProps: P;
};

export type Values<T> = Get<T, "values">;

export type IsOpen<T> = Get<T, "isOpen">;

export type OpenProps<T> = Get<T, "openProps">;

export type ResolveTuple<T> = IsOpen<T> extends true
  ? Concat<RecurseOnTuple<Values<T>>, [...Resolve<OpenProps<T>>[]]>
  : RecurseOnTuple<Values<T>>;

type RecurseOnTuple<V, R extends any[] = []> = {
  stop: Reverse<R>;
  continue: V extends any[]
    ? RecurseOnTuple<Tail<V>, Prepend<Resolve<Head<V>>, R>>
    : never;
}[V extends [any, ...any[]] ? "continue" : "stop"];

export type IsTupleRepresentable<T> = AreAllTupleValuesRepresentable<Values<T>>;

type AreAllTupleValuesRepresentable<V> = {
  stop: true;
  continue: V extends any[]
    ? IsRepresentable<Head<V>> extends false
      ? false
      : AreAllTupleValuesRepresentable<Tail<V>>
    : never;
}[V extends [any, ...any[]] ? "continue" : "stop"];
