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
import { IntersectEnum } from "meta-types/intersection/enum";

import { mNever, mConst, mEnum, mError, mUnion } from "./helpers";

// --- CONSTS ---

type Test1a = IntersectEnum<Enum<["foo", "bar", 42]>, Const<"foo">>;
const test1a: Test1a = mConst("foo");
test1a;

type Test1b = IntersectEnum<Enum<["foo", "bar", 42]>, Const<true>>;
const test1b: Test1b = mNever();
test1b;

// --- ENUM ---

type Test2a = IntersectEnum<Enum<["foo", "bar", 42]>, Enum<["foo", 42]>>;
const test2a: Test2a = mEnum(["foo", 42]);
test2a;

type Test2b = IntersectEnum<Enum<["foo", "bar", 42]>, Enum<[43, true]>>;
const test2b: Test2b = mNever();
test2b;

// --- LITTERALS ---

type Test4a = IntersectEnum<Enum<["foo", "bar", 42]>, Litteral<string>>;
const test4a: Test4a = mEnum(["foo", "bar"]);
test4a;

type Test4b = IntersectEnum<Enum<["foo", "bar", 42]>, Litteral<boolean>>;
const test4b: Test4b = mNever();
test4b;

// --- ARRAY ---

type Test5a = IntersectEnum<Enum<["foo", "bar", 42]>, Arr<Litteral<string>>>;
const test5a: Test5a = mNever();
test5a;

// --- TUPLE ---

type Test6a = IntersectEnum<
  Enum<["foo", "bar", 42]>,
  Tuple<[Litteral<string>], true, Litteral<string>>
>;
const test6a: Test6a = mNever();
test6a;

// --- OBJECT ---

type Test7a = IntersectEnum<
  Enum<["foo", "bar", 42]>,
  Object<{ foo: Litteral<string> }, "foo", true, Litteral<string>>
>;
const test7a: Test7a = mNever();
test7a;

// --- UNION ---

type Test3a = IntersectEnum<Enum<["foo", "bar", 42]>, Union<Litteral<string>>>;
const test3a: Test3a = mUnion(mEnum(["foo", "bar"]));
test3a;

type Test3b = IntersectEnum<
  Enum<["foo", "bar", 42]>,
  Union<Const<"foo"> | Litteral<boolean>>
>;
const test3b: Test3b = mUnion(mConst("foo"));
test3b;

type Test3c = IntersectEnum<
  Enum<["foo", "bar", 42]>,
  Union<Object | Litteral<boolean>>
>;
const test3c: Test3c = mUnion(mNever());
test3c;

// --- INTERSECTION ---

type Test8a = IntersectEnum<
  Enum<["foo", "bar", 42]>,
  Intersection<Litteral<string>, Litteral<number>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Test9a = IntersectEnum<Enum<["foo", "bar", 42]>, Error<"Any">>;
const test9a: Test9a = mError("Any");
test9a;
