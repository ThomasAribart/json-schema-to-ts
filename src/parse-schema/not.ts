import { M } from "ts-algebra";

import { JSONSchema7 } from "../definitions";

import { ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema } from "./utils";

export type NotSchema = JSONSchema7 & {
  not: JSONSchema7;
};

type AllTypes = M.Union<
  | M.Primitive<null>
  | M.Primitive<boolean>
  | M.Primitive<number>
  | M.Primitive<string>
  | M.Array<M.Any>
  | M.Object<{}, never, M.Any>
>;

export type ParseNotSchema<
  S extends NotSchema,
  O extends ParseSchemaOptions,
  P = ParseSchema<Omit<S, "not">, O>,
  E = M.$Exclude<
    P extends M.AnyType ? M.$Intersect<AllTypes, P> : P,
    ParseSchema<MergeSubSchema<Omit<S, "not">, S["not"]>, O>
  >
> = E extends M.Never ? P : E;
