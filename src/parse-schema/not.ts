import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

export type NotSchema = JSONSchema7 & {
  not: JSONSchema7;
};

type AllTypes = M.Union<
  | M.Primitive<null>
  | M.Primitive<boolean>
  | M.Primitive<number>
  | M.Primitive<string>
  | M.Array
  | M.Object<{}, never, M.Any>
>;

export type ParseNotSchema<
  S extends NotSchema,
  O extends ParseSchemaOptions,
  P = ParseSchema<Omit<S, "not">, O>,
  E = M.$Exclude<
    P extends M.AnyType ? M.$Intersect<AllTypes, P> : P,
    ParseSchema<MergeSubSchema<Omit<S, "not">, S["not"]>, O>
  >,
> = E extends M.Never ? P : E;
