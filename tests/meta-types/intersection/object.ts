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
  Intersect<Object<{ str: Primitive<string> }, "str">, Any>,
  Object<{ str: Primitive<string> }, "str">
> = 1;
anyAlwaysIntersect;

// --- NEVER ---

const neverNeverIntersect: A.Equals<
  Intersect<Object<{ str: Primitive<string> }, "str">, Never>,
  Never
> = 1;
neverNeverIntersect;

// --- CONSTS ---

const intersectingConst1: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Const<{ str: "str"; bar: "str" }>
  >,
  Const<{ str: "str"; bar: "str" }>
> = 1;
intersectingConst1;

const intersectingConst2: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Const<{ num: 42; str: "string" }>
  >,
  Const<{ num: 42; str: "string" }>
> = 1;
intersectingConst2;

const nonIntersectingConst1: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str", false>,
    Const<{ str: "str"; bar: "str" }>
  >,
  Never
> = 1;
nonIntersectingConst1;

const nonIntersectingConst2: A.Equals<
  Intersect<Object<{ str: Primitive<string> }, "str">, Const<{ num: 42 }>>,
  Never
> = 1;
nonIntersectingConst2;

// --- ENUM ---

const intersectingEnum: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Enum<{ str: "string" } | 42>
  >,
  Enum<{ str: "string" }>
> = 1;
intersectingEnum;

const nonIntersectingEnum1: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str", false>,
    Enum<"bar" | { str: "string"; bar: 42 }>
  >,
  Enum<never>
> = 1;
nonIntersectingEnum1;

const nonIntersectingEnum2: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Enum<"bar" | true | { num: 42 }>
  >,
  Enum<never>
> = 1;
nonIntersectingEnum2;

// --- PRIMITIVES ---

const primitivesNeverIntersect1: A.Equals<
  Intersect<Object<{ str: Primitive<string> }, "str">, Primitive<string>>,
  Never
> = 1;
primitivesNeverIntersect1;

const primitivesNeverIntersect2: A.Equals<
  Intersect<Object<{ str: Primitive<string> }, "str">, Primitive<boolean>>,
  Never
> = 1;
primitivesNeverIntersect2;

// --- ARRAY ---

const arraysNeverIntersect: A.Equals<
  Intersect<Object<{ str: Primitive<string> }, "str">, Arr<Primitive<string>>>,
  Never
> = 1;
arraysNeverIntersect;

// --- TUPLE ---

const tuplesNeverIntersect: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Tuple<[Primitive<string>], true, Primitive<string>>
  >,
  Never
> = 1;
tuplesNeverIntersect;

// --- OBJECT ---

const intersectingObject1: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
  >,
  Object<
    { str: Primitive<string>; foo: Primitive<string> },
    "str" | "foo",
    true,
    Primitive<string>
  >
> = 1;
intersectingObject1;

const intersectingObject2: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Object<{ str: Primitive<string> }, "str", false>
  >,
  Object<{ str: Primitive<string> }, "str", false, Any>
> = 1;
intersectingObject2;

const intersectingObject3: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str", true>,
    Object<{ str: Primitive<string> }, "str", false>
  >,
  Object<{ str: Primitive<string> }, "str", false, Any>
> = 1;
intersectingObject3;

// Rejects "str" property because B is closed
const nonIntersectingObject1: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Object<{ otherStr: Primitive<string> }, "otherStr", false>
  >,
  Never
> = 1;
nonIntersectingObject1;

// Rejects "str" property because it should be bool AND str
const nonIntersectingObject2: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Object<{ bool: Primitive<boolean> }, "bool", true, Primitive<boolean>>
  >,
  Never
> = 1;
nonIntersectingObject2;

// --- UNION ---

const intersectingUnion: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Union<Primitive<string> | Const<{ str: "str" }>>
  >,
  Union<Never | Const<{ str: "str" }>>
> = 1;
intersectingUnion;

// Doesn't match string, neither object because it is closed
const nonIntersectingUnion1: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Union<Const<"foo"> | Object<{ foo: Primitive<string> }, "foo", false>>
  >,
  Union<Never>
> = 1;
nonIntersectingUnion1;

const nonIntersectingUnion2: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Union<Arr<Primitive<boolean>>>
  >,
  Union<Never>
> = 1;
nonIntersectingUnion2;

// --- INTERSECTION ---

const cannotIntersectIntersection: A.Equals<
  Intersect<
    Object<{ str: Primitive<string> }, "str">,
    Intersection<Primitive<string>, Primitive<number>>
  >,
  Error<"Cannot intersect intersection">
> = 1;
cannotIntersectIntersection;

// --- EXCLUSION ---

const intersectingExclusion: A.Equals<
  Intersect<
    Object<{ baz: Primitive<string> }, "baz", true>,
    Exclusion<
      Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>,
      Const<{ foo: "bar" }>
    >
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
intersectingExclusion;

// --- ERROR ---

const error: A.Equals<
  Intersect<Object<{ str: Primitive<string> }, "str">, Error<"Any">>,
  Error<"Any">
> = 1;
error;
