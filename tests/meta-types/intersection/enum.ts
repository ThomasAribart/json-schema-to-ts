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

const anyAlwaysIntersect: A.Equals<
  Intersect<Enum<"foo" | "bar">, Any>,
  Enum<"foo" | "bar">
> = 1;
anyAlwaysIntersect;

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  Intersect<Enum<"foo" | "bar">, Never>,
  Never
> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst: A.Equals<
  Intersect<Enum<"foo" | "bar" | 42>, Const<"foo">>,
  Const<"foo">
> = 1;
intersectingConst;

const nonIntersectingConst: A.Equals<
  Intersect<Enum<"foo" | "bar" | 42>, Const<true>>,
  Never
> = 1;
nonIntersectingConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  Intersect<Enum<"foo" | "bar" | 42>, Enum<"foo" | 42>>,
  Enum<"foo" | 42>
> = 1;
intersectingEnum;

const nonIntersectingEnum: A.Equals<
  Intersect<Enum<"foo" | "bar" | 42>, Enum<43 | true>>,
  Enum<never>
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive1: A.Equals<
  Intersect<Enum<"foo" | "bar" | 42>, Primitive<string>>,
  Enum<"foo" | "bar">
> = 1;
intersectingPrimitive1;

enum Food {
  Pizza = "pizza",
  Tacos = "tacos",
  Fries = "fries",
}

const intersectingPrimitive2: A.Equals<
  Intersect<Enum<Food>, Primitive<string>>,
  Enum<Food>
> = 1;
intersectingPrimitive2;

const nonIntersectingPrimitive: A.Equals<
  Intersect<Enum<"foo" | "bar" | 42>, Primitive<boolean>>,
  Enum<never>
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const intersectingArray: A.Equals<
  Intersect<Enum<["foo", "bar"] | [42]>, Arr<Primitive<string>>>,
  Enum<["foo", "bar"]>
> = 1;
intersectingArray;

const nonIntersectingArray: A.Equals<
  Intersect<Enum<"foo" | 42>, Arr<Primitive<string>>>,
  Enum<never>
> = 1;
nonIntersectingArray;

// --- TUPLE ---

const intersectingTuple: A.Equals<
  Intersect<
    Enum<["foo", "bar"] | ["foo", 42]>,
    Tuple<[Primitive<string>], true, Primitive<string>>
  >,
  Enum<["foo", "bar"]>
> = 1;
intersectingTuple;

const nonIntersectingTuple: A.Equals<
  Intersect<
    Enum<"foo" | "bar" | 42>,
    Tuple<[Primitive<string>], true, Primitive<string>>
  >,
  Enum<never>
> = 1;
nonIntersectingTuple;

// --- OBJECT ---

const intersectingObject: A.Equals<
  Intersect<
    Enum<{ foo: "str"; bar: "str" } | { foo: "str"; bar: 42 }>,
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
  >,
  Enum<{ foo: "str"; bar: "str" }>
> = 1;
intersectingObject;

const nonIntersectingObject: A.Equals<
  Intersect<
    Enum<"foo" | "bar" | 42>,
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
  >,
  Enum<never>
> = 1;
nonIntersectingObject;

// --- UNION ---

const intersectingUnion1: A.Equals<
  Intersect<Enum<"foo" | "bar" | 42>, Union<Primitive<string>>>,
  Union<Enum<"foo" | "bar">>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  Intersect<Enum<"foo" | "bar" | 42>, Union<Const<"foo"> | Primitive<boolean>>>,
  Union<Const<"foo"> | Enum<never>>
> = 1;
intersectingUnion2;

// FIXME
// @ts-ignore
const nonIntersectingUnion: A.Equals<
  Intersect<Enum<"foo" | "bar" | 42>, Union<Object | Primitive<boolean>>>,
  Union<Enum<never>>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const cannotIntersectIntersection: A.Equals<
  Intersect<
    Enum<"foo" | "bar" | 42>,
    Intersection<Primitive<string>, Primitive<number>>
  >,
  Error<"Cannot intersect intersection">
> = 1;
cannotIntersectIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  Intersect<
    Enum<"foo" | "bar" | "baz" | 42>,
    Exclusion<Primitive<string>, Enum<"foo" | "bar">>
  >,
  Exclusion<Enum<"foo" | "bar" | "baz">, Enum<"foo" | "bar">>
> = 1;
intersectingExclusion;

// --- ERROR ---

const error: A.Equals<
  Intersect<Enum<"foo" | "bar" | 42>, Error<"Any">>,
  Error<"Any">
> = 1;
error;
