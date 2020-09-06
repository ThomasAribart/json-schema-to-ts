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
import { IntersectObject } from "meta-types/intersection/object";

import {
  mAny,
  mNever,
  mConst,
  mLitteral,
  mEnum,
  mError,
  mObject,
  mUnion,
} from "./helpers";

// --- CONSTS ---

type Test1a = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Const<{ str: "str"; bar: "str" }>
>;
const test1a: Test1a = mConst({ str: "str", bar: "str" });
test1a;

type Test1b = IntersectObject<
  Object<{ str: Litteral<string> }, "str", false>,
  Const<{ str: "str"; bar: "str" }>
>;
const test1b: Test1b = mNever();
test1b;

type Test1c = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Const<{ num: 42 }>
>;
const test1c: Test1c = mNever();
test1c;

type Test1d = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Const<{ num: 42; str: "string" }>
>;
const test1d: Test1d = mConst({ num: 42, str: "string" });
test1d;

// --- ENUM ---

type Test2a = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Enum<[{ str: "string" }, 42]>
>;
const test2a: Test2a = mEnum([{ str: "string" }]);
test2a;

type Test2b = IntersectObject<
  Object<{ str: Litteral<string> }, "str", false>,
  Enum<["bar", { str: "string"; bar: 42 }]>
>;
const test2b: Test2b = mNever();
test2b;

type Test2c = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Enum<["bar", true, { num: 42 }]>
>;
const test2c: Test2c = mNever();
test2c;

// --- UNION ---

type Test3a = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Union<Litteral<string> | Const<{ str: "str" }>>
>;
const test3a: Test3a = mUnion(mConst({ str: "str" }));
test3a;
// @ts-expect-error: String litteral doesn't match object
const test3a2: Test3a = mUnion(mLitteral("str"));
test3a2;

type Test3b = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Union<Const<"foo"> | Object<{ foo: Litteral<string> }, "foo", false>>
>;
// Doesn't match string, neither object because it is closed
const test3b: Test3b = mUnion(mNever());
test3b;
// @ts-expect-error: Doesn't match object because B is closed and "str" is required in A
const test3b2: Test3b = mUnion(
  mObject({ foo: mLitteral("string"), str: mNever() }, "foo", false, mAny())
);
test3b2;

type Test3c = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Union<Arr<Litteral<boolean>>>
>;
const test3c: Test3c = mUnion(mNever());
test3c;

// --- LITTERALS ---

type Test4a = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Litteral<string>
>;
const test4a: Test4a = mNever();
test4a;

type Test4b = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Litteral<boolean>
>;
const test4b: Test4b = mNever();
test4b;

// --- ARRAY ---

type Test5a = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Arr<Litteral<string>>
>;
const test5a: Test5a = mNever();
test5a;

// --- TUPLE ---

type Test6a = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Tuple<[Litteral<string>], true, Litteral<string>>
>;
const test6a: Test6a = mNever();
test6a;

// --- OBJECT ---

type Test7a = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Object<{ foo: Litteral<string> }, "foo", true, Litteral<string>>
>;
const test7a: Test7a = mObject(
  { str: mLitteral("string"), foo: mLitteral("string") },
  "str",
  true,
  mLitteral("string")
);
test7a;
const test7a2: Test7a = mObject(
  { str: mLitteral("string"), foo: mLitteral("string") },
  "foo",
  true,
  mLitteral("string")
);
test7a2;

type Test7b = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Object<{ str: Litteral<string> }, "str", false>
>;
const test7b: Test7b = mObject(
  { str: mLitteral("string") },
  "str",
  false,
  mAny()
);
test7b;

type Test7c = IntersectObject<
  Object<{ str: Litteral<string> }, "str", true>,
  Object<{ str: Litteral<string> }, "str", false>
>;
const test7c: Test7c = mObject(
  { str: mLitteral("string") },
  "str",
  false,
  mAny()
);
test7c;

type Test7d = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Object<{ otherStr: Litteral<string> }, ["otherStr"], false>
>;
// Rejects "str" property because B is closed
const test7d: Test7d = mNever();
test7d;

type Test7e = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Object<{ bool: Litteral<boolean> }, ["bool"], true, Litteral<boolean>>
>;
// Rejects "str" property because it should be bool AND str
const test7e: Test7e = mNever();
test7e;

// --- INTERSECTION ---

type Test8a = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Intersection<Litteral<string>, Litteral<number>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Test9a = IntersectObject<
  Object<{ str: Litteral<string> }, "str">,
  Error<"Any">
>;
const test9a: Test9a = mError("Any");
test9a;
