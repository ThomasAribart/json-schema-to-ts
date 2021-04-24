import { A, B } from "https://cdn.skypack.dev/ts-toolbelt@^6.15.5?dts";
import { Get } from "../utils/index.d.ts";
export declare type EnumType = "enum";
export declare type Enum<V> = {
    type: EnumType;
    values: V;
};
export declare type Values<E> = Get<E, "values">;
export declare type ResolveEnum<T> = Values<T>;
export declare type IsEnumRepresentable<E> = A.Equals<Values<E>, never> extends B.True ? false : true;
