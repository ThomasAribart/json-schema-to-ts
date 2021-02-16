import { Exclude } from ".";

import { ClearIntersections } from "../intersection";

export type ExcludeIntersection<Source, ExcludedIntersection> = Exclude<
  Source,
  ClearIntersections<ExcludedIntersection>
>;
