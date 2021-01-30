import { Exclusion, Union, Any, Primitive, Arr, Object } from "../meta-types";
import { Get, HasKeyIn } from "../utils";

import { ParseSchema } from ".";
import { MergeSubSchema } from "./utils";

type AllTypes = Union<
  | Primitive<null>
  | Primitive<boolean>
  | Primitive<number>
  | Primitive<string>
  | Arr<Any>
  | Object
>;

export type ParseNotSchema<S> = Exclusion<
  HasKeyIn<
    S,
    "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf"
  > extends true
    ? ParseSchema<Omit<S, "not">>
    : AllTypes,
  ParseSchema<MergeSubSchema<Omit<S, "not">, Get<S, "not">>>
>;
