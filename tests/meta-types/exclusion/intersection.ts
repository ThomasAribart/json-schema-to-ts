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
  Exclude<Intersection<Enum<"A" | "B">, Const<"A">>, Any>,
  Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  Exclude<Intersection<Enum<"A" | "B">, Const<"A">>, Never>,
  Const<"A">
> = 1;
neversNeverExclude;

// --- CONSTS ---

const excludingConst: A.Equals<
  Exclude<Intersection<Const<"A">, Primitive<string>>, Const<"A">>,
  Never
> = 1;
excludingConst;

const nonExcludingConst: A.Equals<
  Exclude<Intersection<Const<"A">, Primitive<string>>, Const<"B">>,
  Const<"A">
> = 1;
nonExcludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<
  Exclude<
    Intersection<Union<Const<"A"> | Const<"B"> | Const<42>>, Primitive<string>>,
    Enum<"B" | "C">
  >,
  Union<Const<"A"> | Never>
> = 1;
excludingEnum;

const nonExcludingEnum: A.Equals<
  Exclude<
    Intersection<Union<Const<"A"> | Const<"B"> | Const<42>>, Primitive<string>>,
    Enum<"C" | "D">
  >,
  Union<Const<"A"> | Const<"B"> | Never>
> = 1;
nonExcludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  Exclude<
    Intersection<
      Union<Primitive<string> | Primitive<number>>,
      Primitive<string>
    >,
    Primitive<string>
  >,
  Union<Never>
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  Exclude<
    Intersection<
      Union<Primitive<string> | Primitive<number>>,
      Primitive<string>
    >,
    Primitive<boolean>
  >,
  Union<Primitive<string> | Never>
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const excludingArray: A.Equals<
  Exclude<
    Intersection<
      Union<
        | Arr<Primitive<string>>
        | Arr<Primitive<number>>
        | Arr<Primitive<boolean>>
      >,
      Union<Arr<Primitive<string>> | Arr<Primitive<number>>>
    >,
    Arr<Primitive<number>>
  >,
  Union<
    | Union<Never>
    | Union<Never | Arr<Primitive<string>>>
    | Union<Never | Const<[]>>
  >
> = 1;
excludingArray;

const nonExcludingArray: A.Equals<
  Exclude<
    Intersection<
      Union<
        | Arr<Primitive<string>>
        | Arr<Primitive<number>>
        | Arr<Primitive<boolean>>
      >,
      Union<Arr<Primitive<string>> | Arr<Primitive<number>>>
    >,
    Arr<Primitive<boolean>>
  >,
  Union<
    | Union<Never>
    | Union<Never | Arr<Primitive<string>>>
    | Union<Never | Arr<Primitive<number>>>
  >
> = 1;
nonExcludingArray;

// --- TUPLE ---

const excludingTuple: A.Equals<
  Exclude<
    Intersection<
      Union<
        | Tuple<[Primitive<string>], false>
        | Tuple<[Primitive<number>], false>
        | Tuple<[Primitive<boolean>], false>
      >,
      Union<
        Tuple<[Primitive<string>], false> | Tuple<[Primitive<number>], false>
      >
    >,
    Tuple<[Primitive<number>], false>
  >,
  Union<Union<Never> | Union<Never | Tuple<[Primitive<string>], false, Never>>>
> = 1;
excludingTuple;

const nonExcludingTuple: A.Equals<
  Exclude<
    Intersection<
      Union<
        | Tuple<[Primitive<string>], false>
        | Tuple<[Primitive<number>], false>
        | Tuple<[Primitive<boolean>], false>
      >,
      Union<
        Tuple<[Primitive<string>], false> | Tuple<[Primitive<number>], false>
      >
    >,
    Tuple<[Primitive<boolean>], false>
  >,
  Union<
    | Union<Never>
    | Union<Never | Tuple<[Primitive<string>], false, Never>>
    | Union<Never | Tuple<[Primitive<number>], false, Never>>
  >
> = 1;
nonExcludingTuple;

// --- OBJECT ---

const excludingObject: A.Equals<
  Exclude<
    Intersection<
      Union<
        | Object<{ a: Primitive<string> }, "a", false>
        | Object<{ a: Primitive<number> }, "a", false>
        | Object<{ a: Primitive<boolean> }, "a", false>
      >,
      Union<
        | Object<{ a: Primitive<string> }, "a", false>
        | Object<{ a: Primitive<number> }, "a", false>
      >
    >,
    Object<{ a: Primitive<number> }, "a", false>
  >,
  Union<
    | Union<Never>
    | Union<Never | Object<{ a: Primitive<string> }, "a", false, Never>>
  >
> = 1;
excludingObject;

const nonExcludingObject: A.Equals<
  Exclude<
    Intersection<
      Union<
        | Object<{ a: Primitive<string> }, "a", false>
        | Object<{ a: Primitive<number> }, "a", false>
        | Object<{ a: Primitive<boolean> }, "a", false>
      >,
      Union<
        | Object<{ a: Primitive<string> }, "a", false>
        | Object<{ a: Primitive<number> }, "a", false>
      >
    >,
    Object<{ a: Primitive<boolean> }, "a", false>
  >,
  Union<
    | Union<Never>
    | Union<Never | Object<{ a: Primitive<string> }, "a", false, Never>>
    | Union<Never | Object<{ a: Primitive<number> }, "a", false, Never>>
  >
> = 1;
nonExcludingObject;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<
    Intersection<
      Enum<"A" | "B" | "C" | 42 | true>,
      Union<Primitive<string> | Primitive<number>>
    >,
    Union<Enum<"B" | "C"> | Const<42>>
  >,
  Union<Enum<"A"> | Enum<never>>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  Exclude<
    Intersection<
      Enum<"A" | "B" | 42 | true>,
      Union<Primitive<string> | Primitive<number>>
    >,
    Union<Enum<"C" | "D"> | Const<43>>
  >,
  Union<Enum<"A" | "B"> | Enum<42>>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<
    Intersection<
      Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D"> | Const<42>>,
      Primitive<string>
    >,
    Intersection<Enum<"C" | "D">, Const<"D">>
  >,
  Union<Const<"A"> | Const<"B"> | Const<"C"> | Never>
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<
    Intersection<
      Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D"> | Const<42>>,
      Primitive<string>
    >,
    Intersection<Enum<"D" | "E">, Const<"E">>
  >,
  Union<Never | Const<"A"> | Const<"B"> | Const<"C"> | Const<"D">>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<
    Intersection<
      Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D"> | Const<42>>,
      Primitive<string>
    >,
    Exclusion<Enum<"C" | "D">, Const<"C">>
  >,
  Union<Const<"A"> | Const<"B"> | Const<"C"> | Never>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<
    Intersection<
      Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D"> | Const<42>>,
      Primitive<string>
    >,
    Exclusion<Enum<"D" | "E">, Const<"D">>
  >,
  Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D"> | Never>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<
  Exclude<Intersection<Enum<"A" | "B">, Const<"A">>, Error<"Any">>,
  Error<"Any">
> = 1;
error;
