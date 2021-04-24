import { Get } from "../utils/index.d.ts";
export declare type PrimitiveType = "primitive";
export declare type Primitive<L> = {
    type: PrimitiveType;
    value: L;
};
export declare type Value<L> = Get<L, "value">;
export declare type ResolvePrimitive<T> = Get<T, "value">;
