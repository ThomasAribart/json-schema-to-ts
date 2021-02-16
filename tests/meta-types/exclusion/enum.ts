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
import { Exclude } from "meta-types/exclusion";

// --- ANY ---

const anysAlwaysExclude: A.Equals<Exclude<Enum<"A" | "B">, Any>, Never> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  Exclude<Enum<"A" | "B">, Never>,
  Enum<"A" | "B">
> = 1;
neversNeverExclude;

// --- CONSTS ---

const excludingConst: A.Equals<
  Exclude<Enum<"A" | "B">, Const<"A">>,
  Enum<"B">
> = 1;
excludingConst;

const nonExcludingConst: A.Equals<
  Exclude<Enum<"A" | "B">, Const<"C">>,
  Enum<"A" | "B">
> = 1;
nonExcludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<
  Exclude<Enum<"A" | "B" | "C">, Enum<"A" | "B">>,
  Enum<"C">
> = 1;
excludingEnum;

const nonExcludingEnum: A.Equals<
  Exclude<Enum<"A" | "B">, Enum<"C" | "D">>,
  Enum<"A" | "B">
> = 1;
nonExcludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  Exclude<Enum<"A" | "B" | 42>, Primitive<string>>,
  Enum<42>
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  Exclude<Enum<"A" | "B">, Primitive<number>>,
  Enum<"A" | "B">
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const excludingArray: A.Equals<
  Exclude<Enum<["A"] | ["B"] | [42] | "C">, Arr<Primitive<string>>>,
  Enum<[42] | "C">
> = 1;
excludingArray;

const nonExcludingArray: A.Equals<
  Exclude<Enum<["A"] | ["B"] | 42>, Arr<Primitive<number>>>,
  Enum<["A"] | ["B"] | 42>
> = 1;
nonExcludingArray;

// --- TUPLE ---

const excludingTuple1: A.Equals<
  Exclude<Enum<["A"] | [42]>, Tuple<[Primitive<string>]>>,
  Enum<[42]>
> = 1;
excludingTuple1;

const excludingTuple2: A.Equals<
  Exclude<Enum<["A", "B"] | [42]>, Tuple<[Const<"A">]>>,
  Enum<[42]>
> = 1;
excludingTuple2;

const nonExcludingTuple: A.Equals<
  Exclude<Enum<["A", "B"]>, Tuple<[Primitive<number>]>>,
  Enum<["A", "B"]>
> = 1;
nonExcludingTuple;

// --- OBJECT ---

const nonObjectEnum: A.Equals<
  Exclude<Enum<["A", "B"] | 42>, Object<{}, never, true, Primitive<string>>>,
  Enum<["A", "B"] | 42>
> = 1;
nonObjectEnum;

const excludingClosedObject1: A.Equals<
  Exclude<
    Enum<{ a: "A" } | { a: "B" }>,
    Object<{ a: Primitive<string> }, "a", false>
  >,
  Enum<never>
> = 1;
excludingClosedObject1;

const excludingClosedObject2: A.Equals<
  Exclude<Enum<{ a: "A" } | { a: "B" }>, Object<{ a: Const<"A"> }, "a", false>>,
  Enum<{ a: "B" }>
> = 1;
excludingClosedObject2;

const nonExcludingClosedObject: A.Equals<
  Exclude<Enum<{ a: "A" } | { a: "B" }>, Object<{ a: Const<"C"> }, "a", false>>,
  Enum<{ a: "A" } | { a: "B" }>
> = 1;
nonExcludingClosedObject;

const closedObjectSizesDontMatch1: A.Equals<
  Exclude<
    Enum<{ a: "A" } | { a: "A"; b: "B" }>,
    Object<{ a: Const<"A"> }, "a", false>
  >,
  Enum<{ a: "A"; b: "B" }>
> = 1;
closedObjectSizesDontMatch1;

const closedObjectSizesDontMatch2: A.Equals<
  Exclude<
    Enum<{ a: "A"; b: "B" } | { a: "A"; c: "C" }>,
    Object<{ a: Const<"A">; c: Const<"C"> }, "a" | "c", false>
  >,
  Enum<{ a: "A"; b: "B" }>
> = 1;
closedObjectSizesDontMatch2;

const excludingOpenObject1: A.Equals<
  Exclude<
    Enum<{ a: "A"; b: "B" } | { a: "A"; b: "C" }>,
    Object<{ a: Const<"A"> }, never, true, Const<"B">>
  >,
  Enum<{ a: "A"; b: "C" }>
> = 1;
excludingOpenObject1;

const excludingOpenObject2: A.Equals<
  Exclude<
    Enum<{ a: "A"; b: "B" } | { a: "A"; b: "C" }>,
    Object<{}, never, true, Union<Const<"A"> | Const<"B">>>
  >,
  Enum<{ a: "A"; b: "C" }>
> = 1;
excludingOpenObject2;

const nonExcludingOpenObject: A.Equals<
  Exclude<Enum<{ a: "A" } | { a: "B" }>, Object<{}, never, true, Const<"C">>>,
  Enum<{ a: "A" } | { a: "B" }>
> = 1;
nonExcludingOpenObject;

// --- UNION ---

const excludingUnion1: A.Equals<
  Exclude<Enum<"A" | "B">, Union<Enum<"B"> | Enum<"C">>>,
  Enum<"A">
> = 1;
excludingUnion1;

const excludingUnion2: A.Equals<
  Exclude<Enum<"A" | "B">, Union<Const<"A"> | Const<"B">>>,
  Enum<never>
> = 1;
excludingUnion2;

const nonExcludingUnion: A.Equals<
  Exclude<Enum<"A" | "B">, Union<Const<"C"> | Primitive<number>>>,
  Enum<"A" | "B">
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<Enum<"A" | "C">, Intersection<Primitive<string>, Enum<"A" | "B">>>,
  Enum<"C">
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<Enum<"A" | "B">, Intersection<Primitive<string>, Enum<"C" | "D">>>,
  Enum<"A" | "B">
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<Enum<"A" | "B">, Exclusion<Primitive<string>, Const<"B">>>,
  Enum<never>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<Enum<"A" | "B">, Exclusion<Enum<"A" | "B" | "C">, Enum<"A" | "B">>>,
  Enum<"A" | "B">
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<Exclude<Const<"A">, Error<"Any">>, Error<"Any">> = 1;
error;
