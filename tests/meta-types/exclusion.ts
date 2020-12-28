import {
  Resolve,
  Exclusion,
  Enum,
  Const,
  Primitive,
  Union,
  Object,
  Tuple,
  Any,
} from "meta-types";

type Test1 = Resolve<Exclusion<Enum<"foo" | 42>, Primitive<string>>>;
// @ts-expect-error
const test1a: Test1 = "foo";
test1a;
// @ts-expect-error
const test1b: Test1 = "any string";
test1b;
const test1c: Test1 = 42;
test1c;

type Test2 = Resolve<Exclusion<Enum<"foo" | "bar">, Const<"bar">>>;
const test2a: Test2 = "foo";
test2a;
// @ts-expect-error
const test2b: Test2 = "bar";
test2b;
// @ts-expect-error
const test2c: Test2 = "any string";
test2c;
// @ts-expect-error
const test2d: Test2 = 42;
test2d;

type Test3 = Resolve<
  Exclusion<
    Union<Object | Tuple<[Primitive<string>]> | Primitive<string>>,
    Union<Primitive<string> | Tuple<[Any]>>
  >
>;
const test3a: Test3 = { foo: "bar" };
test3a;
// @ts-expect-error
const test3b: Test3 = "string";
test3b;
// @ts-expect-error
const test3c: Test3 = ["foo"];
test3c;
