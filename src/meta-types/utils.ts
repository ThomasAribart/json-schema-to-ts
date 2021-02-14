import { Get } from "../utils";

import { MetaType } from ".";
import { IsEnumRepresentable } from "./enum";
import { IsTupleRepresentable } from "./tuple";
import { IsObjectRepresentable } from "./object";
import { IsUnionRepresentable } from "./union";
import { IsIntersectionRepresentable } from "./intersection";
import { IsExclusionRepresentable } from "./exclusion";

export type IsRepresentable<A> = {
  any: true;
  never: false;
  const: true;
  enum: IsEnumRepresentable<A>;
  primitive: true;
  array: true; // Empty array will represent any array
  tuple: IsTupleRepresentable<A>;
  object: IsObjectRepresentable<A>;
  union: IsUnionRepresentable<A>;
  intersection: IsIntersectionRepresentable<A>;
  exclusion: IsExclusionRepresentable<A>;
  error: false;
  errorMissingType: false;
}[Get<A, "type"> extends MetaType ? Get<A, "type"> : "errorMissingType"];
