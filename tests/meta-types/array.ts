import { A } from "ts-toolbelt";

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

const test1: A.Equals<Resolve<Arr<Any>>, unknown[]> = 1;
test1;

//  --- NEVER ---

const test2: A.Equals<Resolve<Arr<Never>>, never[]> = 1;
test2;

// --- CONST ---

const test3: A.Equals<Resolve<Arr<Const<"foo">>>, "foo"[]> = 1;
test3;

// --- ENUM ---

const test4: A.Equals<
  Resolve<Arr<Enum<"foo" | "bar" | 42>>>,
  ("foo" | "bar" | 42)[]
> = 1;
test4;

// --- PRIMITIVES ---

const test5: A.Equals<Resolve<Arr<Primitive<string>>>, string[]> = 1;
test5;

// --- ARRAY ---

const test6: A.Equals<Resolve<Arr<Arr<Primitive<string>>>>, string[][]> = 1;
test6;

// --- TUPLE ---

const test7: A.Equals<
  Resolve<Arr<Tuple<[Primitive<string>], false>>>,
  [string][]
> = 1;
test7;

// --- OBJECT ---

const test8: A.Equals<
  Resolve<
    Arr<
      Object<
        { foo: Primitive<string>; bar: Primitive<number> },
        "bar",
        false,
        Primitive<string>
      >
    >
  >,
  { foo?: string | undefined; bar: number }[]
> = 1;
test8;

// --- UNION ---

const test9: A.Equals<
  Resolve<Arr<Union<Primitive<string> | Const<42>>>>,
  (string | 42)[]
> = 1;
test9;

// --- INTERSECTION ---

const test10: A.Equals<
  Resolve<Arr<Intersection<Primitive<string>, Const<"foo">>>>,
  "foo"[]
> = 1;
test10;

// --- ERROR ---

const test11: A.Equals<Resolve<Arr<Error<"Any">>>, never[]> = 1;
test11;
