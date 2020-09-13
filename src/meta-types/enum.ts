import { Get } from "../utils";

export type EnumType = "enum";

export type Enum<V> = { type: "enum"; values: V };

export type Values<E> = Get<E, "values">;

export type ResolveEnum<T> = Values<T>;
