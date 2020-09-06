import {
  Const,
  Enum,
  Litteral,
  Arr,
  Tuple,
  Object,
  Union,
  Intersection,
  Error,
} from "meta-types";
import { IntersectUnion } from "meta-types/intersection/union";

import { mNever, mConst, mUnion, mEnum, mLitteral, mError } from "./helpers";

// --- CONSTS ---

type Test1a = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Const<"foo">
>;
const test1a: Test1a = mUnion(mConst("foo"));
test1a;

type Test1b = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Const<422>
>;
const test1b: Test1b = mUnion(mConst(422));
test1b;

type Test1c = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Const<true>
>;
const test1c: Test1c = mUnion(mNever());
test1c;

// --- ENUM ---

type Test2a = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Enum<["foo", 42]>
>;
const test2a: Test2a = mUnion(mConst("foo"));
test2a;
const test2b: Test2a = mUnion(mEnum([42]));
test2b;

type Test2c = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Enum<["bar", true]>
>;
const test2c: Test2c = mUnion(mNever());
test2c;

// --- LITTERALS ---

type Test4a = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Litteral<string>
>;
const test4a: Test4a = mUnion(mConst("foo"));
test4a;
// @ts-expect-error
const test4b: Test4a = mUnion(mConst(42));
test4b;

type Test4c = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Litteral<number>
>;
const test4c: Test4c = mUnion(mLitteral(42));
test4c;
// @ts-expect-error
const test4d: Test4c = mUnion(mLitteral("foo"));
test4d;

type Test4e = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Litteral<boolean>
>;
const test4e: Test4e = mUnion(mNever());
test4e;

// --- ARRAY ---

type Test5a = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Arr<Litteral<string>>
>;
const test5a: Test5a = mUnion(mNever());
test5a;

// --- TUPLE ---

type Test6a = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Tuple<[Litteral<string>], true, Litteral<string>>
>;
const test6a: Test6a = mUnion(mNever());
test6a;

// --- OBJECT ---

type Test7a = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Object<{ foo: Litteral<string> }, ["foo"], true, Litteral<string>>
>;
const test7a: Test7a = mUnion(mNever());
test7a;

// --- UNION ---

type Test3a = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Union<Litteral<string>>
>;
const test3a: Test3a = mUnion(mUnion(mConst("foo" as "foo")));
test3a;
// @ts-expect-error
const test3a2: Test3a = mUnion(mUnion(mConst(42 as 42)));
test3a2;

type Test3b = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Union<Const<"foo"> | Litteral<boolean>>
>;
const test3b: Test3b = mUnion(mUnion(mConst("foo")));
test3b;

type Test3c = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Union<Const<"bar"> | Litteral<number>>
>;
const test3c: Test3c = mUnion(mUnion(mLitteral(42)));
test3c;

type Test3d = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Union<Arr<Litteral<boolean>>>
>;
const test3d: Test3d = mUnion(mUnion(mNever()));
test3d;

// --- INTERSECTION ---

type Test8a = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Intersection<Litteral<string>, Litteral<number>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Test9a = IntersectUnion<
  Union<Const<"foo"> | Litteral<number>>,
  Error<"Any">
>;
const test9a: Test9a = mError("Any");
test9a;
