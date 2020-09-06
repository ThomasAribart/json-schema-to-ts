import { Resolve, Never } from "meta-types";

type Test1 = Resolve<Never>;
// @ts-expect-error
const test1a: Test1 = null;
test1a;
// @ts-expect-error
const test1b: Test1 = true;
test1b;
// @ts-expect-error
const test1c: Test1 = "string";
test1c;
// @ts-expect-error
const test1d: Test1 = 42;
test1d;
// @ts-expect-error
const test1e: Test1 = { foo: "bar" };
test1e;
// @ts-expect-error
const test1f: Test1 = ["foo", "bar"];
test1f;
