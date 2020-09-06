import { Get } from "../utils";

import { Resolve } from ".";

export type UnionType = "union";

export type Union<V> = {
  type: UnionType;
  values: V;
};

export type Values<U> = Get<U, "values">;

export type ResolveUnion<T> = RecurseOnUnionTree<Values<T>>;

type RecurseOnUnionTree<V> = V extends infer T ? Resolve<T> : never;
