import type { M } from "ts-algebra";
import type { L, S } from "ts-toolbelt";

import type { JSONSchema7 } from "../../definitions";
import type { DeepGet } from "../../type-utils";

import type { ParseSchema, ParseSchemaOptions } from "../index";
import type { MergeSubSchema } from "../utils";

export type ParseReference<
  S extends JSONSchema7,
  O extends ParseSchemaOptions,
  P extends string | undefined,
  R extends JSONSchema7,
  C extends JSONSchema7 = P extends string
    ? // Tail is needed to remove initial "" from split path
      DeepGet<S, L.Tail<S.Split<P, "/">>, false>
    : S
> = M.$Intersect<ParseSchema<C, O>, ParseSchema<MergeSubSchema<C, R>, O>>;
