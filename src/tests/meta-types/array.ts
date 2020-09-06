import {
  Resolve,
  Any,
  Never,
  Const,
  Enum,
  Litteral,
  Arr,
  Tuple,
  Object,
  Union,
  Intersection,
  Error,
} from "meta-types";

// --- ANY ---

type Test1 = Resolve<Arr<Any>>;
const test1a: Test1 = [null];
test1a;
const test1b: Test1 = [true];
test1b;
const test1c: Test1 = ["string"];
test1c;
const test1d: Test1 = [42];
test1d;
const test1e: Test1 = [{ foo: "bar" }];
test1e;
const test1f: Test1 = [["foo", "bar"]];
test1f;

//  --- NEVER ---

type Test2 = Resolve<Arr<Never>>;
// @ts-expect-error
const test2a: Test2 = [null];
test2a;
// @ts-expect-error
const test2b: Test2 = [true];
test2b;
// @ts-expect-error
const test2c: Test2 = ["string"];
test2c;
// @ts-expect-error
const test2d: Test2 = [42];
test2d;
// @ts-expect-error
const test2e: Test2 = [{ foo: "bar" }];
test2e;
// @ts-expect-error
const test2f: Test2 = [["foo", "bar"]];
test2f;

// --- CONST ---

type Test3 = Resolve<Arr<Const<"foo">>>;
const test3a: Test3 = ["foo", "foo"];
test3a;
// @ts-expect-error
const test3b: Test3 = ["bar"];
test3b;

// --- ENUM ---

type Test4 = Resolve<Arr<Enum<["foo", "bar", 42]>>>;
const test4a: Test4 = [42, "foo", "bar"];
test4a;
// @ts-expect-error
const test4b: Test4 = ["baz"];
test4b;

// --- LITTERALS ---

type Test5 = Resolve<Arr<Litteral<string>>>;
const test5a: Test5 = ["foo", "bar"];
test5a;
// @ts-expect-error
const test5b: Test5 = ["foo", 42];
test5b;

// --- ARRAY ---

type Test6 = Resolve<Arr<Arr<Litteral<string>>>>;
const test6a: Test6 = [["foo", "bar"]];
test6a;
// @ts-expect-error
const test6b: Test6 = [["foo", 42]];
test6b;

// --- TUPLE ---

type Test7 = Resolve<Arr<Tuple<[Litteral<string>], false>>>;
const test7a: Test7 = [["foo"]];
test7a;
// @ts-expect-error
const test7b: Test7 = [["foo", "bar"]];
test7b;
// @ts-expect-error
const test7c: Test7 = [["foo", 42]];
test7c;

// --- OBJECT ---

type Test8 = Resolve<
  Arr<
    Object<
      { foo: Litteral<string>; bar: Litteral<number> },
      "bar",
      false,
      Litteral<string>
    >
  >
>;
const test8a: Test8 = [{ bar: 42 }, { foo: "str", bar: 15 }];
test8a;
// @ts-expect-error
const test8b: Test8 = [{ bar: "str" }];
test8b;
// @ts-expect-error
const test8c: Test8 = [{ bar: 42, foo: 50 }];
test8c;
// @ts-expect-error
const test8d: Test8 = [{ foo: "str" }];
test8d;

// --- UNION ---

type Test9 = Resolve<Arr<Union<Litteral<string> | Const<42>>>>;
const test9a: Test9 = [42, "foo", "bar"];
test9a;
// @ts-expect-error
const test9b: Test9 = [43];
test9b;

// --- INTERSECTION ---

type Test10 = Resolve<Arr<Intersection<Litteral<string>, Const<"foo">>>>;
const test10a: Test10 = ["foo"];
test10a;
// @ts-expect-error
const test10b: Test10 = ["foo", "bar"];
test10b;

// --- ERROR ---

type Test11 = Resolve<Arr<Error<"Any">>>;
// @ts-expect-error
const test11a: Test11 = ["foo"];
// @ts-expect-error
const test11a: Test11 = [42];
