import { Exclude, Value, Excluded } from ".";

export type ExcludeExclusion<Source, ExcludedExclusion> = Exclude<
  Source,
  Exclude<Value<ExcludedExclusion>, Excluded<ExcludedExclusion>>
>;
