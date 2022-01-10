import { Get } from "../../utils";

import { MetaType, Never, Error } from "..";

import { ExcludeUnion } from "./union";
import { ExcludeIntersection } from "./intersection";
import { ExcludeExclusion } from "./exclusion";

export type ExcludeFromAny<Source, Excluded> = {
  any: Never;
  never: Source;
  const: Source;
  enum: Source;
  primitive: Source;
  brandedPrimitive: Source;
  array: Source;
  tuple: Source;
  object: Source;
  union: ExcludeUnion<Source, Excluded>;
  intersection: ExcludeIntersection<Source, Excluded>;
  exclusion: ExcludeExclusion<Source, Excluded>;
  error: Excluded;
  errorTypeProperty: Error<"Missing type property">;
}[Get<Excluded, "type"> extends MetaType
  ? Get<Excluded, "type">
  : "errorTypeProperty"];
