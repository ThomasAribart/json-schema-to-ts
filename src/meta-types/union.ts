import { DoesExtend, Get } from "../utils";

import { Resolve } from ".";
import { IsRepresentable } from "./utils";

export type UnionType = "union";

export type Union<V> = {
  type: UnionType;
  values: V;
};

export type Values<U> = Get<U, "values">;

export type ResolveUnion<U> = RecurseOnUnion<Values<U>>;

type RecurseOnUnion<V> = V extends infer T ? Resolve<T> : never;

export type IsUnionRepresentable<U> = DoesExtend<
  true,
  AreUnionValuesRepresentable<Values<U>>
>;

type AreUnionValuesRepresentable<V> = V extends infer T
  ? IsRepresentable<T>
  : never;
