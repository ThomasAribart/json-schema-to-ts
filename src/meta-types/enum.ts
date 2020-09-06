import { Get, GetRec } from "../utils";

import { Never } from "./never";

export type EnumType = "enum";

export type Enum<V> = V extends [] ? Never : { type: "enum"; values: V };

export type Values<E> = Get<E, "values">;

export type ResolveEnum<T> = GetRec<T, ["values", number]>;
