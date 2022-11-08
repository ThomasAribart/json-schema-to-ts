import type { M } from "ts-algebra";
import type { L } from "ts-toolbelt";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

export type OneOfSchema = JSONSchema7 & { oneOf: JSONSchema7[] };

export type ParseOneOfSchema<
  P extends OneOfSchema,
  O extends ParseSchemaOptions,
> = M.$Union<RecurseOnOneOfSchema<P["oneOf"], P, O>>;

type RecurseOnOneOfSchema<
  S extends JSONSchema7[],
  P extends OneOfSchema,
  O extends ParseSchemaOptions,
  R = never,
> = {
  stop: R;
  continue: RecurseOnOneOfSchema<
    L.Tail<S>,
    P,
    O,
    | R
    | M.$Intersect<
        ParseSchema<Omit<P, "oneOf">, O>,
        ParseSchema<MergeSubSchema<Omit<P, "oneOf">, L.Head<S>>, O>
      >
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}[S extends [any, ...any[]] ? "continue" : "stop"];
