import {
  Resolve,
  Const,
  Enum,
  Primitive,
  Arr,
  Tuple,
  Union,
  Intersection,
} from "meta-types";

type Test1 = Resolve<
  Intersection<Union<Primitive<string> | Primitive<number>>, Const<"foo">>
>;
const test1a: Test1 = "foo";
test1a;
// @ts-expect-error
const test1b: Test1 = "other string";
// @ts-expect-error
const test1c: Test1 = { not: "a string" };

type Test2 = Resolve<
  Intersection<Arr<Primitive<string>>, Tuple<[Const<"foo">]>>
>;
const test2a: Test2 = ["foo"];
test2a;
const test2b: Test2 = ["foo", "str", "otherStr"];
test2b;
// @ts-expect-error
const test2c: Test2 = [];
test2c;
// @ts-expect-error
const test2d: Test2 = ["foo", { not: "a string" }];
test2d;

type Test3 = Resolve<
  Intersection<
    Intersection<Union<Primitive<string> | Primitive<number>>, Const<"foo">>,
    Intersection<Primitive<string>, Enum<"foo" | 42>>
  >
>;
const test3a: Test3 = "foo";
test3a;
// @ts-expect-error
const test3b: Test3 = "other string";
// @ts-expect-error
const test3c: Test3 = { not: "a string" };

type Test4 = Resolve<
  Intersection<
    Union<
      | Intersection<Union<Primitive<string> | Primitive<number>>, Const<"foo">>
      | Const<42>
    >,
    Intersection<Primitive<string>, Enum<"foo" | 42>>
  >
>;
const test4a: Test4 = "foo";
test4a;
// @ts-expect-error
const test4b: Test4 = "other string";
// @ts-expect-error
const test4c: Test4 = { not: "a string" };
