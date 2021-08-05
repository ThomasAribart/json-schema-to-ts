import { Get } from "../utils";

export type PrimitiveType = "primitive";

export type Primitive<L, S> = {
  type: PrimitiveType;
  value: L | (Get<S, 'nullable', null> extends true ? null : never)
};

export type Value<L> = Get<L, "value">;

export type ResolvePrimitive<T> = Get<T, "value">;
