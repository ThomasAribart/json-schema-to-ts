import { Resolve, Any } from "meta-types";

type Test1 = Resolve<Any>;
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
