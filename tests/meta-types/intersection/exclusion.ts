import {
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
import { IntersectExclusion } from "meta-types/intersection/exclusion";

import {
  mConst,
  mUnion,
  mEnum,
  mPrimitive,
  mError,
  mExclusion,
  mArr,
  mTuple,
  mObject,
} from "./helpers";

// --- CONSTS ---

type Test1 = IntersectExclusion<
  Exclusion<Primitive<string>, Const<"bar">>,
  Const<"foo">
>;
const test1: Test1 = mExclusion(mConst("foo"), mConst("bar"));
test1;

// --- ENUM ---

type Test2 = IntersectExclusion<
  Exclusion<Primitive<string>, Enum<"foo" | "bar">>,
  Enum<"foo" | "bar" | "baz" | 42>
>;
const test2a: Test2 = mExclusion(mEnum("foo"), mEnum("foo"));
test2a;
const test2b: Test2 = mExclusion(mEnum("bar"), mEnum("bar"));
test2b;
const test2c: Test2 = mExclusion(mEnum("baz"), mEnum("foo"));
test2c;
// @ts-expect-error
const test2d: Test2 = mExclusion(mEnum(42), mEnum("foo"));
test2d;

// --- PRIMITIVES ---

type Test3a = IntersectExclusion<
  Exclusion<Enum<"foo" | 42 | true>, Primitive<number>>,
  Primitive<string>
>;
const test3a: Test3a = mExclusion(mEnum("foo"), mPrimitive(42));
test3a;
// @ts-expect-error
const test3a2: Test3a = mExclusion(mEnum(42), mPrimitive(42));
test3a2;
// @ts-expect-error
const test3a3: Test3a = mExclusion(mEnum(true), mPrimitive(42));
test3a3;

type Test3b = IntersectExclusion<
  Exclusion<Primitive<number>, Const<42>>,
  Primitive<number>
>;
const test3b: Test3b = mExclusion(mPrimitive(42), mConst(42));
test3b;

// --- ARRAY ---

type Test4 = IntersectExclusion<
  Exclusion<Arr<Primitive<string>>, Const<[]>>,
  Arr<Const<"foo">>
>;
const test4: Test4 = mExclusion(mArr(mConst("foo")), mConst([]));
test4;

// --- TUPLE ---

type Test5 = IntersectExclusion<
  Exclusion<Tuple<[Primitive<string>]>, Const<[]>>,
  Tuple<[Primitive<string>], true, Primitive<string>>
>;
const test5: Test5 = mExclusion(
  mTuple([mPrimitive("str")], true, mPrimitive("str")),
  mConst([])
);
test5;

// --- OBJECT ---

type Test6 = IntersectExclusion<
  Exclusion<
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>,
    Const<{ foo: "bar" }>
  >,
  Object<{ baz: Primitive<string> }, "baz", true>
>;
const test6a: Test6 = mExclusion(
  mObject(
    { foo: mPrimitive("str"), baz: mPrimitive("str") },
    "foo",
    true,
    mPrimitive("str")
  ),
  mConst({ foo: "bar" })
);
test6a;
const test6b: Test6 = mExclusion(
  mObject(
    { foo: mPrimitive("str"), baz: mPrimitive("str") },
    "baz",
    true,
    mPrimitive("str")
  ),
  mConst({ foo: "bar" })
);
test6b;

// --- UNION ---

type Test7a = IntersectExclusion<
  Exclusion<Enum<42 | true | "foo" | "bar">, Primitive<number>>,
  Union<Const<"foo"> | Primitive<boolean>>
>;
const test7a: Test7a = mUnion(
  mExclusion(mConst("foo" as "foo"), mPrimitive(42))
);
test7a;
const test7a2: Test7a = mUnion(mExclusion(mEnum(true as true), mPrimitive(42)));
test7a2;
// @ts-expect-error
const test7a3: Test7a = mUnion(mExclusion(mEnum(42 as 42), mPrimitive(42)));
test7a3;
// @ts-expect-error
const test7a4: Test7a = mUnion(
  mExclusion(mEnum("bar" as "bar"), mPrimitive(42))
);
test7a4;

// --- INTERSECTION ---

type Test8 = IntersectExclusion<
  Exclusion<Primitive<string>, Const<"foo">>,
  Intersection<Primitive<string>, Enum<"foo" | "bar">>
>;
const test8: Test8 = mError("Cannot intersect intersection");
test8;

// --- ERROR ---

type Test9 = IntersectExclusion<
  Exclusion<Primitive<string>, Const<"foo">>,
  Error<"Any">
>;
const test9: Test9 = mError("Any");
test9;
