import { A } from "ts-toolbelt";

import {
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
  Exclusion,
  Error,
} from "meta-types";
import { Exclude } from "meta-types/exclusion";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  Exclude<Union<Const<"A"> | Const<"B">>, Any>,
  Union<Never>
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  Exclude<Union<Const<"B"> | Const<"A">>, Never>,
  Union<Const<"B"> | Const<"A">>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const excludingConst: A.Equals<
  Exclude<Union<Const<"A"> | Const<"B">>, Const<"B">>,
  Union<Const<"A"> | Never>
> = 1;
excludingConst;

const nonExcludingConst: A.Equals<
  Exclude<Union<Const<"A"> | Const<"B">>, Const<"C">>,
  Union<Const<"A"> | Const<"B">>
> = 1;
nonExcludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<
  Exclude<Union<Const<"A"> | Const<"B"> | Const<42>>, Enum<"B" | 42>>,
  Union<Const<"A"> | Never>
> = 1;
excludingEnum;

const nonExcludingEnum: A.Equals<
  Exclude<Union<Const<"A"> | Const<"B"> | Const<42>>, Enum<"C" | 43>>,
  Union<Const<"A"> | Const<"B"> | Const<42>>
> = 1;
nonExcludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  Exclude<Union<Primitive<string> | Primitive<number>>, Primitive<number>>,
  Union<Primitive<string> | Never>
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  Exclude<Union<Primitive<string> | Primitive<number>>, Primitive<boolean>>,
  Union<Primitive<string> | Primitive<number>>
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const excludingArray: A.Equals<
  Exclude<
    Union<Arr<Primitive<string>> | Arr<Primitive<number>>>,
    Arr<Primitive<number>>
  >,
  Union<Arr<Primitive<string>> | Const<[]>>
> = 1;
excludingArray;

const nonExcludingArray: A.Equals<
  Exclude<
    Union<Arr<Primitive<string>> | Arr<Primitive<number>>>,
    Arr<Primitive<boolean>>
  >,
  Union<Arr<Primitive<string>> | Arr<Primitive<number>>>
> = 1;
nonExcludingArray;

// --- TUPLE ---

const excludingTuple: A.Equals<
  Exclude<
    Union<
      Tuple<[Primitive<string>], false> | Tuple<[Primitive<number>], false>
    >,
    Tuple<[Primitive<number>], false>
  >,
  Union<Tuple<[Primitive<string>], false, Never> | Never>
> = 1;
excludingTuple;

const nonExcludingTuple: A.Equals<
  Exclude<
    Union<
      Tuple<[Primitive<string>], false> | Tuple<[Primitive<number>], false>
    >,
    Tuple<[Primitive<boolean>], false>
  >,
  Union<
    | Tuple<[Primitive<string>], false, Never>
    | Tuple<[Primitive<number>], false, Never>
  >
> = 1;
nonExcludingTuple;

// --- OBJECT ---

const excludingObject: A.Equals<
  Exclude<
    Union<
      | Object<{ a: Primitive<string> }, "a", false>
      | Object<{ a: Primitive<number> }, "a", false>
    >,
    Object<{ a: Primitive<number> }, "a", false>
  >,
  Union<Object<{ a: Primitive<string> }, "a", false, Never> | Never>
> = 1;
excludingObject;

const nonExcludingObject: A.Equals<
  Exclude<
    Union<
      | Object<{ a: Primitive<string> }, "a", false>
      | Object<{ a: Primitive<number> }, "a", false>
    >,
    Object<{ a: Primitive<boolean> }, "a", false>
  >,
  Union<
    | Object<{ a: Primitive<string> }, "a", false, Never>
    | Object<{ a: Primitive<number> }, "a", false, Never>
  >
> = 1;
nonExcludingObject;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<
    Union<Const<"A"> | Const<"B"> | Enum<"C" | 42>>,
    Union<Enum<"B" | "C"> | Const<42>>
  >,
  Union<Const<"A"> | Never | Enum<never>>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  Exclude<
    Union<Const<"A"> | Const<"B"> | Enum<"C" | 42>>,
    Union<Enum<"D" | "E"> | Const<43>>
  >,
  Union<Const<"A"> | Const<"B"> | Enum<"C" | 42>>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<
    Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D">>,
    Intersection<Enum<"C" | "D">, Const<"D">>
  >,
  Union<Const<"A"> | Const<"B"> | Const<"C"> | Never>
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<
    Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D">>,
    Intersection<Enum<"D" | "E">, Const<"E">>
  >,
  Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D">>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<
    Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D">>,
    Exclusion<Enum<"C" | "D">, Const<"C">>
  >,
  Union<Const<"A"> | Const<"B"> | Const<"C"> | Never>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<
    Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D">>,
    Exclusion<Enum<"D" | "E">, Const<"D">>
  >,
  Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D">>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<
  Exclude<Union<Const<"B"> | Const<"A">>, Error<"Any">>,
  Union<Error<"Any">>
> = 1;
error;
