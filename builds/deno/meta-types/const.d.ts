import { Get } from "../utils/index.d.ts";
export declare type ConstType = "const";
export declare type Const<V> = {
    type: ConstType;
    value: V;
};
export declare type Value<C> = Get<C, "value">;
export declare type ResolveConst<T> = Value<T>;
