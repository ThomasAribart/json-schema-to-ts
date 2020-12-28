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
import { IntersectObject } from "meta-types/intersection/object";

import {
  mAny,
  mNever,
  mConst,
  mPrimitive,
  mEnum,
  mError,
  mObject,
  mUnion,
  mExclusion,
} from "./helpers";

// --- CONSTS ---

type Test1a = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Const<{ str: "str"; bar: "str" }>
>;
const test1a: Test1a = mConst({ str: "str", bar: "str" });
test1a;

type Test1b = IntersectObject<
  Object<{ str: Primitive<string> }, "str", false>,
  Const<{ str: "str"; bar: "str" }>
>;
const test1b: Test1b = mNever();
test1b;

type Test1c = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Const<{ num: 42 }>
>;
const test1c: Test1c = mNever();
test1c;

type Test1d = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Const<{ num: 42; str: "string" }>
>;
const test1d: Test1d = mConst({ num: 42, str: "string" });
test1d;

// --- ENUM ---

type Test2a = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Enum<{ str: "string" } | 42>
>;
const test2a: Test2a = mEnum({ str: "string" });
test2a;

type Test2b = IntersectObject<
  Object<{ str: Primitive<string> }, "str", false>,
  Enum<"bar" | { str: "string"; bar: 42 }>
>;
// @ts-expect-error
let test2b: Test2b = mEnum("bar");
// @ts-expect-error
test2b = mEnum({ str: "string", bar: 42 as 42 });
test2b;

type Test2c = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Enum<"bar" | true | { num: 42 }>
>;
// @ts-expect-error
let test2c: Test2c = mEnum("bar");
// @ts-expect-error
test2c = mEnum(true);
// @ts-expect-error
test2c = mEnum({ num: 42 as 42 });
test2c;

// --- UNION ---

type Test3a = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Union<Primitive<string> | Const<{ str: "str" }>>
>;
const test3a: Test3a = mUnion(mConst({ str: "str" }));
test3a;
// @ts-expect-error: String primitive doesn't match object
const test3a2: Test3a = mUnion(mPrimitive("str"));
test3a2;

type Test3b = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Union<Const<"foo"> | Object<{ foo: Primitive<string> }, "foo", false>>
>;
// Doesn't match string, neither object because it is closed
const test3b: Test3b = mUnion(mNever());
test3b;
// @ts-expect-error: Doesn't match object because B is closed and "str" is required in A
const test3b2: Test3b = mUnion(
  mObject({ foo: mPrimitive("string"), str: mNever() }, "foo", false, mAny())
);
test3b2;

type Test3c = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Union<Arr<Primitive<boolean>>>
>;
const test3c: Test3c = mUnion(mNever());
test3c;

// --- PRIMITIVES ---

type Test4a = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Primitive<string>
>;
const test4a: Test4a = mNever();
test4a;

type Test4b = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Primitive<boolean>
>;
const test4b: Test4b = mNever();
test4b;

// --- ARRAY ---

type Test5a = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Arr<Primitive<string>>
>;
const test5a: Test5a = mNever();
test5a;

// --- TUPLE ---

type Test6a = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Tuple<[Primitive<string>], true, Primitive<string>>
>;
const test6a: Test6a = mNever();
test6a;

// --- OBJECT ---

type Test7a = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
>;
const test7a: Test7a = mObject(
  { str: mPrimitive("string"), foo: mPrimitive("string") },
  "str",
  true,
  mPrimitive("string")
);
test7a;
const test7a2: Test7a = mObject(
  { str: mPrimitive("string"), foo: mPrimitive("string") },
  "foo",
  true,
  mPrimitive("string")
);
test7a2;

type Test7b = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Object<{ str: Primitive<string> }, "str", false>
>;
const test7b: Test7b = mObject(
  { str: mPrimitive("string") },
  "str",
  false,
  mAny()
);
test7b;

type Test7c = IntersectObject<
  Object<{ str: Primitive<string> }, "str", true>,
  Object<{ str: Primitive<string> }, "str", false>
>;
const test7c: Test7c = mObject(
  { str: mPrimitive("string") },
  "str",
  false,
  mAny()
);
test7c;

type Test7d = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Object<{ otherStr: Primitive<string> }, "otherStr", false>
>;
// Rejects "str" property because B is closed
const test7d: Test7d = mNever();
test7d;

type Test7e = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Object<{ bool: Primitive<boolean> }, "bool", true, Primitive<boolean>>
>;
// Rejects "str" property because it should be bool AND str
const test7e: Test7e = mNever();
test7e;

// --- INTERSECTION ---

type Test8a = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Intersection<Primitive<string>, Primitive<number>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Test9a = IntersectObject<
  Object<{ str: Primitive<string> }, "str">,
  Error<"Any">
>;
const test9a: Test9a = mError("Any");
test9a;

// --- EXCLUSION ---

type Test10 = IntersectObject<
  Object<{ baz: Primitive<string> }, "baz", true>,
  Exclusion<
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>,
    Const<{ foo: "bar" }>
  >
>;
const test10a: Test10 = mExclusion(
  mObject(
    { foo: mPrimitive("str"), baz: mPrimitive("str") },
    "foo",
    true,
    mPrimitive("str")
  ),
  mConst({ foo: "bar" })
);
test10a;
const test10b: Test10 = mExclusion(
  mObject(
    { foo: mPrimitive("str"), baz: mPrimitive("str") },
    "baz",
    true,
    mPrimitive("str")
  ),
  mConst({ foo: "bar" })
);
test10b;
