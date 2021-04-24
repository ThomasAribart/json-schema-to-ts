import { Exclude, Value, Excluded } from "./index.d.ts";
export declare type ExcludeExclusion<Source, ExcludedExclusion> = Exclude<Source, Exclude<Value<ExcludedExclusion>, Excluded<ExcludedExclusion>>>;
