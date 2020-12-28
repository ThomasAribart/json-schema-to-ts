import {
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
import { IntersectUnion } from "meta-types/intersection/union";

import {
  mNever,
  mConst,
  mUnion,
  mEnum,
  mPrimitive,
  mError,
  mExclusion,
} from "./helpers";

// --- CONSTS ---

type Test1a = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Const<"foo">
>;
const test1a: Test1a = mUnion(mConst("foo"));
test1a;

type Test1b = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Const<422>
>;
const test1b: Test1b = mUnion(mConst(422));
test1b;

type Test1c = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Const<true>
>;
const test1c: Test1c = mUnion(mNever());
test1c;

// --- ENUM ---

type Test2a = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Enum<"foo" | 42>
>;
const test2a: Test2a = mUnion(mConst("foo"));
test2a;
const test2b: Test2a = mUnion(mEnum(42 as 42));
test2b;

type Test2c = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Enum<["bar", true]>
>;
const test2c: Test2c = mUnion(mNever());
test2c;

// --- PRIMITIVES ---

type Test4a = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Primitive<string>
>;
const test4a: Test4a = mUnion(mConst("foo"));
test4a;
// @ts-expect-error
const test4b: Test4a = mUnion(mConst(42));
test4b;

type Test4c = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Primitive<number>
>;
const test4c: Test4c = mUnion(mPrimitive(42));
test4c;
// @ts-expect-error
const test4d: Test4c = mUnion(mPrimitive("foo"));
test4d;

type Test4e = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Primitive<boolean>
>;
const test4e: Test4e = mUnion(mNever());
test4e;

// --- ARRAY ---

type Test5a = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Arr<Primitive<string>>
>;
const test5a: Test5a = mUnion(mNever());
test5a;

// --- TUPLE ---

type Test6a = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Tuple<[Primitive<string>], true, Primitive<string>>
>;
const test6a: Test6a = mUnion(mNever());
test6a;

// --- OBJECT ---

type Test7a = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
>;
const test7a: Test7a = mUnion(mNever());
test7a;

// --- UNION ---

type Test3a = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Union<Primitive<string>>
>;
const test3a: Test3a = mUnion(mUnion(mConst("foo" as "foo")));
test3a;
// @ts-expect-error
const test3a2: Test3a = mUnion(mUnion(mConst(42 as 42)));
test3a2;

type Test3b = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Union<Const<"foo"> | Primitive<boolean>>
>;
const test3b: Test3b = mUnion(mUnion(mConst("foo")));
test3b;

type Test3c = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Union<Const<"bar"> | Primitive<number>>
>;
const test3c: Test3c = mUnion(mUnion(mPrimitive(42)));
test3c;

type Test3d = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Union<Arr<Primitive<boolean>>>
>;
const test3d: Test3d = mUnion(mUnion(mNever()));
test3d;

// --- INTERSECTION ---

type Test8a = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Intersection<Primitive<string>, Primitive<number>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Test9a = IntersectUnion<
  Union<Const<"foo"> | Primitive<number>>,
  Error<"Any">
>;
const test9a: Test9a = mError("Any");
test9a;

// --- EXCLUSION ---

type Test10a = IntersectUnion<
  Union<Const<"foo"> | Primitive<boolean>>,
  Exclusion<Enum<42 | true | "foo" | "bar">, Primitive<number>>
>;
const test10a: Test10a = mUnion(
  mExclusion(mConst("foo" as "foo"), mPrimitive(42))
);
test10a;
const test10a2: Test10a = mUnion(
  mExclusion(mEnum(true as true), mPrimitive(42))
);
test10a2;
// @ts-expect-error
const test10a3: Test10a = mUnion(mExclusion(mEnum(42 as 42), mPrimitive(42)));
test10a3;
// @ts-expect-error
const test10a4: Test10a = mUnion(
  mExclusion(mEnum("bar" as "bar"), mPrimitive(42))
);
test10a4;
