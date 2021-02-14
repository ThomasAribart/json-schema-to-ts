import { A } from "ts-toolbelt";

import {
  Any,
  Never,
  Const,
  Enum,
  Union,
  Primitive,
  Arr,
  Tuple,
  Object,
  Intersection,
  Exclusion,
  Error,
} from "meta-types";
import { Exclude } from "meta-types/exclusion";

// --- ANY ---

const anysAlwaysExclude: A.Equals<
  Exclude<Exclusion<Primitive<string>, Const<"A">>, Any>,
  Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  Exclude<Exclusion<Primitive<string>, Const<"A">>, Never>,
  Primitive<string>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const excludingConst: A.Equals<
  Exclude<Exclusion<Enum<"A" | "B" | "C">, Const<"A">>, Const<"B">>,
  Enum<"C">
> = 1;
excludingConst;

// --- ENUM ---

const excludingEnum: A.Equals<
  Exclude<Exclusion<Enum<"A" | "B" | "C" | "D">, Const<"A">>, Enum<"B" | "C">>,
  Enum<"D">
> = 1;
excludingEnum;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  Exclude<
    Exclusion<
      Union<Primitive<string> | Primitive<number> | Const<"A">>,
      Const<"A">
    >,
    Primitive<number>
  >,
  Union<Primitive<string> | Never>
> = 1;
excludingPrimitive;

// --- ARRAY ---

const excludingArray1: A.Equals<
  Exclude<Exclusion<Arr<Primitive<string>>, Never>, Arr<Primitive<string>>>,
  Const<[]>
> = 1;
excludingArray1;

const excludingArray2: A.Equals<
  Exclude<
    Exclusion<Arr<Union<Primitive<string> | Primitive<number>>>, Never>,
    Arr<Primitive<string>>
  >,
  Arr<Union<Primitive<string> | Primitive<number>>>
> = 1;
excludingArray2;

// --- TUPLE ---

const excludingTuple: A.Equals<
  Exclude<
    Exclusion<Tuple<[Enum<"A" | "B" | "C">], false>, Const<["A"]>>,
    Const<["B"]>
  >,
  Tuple<[Enum<"C">], false>
> = 1;
excludingTuple;

// --- OBJECT ---

const excludingObject: A.Equals<
  Exclude<
    Exclusion<Object<{ a: Enum<"A" | "B"> }, "a", false>, Never>,
    Object<{ a: Const<"B"> }, "a", false>
  >,
  Object<{ a: Enum<"A"> }, "a", false, Never>
> = 1;
excludingObject;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<
    Exclusion<
      Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D">>,
      Const<"A">
    >,
    Union<Const<"B"> | Const<"C">>
  >,
  Union<Const<"D"> | Never>
> = 1;
excludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<
    Exclusion<
      Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D">>,
      Const<"A">
    >,
    Intersection<Enum<"B" | "C">, Union<Primitive<string> | Primitive<number>>>
  >,
  Union<Const<"D"> | Never>
> = 1;
excludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<
    Exclusion<
      Union<Const<"A"> | Const<"B"> | Const<"C"> | Const<"D">>,
      Const<"A">
    >,
    Exclusion<Enum<"B" | "C">, Const<"B">>
  >,
  Union<Const<"B"> | Const<"D"> | Never>
> = 1;
excludingExclusion;

// --- ERROR ---

const error: A.Equals<Exclude<Any, Error<"Any">>, Error<"Any">> = 1;
error;
