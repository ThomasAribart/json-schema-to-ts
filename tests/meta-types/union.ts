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

const testAny: A.Equals<Resolve<Union<Any | Primitive<string>>>, unknown> = 1;
testAny;

// --- NEVER ---

const testNeverNonEmpty: A.Equals<
  Resolve<Union<Never | Primitive<string>>>,
  string
> = 1;
testNeverNonEmpty;

const testNeverEmpty: A.Equals<Resolve<Union<never>>, never> = 1;
testNeverEmpty;

// --- CONSTS ---

const testConst: A.Equals<
  Resolve<Union<Const<"foo"> | Const<"bar"> | Const<42>>>,
  "foo" | "bar" | 42
> = 1;
testConst;

// --- ENUMS ---

const testEnum: A.Equals<
  Resolve<Union<Enum<"foo" | "bar" | 42> | Enum<"baz" | 43>>>,
  "foo" | "bar" | "baz" | 42 | 43
> = 1;
testEnum;

// --- PRIMITIVES ---

const testPrimitive: A.Equals<
  Resolve<Union<Primitive<string> | Primitive<number>>>,
  string | number
> = 1;
testPrimitive;

// --- ARRAYS ---

const testArray: A.Equals<
  Resolve<Union<Arr<Primitive<string>> | Arr<Primitive<number>>>>,
  string[] | number[]
> = 1;
testArray;

// --- TUPLES ---

const testTuple: A.Equals<
  Resolve<
    Union<
      | Tuple<[Primitive<string>, Primitive<number>]>
      | Tuple<[Primitive<string>, Primitive<boolean>], false>
    >
  >,
  [string, number, ...unknown[]] | [string, boolean]
> = 1;
testTuple;

// --- OBJECTS ---

const testObjects: A.Equals<
  Resolve<
    Union<
      | Object<{ bar: Primitive<number> }, "bar">
      | Object<{ foo: Primitive<string> }, "foo", false>
    >
  >,
  { bar: number; [k: string]: unknown } | { foo: string }
> = 1;
testObjects;

// --- UNIONS ---

const testUnions: A.Equals<
  Resolve<
    Union<
      | Union<Primitive<string> | Primitive<boolean>>
      | Union<Const<"foo"> | Const<42>>
    >
  >,
  string | boolean | 42
> = 1;
testUnions;

// --- INTERSECTIONS ---

const testIntersections: A.Equals<
  Resolve<
    Union<
      | Intersection<Primitive<string>, Const<"foo">>
      | Intersection<Primitive<number>, Const<42>>
    >
  >,
  "foo" | 42
> = 1;
testIntersections;

// --- ERROR ---

const testError: A.Equals<
  Resolve<Union<Const<"foo"> | Error<"Other value">>>,
  "foo"
> = 1;
testError;
