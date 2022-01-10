import { A } from "ts-toolbelt";

import {
  Any,
  Never,
  Const,
  Enum,
  Primitive,
  Arr,
  Tuple,
  Object,
  Union,
  Intersection,
  Exclusion,
  Error,
} from "meta-types";
import { Intersect } from "meta-types/intersection";

// --- ANY ---

const anysAlwaysIntersect: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Any>,
  Union<Const<"foo"> | Primitive<number>>
> = 1;
anysAlwaysIntersect;

// --- NEVER ---

const neversNeverIntersect: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Never>,
  Never
> = 1;
neversNeverIntersect;

// --- CONSTS ---

const intersectingConst1: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Const<"foo">>,
  Union<Const<"foo"> | Never>
> = 1;
intersectingConst1;

const intersectingConst2: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Const<422>>,
  Union<Const<422> | Never>
> = 1;
intersectingConst2;

const nonIntersectingConst: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Const<true>>,
  Union<Never>
> = 1;
nonIntersectingConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Enum<"foo" | 42>>,
  Union<Const<"foo"> | Enum<42>>
> = 1;
intersectingEnum;

const nonIntersectingEnum: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Enum<["bar", true]>>,
  Union<Never | Enum<never>>
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive1: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Primitive<string>>,
  Union<Const<"foo"> | Never>
> = 1;
intersectingPrimitive1;

const intersectingPrimitive2: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Primitive<number>>,
  Union<Primitive<number> | Never>
> = 1;
intersectingPrimitive2;

const nonIntersectingPrimitive: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Primitive<boolean>>,
  Union<Never>
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const nonIntersectingArray: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Arr<Primitive<string>>>,
  Union<Never>
> = 1;
nonIntersectingArray;

// --- TUPLE ---

const nonIntersectingTuple: A.Equals<
  Intersect<
    Union<Const<"foo"> | Primitive<number>>,
    Tuple<[Primitive<string>], true, Primitive<string>>
  >,
  Union<Never>
> = 1;
nonIntersectingTuple;

// --- OBJECT ---

const nonIntersectingObject: A.Equals<
  Intersect<
    Union<Const<"foo"> | Primitive<number>>,
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
  >,
  Union<Never>
> = 1;
nonIntersectingObject;

// --- UNION ---

const intersectingUnion1: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Union<Primitive<string>>>,
  Union<Union<Never> | Union<Const<"foo">>>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  Intersect<
    Union<Const<"foo"> | Primitive<number>>,
    Union<Const<"foo"> | Primitive<boolean>>
  >,
  Union<Union<Const<"foo"> | Never> | Union<Never>>
> = 1;
intersectingUnion2;

const intersectingUnion3: A.Equals<
  Intersect<
    Union<Const<"foo"> | Primitive<number>>,
    Union<Const<"bar"> | Primitive<number>>
  >,
  Union<Union<Never> | Union<Primitive<number> | Never>>
> = 1;
intersectingUnion3;

// FIXME
// @ts-ignore
const nonIntersectingUnion: A.Equals<
  Intersect<
    Union<Const<"foo"> | Primitive<number>>,
    Union<Arr<Primitive<boolean>>>
  >,
  Union<Union<Never>>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const cannotIntersectIntersection: A.Equals<
  Intersect<
    Union<Const<"foo"> | Primitive<number>>,
    Intersection<Primitive<string>, Primitive<number>>
  >,
  Error<"Cannot intersect intersection">
> = 1;
cannotIntersectIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  Intersect<
    Union<Const<"foo"> | Primitive<boolean>>,
    Exclusion<Enum<42 | true | "foo" | "bar">, Primitive<number>>
  >,
  Union<
    | Exclusion<Const<"foo">, Primitive<number>>
    | Exclusion<Enum<true>, Primitive<number>>
  >
> = 1;
intersectingExclusion;

// --- ERROR ---

const error: A.Equals<
  Intersect<Union<Const<"foo"> | Primitive<number>>, Error<"Any">>,
  Error<"Any">
> = 1;
error;
