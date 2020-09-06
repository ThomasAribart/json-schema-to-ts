import { Resolve, Object, Litteral } from "meta-types";

// --- OPEN ---

type Test1 = Resolve<
  Object<
    { str: Litteral<string>; num: Litteral<number> },
    "str",
    true,
    Litteral<string>
  >
>;

// @ts-expect-error: Requires 'str' property
const test1a: Test1 = {};
test1a;

const test1b: Test1 = { str: "str" };
test1b;

// @ts-expect-error: 'num' should be number
const test1c: Test1 = { str: "str", num: "not a number" };
test1c;

const test1d: Test1 = { str: "str", num: 42 };
test1d;

// Impossible to raise error at the moment...
const test1e: Test1 = { str: "str", num: 42, openProp: { foo: "bar" } };
test1e;

type Test2 = Resolve<Object<{}, never, true, Litteral<string>>>;

const test2a: Test2 = {};
test2a;

const test2b: Test2 = { str: "str" };
test2b;

// @ts-expect-error: 'num' should be string
const test2c: Test2 = { str: "str", num: 42 };
test2c;

// --- CLOSED ---

type Test3 = Resolve<
  Object<{ str: Litteral<string>; num: Litteral<number> }, "str", false>
>;

// @ts-expect-error: Requires 'str' property
const test3a: Test3 = {};
test3a;

const test3b: Test3 = { str: "str" };
test3b;

// @ts-expect-error: 'num' should be number
const test3c: Test3 = { str: "str", num: "not a number" };
test3c;

const test3d: Test3 = { str: "str", num: 43 };
test3d;

const test3e: Test3 = {
  str: "str",
  num: 43,
  // @ts-expect-error
  openProp: { foo: "bar" },
};
test3e;

type Test4 = Resolve<Object<{ str: Litteral<string> }, "str" | "num", false>>;

// @ts-expect-error: Requires 'num' property
const test4a: Test4 = { str: "str" };
test4a;
// @ts-expect-error: Rejects additional 'num' property
const test4b: Test4 = { str: "str", num: 42 };
test4b;
