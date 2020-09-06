import { Resolve, Const } from "meta-types";

// --- LITTERAL ---

type Test1 = Resolve<Const<null>>;
const test1a: Test1 = null;
test1a;
// @ts-expect-error
const test1b: Test1 = "not null";
test1b;

type Test2 = Resolve<Const<true>>;
const test2a: Test2 = true;
test2a;
// @ts-expect-error
const test2b: Test2 = false;
test2b;

type Test3 = Resolve<Const<"foo">>;
const test3a: Test3 = "foo";
test3a;
// @ts-expect-error
const test3b: Test3 = false;
test3b;

type Test4 = Resolve<Const<42>>;
const test4a: Test4 = 42;
test4a;
// @ts-expect-error
const test4b: Test4 = 43;
test4b;

// --- TUPLE ---

type Test5 = Resolve<Const<["foo", "bar"]>>;
const test5a: Test5 = ["foo", "bar"];
test5a;
// @ts-expect-error
const test5b: Test5 = ["foo", "baz"];
test5b;

// --- OBJECT ---

type Test6 = Resolve<Const<{ foo: "bar" }>>;
const test6a: Test6 = { foo: "bar" };
test6a;
// @ts-expect-error
const test6b: Test6 = { foo: "baz" };
test6b;
