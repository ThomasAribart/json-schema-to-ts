import { A } from "ts-toolbelt";

import { Get } from "../utils";

export type EnumType = "enum";

export type Enum<V> = { type: EnumType; values: V };

export type Values<E> = Get<E, "values">;

export type ResolveEnum<T> = Values<T>;

export type IsEnumRepresentable<E> = A.Equals<Values<E>, never> extends 1
  ? false
  : true;
