import { A } from "ts-toolbelt";

import {
  Intersection,
  Any,
  Never,
  Const,
  Enum,
  Union,
  Primitive,
  Arr,
  Tuple,
  Object,
  Exclusion,
  Error,
} from "meta-types";
import { Intersect } from "meta-types/intersection";

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  Intersect<Primitive<string>, Any>,
  Primitive<string>
> = 1;
anyAlwaysIntersect;

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  Intersect<Primitive<string>, Never>,
  Never
> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst: A.Equals<
  Intersect<Primitive<string>, Const<"foo">>,
  Const<"foo">
> = 1;
intersectingConst;

const nonIntersectingConst: A.Equals<
  Intersect<Primitive<string>, Const<42>>,
  Never
> = 1;
nonIntersectingConst;

// --- ENUM ---

const intersectingEnum1: A.Equals<
  Intersect<Primitive<string>, Enum<"foo" | "bar" | 42>>,
  Enum<"foo" | "bar">
> = 1;
intersectingEnum1;

const intersectingEnum2: A.Equals<
  Intersect<Primitive<number>, Enum<"bar" | "baz" | 42>>,
  Enum<42>
> = 1;
intersectingEnum2;

const nonIntersectingEnum: A.Equals<
  Intersect<Primitive<number>, Enum<"bar" | "baz">>,
  Enum<never>
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive: A.Equals<
  Intersect<Primitive<string>, Primitive<string>>,
  Primitive<string>
> = 1;
intersectingPrimitive;

const nonIntersectingPrimitive: A.Equals<
  Intersect<Primitive<string>, Primitive<boolean>>,
  Never
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const arraysNeverIntersect: A.Equals<
  Intersect<Primitive<string>, Arr<Primitive<string>>>,
  Never
> = 1;
arraysNeverIntersect;

// --- TUPLE ---

const tuplesNeverIntersect: A.Equals<
  Intersect<
    Primitive<string>,
    Tuple<[Primitive<string>], true, Primitive<string>>
  >,
  Never
> = 1;
tuplesNeverIntersect;

// --- OBJECT ---

const objectsNeverIntersect: A.Equals<
  Intersect<
    Primitive<string>,
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
  >,
  Never
> = 1;
objectsNeverIntersect;

// --- UNION ---

const intersectingUnion1: A.Equals<
  Intersect<Primitive<string>, Union<Primitive<string> | Primitive<number>>>,
  Union<Primitive<string> | Never>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  Intersect<Primitive<string>, Union<Const<"foo"> | Primitive<number>>>,
  Union<Const<"foo"> | Never>
> = 1;
intersectingUnion2;

const nonIntersectingUnion: A.Equals<
  Intersect<
    Primitive<string>,
    Union<Primitive<number> | Arr<Primitive<string>>>
  >,
  Union<Never>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const cannotIntersectIntersection: A.Equals<
  Intersect<
    Primitive<string>,
    Intersection<Primitive<string>, Primitive<string>>
  >,
  Error<"Cannot intersect intersection">
> = 1;
cannotIntersectIntersection;

// --- EXCLUSION ---

const intersectingExclusion1: A.Equals<
  Intersect<
    Primitive<string>,
    Exclusion<Enum<"foo" | 42 | true>, Primitive<number>>
  >,
  Exclusion<Enum<"foo">, Primitive<number>>
> = 1;
intersectingExclusion1;

const intersectingExclusion2: A.Equals<
  Intersect<Primitive<number>, Exclusion<Primitive<number>, Const<42>>>,
  Exclusion<Primitive<number>, Const<42>>
> = 1;
intersectingExclusion2;

// --- ERROR ---

const error: A.Equals<
  Intersect<Primitive<string>, Error<"Any">>,
  Error<"Any">
> = 1;
error;
