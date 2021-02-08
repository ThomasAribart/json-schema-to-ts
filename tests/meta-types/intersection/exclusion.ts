import { A } from "ts-toolbelt";

import {
  Any,
  Never,
  Exclusion,
  Const,
  Enum,
  Primitive,
  Arr,
  Tuple,
  Object,
  Union,
  Intersection,
  Error,
} from "meta-types";
import { Intersect } from "meta-types/intersection";

// --- ANY ---

const anyAlwaysIntersect: A.Equals<
  Intersect<Exclusion<Primitive<string>, Const<"bar">>, Any>,
  Exclusion<Primitive<string>, Const<"bar">>
> = 1;
anyAlwaysIntersect;

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  Intersect<Exclusion<Primitive<string>, Const<"bar">>, Never>,
  Never
> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst: A.Equals<
  Intersect<Exclusion<Primitive<string>, Const<"bar">>, Const<"foo">>,
  Exclusion<Const<"foo">, Const<"bar">>
> = 1;
intersectingConst;

// --- ENUM ---

const intersectingEnum: A.Equals<
  Intersect<
    Exclusion<Primitive<string>, Enum<"foo" | "bar">>,
    Enum<"foo" | "bar" | "baz" | 42>
  >,
  Exclusion<Enum<"foo" | "bar" | "baz">, Enum<"bar" | "foo">>
> = 1;
intersectingEnum;

// --- PRIMITIVES ---

const intersectingPrimitive: A.Equals<
  Intersect<
    Exclusion<Enum<"foo" | 42 | true>, Primitive<number>>,
    Primitive<string>
  >,
  Exclusion<Enum<"foo">, Primitive<number>>
> = 1;
intersectingPrimitive;

const nonIntersectingPrimitive: A.Equals<
  Intersect<Exclusion<Primitive<number>, Const<42>>, Primitive<number>>,
  Exclusion<Primitive<number>, Const<42>>
> = 1;
nonIntersectingPrimitive;

// --- ARRAY ---

const intersectingArray: A.Equals<
  Intersect<Exclusion<Arr<Primitive<string>>, Const<[]>>, Arr<Const<"foo">>>,
  Exclusion<Arr<Const<"foo">>, Const<[]>>
> = 1;
intersectingArray;

// --- TUPLE ---

const intersectingTuple: A.Equals<
  Intersect<
    Exclusion<Tuple<[Primitive<string>]>, Const<[]>>,
    Tuple<[Primitive<string>], true, Primitive<string>>
  >,
  Exclusion<Tuple<[Primitive<string>], true, Primitive<string>>, Const<[]>>
> = 1;
intersectingTuple;

// --- OBJECT ---

const intersectingObject: A.Equals<
  Intersect<
    Exclusion<
      Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>,
      Const<{ foo: "bar" }>
    >,
    Object<{ baz: Primitive<string> }, "baz", true>
  >,
  Exclusion<
    Object<
      { foo: Primitive<string>; baz: Primitive<string> },
      "foo" | "baz",
      true,
      Primitive<string>
    >,
    Const<{ foo: "bar" }>
  >
> = 1;
intersectingObject;

// --- UNION ---

const intersectingUnion: A.Equals<
  Intersect<
    Exclusion<Enum<42 | true | "foo" | "bar">, Primitive<number>>,
    Union<Const<"foo"> | Primitive<boolean>>
  >,
  Union<
    | Exclusion<Const<"foo">, Primitive<number>>
    | Exclusion<Enum<true>, Primitive<number>>
  >
> = 1;
intersectingUnion;

// --- INTERSECTION ---

const cannotIntersectIntersection: A.Equals<
  Intersect<
    Exclusion<Primitive<string>, Const<"foo">>,
    Intersection<Primitive<string>, Enum<"foo" | "bar">>
  >,
  Error<"Cannot intersect intersection">
> = 1;
cannotIntersectIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  Intersect<
    Exclusion<
      Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D">>,
      Const<"A">
    >,
    Exclusion<Enum<"B" | "C">, Const<"B">>
  >,
  Exclusion<
    Union<Never | Const<"B"> | Const<"C">>,
    Union<Const<"A"> | Const<"B">>
  >
> = 1;
intersectingExclusion;

// --- ERROR ---

const error: A.Equals<
  Intersect<Exclusion<Primitive<string>, Const<"foo">>, Error<"Any">>,
  Error<"Any">
> = 1;
error;
