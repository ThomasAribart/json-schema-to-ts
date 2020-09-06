import { Get, Head, Tail, Prepend, Reverse } from "../../utils";

import { MetaType, Never, Const, Error } from "..";
import { Enum, Values } from "../enum";

import { IntersectConst } from "./const";
import { Intersect } from "./index";

export type IntersectEnum<A, B> = {
  any: A;
  never: Never;
  const: IntersectConst<B, A>;
  enum: FilterExtendingResolved<A, B>;
  litteral: FilterExtendingResolved<A, B>;
  array: FilterExtendingResolved<A, B>;
  tuple: FilterExtendingResolved<A, B>;
  object: FilterExtendingResolved<A, B>;
  union: Intersect<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];

type FilterExtendingResolved<A, B> = Enum<RecurseOnEnumValues<Values<A>, B>>;

type RecurseOnEnumValues<V, B, R extends any[] = []> = {
  continue: RecurseOnEnumValues<
    Tail<V>,
    B,
    Intersect<Const<Head<V>>, B> extends Never ? R : Prepend<Head<V>, R>
  >;
  stop: Reverse<R>;
}[V extends [any, ...any[]] ? "continue" : "stop"];
