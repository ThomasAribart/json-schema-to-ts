import {
  Const,
  Enum,
  Primitive,
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

type Test1a = IntersectEnum<Enum<"foo" | "bar" | 42>, Const<"foo">>;
const test1a: Test1a = mConst("foo");
test1a;

type Test1b = IntersectEnum<Enum<"foo" | "bar" | 42>, Const<true>>;
const test1b: Test1b = mNever();
test1b;

// --- ENUM ---

type Test2a = IntersectEnum<Enum<"foo" | "bar" | 42>, Enum<"foo" | 42>>;
let test2a: Test2a = mEnum("foo");
test2a = mEnum(42 as 42);
// @ts-expect-error
test2a = mEnum("bar");
test2a;

type Test2b = IntersectEnum<Enum<"foo" | "bar" | 42>, Enum<43 | true>>;
// @ts-expect-error
let test2b: Test2b = mEnum("foo");
// @ts-expect-error
test2b = mEnum("bar");
// @ts-expect-error
test2b = mEnum(42);
// @ts-expect-error
test2b = mEnum(43);
// @ts-expect-error
test2b = mEnum(true);
test2b;

// --- PRIMITIVES ---

type Test4a = IntersectEnum<Enum<"foo" | "bar" | 42>, Primitive<string>>;
let test4a: Test4a = mEnum("foo");
test4a = mEnum("bar");
// @ts-expect-error
test4a = mEnum(42 as 42);
test4a;

enum Food {
  Pizza = "pizza",
  Tacos = "tacos",
  Fries = "fries",
}

type Test4b = IntersectEnum<Enum<Food>, Primitive<string>>;
let test4b: Test4b = mEnum(Food.Pizza);
test4b = mEnum(Food.Tacos);
test4b = mEnum(Food.Fries);
test4b;

type Test4c = IntersectEnum<Enum<"foo" | "bar" | 42>, Primitive<boolean>>;
// @ts-expect-error
let test4c: Test4c = mEnum("foo");
// @ts-expect-error
test4c = mEnum("bar");
// @ts-expect-error
test4c = mEnum(42 as 42);
test4c;

// --- ARRAY ---

type Test5a = IntersectEnum<
  Enum<["foo", "bar"] | [42]>,
  Arr<Primitive<string>>
>;
let test5a: Test5a = mEnum(["foo", "bar"]);
// @ts-expect-error
test5a = mEnum([42 as 42]);
test5a;

type Test5b = IntersectEnum<Enum<"foo" | 42>, Arr<Primitive<string>>>;
// @ts-expect-error
let test5b: Test5b = mEnum("foo");
// @ts-expect-error
let test5b: Test5b = mEnum(42 as 42);
test5b;

// --- TUPLE ---

type Test6a = IntersectEnum<
  Enum<["foo", "bar"] | ["foo", 42]>,
  Tuple<[Primitive<string>], true, Primitive<string>>
>;
let test6a: Test6a = mEnum(["foo", "bar"]);
// @ts-expect-error
test6a = mEnum(["foo", 42]);
test6a;

type Test6b = IntersectEnum<
  Enum<"foo" | "bar" | 42>,
  Tuple<[Primitive<string>], true, Primitive<string>>
>;
// @ts-expect-error
let test6b: Test6b = mEnum("foo");
// @ts-expect-error
test6b = mEnum("bar");
// @ts-expect-error
test6b = mEnum(42);
test6b;

// --- OBJECT ---

type Test7a = IntersectEnum<
  Enum<{ foo: "str"; bar: "str" } | { foo: "str"; bar: 42 }>,
  Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
>;
let test7a: Test7a = mEnum({ foo: "str", bar: "str" });
// @ts-expect-error
test7a = mEnum({ foo: "str", bar: 42 as 42 });
test7a;

type Test7b = IntersectEnum<
  Enum<"foo" | "bar" | 42>,
  Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
>;
// @ts-expect-error
let test7b: Test7b = mEnum("foo");
// @ts-expect-error
let test7b: Test7b = mEnum("bar");
// @ts-expect-error
let test7b: Test7b = mEnum(42 as 42);
test7b;

// --- UNION ---

type Test3a = IntersectEnum<Enum<"foo" | "bar" | 42>, Union<Primitive<string>>>;
let test3a: Test3a = mUnion(mEnum("foo"));
test3a = mUnion(mEnum("bar"));
// @ts-expect-error
test3a = mUnion(mEnum(42 as 42));
test3a;

type Test3b = IntersectEnum<
  Enum<"foo" | "bar" | 42>,
  Union<Const<"foo"> | Primitive<boolean>>
>;
const test3b: Test3b = mUnion(mConst("foo"));
test3b;

type Test3c = IntersectEnum<
  Enum<"foo" | "bar" | 42>,
  Union<Object | Primitive<boolean>>
>;
// @ts-expect-error
let test3c: Test3c = mUnion(mEnum("foo"));
// @ts-expect-error
test3c = mUnion(mEnum("bar"));
// @ts-expect-error
test3c = mUnion(mEnum(42 as 42));
test3c;

// --- INTERSECTION ---

type Test8a = IntersectEnum<
  Enum<"foo" | "bar" | 42>,
  Intersection<Primitive<string>, Primitive<number>>
>;
const test8a: Test8a = mError("Cannot intersect intersection");
test8a;

// --- ERROR ---

type Test9a = IntersectEnum<Enum<"foo" | "bar" | 42>, Error<"Any">>;
const test9a: Test9a = mError("Any");
test9a;
