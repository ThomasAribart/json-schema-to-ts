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
  Exclude<Object<{ a: Const<"A"> }, "a">, Any>,
  Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  Exclude<Object<{ a: Const<"A"> }, "a">, Never>,
  Object<{ a: Const<"A"> }, "a">
> = 1;
neversNeverExclude;

// --- CONSTS ---

const constTooSmall: A.Equals<
  Exclude<Object<{ a: Const<"A"> }, "a">, Const<{ a: "A" }>>,
  Object<{ a: Const<"A"> }, "a">
> = 1;
constTooSmall;

const constTooLarge: A.Equals<
  Exclude<Object<{ a: Const<"A"> }, "a", false>, Const<{ a: "A"; b: "B" }>>,
  Object<{ a: Const<"A"> }, "a", false>
> = 1;
constTooLarge;

const constSizeMatches1: A.Equals<
  Exclude<Object<{ a: Const<"A"> }, "a", false>, Const<{ a: "A" }>>,
  Never
> = 1;
constSizeMatches1;

const constSizeMatches2: A.Equals<
  Exclude<Object<{ a: Enum<"A" | "B" | "C"> }, "a", false>, Const<{ a: "C" }>>,
  Object<{ a: Enum<"A" | "B"> }, "a", false, Any>
> = 1;
constSizeMatches2;

// --- ENUM ---

const enumTooSmall: A.Equals<
  Exclude<Object<{ a: Const<"A"> }, "a">, Enum<{ a: "A" } | { b: "B" }>>,
  Object<{ a: Const<"A"> }, "a">
> = 1;
enumTooSmall;

const enumTooLarge: A.Equals<
  Exclude<
    Object<{ a: Const<"A"> }, "a", false>,
    Enum<{ a: "A"; b: "B" } | { a: "A"; c: "C" }>
  >,
  Object<{ a: Const<"A"> }, "a", false>
> = 1;
enumTooLarge;

const enumSizesMatch: A.Equals<
  Exclude<Object<{ a: Const<"A"> }, "a", false>, Enum<{ a: "A" } | { b: "B" }>>,
  Never
> = 1;
enumSizesMatch;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  Exclude<Object<{ a: Const<"A"> }, "a">, Primitive<string>>,
  Object<{ a: Const<"A"> }, "a">
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const arraysNeverExclude: A.Equals<
  Exclude<Object<{ a: Const<"A"> }, "a", false>, Arr<Const<"A">>>,
  Object<{ a: Const<"A"> }, "a", false>
> = 1;
arraysNeverExclude;

// --- TUPLE ---

const tuplesNeverExclude: A.Equals<
  Exclude<Object<{ a: Const<"A"> }, "a", false>, Tuple<[Const<"A">], false>>,
  Object<{ a: Const<"A"> }, "a", false>
> = 1;
tuplesNeverExclude;

// --- OBJECT ---

// Both closed
const bothClosed1Key: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B"> }, "a", false>,
    Object<{ a: Const<"B"> }, "a", false>
  >,
  Object<{ a: Enum<"A"> }, "a", false>
> = 1;
bothClosed1Key;

const bothClosed2Keys: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B">; b: Const<"B"> }, "a" | "b", false>,
    Object<{ a: Const<"A">; b: Const<"B"> }, "a" | "b", false>
  >,
  Object<{ a: Enum<"B">; b: Const<"B"> }, "a" | "b", false>
> = 1;
bothClosed2Keys;

const bothClosed3Keys: A.Equals<
  Exclude<
    Object<
      { a: Enum<"A" | "B">; b: Const<"B">; c: Const<"C"> },
      "a" | "b" | "c",
      false
    >,
    Object<
      { a: Const<"B">; b: Const<"B">; c: Const<"C"> },
      "a" | "b" | "c",
      false
    >
  >,
  Object<{ a: Enum<"A">; b: Const<"B">; c: Const<"C"> }, "a" | "b" | "c", false>
> = 1;
bothClosed3Keys;

const bothClosedSizesDontMatch1: A.Equals<
  Exclude<
    Object<{ a: Const<"A">; b: Const<"B"> }, "a" | "b", false>,
    Object<{ a: Const<"A"> }, "a", false>
  >,
  Object<{ a: Const<"A">; b: Const<"B"> }, "a" | "b", false>
> = 1;
bothClosedSizesDontMatch1;

const bothClosedSizesDontMatch2: A.Equals<
  Exclude<
    Object<{ a: Const<"A">; b: Const<"B"> }, "a" | "b", false>,
    Object<{ a: Const<"A">; c: Const<"C"> }, "a" | "c", false>
  >,
  Object<{ a: Const<"A">; b: Const<"B"> }, "a" | "b", false>
> = 1;
bothClosedSizesDontMatch2;

const bothClosedMoreThan1FreeKey: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B">; b: Enum<"A" | "B"> }, "a" | "b", false>,
    Object<{ a: Const<"A">; b: Const<"B"> }, "a" | "b", false>
  >,
  Object<{ a: Enum<"A" | "B">; b: Enum<"A" | "B"> }, "a" | "b", false>
> = 1;
bothClosedMoreThan1FreeKey;

const bothClosedImpossible1: A.Equals<
  Exclude<
    Object<{ a: Const<"A"> }, "a", false>,
    Object<{ a: Const<"A"> }, "a", false>
  >,
  Never
> = 1;
bothClosedImpossible1;

const bothClosedImpossible2: A.Equals<
  Exclude<
    Object<{ a: Const<"A">; b: Const<"B"> }, "a", false>,
    Object<{ a: Const<"A">; b: Const<"B"> }, "a", false>
  >,
  Never
> = 1;
bothClosedImpossible2;

const bothClosedImpossible3: A.Equals<
  Exclude<
    Object<{ a: Const<"A">; b: Const<"B">; c: Const<"C"> }, "a", false>,
    Object<{ a: Const<"A">; b: Const<"B">; c: Const<"C"> }, "a", false>
  >,
  Never
> = 1;
bothClosedImpossible3;

const bothClosedOmittableKey1: A.Equals<
  Exclude<
    Object<{ a: Const<"A">; b: Const<"B"> }, "a", false>,
    Object<{ a: Const<"A">; b: Const<"B"> }, "a" | "b", false>
  >,
  Object<{ a: Const<"A">; b: Never }, "a", false, Any>
> = 1;
bothClosedOmittableKey1;

const bothClosedOmittableKey2: A.Equals<
  Exclude<
    Object<{ a: Const<"A">; b: Const<"B">; c: Const<"C"> }, "b", false>,
    Object<{ a: Const<"A">; b: Const<"B">; c: Const<"C"> }, "a", false>
  >,
  Object<{ a: Never; b: Const<"B">; c: Const<"C"> }, "b", false, Any>
> = 1;
bothClosedOmittableKey2;

const bothClosedTooManyOmittableKeys: A.Equals<
  Exclude<
    Object<{ a: Const<"A">; b: Const<"B">; c: Const<"C"> }, "a", false>,
    Object<
      { a: Const<"A">; b: Const<"B">; c: Const<"C"> },
      "a" | "b" | "c",
      false
    >
  >,
  Object<{ a: Const<"A">; b: Const<"B">; c: Const<"C"> }, "a", false>
> = 1;
bothClosedTooManyOmittableKeys;

// Closed value open excluded
const closedValueOpenExcluded1: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B">; b: Const<"B"> }, "a", false>,
    Object<{}, never, true, Const<"B">>
  >,
  Object<{ a: Enum<"A">; b: Const<"B"> }, "a", false>
> = 1;
closedValueOpenExcluded1;

const closedValueOpenExcluded2: A.Equals<
  Exclude<
    Object<{ a: Const<"A"> }, "a", false>,
    Object<{}, never, true, Const<"C">>
  >,
  Object<{ a: Const<"A"> }, "a", false>
> = 1;
closedValueOpenExcluded2;

// Open value closed excluded
const openValueClosedExcluded: A.Equals<
  Exclude<
    Object<{ a: Const<"A"> }, "a", true>,
    Object<{ a: Const<"A"> }, "a", false>
  >,
  Object<{ a: Const<"A"> }, "a", true>
> = 1;
openValueClosedExcluded;

// Both open
const bothOpenMatch1: A.Equals<
  Exclude<
    Object<{ a: Const<"A"> }, "a", true>,
    Object<{ a: Const<"A"> }, "a", true>
  >,
  Never
> = 1;
bothOpenMatch1;

const bothOpenMatch2: A.Equals<
  Exclude<
    Object<{ a: Const<"A"> }, "a", true, Const<"A">>,
    Object<{}, never, true, Const<"A">>
  >,
  Never
> = 1;
bothOpenMatch2;

const bothOpenMatch3: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B">; b: Const<"B"> }, "a", true, Const<"B">>,
    Object<{}, never, true, Const<"B">>
  >,
  Object<{ a: Enum<"A">; b: Const<"B"> }, "a", true, Const<"B">>
> = 1;
bothOpenMatch3;

const bothOpenMoreThan1FreeKey1: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B"> }, never, true, Enum<"A" | "B">>,
    Object<{}, never, true, Const<"A">>
  >,
  Object<{ a: Enum<"A" | "B"> }, never, true, Enum<"A" | "B">>
> = 1;
bothOpenMoreThan1FreeKey1;

const bothOpenMoreThan1FreeKey2: A.Equals<
  Exclude<
    Object<{ a: Const<"A"> }, "a", true>,
    Object<{}, never, true, Const<"A">>
  >,
  Object<{ a: Const<"A"> }, "a", true>
> = 1;
bothOpenMoreThan1FreeKey2;

const bothOpenKeyAdded: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B"> }, "a", true, Enum<"A" | "B">>,
    Object<
      { a: Enum<"A" | "B">; b: Const<"B"> },
      "a" | "b",
      true,
      Primitive<string>
    >
  >,
  Object<{ a: Enum<"A" | "B">; b: Enum<"A"> }, "a", true, Enum<"A" | "B">>
> = 1;
bothOpenKeyAdded;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B" | "C"> }, "a", false>,
    Union<Const<{ a: "C" }> | Object<{ a: Const<"B"> }, "a", false>>
  >,
  Object<{ a: Enum<"A"> }, "a", false>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B"> }, "a", false>,
    Union<Const<{ a: "C" }> | Object<{ a: Const<"D"> }, "a", false>>
  >,
  Object<{ a: Enum<"A" | "B"> }, "a", false>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B" | "C"> }, "a", false>,
    Intersection<
      Const<{ a: "C" }>,
      Object<{ a: Primitive<string> }, "a", false>
    >
  >,
  Object<{ a: Enum<"A" | "B"> }, "a", false, Any>
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B"> }, "a", false>,
    Intersection<
      Const<{ a: "D" }>,
      Object<{ a: Primitive<string> }, "a", false>
    >
  >,
  Object<{ a: Enum<"A" | "B"> }, "a", false>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B" | "C"> }, "a", false>,
    Exclusion<
      Object<{ a: Enum<"A" | "B" | "C"> }, "a", false>,
      Const<{ a: "C" }>
    >
  >,
  Object<{ a: Enum<"C"> }, "a", false>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<
    Object<{ a: Enum<"A" | "B" | "C"> }, "a", false>,
    Exclusion<
      Object<{ a: Enum<"A" | "B" | "C"> }, never, false>,
      Object<{ a: Primitive<string> }, "a", false>
    >
  >,
  Object<{ a: Enum<"A" | "B" | "C"> }, "a", false>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<Exclude<Object, Error<"Any">>, Error<"Any">> = 1;
error;
