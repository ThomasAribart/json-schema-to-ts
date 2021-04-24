import { Enum, Intersection } from "../meta-types/index.d.ts";
import { DeepGet, HasKeyIn } from "../utils/index.d.ts";
import { ParseSchema } from "./index.d.ts";
export declare type ParseEnumSchema<S> = HasKeyIn<S, "const" | "type"> extends true ? Intersection<Enum<DeepGet<S, ["enum", number]>>, ParseSchema<Omit<S, "enum">>> : Enum<DeepGet<S, ["enum", number]>>;
