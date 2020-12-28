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
import { IntersectConst } from "meta-types/intersection/const";

import { mNever, mConst, mError, mUnion, mExclusion } from "./helpers";

// --- CONSTS ---

type Test1a = IntersectConst<Const<"foo">, Const<"foo">>;
const test1a: Test1a = mConst("foo");
test1a;

type Test1b = IntersectConst<Const<"foo">, Const<"bar">>;
const test1b: Test1b = mNever();
test1b;

// --- ENUM ---

type Test2a = IntersectConst<Const<"foo">, Enum<"foo" | "bar" | "baz">>;
const test2a: Test2a = mConst("foo");
test2a;

type Test2b = IntersectConst<Const<"foo">, Enum<["bar", "baz"]>>;
const test2b: Test2b = mNever();
test2b;

// --- PRIMITIVES ---

type Test3a = IntersectConst<Const<"foo">, Primitive<string>>;
const test3a: Test3a = mConst("foo");
test3a;

type Test3b = IntersectConst<Const<"foo">, Primitive<boolean>>;
const test3b: Test3b = mNever();
test3b;

// --- ARRAY ---

type Test4a = IntersectConst<Const<["foo", "bar"]>, Arr<Primitive<string>>>;
const test4a: Test4a = mConst(["foo", "bar"]);
test4a;

type Test4b = IntersectConst<Const<"foo">, Arr<Primitive<string>>>;
const test4b: Test4b = mNever();
test4b;

// --- TUPLE ---

type Test5a = IntersectConst<
  Const<["foo", "bar"]>,
  Tuple<[Primitive<string>], true, Primitive<string>>
>;
const test5a: Test5a = mConst(["foo", "bar"]);
test5a;

type Test5b = IntersectConst<
  Const<["foo", 42, "bar"]>,
  Tuple<[Primitive<string>, Primitive<number>], true, Primitive<string>>
>;
const test5b: Test5b = mConst(["foo", 42, "bar"]);
test5b;

type Test5c = IntersectConst<
  Const<["foo", 42]>,
  Tuple<[Primitive<string>], true, Primitive<string>>
>;
const test5c: Test5c = mNever();
test5c;

type Test5d = IntersectConst<
  Const<"foo">,
  Tuple<[Primitive<string>], true, Primitive<string>>
>;
const test5d: Test5d = mNever();
test5d;

// --- OBJECT ---

type Test6a = IntersectConst<
  Const<{ foo: "bar" }>,
  Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
>;
const test6a: Test6a = mConst({ foo: "bar" });
test6a;

type Test6b = IntersectConst<
  Const<"foo">,
  Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
>;
const test6b: Test6b = mNever();
test6b;

// --- UNION ---

type Test7a = IntersectConst<
  Const<"foo">,
  Union<Primitive<string> | Primitive<number>>
>;
const test7a: Test7a = mUnion(mConst("foo"));
test7a;

type Test7b = IntersectConst<
  Const<"foo">,
  Union<Const<"foo"> | Primitive<number>>
>;
const test7b: Test7b = mUnion(mConst("foo"));
test7b;

type Test7c = IntersectConst<
  Const<"foo">,
  Union<Primitive<number> | Arr<Primitive<string>>>
>;
const test7c: Test7c = mUnion(mNever());
test7c;

// --- INTERSECTION ---

type Test8a = IntersectConst<
  Const<"foo">,
  Intersection<Const<"foo">, Primitive<string>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Err = Error<"Any">;
type Test9a = IntersectConst<Const<"foo">, Err>;
const test9a: Test9a = mError("Any");
test9a;

// --- EXCLUSION ---

type Test10 = IntersectConst<
  Const<"foo">,
  Exclusion<Primitive<string>, Const<"bar">>
>;
const test10: Test10 = mExclusion(mConst("foo"), mConst("bar"));
test10;
