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
  Intersect<Tuple<[Primitive<string>]>, Any>,
  Tuple<[Primitive<string>]>
> = 1;
anysAlwaysIntersect;

// --- NEVER ---

const neversNeverIntersect: A.Equals<
  Intersect<Tuple<[Primitive<string>]>, Never>,
  Never
> = 1;
neversNeverIntersect;

// --- CONSTS ---

const intersectingConst1: A.Equals<
  Intersect<
    Tuple<[Primitive<string>, Primitive<number>]>,
    Const<["foo", 42, { any: "value" }]>
  >,
  Const<["foo", 42, { any: "value" }]>
> = 1;
intersectingConst1;

const intersectingConst2: A.Equals<
  Intersect<
    Tuple<[Primitive<string>, Primitive<number>], true, Primitive<boolean>>,
    Const<["foo", 42, true]>
  >,
  Const<["foo", 42, true]>
> = 1;
intersectingConst2;

const nonIntersectingConst1: A.Equals<
  Intersect<
    Tuple<[Primitive<string>, Primitive<number>], true, Primitive<boolean>>,
    Const<["foo", 42, "bar"]>
  >,
  Never
> = 1;
nonIntersectingConst1;

const nonIntersectingConst2: A.Equals<
  Intersect<Tuple<[Primitive<string>, Primitive<number>]>, Const<[42, "foo"]>>,
  Never
> = 1;
nonIntersectingConst2;

// --- ENUM ---

const intersectingEnum1: A.Equals<
  Intersect<
    Tuple<[Primitive<string>, Primitive<number>], true, Primitive<boolean>>,
    Enum<
      ["foo"] | ["foo", 42] | ["foo", 42, true] | ["foo", 42, { any: "value" }]
    >
  >,
  Enum<["foo", 42, true] | ["foo", 42]>
> = 1;
intersectingEnum1;

const intersectingEnum2: A.Equals<
  Intersect<
    Tuple<[Primitive<string>, Primitive<number>], false>,
    Enum<
      ["foo"] | ["foo", 42] | ["foo", 42, true] | ["foo", 42, { any: "value" }]
    >
  >,
  Enum<["foo", 42]>
> = 1;
intersectingEnum2;

const nonIntersectingEnum: A.Equals<
  Intersect<
    Tuple<[Primitive<string>, Primitive<number>], true, Primitive<boolean>>,
    Enum<["bar", "baz"]>
  >,
  Enum<never>
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const primitivesNeverIntersect: A.Equals<
  Intersect<Tuple<[Primitive<string>]>, Primitive<string>>,
  Never
> = 1;
primitivesNeverIntersect;

// --- ARRAY ---

const intersectingArray1: A.Equals<
  Intersect<Tuple<[Primitive<string>]>, Arr<Primitive<string>>>,
  Tuple<[Primitive<string>], true, Primitive<string>>
> = 1;
intersectingArray1;

const intersectingArray2: A.Equals<
  Intersect<
    Tuple<[Primitive<string>], true, Primitive<string>>,
    Arr<Primitive<string>>
  >,
  Tuple<[Primitive<string>], true, Primitive<string>>
> = 1;
intersectingArray2;

const intersectingArray3: A.Equals<
  Intersect<
    Tuple<[Primitive<string>], true, Const<"foo">>,
    Arr<Primitive<string>>
  >,
  Tuple<[Primitive<string>], true, Const<"foo">>
> = 1;
intersectingArray3;

const intersectingArray4: A.Equals<
  Intersect<
    Tuple<[Primitive<string>], true, Enum<"foo" | 42>>,
    Arr<Primitive<string>>
  >,
  Tuple<[Primitive<string>], true, Enum<"foo">>
> = 1;
intersectingArray4;

const intersectingArray5: A.Equals<
  Intersect<
    Tuple<[Primitive<string>], true, Primitive<number>>,
    Arr<Primitive<string>>
  >,
  Tuple<[Primitive<string>], false, Never>
> = 1;
intersectingArray5;

const nonIntersectingArray: A.Equals<
  Intersect<
    Tuple<[Primitive<string>, Primitive<boolean>], true, Primitive<string>>,
    Arr<Primitive<string>>
  >,
  Never
> = 1;
nonIntersectingArray;

// --- TUPLE ---

const intersectingTuple1: A.Equals<
  Intersect<Tuple<[Primitive<string>]>, Tuple<[Primitive<string>]>>,
  Tuple<[Primitive<string>], true, Any>
> = 1;
intersectingTuple1;

const intersectingTuple2: A.Equals<
  Intersect<
    Tuple<[Primitive<string>]>,
    Tuple<[Primitive<string>], true, Primitive<string>>
  >,
  Tuple<[Primitive<string>], true, Primitive<string>>
> = 1;
intersectingTuple2;

const intersectingTuple3: A.Equals<
  Intersect<
    Tuple<[Primitive<string>]>,
    Tuple<[Primitive<string>], true, Const<"foo">>
  >,
  Tuple<[Primitive<string>], true, Const<"foo">>
> = 1;
intersectingTuple3;

const intersectingTuple4: A.Equals<
  Intersect<
    Tuple<[Primitive<string>], true, Primitive<string>>,
    Tuple<[Primitive<string>], true, Enum<"foo" | 42>>
  >,
  Tuple<[Primitive<string>], true, Enum<"foo">>
> = 1;
intersectingTuple4;

const intersectingTuple5: A.Equals<
  Intersect<
    Tuple<[Primitive<string>], true, Primitive<string>>,
    Tuple<[Primitive<string>], true, Primitive<number>>
  >,
  Tuple<[Primitive<string>], false, Never>
> = 1;
intersectingTuple5;

const intersectingTuple6: A.Equals<
  Intersect<
    Tuple<[Primitive<string>]>,
    Tuple<[Primitive<string>, Primitive<boolean>], true, Primitive<string>>
  >,
  Tuple<[Primitive<string>, Primitive<boolean>], true, Primitive<string>>
> = 1;
intersectingTuple6;

const intersectingTuple7: A.Equals<
  Intersect<
    Tuple<[Primitive<string>], false>,
    Tuple<[Primitive<string>], true>
  >,
  Tuple<[Primitive<string>], false, Any>
> = 1;
intersectingTuple7;

const nonIntersectingTuple1: A.Equals<
  Intersect<
    Tuple<[Primitive<string>], false>,
    Tuple<[Primitive<string>, Primitive<boolean>], true>
  >,
  Never
> = 1;
nonIntersectingTuple1;

const nonIntersectingTuple2: A.Equals<
  Intersect<
    Tuple<[Primitive<string>, Primitive<string>]>,
    Tuple<[Primitive<string>, Primitive<boolean>], true>
  >,
  Never
> = 1;
nonIntersectingTuple2;

// --- OBJECT ---

const objectsNeverIntersect: A.Equals<
  Intersect<
    Tuple<[Primitive<string>]>,
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
  >,
  Never
> = 1;
objectsNeverIntersect;

// --- UNION ---

const intersectingUnion1: A.Equals<
  Intersect<
    Tuple<[Primitive<string>]>,
    Union<Tuple<[Primitive<string>]> | Tuple<[Primitive<number>]>>
  >,
  Union<Never | Tuple<[Primitive<string>], true, Any>>
> = 1;
intersectingUnion1;

const intersectingUnion2: A.Equals<
  Intersect<
    Tuple<[Primitive<string>]>,
    Union<Const<["foo"]> | Tuple<[Primitive<number>]>>
  >,
  Union<Never | Const<["foo"]>>
> = 1;
intersectingUnion2;

const nonIntersectingUnion: A.Equals<
  Intersect<
    Tuple<[Primitive<string>]>,
    Union<Arr<Primitive<number>> | Tuple<[Primitive<boolean>]>>
  >,
  Union<Never>
> = 1;
nonIntersectingUnion;

// --- INTERSECTION ---

const cannotIntersectIntersection: A.Equals<
  Intersect<
    Tuple<[Primitive<string>]>,
    Intersection<Primitive<string>, Primitive<string>>
  >,
  Error<"Cannot intersect intersection">
> = 1;
cannotIntersectIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  Intersect<
    Tuple<[Primitive<string>], true, Primitive<string>>,
    Exclusion<Tuple<[Primitive<string>]>, Const<[]>>
  >,
  Exclusion<Tuple<[Primitive<string>], true, Primitive<string>>, Const<[]>>
> = 1;
intersectingExclusion;

// --- ERROR ---

const error: A.Equals<
  Intersect<Tuple<[Primitive<string>]>, Error<"Any">>,
  Error<"Any">
> = 1;
error;
