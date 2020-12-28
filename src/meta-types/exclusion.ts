import { Get } from "../utils";

import { Resolve } from ".";

export type ExclusionType = "exclusion";

export type Exclusion<V, E> = { type: ExclusionType; value: V; excluded: E };

export type Value<E> = Get<E, "value">;

export type Excluded<E> = Get<E, "excluded">;

export type ResolveExclusion<E> = Exclude<
  Resolve<Value<E>>,
  Resolve<Excluded<E>>
>;
