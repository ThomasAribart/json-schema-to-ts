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

const anyToAny: A.Equals<Intersect<Any, Any>, Any> = 1;
anyToAny;

// --- NEVER ---

const anyToNever: A.Equals<Intersect<Any, Never>, Never> = 1;
anyToNever;

// --- CONSTS ---

const anyToConst: A.Equals<Intersect<Any, Const<"foo">>, Const<"foo">> = 1;
anyToConst;

// --- ENUM ---

const anyToEnum: A.Equals<
  Intersect<Any, Enum<"foo" | "bar" | 42>>,
  Enum<"foo" | "bar" | 42>
> = 1;
anyToEnum;

// --- PRIMITIVES ---

const anyToPrimitive: A.Equals<
  Intersect<Any, Primitive<string>>,
  Primitive<string>
> = 1;
anyToPrimitive;

// --- ARRAY ---

const anyToArray: A.Equals<
  Intersect<Any, Arr<Primitive<string>>>,
  Arr<Primitive<string>>
> = 1;
anyToArray;

// --- TUPLE ---

const anyToTuple: A.Equals<
  Intersect<Any, Tuple<[Primitive<string>]>>,
  Tuple<[Primitive<string>]>
> = 1;
anyToTuple;

// --- OBJECT ---

const anyToObject: A.Equals<Intersect<Any, Object>, Object> = 1;
anyToObject;

// --- UNION ---

const anyToUnion: A.Equals<
  Intersect<Any, Union<Const<"foo"> | Arr<Primitive<number>>>>,
  Union<Const<"foo"> | Arr<Primitive<number>>>
> = 1;
anyToUnion;

// --- INTERSECTION ---

const anyToIntersection: A.Equals<
  Intersect<Any, Intersection<Enum<"A" | "B">, Const<"A">>>,
  Intersection<Enum<"A" | "B">, Const<"A">>
> = 1;
anyToIntersection;

// --- EXCLUSION ---

const anyToExclusion: A.Equals<
  Intersect<Any, Exclusion<Any, Const<"A">>>,
  Exclusion<Any, Const<"A">>
> = 1;
anyToExclusion;

// --- ERROR ---

const error: A.Equals<Intersect<Any, Error<"Any">>, Error<"Any">> = 1;
error;
