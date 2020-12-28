import {
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
import { IntersectPrimitive } from "meta-types/intersection/primitive";

import {
  mNever,
  mConst,
  mEnum,
  mPrimitive,
  mError,
  mUnion,
  mExclusion,
} from "./helpers";

// --- CONSTS ---

type Test1a = IntersectPrimitive<Primitive<string>, Const<"foo">>;
const test1a: Test1a = mConst("foo");
test1a;

type Test1b = IntersectPrimitive<Primitive<string>, Const<42>>;
const test1b: Test1b = mNever();
test1b;

// --- ENUM ---

type Test2a = IntersectPrimitive<Primitive<string>, Enum<"foo" | "bar" | 42>>;
let test2a: Test2a = mEnum("foo");
test2a = mEnum("bar");
// @ts-expect-error
test2a = mEnum(42 as 42);
test2a;

type Test2b = IntersectPrimitive<Primitive<number>, Enum<"bar" | "baz" | 42>>;
const test2b: Test2b = mEnum(42 as 42);
test2b;

type Test2c = IntersectPrimitive<Primitive<number>, Enum<"bar" | "baz">>;
// @ts-expect-error
let test2c: Test2c = mEnum("bar");
// @ts-expect-error
test2c = mEnum("baz");
test2c;

// --- PRIMITIVES ---

type Test3a = IntersectPrimitive<Primitive<string>, Primitive<string>>;
const test3a: Test3a = mPrimitive("string");
test3a;

type Test3b = IntersectPrimitive<Primitive<string>, Primitive<boolean>>;
const test3b: Test3b = mNever();
test3b;

// --- ARRAY ---

type Test4a = IntersectPrimitive<Primitive<string>, Arr<Primitive<string>>>;
const test4a: Test4a = mNever();
test4a;

// --- TUPLE ---

type Test5a = IntersectPrimitive<
  Primitive<string>,
  Tuple<[Primitive<string>], true, Primitive<string>>
>;
const test5a: Test5a = mNever();
test5a;

// --- OBJECT ---

type Test6a = IntersectPrimitive<
  Primitive<string>,
  Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
>;
const test6a: Test6a = mNever();
test6a;

// --- UNION ---

type Test7a = IntersectPrimitive<
  Primitive<string>,
  Union<Primitive<string> | Primitive<number>>
>;
const test7a: Test7a = mUnion(mPrimitive("string"));
test7a;
// @ts-expect-error
const test7a2: Test7a = mUnion(mPrimitive(42));
test7a2;

type Test7b = IntersectPrimitive<
  Primitive<string>,
  Union<Const<"foo"> | Primitive<number>>
>;
const test7b: Test7b = mUnion(mConst("foo"));
test7b;

type Test7c = IntersectPrimitive<
  Primitive<string>,
  Union<Primitive<number> | Arr<Primitive<string>>>
>;
const test7c: Test7c = mUnion(mNever());
test7c;

// --- INTERSECTION ---

type Test8a = IntersectPrimitive<
  Primitive<string>,
  Intersection<Primitive<string>, Primitive<string>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Err = Error<"Any">;
type Test9a = IntersectPrimitive<Primitive<string>, Err>;
const test9a: Test9a = mError("Any");
test9a;

// --- EXCLUSION ---

type Test10a = IntersectPrimitive<
  Primitive<string>,
  Exclusion<Enum<"foo" | 42 | true>, Primitive<number>>
>;
const test10a: Test10a = mExclusion(mEnum("foo"), mPrimitive(42));
test10a;
// @ts-expect-error
const test10a2: Test10a = mExclusion(mEnum(42), mPrimitive(42));
test10a2;
// @ts-expect-error
const test10a3: Test10a = mExclusion(mEnum(true), mPrimitive(42));
test10a3;

type Test10b = IntersectPrimitive<
  Primitive<number>,
  Exclusion<Primitive<number>, Const<42>>
>;
const test10b: Test10b = mExclusion(mPrimitive(42), mConst(42));
test10b;
