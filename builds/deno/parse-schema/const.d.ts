import { Const, Intersection } from "../meta-types/index.d.ts";
import { Get, HasKeyIn } from "../utils/index.d.ts";
import { ParseSchema } from "./index.d.ts";
export declare type ParseConstSchema<S> = HasKeyIn<S, "type"> extends true ? Intersection<Const<Get<S, "const">>, ParseSchema<Omit<S, "const">>> : Const<Get<S, "const">>;
