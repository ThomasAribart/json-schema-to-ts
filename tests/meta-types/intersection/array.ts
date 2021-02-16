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

const anyAlwaysIntersects: A.Equals<
  Intersect<Arr<Primitive<string>>, Any>,
  Arr<Primitive<string>>
> = 1;
anyAlwaysIntersects;

// --- NEVER ---

const neverNeverIntersects: A.Equals<
  Intersect<Arr<Primitive<string>>, Never>,
  Never
> = 1;
neverNeverIntersects;

// --- CONSTS ---

const intersectingConst: A.Equals<
  Intersect<Arr<Primitive<string>>, Const<["foo", "bar"]>>,
  Const<["foo", "bar"]>
> = 1;
intersectingConst;

const test1b: A.Equals<
  Intersect<Arr<Primitive<string>>, Const<["foo", 42]>>,
  Never
> = 1;
test1b;

// --- ENUM ---

let intersectingEnum1: A.Equals<
  Intersect<Arr<Primitive<string>>, Enum<["foo"] | ["bar"] | 42>>,
  Enum<["foo"] | ["bar"]>
> = 1;
intersectingEnum1;

let intersectingEnum2: A.Equals<
  Intersect<Arr<Primitive<number>>, Enum<["bar", "baz"] | [42]>>,
  Enum<[42]>
> = 1;
intersectingEnum2;

const nonIntersectingEnum: A.Equals<
  Intersect<Arr<Primitive<number>>, Enum<["bar", "baz"]>>,
  Enum<never>
> = 1;
nonIntersectingEnum;

// --- PRIMITIVES ---

const primitivesNeverIntersect: A.Equals<
  Intersect<Arr<Primitive<string>>, Primitive<string>>,
  Never
> = 1;
primitivesNeverIntersect;

// --- ARRAY ---

const intersectingArray: A.Equals<
  Intersect<Arr<Primitive<string>>, Arr<Primitive<string>>>,
  Arr<Primitive<string>>
> = 1;
intersectingArray;

const nonIntersectingArray: A.Equals<
  Intersect<Arr<Primitive<string>>, Arr<Primitive<number>>>,
  Never
> = 1;
nonIntersectingArray;

// --- TUPLE ---

const intersectingTuple1: A.Equals<
  Intersect<
    Arr<Primitive<string>>,
    Tuple<[Primitive<string>], true, Primitive<string>>
  >,
  Tuple<[Primitive<string>], true, Primitive<string>>
> = 1;
intersectingTuple1;

const intersectingTuple2: A.Equals<
  Intersect<
    Arr<Primitive<string>>,
    Tuple<[Primitive<string>], true, Const<"foo">>
  >,
  Tuple<[Primitive<string>], true, Const<"foo">>
> = 1;
intersectingTuple2;

const tupleOpenPropsBecomeString: A.Equals<
  Intersect<Arr<Primitive<string>>, Tuple<[Primitive<string>]>>,
  Tuple<[Primitive<string>], true, Primitive<string>>
> = 1;
tupleOpenPropsBecomeString;

const tupleOpenPropsBecomeFoo: A.Equals<
  Intersect<
    Arr<Primitive<string>>,
    Tuple<[Primitive<string>], true, Enum<"foo" | 42>>
  >,
  Tuple<[Primitive<string>], true, Enum<"foo">>
> = 1;
tupleOpenPropsBecomeFoo;

const tupleBecomeClose: A.Equals<
  Intersect<
    Arr<Primitive<string>>,
    Tuple<[Primitive<string>], true, Primitive<number>>
  >,
  Tuple<[Primitive<string>], false, Never>
> = 1;
tupleBecomeClose;

const nonIntersectingTuple: A.Equals<
  Intersect<
    Arr<Primitive<string>>,
    Tuple<[Primitive<string>, Primitive<boolean>], true, Primitive<string>>
  >,
  Never
> = 1;
nonIntersectingTuple;

// --- OBJECT ---

const objectsNeverIntersect: A.Equals<
  Intersect<
    Arr<Primitive<string>>,
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
  >,
  Never
> = 1;
objectsNeverIntersect;

// --- UNION ---

const numberIsExcluded1: A.Equals<
  Intersect<
    Arr<Primitive<string>>,
    Union<Arr<Primitive<string>> | Arr<Primitive<number>>>
  >,
  Union<Arr<Primitive<string>> | Never>
> = 1;
numberIsExcluded1;

const numberIsExcluded2: A.Equals<
  Intersect<
    Arr<Primitive<string>>,
    Union<Const<["foo"]> | Arr<Primitive<number>>>
  >,
  Union<Const<["foo"]> | Never>
> = 1;
numberIsExcluded2;

const tupleIsKept: A.Equals<
  Intersect<
    Arr<Primitive<string>>,
    Union<Arr<Primitive<number>> | Tuple<[Primitive<string>]>>
  >,
  Union<Never | Tuple<[Primitive<string>], true, Primitive<string>>>
> = 1;
tupleIsKept;

// --- INTERSECTION ---

const cannonIntersectIntersection: A.Equals<
  Intersect<
    Arr<Primitive<string>>,
    Intersection<Primitive<string>, Primitive<string>>
  >,
  Error<"Cannot intersect intersection">
> = 1;
cannonIntersectIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  Intersect<Arr<Const<"foo">>, Exclusion<Arr<Primitive<string>>, Const<[]>>>,
  Exclusion<Arr<Const<"foo">>, Const<[]>>
> = 1;
intersectingExclusion;

// --- ERROR ---

const error: A.Equals<
  Intersect<Arr<Primitive<string>>, Error<"Any">>,
  Error<"Any">
> = 1;
error;
