import { ParseSchema } from "../parse-schema/index.d.ts";
import { Intersection, Union, Exclusion } from "../meta-types/index.d.ts";
import { HasKeyIn } from "../utils/index.d.ts";
import { MergeSubSchema } from "./utils.d.ts";
export declare type ParseIfThenElseSchema<S, R = Omit<S, "if" | "then" | "else">> = HasKeyIn<S, "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf" | "not"> extends true ? Intersection<ApplyIfThenElse<S, R>, ParseSchema<R>> : ApplyIfThenElse<S, R>;
declare type ApplyIfThenElse<S, R, I = "if" extends keyof S ? MergeSubSchema<R, S["if"]> : never> = Union<("then" extends keyof S ? Intersection<ParseSchema<I>, ParseSchema<MergeSubSchema<R, S["then"]>>> : ParseSchema<I>) | Exclusion<"else" extends keyof S ? ParseSchema<MergeSubSchema<R, S["else"]>> : ParseSchema<R>, ParseSchema<I>>>;
export {};
