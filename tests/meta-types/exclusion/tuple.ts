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

const anysAlwaysExclude: A.Equals<Exclude<Tuple<["A", "B"]>, Any>, Never> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  Exclude<Tuple<["A", "B"]>, Never>,
  Tuple<["A", "B"]>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const constTooSmall: A.Equals<
  Exclude<Tuple<[Const<"A">]>, Const<["A"]>>,
  Tuple<[Const<"A">]>
> = 1;
constTooSmall;

const constTooLarge: A.Equals<
  Exclude<Tuple<[Const<"A">], false>, Const<["A", "B"]>>,
  Tuple<[Const<"A">], false>
> = 1;
constTooLarge;

const constSizeMatches: A.Equals<
  Exclude<Tuple<[Const<"A">], false>, Const<["A"]>>,
  Never
> = 1;
constSizeMatches;

// --- ENUM ---

const enumTooSmall: A.Equals<
  Exclude<Tuple<[Const<"A">]>, Enum<["A"] | ["B"]>>,
  Tuple<[Const<"A">]>
> = 1;
enumTooSmall;

const enumTooLarge: A.Equals<
  Exclude<Tuple<[Const<"A">], false>, Enum<["A", "B"] | ["A", "C"]>>,
  Tuple<[Const<"A">], false>
> = 1;
enumTooLarge;

const enumSizesMatch: A.Equals<
  Exclude<Tuple<[Const<"A">], false>, Enum<["A"] | ["B"]>>,
  Never
> = 1;
enumSizesMatch;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  Exclude<Tuple<[Const<"A">]>, Primitive<string>>,
  Tuple<[Const<"A">]>
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const arrayTooSmall1: A.Equals<
  Exclude<Tuple<[Primitive<string>]>, Arr<Primitive<string>>>,
  Tuple<[Primitive<string>]>
> = 1;
arrayTooSmall1;

const arrayTooSmall2: A.Equals<
  Exclude<
    Tuple<[Primitive<string>], true, Enum<"A" | 42>>,
    Arr<Primitive<string>>
  >,
  Tuple<[Primitive<string>], true, Enum<"A" | 42>>
> = 1;
arrayTooSmall2;

const excludingArray1: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B">], true, Primitive<string>>,
    Arr<Primitive<string>>
  >,
  Never
> = 1;
excludingArray1;

const excludingArray2: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | 42>], true, Primitive<string>>,
    Arr<Primitive<string>>
  >,
  Tuple<[Enum<42>], false, Never>
> = 1;
excludingArray2;

const excludingArray3: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | 42>, Const<"A">], true, Primitive<string>>,
    Arr<Primitive<string>>
  >,
  Tuple<[Enum<42>, Const<"A">], false, Never>
> = 1;
excludingArray3;

const nonExcludingArray1: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | 42>, Enum<"A" | 42>], true, Primitive<string>>,
    Arr<Primitive<string>>
  >,
  Tuple<[Enum<"A" | 42>, Enum<"A" | 42>], true, Primitive<string>>
> = 1;
nonExcludingArray1;

const nonExcludingArray2: A.Equals<
  Exclude<
    Tuple<[Primitive<string>, Primitive<boolean>], true, Primitive<string>>,
    Arr<Primitive<string>>
  >,
  Tuple<[Primitive<string>, Primitive<boolean>], false, Never>
> = 1;
nonExcludingArray2;

// --- TUPLE ---

// Both closed
const bothClosed1Item: A.Equals<
  Exclude<Tuple<[Enum<"A" | "B">], false>, Tuple<[Const<"B">], false>>,
  Tuple<[Enum<"A">], false, Never>
> = 1;
bothClosed1Item;

const bothClosed2Items: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B">, Const<"B">], false>,
    Tuple<[Const<"A">, Const<"B">], false>
  >,
  Tuple<[Enum<"B">, Const<"B">], false, Never>
> = 1;
bothClosed2Items;

const bothClosed3Keys: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B">, Const<"B">, Const<"C">], false>,
    Tuple<[Const<"B">, Const<"B">, Const<"C">], false>
  >,
  Tuple<[Enum<"A">, Const<"B">, Const<"C">], false, Never>
> = 1;
bothClosed3Keys;

const bothClosedSizesDontMatch1: A.Equals<
  Exclude<Tuple<[Const<"A">, Const<"B">], false>, Tuple<[Const<"A">], false>>,
  Tuple<[Const<"A">, Const<"B">], false>
> = 1;
bothClosedSizesDontMatch1;

const bothClosedSizesDontMatch2: A.Equals<
  Exclude<Tuple<[Const<"A">], false>, Tuple<[Const<"A">, Const<"B">], false>>,
  Tuple<[Const<"A">], false>
> = 1;
bothClosedSizesDontMatch2;

const bothClosedMoreThan1FreeKey: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B">, Enum<"A" | "B">], false>,
    Tuple<[Const<"A">, Const<"B">], false>
  >,
  Tuple<[Enum<"A" | "B">, Enum<"A" | "B">], false>
> = 1;
bothClosedMoreThan1FreeKey;

const bothClosedImpossible1: A.Equals<
  Exclude<Tuple<[Const<"A">], false>, Tuple<[Const<"A">], false>>,
  Never
> = 1;
bothClosedImpossible1;

const bothClosedImpossible2: A.Equals<
  Exclude<
    Tuple<[Const<"A">, Const<"B">], false>,
    Tuple<[Const<"A">, Const<"B">], false>
  >,
  Never
> = 1;
bothClosedImpossible2;

// Closed value open excluded
const closedValueOpenExcluded1: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B">, Const<"B">], false>,
    Tuple<[], true, Const<"B">>
  >,
  Tuple<[Enum<"A">, Const<"B">], false>
> = 1;
closedValueOpenExcluded1;

const closedValueOpenExcluded2: A.Equals<
  Exclude<Tuple<[Const<"A">], false>, Tuple<[], true, Const<"C">>>,
  Tuple<[Const<"A">], false>
> = 1;
closedValueOpenExcluded2;

// Open value closed excluded
const openValueClosedExcluded: A.Equals<
  Exclude<Tuple<[Const<"A">], true>, Tuple<[Const<"A">], false>>,
  Tuple<[Const<"A">], true>
> = 1;
openValueClosedExcluded;

// Both open
const bothOpenMatch1: A.Equals<
  Exclude<Tuple<[Const<"A">], true>, Tuple<[Const<"A">], true>>,
  Never
> = 1;
bothOpenMatch1;

const bothOpenMatch2: A.Equals<
  Exclude<Tuple<[Const<"A">], true, Const<"A">>, Tuple<[], true, Const<"A">>>,
  Never
> = 1;
bothOpenMatch2;

const bothOpenMoreThan1FreeKey1: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B">], true, Enum<"A" | "B">>,
    Tuple<[], true, Const<"A">>
  >,
  Tuple<[Enum<"A" | "B">], true, Enum<"A" | "B">>
> = 1;
bothOpenMoreThan1FreeKey1;

const bothOpenMoreThan1FreeKey2: A.Equals<
  Exclude<Tuple<[Const<"A">], true>, Tuple<[], true, Const<"A">>>,
  Tuple<[Const<"A">], true>
> = 1;
bothOpenMoreThan1FreeKey2;

const bothOpenItemAdded: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B">], true, Enum<"A" | "B">>,
    Tuple<[Enum<"A" | "B">, Const<"B">], true, Primitive<string>>
  >,
  Tuple<[Enum<"A" | "B">, Enum<"A">], false, Enum<never>>
> = 1;
bothOpenItemAdded;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<
  Exclude<Tuple<[Const<"A">]>, Object<{ a: Const<"A"> }, "a", false>>,
  Tuple<[Const<"A">]>
> = 1;
objectsNeverExclude;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B" | "C">], false>,
    Union<Const<["C"]> | Tuple<[Const<"B">], false>>
  >,
  Tuple<[Enum<"A">], false, Never>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B">], false>,
    Union<Const<["C"]> | Tuple<[Const<"D">], false>>
  >,
  Tuple<[Enum<"A" | "B">], false, Never>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B" | "C">], false>,
    Intersection<Const<["C"]>, Tuple<[Primitive<string>], false>>
  >,
  Tuple<[Enum<"A" | "B">], false>
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B">], false>,
    Intersection<Const<["D"]>, Tuple<[Primitive<string>], false>>
  >,
  Tuple<[Enum<"A" | "B">], false>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B" | "C">], false>,
    Exclusion<Tuple<[Enum<"A" | "B" | "C">], false>, Const<["C"]>>
  >,
  Tuple<[Enum<"C">], false, Never>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<
    Tuple<[Enum<"A" | "B" | "C">], false>,
    Exclusion<
      Tuple<[Enum<"A" | "B" | "C">], false>,
      Tuple<[Primitive<string>], false>
    >
  >,
  Tuple<[Enum<"A" | "B" | "C">], false>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<
  Exclude<Tuple<["A", "B"]>, Error<"Any">>,
  Error<"Any">
> = 1;
error;
