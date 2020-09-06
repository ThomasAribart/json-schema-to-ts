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
import { IntersectArr } from "meta-types/intersection/array";

import {
  mNever,
  mConst,
  mEnum,
  mLitteral,
  mArr,
  mTuple,
  mUnion,
  mError,
} from "./helpers";

// --- CONSTS ---

type Test1a = IntersectArr<Arr<Litteral<string>>, Const<["foo", "bar"]>>;
const test1a: Test1a = mConst(["foo", "bar"]);
test1a;

type Test1b = IntersectArr<Arr<Litteral<string>>, Const<["foo", 42]>>;
const test1b: Test1b = mNever();
test1b;

// --- ENUM ---

type Test2a = IntersectArr<Arr<Litteral<string>>, Enum<[["foo"], ["bar"], 42]>>;
const test2a: Test2a = mEnum([["foo"], ["bar"]]);
test2a;

type Test2b = IntersectArr<Arr<Litteral<number>>, Enum<[["bar", "baz"], [42]]>>;
const test2b: Test2b = mEnum([[42]]);
test2b;

type Test2c = IntersectArr<Arr<Litteral<number>>, Enum<[["bar", "baz"]]>>;
const test2c: Test2c = mNever();
test2c;

// --- LITTERALS ---

type Test3a = IntersectArr<Arr<Litteral<string>>, Litteral<string>>;
const test3a: Test3a = mNever();
test3a;

// --- ARRAY ---

type Test4a = IntersectArr<Arr<Litteral<string>>, Arr<Litteral<string>>>;
const test4a: Test4a = mArr(mLitteral("string"));
test4a;

type Test4b = IntersectArr<Arr<Litteral<string>>, Arr<Litteral<number>>>;
const test4b: Test4b = mNever();
test4b;

// --- TUPLE ---

type Test5a = IntersectArr<Arr<Litteral<string>>, Tuple<[Litteral<string>]>>;
const test5a: Test5a = mTuple([mLitteral("string")], true, mLitteral("string"));
test5a;

type Test5b = IntersectArr<
  Arr<Litteral<string>>,
  Tuple<[Litteral<string>], true, Litteral<string>>
>;
const test5b: Test5b = mTuple([mLitteral("string")], true, mLitteral("string"));
test5b;

type Test5c = IntersectArr<
  Arr<Litteral<string>>,
  Tuple<[Litteral<string>], true, Const<"foo">>
>;
const test5c: Test5c = mTuple([mLitteral("string")], true, mConst("foo"));
test5c;

type Test5d = IntersectArr<
  Arr<Litteral<string>>,
  Tuple<[Litteral<string>], true, Enum<["foo", 42]>>
>;
const test5d: Test5d = mTuple([mLitteral("string")], true, mEnum(["foo"]));
test5d;

type Test5e = IntersectArr<
  Arr<Litteral<string>>,
  Tuple<[Litteral<string>], true, Litteral<number>>
>;
const test5e: Test5e = mTuple([mLitteral("string")], false, mNever());
test5e;

type Test5f = IntersectArr<
  Arr<Litteral<string>>,
  Tuple<[Litteral<string>, Litteral<boolean>], true, Litteral<string>>
>;
const test5f: Test5f = mNever();
test5f;

// --- OBJECT ---

type Test6a = IntersectArr<
  Arr<Litteral<string>>,
  Object<{ foo: Litteral<string> }, "foo", true, Litteral<string>>
>;
const test6a: Test6a = mNever();
test6a;

// --- UNION ---

type Test7a = IntersectArr<
  Arr<Litteral<string>>,
  Union<Arr<Litteral<string>> | Arr<Litteral<number>>>
>;
const test7a: Test7a = mUnion(mArr(mLitteral("string")));
test7a;
// @ts-expect-error
const test7a2: Test7a = mUnion(mArr(mLitteral(42)));
test7a2;

type Test7b = IntersectArr<
  Arr<Litteral<string>>,
  Union<Const<["foo"]> | Arr<Litteral<number>>>
>;
const test7b: Test7b = mUnion(mConst(["foo"]));
test7b;
// @ts-expect-error
const test7b2: Test7b = mUnion(mConst([42]));
test7b2;

type Test7c = IntersectArr<
  Arr<Litteral<string>>,
  Union<Arr<Litteral<number>> | Tuple<[Litteral<string>]>>
>;
const test7c: Test7c = mUnion(mNever());
test7c;

// --- INTERSECTION ---

type Test8a = IntersectArr<
  Arr<Litteral<string>>,
  Intersection<Litteral<string>, Litteral<string>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Err = Error<"Any">;
type Test9a = IntersectArr<Arr<Litteral<string>>, Err>;
const test9a: Test9a = mError("Any");
test9a;
