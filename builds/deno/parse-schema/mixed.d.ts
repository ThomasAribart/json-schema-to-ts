import { Union } from "../meta-types/index.d.ts";
import { Get, Head, Tail, DeepMergeUnsafe } from "../utils/index.d.ts";
import { ParseSchema } from "./index.d.ts";
export declare type ParseMixedSchema<S> = Union<RecurseOnMixedSchema<Get<S, "type">, S>>;
declare type RecurseOnMixedSchema<T, S, R = never> = {
    stop: R;
    continue: T extends any[] ? RecurseOnMixedSchema<Tail<T>, S, R | ParseSchema<DeepMergeUnsafe<S, {
        type: Head<T>;
    }>>> : never;
}[T extends [any, ...any[]] ? "continue" : "stop"];
export {};
