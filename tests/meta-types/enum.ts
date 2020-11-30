import { Resolve, Enum } from "meta-types";

// --- EMPTY ---

type Test1 = Resolve<Enum<[]>>;
// @ts-expect-error
const test1a: Test1 = "any value";
test1a;

// --- PRIMITIVE ---

type Test2 = Resolve<Enum<"foo" | "bar">>;
const test2a: Test2 = "foo";
test2a;
const test2b: Test2 = "bar";
test2b;
// @ts-expect-error
const test2c: Test2 = "baz";
test2c;

// --- TUPLE ---

type Test3 = Resolve<Enum<["foo", "bar"]>>;
const test3a: Test3 = ["foo", "bar"];
test3a;
// @ts-expect-error
const test3b: Test3 = ["foo", "baz"];
test3b;

// --- OBJECT ---

type Test4 = Resolve<Enum<{ foo: "bar" }>>;
const test4a: Test4 = { foo: "bar" };
test4a;
// @ts-expect-error
const test4b: Test4 = { foo: "baz" };
test4b;
