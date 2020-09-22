import {
  Intersection,
  Const,
  Enum,
  Union,
  Primitive,
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
  mPrimitive,
  mTuple,
  mUnion,
  mError,
  mAny,
} from "./helpers";

// --- CONSTS ---

type Test1a = IntersectTuple<
  Tuple<[Primitive<string>, Primitive<number>]>,
  Const<["foo", 42, { any: "value" }]>
>;
const test1a: Test1a = mConst(["foo", 42, { any: "value" }]);
test1a;

type Test1b = IntersectTuple<
  Tuple<[Primitive<string>, Primitive<number>], true, Primitive<boolean>>,
  Const<["foo", 42, true]>
>;
const test1b: Test1b = mConst(["foo", 42, true]);
test1b;

type Test1c = IntersectTuple<
  Tuple<[Primitive<string>, Primitive<number>], true, Primitive<boolean>>,
  Const<["foo", 42, "bar"]>
>;
const test1c: Test1c = mNever();
test1c;

type Test1d = IntersectTuple<
  Tuple<[Primitive<string>, Primitive<number>]>,
  Const<[42, "foo"]>
>;
const test1d: Test1d = mNever();
test1d;

// --- ENUM ---

type Test2a = IntersectTuple<
  Tuple<[Primitive<string>, Primitive<number>], true, Primitive<boolean>>,
  Enum<
    ["foo"] | ["foo", 42] | ["foo", 42, true] | ["foo", 42, { any: "value" }]
  >
>;
let test2a: Test2a = mEnum(["foo", 42]);
test2a = mEnum(["foo", 42, true]);
test2a;

type Test2b = IntersectTuple<
  Tuple<[Primitive<string>, Primitive<number>], false>,
  Enum<
    ["foo"] | ["foo", 42] | ["foo", 42, true] | ["foo", 42, { any: "value" }]
  >
>;
const test2b: Test2b = mEnum(["foo", 42]);
test2b;

type Test2c = IntersectTuple<
  Tuple<[Primitive<string>, Primitive<number>], true, Primitive<boolean>>,
  Enum<["bar", "baz"]>
>;
// @ts-expect-error
const test2c: Test2c = mEnum(["bar", "baz"]);
test2c;

// --- PRIMITIVES ---

type Test3a = IntersectTuple<Tuple<[Primitive<string>]>, Primitive<string>>;
const test3a: Test3a = mNever();
test3a;

// --- ARRAY ---

type Test4a = IntersectTuple<
  Tuple<[Primitive<string>]>,
  Arr<Primitive<string>>
>;
const test4a: Test4a = mTuple(
  [mPrimitive("string")],
  true,
  mPrimitive("string")
);
test4a;

type Test4b = IntersectTuple<
  Tuple<[Primitive<string>], true, Primitive<string>>,
  Arr<Primitive<string>>
>;
const test4b: Test4b = mTuple(
  [mPrimitive("string")],
  true,
  mPrimitive("string")
);
test4b;

type Test4c = IntersectTuple<
  Tuple<[Primitive<string>], true, Const<"foo">>,
  Arr<Primitive<string>>
>;
const test4c: Test4c = mTuple([mPrimitive("string")], true, mConst("foo"));
test4c;

type Test4d = IntersectTuple<
  Tuple<[Primitive<string>], true, Enum<"foo" | 42>>,
  Arr<Primitive<string>>
>;
const test4d: Test4d = mTuple([mPrimitive("string")], true, mEnum("foo"));
test4d;

type Test4e = IntersectTuple<
  Tuple<[Primitive<string>], true, Primitive<number>>,
  Arr<Primitive<string>>
>;
const test4e: Test4e = mTuple([mPrimitive("string")], false, mNever());
test4e;

type Test4f = IntersectTuple<
  Tuple<[Primitive<string>, Primitive<boolean>], true, Primitive<string>>,
  Arr<Primitive<string>>
>;
const test4f: Test4f = mNever();
test4f;

// --- TUPLE ---

type Test5a = IntersectTuple<
  Tuple<[Primitive<string>]>,
  Tuple<[Primitive<string>]>
>;
const test5a: Test5a = mTuple([mPrimitive("string")], true, mAny());
test5a;

type Test5b = IntersectTuple<
  Tuple<[Primitive<string>]>,
  Tuple<[Primitive<string>], true, Primitive<string>>
>;
const test5b: Test5b = mTuple(
  [mPrimitive("string")],
  true,
  mPrimitive("string")
);
test5b;

type Test5c = IntersectTuple<
  Tuple<[Primitive<string>]>,
  Tuple<[Primitive<string>], true, Const<"foo">>
>;
const test5c: Test5c = mTuple([mPrimitive("string")], true, mConst("foo"));
test5c;

type Test5d = IntersectTuple<
  Tuple<[Primitive<string>], true, Primitive<string>>,
  Tuple<[Primitive<string>], true, Enum<"foo" | 42>>
>;
const test5d: Test5d = mTuple([mPrimitive("string")], true, mEnum("foo"));
test5d;

type Test5e = IntersectTuple<
  Tuple<[Primitive<string>], true, Primitive<string>>,
  Tuple<[Primitive<string>], true, Primitive<number>>
>;
const test5e: Test5e = mTuple([mPrimitive("string")], false, mNever());
test5e;

type Test5f = IntersectTuple<
  Tuple<[Primitive<string>]>,
  Tuple<[Primitive<string>, Primitive<boolean>], true, Primitive<string>>
>;
const test5f: Test5f = mTuple(
  [mPrimitive("string"), mPrimitive(true)],
  true,
  mPrimitive("string")
);
test5f;

type Test5g = IntersectTuple<
  Tuple<[Primitive<string>], false>,
  Tuple<[Primitive<string>], true>
>;
const test5g: Test5g = mTuple([mPrimitive("string")], false, mAny());
test5g;

type Test5h = IntersectTuple<
  Tuple<[Primitive<string>], false>,
  Tuple<[Primitive<string>, Primitive<boolean>], true>
>;
const test5h: Test5h = mNever();
test5h;

type Test5i = IntersectTuple<
  Tuple<[Primitive<string>, Primitive<string>]>,
  Tuple<[Primitive<string>, Primitive<boolean>], true>
>;
const test5i: Test5i = mNever();
test5i;

// --- OBJECT ---

type Test6a = IntersectTuple<
  Tuple<[Primitive<string>]>,
  Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
>;
const test6a: Test6a = mNever();
test6a;

// --- UNION ---

type Test7a = IntersectTuple<
  Tuple<[Primitive<string>]>,
  Union<Tuple<[Primitive<string>]> | Tuple<[Primitive<number>]>>
>;
const test7a: Test7a = mUnion(mTuple([mPrimitive("string")], true, mAny()));
test7a;
// @ts-expect-error
const test7a2: Test7a = mUnion(mTuple([mPrimitive(42)], true, mAny()));
test7a2;

type Test7b = IntersectTuple<
  Tuple<[Primitive<string>]>,
  Union<Const<["foo"]> | Tuple<[Primitive<number>]>>
>;
const test7b: Test7b = mUnion(mConst(["foo"]));
test7b;
// @ts-expect-error
const test7b2: Test7b = mUnion(mTuple([mPrimitive(42)], true, mAny()));
test7b2;

type Test7c = IntersectTuple<
  Tuple<[Primitive<string>]>,
  Union<Arr<Primitive<number>> | Tuple<[Primitive<boolean>]>>
>;
const test7c: Test7c = mUnion(mNever());
test7c;

// --- INTERSECTION ---

type Test8a = IntersectTuple<
  Tuple<[Primitive<string>]>,
  Intersection<Primitive<string>, Primitive<string>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Err = Error<"Any">;
type Test9a = IntersectTuple<Tuple<[Primitive<string>]>, Err>;
const test9a: Test9a = mError("Any");
test9a;
