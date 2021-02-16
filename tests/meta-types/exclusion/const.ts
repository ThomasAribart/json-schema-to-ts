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

const anysAlwaysExclude: A.Equals<Exclude<Const<"A">, Any>, Never> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<Exclude<Const<"A">, Never>, Const<"A">> = 1;
neversNeverExclude;

// --- CONSTS ---

const excludingConst: A.Equals<Exclude<Const<"A">, Const<"A">>, Never> = 1;
excludingConst;

const nonExcludingConst: A.Equals<
  Exclude<Const<"A">, Const<"B">>,
  Const<"A">
> = 1;
nonExcludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<Exclude<Const<"A">, Enum<"A" | "B">>, Never> = 1;
excludingEnum;

const nonExcludingEnum: A.Equals<
  Exclude<Const<"A">, Enum<"B">>,
  Const<"A">
> = 1;
nonExcludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  Exclude<Const<"A">, Primitive<string>>,
  Never
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  Exclude<Const<"A">, Primitive<number>>,
  Const<"A">
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const excludingArray1: A.Equals<
  Exclude<Const<["A"]>, Arr<Primitive<string>>>,
  Never
> = 1;
excludingArray1;

const excludingArray2: A.Equals<
  Exclude<Const<["A"]>, Arr<Const<"A">>>,
  Never
> = 1;
excludingArray2;

const nonExcludingArray: A.Equals<
  Exclude<Const<["A"]>, Arr<Primitive<number>>>,
  Const<["A"]>
> = 1;
nonExcludingArray;

// --- TUPLE ---

const excludingTuple1: A.Equals<
  Exclude<Const<["A"]>, Tuple<[Primitive<string>]>>,
  Never
> = 1;
excludingTuple1;

const excludingTuple2: A.Equals<
  Exclude<Const<["A"]>, Tuple<[Const<"A">]>>,
  Never
> = 1;
excludingTuple2;

const nonExcludingTuple: A.Equals<
  Exclude<Const<["A"]>, Tuple<[Primitive<number>]>>,
  Const<["A"]>
> = 1;
nonExcludingTuple;

// --- OBJECT ---

const nonObjectConst: A.Equals<
  Exclude<Const<["A", "B"]>, Object<{}, never, true, Primitive<string>>>,
  Const<["A", "B"]>
> = 1;
nonObjectConst;

const excludingClosedObject1: A.Equals<
  Exclude<Const<{ a: "A" }>, Object<{ a: Primitive<string> }, "a", false>>,
  Never
> = 1;
excludingClosedObject1;

const excludingClosedObject2: A.Equals<
  Exclude<
    Const<{ a: "A"; b: "B" }>,
    Object<{ a: Enum<"A" | "B">; b: Enum<"A" | "B"> }, "a", false>
  >,
  Never
> = 1;
excludingClosedObject2;

const nonExcludingClosedObject: A.Equals<
  Exclude<Const<{ a: "A" }>, Object<{ a: Const<"B"> }, "a", false>>,
  Const<{ a: "A" }>
> = 1;
nonExcludingClosedObject;

const closedObjectSizesDontMatch1: A.Equals<
  Exclude<Const<{ a: "A"; b: "B" }>, Object<{ a: Const<"A"> }, "a", false>>,
  Const<{ a: "A"; b: "B" }>
> = 1;
closedObjectSizesDontMatch1;

const closedObjectSizesDontMatch2: A.Equals<
  Exclude<
    Const<{ a: "A"; b: "B" }>,
    Object<{ a: Const<"A">; c: Const<"C"> }, "a" | "c", false>
  >,
  Const<{ a: "A"; b: "B" }>
> = 1;
closedObjectSizesDontMatch2;

const excludingOpenObject1: A.Equals<
  Exclude<
    Const<{ a: "A"; b: "B" }>,
    Object<{ a: Const<"A"> }, never, true, Const<"B">>
  >,
  Never
> = 1;
excludingOpenObject1;

const excludingOpenObject2: A.Equals<
  Exclude<
    Const<{ a: "A"; b: "B" }>,
    Object<{}, never, true, Union<Const<"A"> | Const<"B">>>
  >,
  Never
> = 1;
excludingOpenObject2;

const nonExcludingOpenObject: A.Equals<
  Exclude<Const<{ a: "A" }>, Object<{}, never, true, Const<"C">>>,
  Const<{ a: "A" }>
> = 1;
nonExcludingOpenObject;

// --- UNION ---

const excludingUnion1: A.Equals<
  Exclude<Const<"A">, Union<Const<"A">>>,
  Never
> = 1;
excludingUnion1;

const excludingUnion2: A.Equals<
  Exclude<Const<"A">, Union<Const<"B"> | Enum<"A" | "C">>>,
  Never
> = 1;
excludingUnion2;

const excludingUnion3: A.Equals<
  Exclude<Const<"A">, Union<Primitive<string>>>,
  Never
> = 1;
excludingUnion3;

const nonExcludingUnion: A.Equals<
  Exclude<Const<"A">, Union<Const<"B"> | Const<"C">>>,
  Const<"A">
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<Const<"A">, Intersection<Primitive<string>, Enum<"A" | "B">>>,
  Never
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<Const<"A">, Intersection<Primitive<string>, Enum<"B" | "C">>>,
  Const<"A">
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<Const<"A">, Exclusion<Primitive<string>, Const<"B">>>,
  Never
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<Const<"A">, Exclusion<Enum<"A" | "B">, Const<"A">>>,
  Const<"A">
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<Exclude<Const<"A">, Error<"Any">>, Error<"Any">> = 1;
error;
