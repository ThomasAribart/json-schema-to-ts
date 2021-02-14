import { Get } from "../../utils";

import { Resolve, MetaType, Never, Error } from "..";
import { ClearIntersections } from "../intersection";

import { ExcludeFromAny } from "./any";
import { ExcludeFromConst } from "./const";
import { ExcludeFromEnum } from "./enum";
import { ExcludeFromPrimitive } from "./primitive";
import { ExcludeFromArray } from "./array";
import { ExcludeFromTuple } from "./tuple";
import { ExcludeFromObject } from "./object";
import { DistributeUnion } from "./union";
import { IsRepresentable } from "../utils";

export type ExclusionType = "exclusion";

export type Exclusion<V, E> = { type: ExclusionType; value: V; excluded: E };

export type Value<E> = Get<E, "value">;

export type Excluded<E> = Get<E, "excluded">;

export type ResolveExclusion<E> = Resolve<Exclude<Value<E>, Excluded<E>>>;

export type Exclude<A, B> = {
  any: ExcludeFromAny<A, B>;
  never: Never;
  const: ExcludeFromConst<A, B>;
  enum: ExcludeFromEnum<A, B>;
  primitive: ExcludeFromPrimitive<A, B>;
  array: ExcludeFromArray<A, B>;
  tuple: ExcludeFromTuple<A, B>;
  object: ExcludeFromObject<A, B>;
  union: DistributeUnion<A, B>;
  intersection: Exclude<ClearIntersections<A>, B>;
  exclusion: Exclude<Exclude<Value<A>, Excluded<A>>, B>;
  error: A;
  errorMissingType: Error<"Missing type property in Exclusion source value">;
}[Get<A, "type"> extends MetaType ? Get<A, "type"> : "errorMissingType"];

export type IsExclusionRepresentable<E> = IsRepresentable<
  Exclude<Value<E>, Excluded<E>>
>;
