import { Get } from "../utils";

import { Any, AnyType, ResolveAny } from "./any";
import { Never, NeverType, ResolveNever } from "./never";
import { Const, ConstType, ResolveConst } from "./const";
import { Enum, EnumType, ResolveEnum } from "./enum";
import { Litteral, LitteralType, ResolveLitteral } from "./litteral";
import { Arr, ArrType, ResolveArr } from "./array";
import { Tuple, TupleType, ResolveTuple } from "./tuple";
import { Object, ObjectType, ResolveObject } from "./object";
import { Union, UnionType, ResolveUnion } from "./union";
import {
  Intersection,
  IntersectionType,
  ResolveIntersection,
} from "./intersection";
import { Error, ErrorType } from "./error";

export type MetaType =
  | AnyType
  | NeverType
  | ConstType
  | EnumType
  | LitteralType
  | ArrType
  | TupleType
  | ObjectType
  | UnionType
  | IntersectionType
  | ErrorType;

export type Resolve<T, D = Exclude<T, undefined>> = {
  any: ResolveAny;
  never: ResolveNever;
  const: ResolveConst<D>;
  enum: ResolveEnum<D>;
  litteral: ResolveLitteral<D>;
  array: ResolveArr<D>;
  tuple: ResolveTuple<D>;
  object: ResolveObject<D>;
  union: ResolveUnion<D>;
  intersection: ResolveIntersection<D>;
  error: never;
}[Get<D, "type"> extends MetaType ? Get<D, "type"> : "error"];

export {
  Any,
  Never,
  Const,
  Enum,
  Litteral,
  Arr,
  Tuple,
  Object,
  Union,
  Intersection,
  Error,
};
