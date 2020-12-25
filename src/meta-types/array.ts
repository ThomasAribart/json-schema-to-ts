import { Get, Prettify } from "../utils";

import { Resolve, Any } from ".";

export type ArrType = "array";

export type Arr<V = Any> = {
  type: ArrType;
  values: V;
};

export type Values<A> = Get<A, "values">;

export type ResolveArr<T> = Prettify<Resolve<Values<T>>[]>;
