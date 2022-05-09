import { M } from "ts-algebra";
import { L, S } from "ts-toolbelt";

import { JSONSchema7 } from "../../definitions";
import { DeepGet } from "../../utils";

import { ParseSchema, ParseSchemaOptions } from "../index";
import { MergeSubSchema } from "../utils";

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
