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
import { IntersectTuple } from "meta-types/intersection/tuple";

import {
  mNever,
  mConst,
  mEnum,
  mLitteral,
  mTuple,
  mUnion,
  mError,
  mAny,
} from "./helpers";

// --- CONSTS ---

type Test1a = IntersectTuple<
  Tuple<[Litteral<string>, Litteral<number>]>,
  Const<["foo", 42, { any: "value" }]>
>;
const test1a: Test1a = mConst(["foo", 42, { any: "value" }]);
test1a;

type Test1b = IntersectTuple<
  Tuple<[Litteral<string>, Litteral<number>], true, Litteral<boolean>>,
  Const<["foo", 42, true]>
>;
const test1b: Test1b = mConst(["foo", 42, true]);
test1b;

type Test1c = IntersectTuple<
  Tuple<[Litteral<string>, Litteral<number>], true, Litteral<boolean>>,
  Const<["foo", 42, "bar"]>
>;
const test1c: Test1c = mNever();
test1c;

type Test1d = IntersectTuple<
  Tuple<[Litteral<string>, Litteral<number>]>,
  Const<[42, "foo"]>
>;
const test1d: Test1d = mNever();
test1d;

// --- ENUM ---

type Test2a = IntersectTuple<
  Tuple<[Litteral<string>, Litteral<number>], true, Litteral<boolean>>,
  Enum<[["foo"], ["foo", 42], ["foo", 42, true], ["foo", 42, { any: "value" }]]>
>;
const test2a: Test2a = mEnum([
  ["foo", 42],
  ["foo", 42, true],
]);
test2a;

type Test2b = IntersectTuple<
  Tuple<[Litteral<string>, Litteral<number>], false>,
  Enum<[["foo"], ["foo", 42], ["foo", 42, true], ["foo", 42, { any: "value" }]]>
>;
const test2b: Test2b = mEnum([["foo", 42]]);
test2b;

type Test2c = IntersectTuple<
  Tuple<[Litteral<string>, Litteral<number>], true, Litteral<boolean>>,
  Enum<[["bar", "baz"]]>
>;
const test2c: Test2c = mNever();
test2c;

// --- LITTERALS ---

type Test3a = IntersectTuple<Tuple<[Litteral<string>]>, Litteral<string>>;
const test3a: Test3a = mNever();
test3a;

// --- ARRAY ---

type Test4a = IntersectTuple<Tuple<[Litteral<string>]>, Arr<Litteral<string>>>;
const test4a: Test4a = mTuple([mLitteral("string")], true, mLitteral("string"));
test4a;

type Test4b = IntersectTuple<
  Tuple<[Litteral<string>], true, Litteral<string>>,
  Arr<Litteral<string>>
>;
const test4b: Test4b = mTuple([mLitteral("string")], true, mLitteral("string"));
test4b;

type Test4c = IntersectTuple<
  Tuple<[Litteral<string>], true, Const<"foo">>,
  Arr<Litteral<string>>
>;
const test4c: Test4c = mTuple([mLitteral("string")], true, mConst("foo"));
test4c;

type Test4d = IntersectTuple<
  Tuple<[Litteral<string>], true, Enum<["foo", 42]>>,
  Arr<Litteral<string>>
>;
const test4d: Test4d = mTuple([mLitteral("string")], true, mEnum(["foo"]));
test4d;

type Test4e = IntersectTuple<
  Tuple<[Litteral<string>], true, Litteral<number>>,
  Arr<Litteral<string>>
>;
const test4e: Test4e = mTuple([mLitteral("string")], false, mNever());
test4e;

type Test4f = IntersectTuple<
  Tuple<[Litteral<string>, Litteral<boolean>], true, Litteral<string>>,
  Arr<Litteral<string>>
>;
const test4f: Test4f = mNever();
test4f;

// --- TUPLE ---

type Test5a = IntersectTuple<
  Tuple<[Litteral<string>]>,
  Tuple<[Litteral<string>]>
>;
const test5a: Test5a = mTuple([mLitteral("string")], true, mAny());
test5a;

type Test5b = IntersectTuple<
  Tuple<[Litteral<string>]>,
  Tuple<[Litteral<string>], true, Litteral<string>>
>;
const test5b: Test5b = mTuple([mLitteral("string")], true, mLitteral("string"));
test5b;

type Test5c = IntersectTuple<
  Tuple<[Litteral<string>]>,
  Tuple<[Litteral<string>], true, Const<"foo">>
>;
const test5c: Test5c = mTuple([mLitteral("string")], true, mConst("foo"));
test5c;

type Test5d = IntersectTuple<
  Tuple<[Litteral<string>], true, Litteral<string>>,
  Tuple<[Litteral<string>], true, Enum<["foo", 42]>>
>;
const test5d: Test5d = mTuple([mLitteral("string")], true, mEnum(["foo"]));
test5d;

type Test5e = IntersectTuple<
  Tuple<[Litteral<string>], true, Litteral<string>>,
  Tuple<[Litteral<string>], true, Litteral<number>>
>;
const test5e: Test5e = mTuple([mLitteral("string")], false, mNever());
test5e;

type Test5f = IntersectTuple<
  Tuple<[Litteral<string>]>,
  Tuple<[Litteral<string>, Litteral<boolean>], true, Litteral<string>>
>;
const test5f: Test5f = mTuple(
  [mLitteral("string"), mLitteral(true)],
  true,
  mLitteral("string")
);
test5f;

type Test5g = IntersectTuple<
  Tuple<[Litteral<string>], false>,
  Tuple<[Litteral<string>], true>
>;
const test5g: Test5g = mTuple([mLitteral("string")], false, mAny());
test5g;

type Test5h = IntersectTuple<
  Tuple<[Litteral<string>], false>,
  Tuple<[Litteral<string>, Litteral<boolean>], true>
>;
const test5h: Test5h = mNever();
test5h;

type Test5i = IntersectTuple<
  Tuple<[Litteral<string>, Litteral<string>]>,
  Tuple<[Litteral<string>, Litteral<boolean>], true>
>;
const test5i: Test5i = mNever();
test5i;

// --- OBJECT ---

type Test6a = IntersectTuple<
  Tuple<[Litteral<string>]>,
  Object<{ foo: Litteral<string> }, "foo", true, Litteral<string>>
>;
const test6a: Test6a = mNever();
test6a;

// --- UNION ---

type Test7a = IntersectTuple<
  Tuple<[Litteral<string>]>,
  Union<Tuple<[Litteral<string>]> | Tuple<[Litteral<number>]>>
>;
const test7a: Test7a = mUnion(mTuple([mLitteral("string")], true, mAny()));
test7a;
// @ts-expect-error
const test7a2: Test7a = mUnion(mTuple([mLitteral(42)], true, mAny()));
test7a2;

type Test7b = IntersectTuple<
  Tuple<[Litteral<string>]>,
  Union<Const<["foo"]> | Tuple<[Litteral<number>]>>
>;
const test7b: Test7b = mUnion(mConst(["foo"]));
test7b;
// @ts-expect-error
const test7b2: Test7b = mUnion(mTuple([mLitteral(42)], true, mAny()));
test7b2;

type Test7c = IntersectTuple<
  Tuple<[Litteral<string>]>,
  Union<Arr<Litteral<number>> | Tuple<[Litteral<boolean>]>>
>;
const test7c: Test7c = mUnion(mNever());
test7c;

// --- INTERSECTION ---

type Test8a = IntersectTuple<
  Tuple<[Litteral<string>]>,
  Intersection<Litteral<string>, Litteral<string>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Err = Error<"Any">;
type Test9a = IntersectTuple<Tuple<[Litteral<string>]>, Err>;
const test9a: Test9a = mError("Any");
test9a;
