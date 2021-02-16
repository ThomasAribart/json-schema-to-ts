import { A } from "ts-toolbelt";

import {
  Any,
  Never,
  Const,
  Enum,
  Union,
  Primitive,
  Arr,
  Tuple,
  Object,
  Intersection,
  Exclusion,
  Error,
} from "meta-types";
import { Intersect } from "meta-types/intersection";

// --- ANY ---

const neverToAny: A.Equals<Intersect<Never, Any>, Never> = 1;
neverToAny;

// --- NEVER ---

const neverToNever: A.Equals<Intersect<Never, Never>, Never> = 1;
neverToNever;

// --- CONSTS ---

const neverToConst: A.Equals<Intersect<Never, Const<"foo">>, Never> = 1;
neverToConst;

// --- ENUM ---

const neverToEnum: A.Equals<
  Intersect<Never, Enum<"foo" | "bar" | 42>>,
  Never
> = 1;
neverToEnum;

// --- PRIMITIVES ---

const neverToPrimitive: A.Equals<
  Intersect<Never, Primitive<string>>,
  Never
> = 1;
neverToPrimitive;

// --- ARRAY ---

const neverToArray: A.Equals<
  Intersect<Never, Arr<Primitive<string>>>,
  Never
> = 1;
neverToArray;

// --- TUPLE ---

const neverToTuple: A.Equals<
  Intersect<Never, Tuple<[Primitive<string>]>>,
  Never
> = 1;
neverToTuple;

// --- OBJECT ---

const neverToObject: A.Equals<Intersect<Never, Object>, Never> = 1;
neverToObject;

// --- UNION ---

const neverToUnion: A.Equals<
  Intersect<Never, Union<Any | Arr<Primitive<number>>>>,
  Never
> = 1;
neverToUnion;

// --- INTERSECTION ---

const neverToIntersection: A.Equals<
  Intersect<Never, Intersection<Any, Any>>,
  Never
> = 1;
neverToIntersection;

// --- EXCLUSION ---

const neverToExclusion: A.Equals<
  Intersect<Never, Exclusion<Any, Const<"A">>>,
  Never
> = 1;
neverToExclusion;

// --- ERROR ---

const error: A.Equals<Intersect<Never, Error<"Any">>, Error<"Any">> = 1;
error;
