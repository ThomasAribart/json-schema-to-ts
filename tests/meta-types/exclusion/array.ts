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
  Exclude<Arr<Primitive<string>>, Any>,
  Never
> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  Exclude<Arr<Primitive<string>>, Never>,
  Arr<Primitive<string>>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const constsNeverExclude: A.Equals<
  Exclude<Arr<Primitive<string>>, Const<["foo", "bar"]>>,
  Arr<Primitive<string>>
> = 1;
constsNeverExclude;

// --- ENUM ---

const enumsNeverExclude: A.Equals<
  Exclude<Arr<Primitive<string>>, Enum<["foo"] | ["bar"] | 42>>,
  Arr<Primitive<string>>
> = 1;
enumsNeverExclude;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  Exclude<Arr<Primitive<string>>, Primitive<string>>,
  Arr<Primitive<string>>
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const excludingArray: A.Equals<
  Exclude<Arr<Primitive<string>>, Arr<Primitive<string>>>,
  Const<[]>
> = 1;
excludingArray;

const nonExcludingArray1: A.Equals<
  Exclude<Arr<Primitive<string>>, Arr<Primitive<number>>>,
  Arr<Primitive<string>>
> = 1;
nonExcludingArray1;

const nonExcludingArray2: A.Equals<
  Exclude<
    Arr<Union<Primitive<string> | Primitive<number>>>,
    Arr<Primitive<number>>
  >,
  Arr<Union<Primitive<string> | Primitive<number>>>
> = 1;
nonExcludingArray2;

// --- TUPLE ---

const excludingTuple: A.Equals<
  Exclude<Arr<Primitive<string>>, Tuple<[], true, Primitive<string>>>,
  Const<[]>
> = 1;
excludingTuple;

const nonExcludingTuple1: A.Equals<
  Exclude<Arr<Primitive<string>>, Tuple<[Primitive<string>]>>,
  Arr<Primitive<string>>
> = 1;
nonExcludingTuple1;

const nonExcludingTuple2: A.Equals<
  Exclude<
    Arr<Union<Primitive<string> | Primitive<number>>>,
    Tuple<[], true, Primitive<number>>
  >,
  Arr<Union<Primitive<string> | Primitive<number>>>
> = 1;
nonExcludingTuple2;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<
  Exclude<
    Arr<Primitive<string>>,
    Object<{ foo: Primitive<string> }, "foo", true, Primitive<string>>
  >,
  Arr<Primitive<string>>
> = 1;
objectsNeverExclude;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<
    Arr<Primitive<string>>,
    Union<Arr<Primitive<string>> | Arr<Primitive<number>>>
  >,
  Const<[]>
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  Exclude<
    Arr<Primitive<string>>,
    Union<Const<["foo"]> | Arr<Primitive<number>>>
  >,
  Arr<Primitive<string>>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<
    Arr<Primitive<string>>,
    Intersection<
      Arr<Primitive<string>>,
      Arr<Union<Primitive<string> | Primitive<number>>>
    >
  >,
  Const<[]>
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<
    Arr<Primitive<string>>,
    Intersection<Arr<Primitive<string>>, Arr<Const<"A">>>
  >,
  Arr<Primitive<string>>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<Arr<Const<"foo">>, Exclusion<Arr<Primitive<string>>, Const<[]>>>,
  Const<[]>
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<
    Arr<Primitive<string>>,
    Exclusion<Arr<Primitive<number>>, Arr<Const<42>>>
  >,
  Arr<Primitive<string>>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<
  Exclude<Arr<Primitive<string>>, Error<"Any">>,
  Error<"Any">
> = 1;
error;
