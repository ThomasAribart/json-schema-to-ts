import { Resolve, Tuple, Primitive } from "meta-types";

// --- OPEN ---

type Test1 = Resolve<Tuple<[Primitive<string>, Primitive<number>]>>;
const test1a: Test1 = ["string", 42];
test1a;
const test1b: Test1 = ["string", 42, { any: "value" }];
test1b;
// @ts-expect-error
const test1c: Test1 = [];
test1c;
// @ts-expect-error
const test1d: Test1 = ["string"];
test1d;
// @ts-expect-error
const test1e: Test1 = [42, "string"];
test1e;

type Test2 = Resolve<
  Tuple<[Primitive<string>, Primitive<number>], true, Primitive<boolean>>
>;
const test2a: Test2 = ["string", 42];
test2a;
const test2b: Test2 = ["string", 42, true, false];
test2b;
// @ts-expect-error
const test2c: Test2 = ["string", 42, { any: "value" }];
test2c;
// @ts-expect-error
const test2d: Test2 = [];
test2d;
// @ts-expect-error
const test2e: Test2 = ["string"];
test2e;
// @ts-expect-error
const test2f: Test2 = [42, "string"];
test2f;

// --- CLOSED ---

type Test3 = Resolve<Tuple<[Primitive<string>, Primitive<number>], false>>;
const test3a: Test3 = ["string", 42];
test3a;
// @ts-expect-error
const test3b: Test3 = ["string", 42, { any: "value" }];
test3b;
// @ts-expect-error
const test3c: Test3 = [];
test3c;
// @ts-expect-error
const test3d: Test3 = ["string"];
test3d;
// @ts-expect-error
const test3e: Test3 = [42, "string"];
test3e;
