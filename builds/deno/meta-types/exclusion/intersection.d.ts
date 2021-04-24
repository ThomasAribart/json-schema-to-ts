import { Exclude } from "./index.d.ts";
import { ClearIntersections } from "../intersection/index.d.ts";
export declare type ExcludeIntersection<Source, ExcludedIntersection> = Exclude<Source, ClearIntersections<ExcludedIntersection>>;
