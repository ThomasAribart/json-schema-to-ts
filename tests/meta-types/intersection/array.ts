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
import { IntersectArr } from "meta-types/intersection/array";

import {
  mNever,
  mConst,
  mEnum,
  mPrimitive,
  mArr,
  mTuple,
  mUnion,
  mError,
  mExclusion,
} from "./helpers";

// --- CONSTS ---

type Test1a = IntersectArr<Arr<Primitive<string>>, Const<["foo", "bar"]>>;
const test1a: Test1a = mConst(["foo", "bar"]);
test1a;

type Test1b = IntersectArr<Arr<Primitive<string>>, Const<["foo", 42]>>;
const test1b: Test1b = mNever();
test1b;

// --- ENUM ---

type Test2a = IntersectArr<
  Arr<Primitive<string>>,
  Enum<["foo"] | ["bar"] | 42>
>;
let test2a: Test2a = mEnum(["foo"]);
test2a = mEnum(["bar"]);
test2a;

type Test2b = IntersectArr<Arr<Primitive<number>>, Enum<["bar", "baz"] | [42]>>;
let test2b: Test2b = mEnum([42]);
// @ts-expect-error
test2b = mEnum(["bar", "baz"]);
test2b;

type Test2c = IntersectArr<Arr<Primitive<number>>, Enum<["bar", "baz"]>>;
// @ts-expect-error
const test2c: Test2c = mEnum(["bar", "baz"]);
test2c;

// --- PRIMITIVES ---

type Test3a = IntersectArr<Arr<Primitive<string>>, Primitive<string>>;
const test3a: Test3a = mNever();
test3a;

// --- ARRAY ---

type Test4a = IntersectArr<Arr<Primitive<string>>, Arr<Primitive<string>>>;
const test4a: Test4a = mArr(mPrimitive("string"));
test4a;

type Test4b = IntersectArr<Arr<Primitive<string>>, Arr<Primitive<number>>>;
const test4b: Test4b = mNever();
test4b;

// --- TUPLE ---

type Test5a = IntersectArr<Arr<Primitive<string>>, Tuple<[Primitive<string>]>>;
const test5a: Test5a = mTuple(
  [mPrimitive("string")],
  true,
  mPrimitive("string")
);
test5a;

type Test5b = IntersectArr<
  Arr<Primitive<string>>,
  Tuple<[Primitive<string>], true, Primitive<string>>
>;
const test5b: Test5b = mTuple(
  [mPrimitive("string")],
  true,
  mPrimitive("string")
);
test5b;

type Test5c = IntersectArr<
  Arr<Primitive<string>>,
  Tuple<[Primitive<string>], true, Const<"foo">>
>;
const test5c: Test5c = mTuple([mPrimitive("string")], true, mConst("foo"));
test5c;

type Test5d = IntersectArr<
  Arr<Primitive<string>>,
  Tuple<[Primitive<string>], true, Enum<"foo" | 42>>
>;
const test5d: Test5d = mTuple([mPrimitive("string")], true, mEnum("foo"));
test5d;

type Test5e = IntersectArr<
  Arr<Primitive<string>>,
  Tuple<[Primitive<string>], true, Primitive<number>>
>;
const test5e: Test5e = mTuple([mPrimitive("string")], false, mNever());
test5e;

type Test5f = IntersectArr<
  Arr<Primitive<string>>,
  Tuple<[Primitive<string>, Primitive<boolean>], true, Primitive<string>>
>;
const test5f: Test5f = mNever();
test5f;

// --- OBJECT ---

type Test6a = IntersectArr<
  Arr<Primitive<string>>,
  Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
>;
const test6a: Test6a = mNever();
test6a;

// --- UNION ---

type Test7a = IntersectArr<
  Arr<Primitive<string>>,
  Union<Arr<Primitive<string>> | Arr<Primitive<number>>>
>;
const test7a: Test7a = mUnion(mArr(mPrimitive("string")));
test7a;
// @ts-expect-error
const test7a2: Test7a = mUnion(mArr(mPrimitive(42)));
test7a2;

type Test7b = IntersectArr<
  Arr<Primitive<string>>,
  Union<Const<["foo"]> | Arr<Primitive<number>>>
>;
const test7b: Test7b = mUnion(mConst(["foo"]));
test7b;
// @ts-expect-error
const test7b2: Test7b = mUnion(mConst([42]));
test7b2;

type Test7c = IntersectArr<
  Arr<Primitive<string>>,
  Union<Arr<Primitive<number>> | Tuple<[Primitive<string>]>>
>;
const test7c: Test7c = mUnion(mNever());
test7c;

// --- INTERSECTION ---

type Test8a = IntersectArr<
  Arr<Primitive<string>>,
  Intersection<Primitive<string>, Primitive<string>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Err = Error<"Any">;
type Test9a = IntersectArr<Arr<Primitive<string>>, Err>;
const test9a: Test9a = mError("Any");
test9a;

// --- EXCLUSION ---

type Test10 = IntersectArr<
  Arr<Const<"foo">>,
  Exclusion<Arr<Primitive<string>>, Const<[]>>
>;
const test10: Test10 = mExclusion(mArr(mConst("foo")), mConst([]));
test10;
