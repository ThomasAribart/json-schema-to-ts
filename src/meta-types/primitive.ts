import { Get } from "../utils";

export type PrimitiveType = "primitive";

export type Primitive<L> = {
  type: PrimitiveType;
  value: L;
};

export type Value<L> = Get<L, "value">;

export type ResolvePrimitive<T> = Get<T, "value">;
