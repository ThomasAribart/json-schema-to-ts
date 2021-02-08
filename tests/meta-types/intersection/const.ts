import { A } from "ts-toolbelt";

import {
  Any,
  Never,
  Intersection,
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
  Intersect<Const<"foo">, Any>,
  Const<"foo">
> = 1;
anyAlwaysIntersect;

// --- NEVER ---

const neverNeverIntersect: A.Equals<Intersect<Const<"foo">, Never>, Never> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst: A.Equals<
  Intersect<Const<"foo">, Const<"foo">>,
  Const<"foo">
> = 1;
intersectingConst;

const nonIntersectingConst: A.Equals<
  Intersect<Const<"foo">, Const<"bar">>,
  Never
> = 1;
nonIntersectingConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  Intersect<Const<"foo">, Enum<"foo" | "bar" | "baz">>,
  Const<"foo">
> = 1;
intersectingEnum;

const nonIntersectingEnum: A.Equals<
  Intersect<Const<"foo">, Enum<"bar" | "baz">>,
  Never
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive: A.Equals<
  Intersect<Const<"foo">, Primitive<string>>,
  Const<"foo">
> = 1;
intersectingPrimitive;

const nonIntersectingPrimitive: A.Equals<
  Intersect<Const<"foo">, Primitive<boolean>>,
  Never
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const intersectingArray: A.Equals<
  Intersect<Const<["foo", "bar"]>, Arr<Primitive<string>>>,
  Const<["foo", "bar"]>
> = 1;
intersectingArray;

const nonIntersectingArray: A.Equals<
  Intersect<Const<"foo">, Arr<Primitive<string>>>,
  Never
> = 1;
nonIntersectingArray;

// --- TUPLE ---

const intersectingTuple1: A.Equals<
  Intersect<
    Const<["foo", "bar"]>,
    Tuple<[Primitive<string>], true, Primitive<string>>
  >,
  Const<["foo", "bar"]>
> = 1;
intersectingTuple1;

const intersectingTuple2: A.Equals<
  Intersect<
    Const<["foo", 42, "bar"]>,
    Tuple<[Primitive<string>, Primitive<number>], true, Primitive<string>>
  >,
  Const<["foo", 42, "bar"]>
> = 1;
intersectingTuple2;

const nonIntersectingTuple1: A.Equals<
  Intersect<
    Const<["foo", 42]>,
    Tuple<[Primitive<string>], true, Primitive<string>>
  >,
  Never
> = 1;
nonIntersectingTuple1;

const nonIntersectingTuple2: A.Equals<
  Intersect<Const<"foo">, Tuple<[Primitive<string>], true, Primitive<string>>>,
  Never
> = 1;
nonIntersectingTuple2;

// --- OBJECT ---

const intersectingObject: A.Equals<
  Intersect<
    Const<{ foo: "bar" }>,
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
  >,
  Const<{ foo: "bar" }>
> = 1;
intersectingObject;

const nonIntersectingObject: A.Equals<
  Intersect<
    Const<"foo">,
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
  >,
  Never
> = 1;
nonIntersectingObject;

// --- UNION ---

const intersectingUnion1: A.Equals<
  Intersect<Const<"foo">, Union<Primitive<string> | Primitive<number>>>,
  Union<Const<"foo"> | Never>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  Intersect<Const<"foo">, Union<Const<"foo"> | Primitive<number>>>,
  Union<Const<"foo"> | Never>
> = 1;
intersectingUnion2;

const nonIntersectingUnion: A.Equals<
  Intersect<Const<"foo">, Union<Primitive<number> | Arr<Primitive<string>>>>,
  Union<Never>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const cannonIntersectIntersection: A.Equals<
  Intersect<Const<"foo">, Intersection<Const<"foo">, Primitive<string>>>,
  Error<"Cannot intersect intersection">
> = 1;
cannonIntersectIntersection;

// --- EXCLUSION ---

const intersectsExclusionValue: A.Equals<
  Intersect<Const<"foo">, Exclusion<Primitive<string>, Const<"bar">>>,
  Exclusion<Const<"foo">, Const<"bar">>
> = 1;
intersectsExclusionValue;

// --- ERROR ---

const error: A.Equals<Intersect<Const<"foo">, Error<"Any">>, Error<"Any">> = 1;
error;
