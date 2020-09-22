import { Get } from "../../utils";

import { MetaType, Never, Const, Error } from "..";
import { Enum, Values } from "../enum";

import { IntersectConst } from "./const";
import { Intersect } from "./index";

export type IntersectEnum<A, B> = {
  any: A;
  never: Never;
  const: IntersectConst<B, A>;
  enum: FilterExtendingResolved<A, B>;
  primitive: FilterExtendingResolved<A, B>;
  array: FilterExtendingResolved<A, B>;
  tuple: FilterExtendingResolved<A, B>;
  object: FilterExtendingResolved<A, B>;
  union: Intersect<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];

type FilterExtendingResolved<A, B> = Enum<RecurseOnEnumValues<Values<A>, B>>;

type RecurseOnEnumValues<V, B> = V extends infer T
  ? Intersect<Const<T>, B> extends Never
    ? never
    : T
  : never;
