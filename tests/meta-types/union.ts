import {
  Resolve,
  Any,
  Never,
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

// --- ANY ---

type Test1 = Resolve<Union<Any | Primitive<string>>>;
const test1a: Test1 = null;
test1a;
const test1b: Test1 = true;
test1b;
const test1c: Test1 = "string";
test1c;
const test1d: Test1 = 42;
test1d;
const test1e: Test1 = { foo: "bar" };
test1e;
const test1f: Test1 = ["foo", "bar"];
test1f;

// --- NEVER ---

type Test2a = Resolve<Union<Never | Primitive<string>>>;
const test2a: Test2a = "string";
test2a;
// @ts-expect-error
const test2a2: Test2a = 42;
test2a2;

type Test2b = Resolve<Union<never>>;
// @ts-expect-error
const test2b: Test2b = "any thing";
test2a;

// --- CONSTS ---

type Test3 = Resolve<Union<Const<"foo"> | Const<"bar"> | Const<42>>>;
const test3a: Test3 = "foo";
test3a;
const test3b: Test3 = "bar";
test3b;
const test3c: Test3 = 42;
test3c;
// @ts-expect-error
const test3d: Test3 = "baz";
test3d;
// @ts-expect-error
const test3e: Test3 = 43;
test3e;

// --- ENUMS ---

type Test4 = Resolve<Union<Enum<"foo" | "bar" | 42> | Enum<"baz" | 43>>>;
const test4a: Test4 = "foo";
test4a;
const test4b: Test4 = "bar";
test4b;
const test4c: Test4 = 42;
test4c;
const test4d: Test4 = "baz";
test4d;
const test4e: Test4 = 43;
test4e;
// @ts-expect-error
const test4f: Test4 = "bazz";
test4f;
// @ts-expect-error
const test4g: Test4 = 44;
test4g;

// --- PRIMITIVES ---

type Test5 = Resolve<Union<Primitive<string> | Primitive<number>>>;
const test5a: Test5 = "string";
test5a;
const test5b: Test5 = 42;
test5b;
// @ts-expect-error: Requires string or number
const test5c: Test5 = ["not", "a", "string", "or", "number", 42];
test5c;

// --- ARRAYS ---

type Test6 = Resolve<Union<Arr<Primitive<string>> | Arr<Primitive<number>>>>;

const test6a: Test6 = ["string", "array"];
test6a;
const test6b: Test6 = [42, 13];
test6b;
// @ts-expect-error: Rejects mixed array
const test6c: Test6 = ["not", "a", "string", "or", "number", 42];
test6c;
// @ts-expect-error: Rejects other values
const test6d: Test6 = { not: "a string or number array" };
test6d;

// --- TUPLES ---

type Test7 = Resolve<
  Union<
    | Tuple<[Primitive<string>, Primitive<number>]>
    | Tuple<[Primitive<string>, Primitive<boolean>], false>
  >
>;

const test7a: Test7 = ["string", 42];
test7a;
const test7b: Test7 = ["string", 42, true];
test7b;
const test7c: Test7 = ["string", true];
test7c;
// @ts-expect-error: Tuple B is closed
const test7d: Test7 = ["string", true, "any"];
test7d;

// --- OBJECTS ---

type Test8 = Resolve<
  Union<
    | Object<{ bar: Primitive<number> }, "bar">
    | Object<{ foo: Primitive<string> }, "foo", false>
  >
>;

const test8a: Test8 = { bar: 42 };
test8a;
const test8b: Test8 = { bar: 42, any: "value" };
test8b;
const test8c: Test8 = { foo: "str", any: "value" };
test8c;
// Impossible to raise error at the moment
const test8d: Test8 = { foo: "str", any: "value" };
test8d;

// --- UNIONS ---

type Test9 = Resolve<
  Union<
    | Union<Primitive<string> | Primitive<boolean>>
    | Union<Const<"foo"> | Const<42>>
  >
>;

const test9a: Test9 = "string";
test9a;
const test9b: Test9 = true;
test9b;
const test9c: Test9 = "foo";
test9c;
const test9d: Test9 = 42;
test9d;
// @ts-expect-error
const test9e: Test9 = 43;
test9e;

// --- INTERSECTIONS ---

type Test10 = Resolve<
  Union<
    | Intersection<Primitive<string>, Const<"foo">>
    | Intersection<Primitive<number>, Const<42>>
  >
>;

const test10a: Test10 = "foo";
test10a;
const test10b: Test10 = 42;
test10b;
// @ts-expect-error
const test10c: Test10 = "bar";
test10c;
// @ts-expect-error
const test10d: Test10 = 43;
test10d;

// --- ERROR ---

type Test11 = Resolve<Union<Const<"foo"> | Error<"Other value">>>;

const test11a: Test11 = "foo";
test11a;
// @ts-expect-error
const test11b: Test11 = "Other value";
test11b;
