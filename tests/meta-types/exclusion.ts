import { A } from "ts-toolbelt";

import {
  Resolve,
  Exclusion,
  Any,
  Never,
  Enum,
  Const,
  Primitive,
  Union,
  Object,
  Tuple,
} from "meta-types";

const test1: A.Equals<
  Resolve<Exclusion<Enum<"foo" | 42>, Primitive<string>>>,
  42
> = 1;
test1;

const test2: A.Equals<
  Resolve<Exclusion<Enum<"foo" | "bar">, Const<"bar">>>,
  "foo"
> = 1;
test2;

const test3: A.Equals<
  Resolve<
    Exclusion<
      Union<Object | Tuple<[Primitive<string>]> | Primitive<string>>,
      Union<Primitive<string> | Tuple<[Any]>>
    >
  >,
  { [k: string]: unknown }
> = 1;
test3;

const test4: A.Equals<
  Resolve<
    Exclusion<
      Union<Never | Const<"B"> | Const<"C">>,
      Union<Const<"A"> | Const<"B">>
    >
  >,
  "C"
> = 1;
test4;
