import {
  Intersection,
  Const,
  Enum,
  Union,
  Litteral,
  Arr,
  Tuple,
  Object,
  Error,
} from "meta-types";
import { IntersectLitteral } from "meta-types/intersection/litteral";

import { mNever, mConst, mEnum, mLitteral, mError, mUnion } from "./helpers";

// --- CONSTS ---

type Test1a = IntersectLitteral<Litteral<string>, Const<"foo">>;
const test1a: Test1a = mConst("foo");
test1a;

type Test1b = IntersectLitteral<Litteral<string>, Const<42>>;
const test1b: Test1b = mNever();
test1b;

// --- ENUM ---

type Test2a = IntersectLitteral<Litteral<string>, Enum<"foo" | "bar" | 42>>;
let test2a: Test2a = mEnum("foo");
test2a = mEnum("bar");
// @ts-expect-error
test2a = mEnum(42 as 42);
test2a;

type Test2b = IntersectLitteral<Litteral<number>, Enum<"bar" | "baz" | 42>>;
const test2b: Test2b = mEnum(42 as 42);
test2b;

type Test2c = IntersectLitteral<Litteral<number>, Enum<"bar" | "baz">>;
// @ts-expect-error
let test2c: Test2c = mEnum("bar");
// @ts-expect-error
test2c = mEnum("baz");
test2c;

// --- LITTERALS ---

type Test3a = IntersectLitteral<Litteral<string>, Litteral<string>>;
const test3a: Test3a = mLitteral("string");
test3a;

type Test3b = IntersectLitteral<Litteral<string>, Litteral<boolean>>;
const test3b: Test3b = mNever();
test3b;

// --- ARRAY ---

type Test4a = IntersectLitteral<Litteral<string>, Arr<Litteral<string>>>;
const test4a: Test4a = mNever();
test4a;

// --- TUPLE ---

type Test5a = IntersectLitteral<
  Litteral<string>,
  Tuple<[Litteral<string>], true, Litteral<string>>
>;
const test5a: Test5a = mNever();
test5a;

// --- OBJECT ---

type Test6a = IntersectLitteral<
  Litteral<string>,
  Object<{ foo: Litteral<string> }, "foo", true, Litteral<string>>
>;
const test6a: Test6a = mNever();
test6a;

// --- UNION ---

type Test7a = IntersectLitteral<
  Litteral<string>,
  Union<Litteral<string> | Litteral<number>>
>;
const test7a: Test7a = mUnion(mLitteral("string"));
test7a;
// @ts-expect-error
const test7a2: Test7a = mUnion(mLitteral(42));
test7a2;

type Test7b = IntersectLitteral<
  Litteral<string>,
  Union<Const<"foo"> | Litteral<number>>
>;
const test7b: Test7b = mUnion(mConst("foo"));
test7b;

type Test7c = IntersectLitteral<
  Litteral<string>,
  Union<Litteral<number> | Arr<Litteral<string>>>
>;
const test7c: Test7c = mUnion(mNever());
test7c;

// --- INTERSECTION ---

type Test8a = IntersectLitteral<
  Litteral<string>,
  Intersection<Litteral<string>, Litteral<string>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Err = Error<"Any">;
type Test9a = IntersectLitteral<Litteral<string>, Err>;
const test9a: Test9a = mError("Any");
test9a;
