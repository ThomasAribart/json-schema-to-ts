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

const anysAlwaysExclude: A.Equals<Exclude<Primitive<string>, Any>, Never> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<
  Exclude<Primitive<string>, Never>,
  Primitive<string>
> = 1;
neversNeverExclude;

// --- CONSTS ---

const constsNeverExclude: A.Equals<
  Exclude<Primitive<string>, Const<"A">>,
  Primitive<string>
> = 1;
constsNeverExclude;

// --- ENUM ---

const enumsNeverExclude: A.Equals<
  Exclude<Primitive<string>, Enum<"A" | "B">>,
  Primitive<string>
> = 1;
enumsNeverExclude;

// --- PRIMITIVES ---

const excludingPrimitive: A.Equals<
  Exclude<Primitive<string>, Primitive<string>>,
  Never
> = 1;
excludingPrimitive;

const nonExcludingPrimitive: A.Equals<
  Exclude<Primitive<string>, Primitive<number>>,
  Primitive<string>
> = 1;
nonExcludingPrimitive;

// --- ARRAY ---

const arraysNeverExclude: A.Equals<
  Exclude<Primitive<string>, Arr<Primitive<string>>>,
  Primitive<string>
> = 1;
arraysNeverExclude;

// --- TUPLE ---

const tuplesNeverExclude: A.Equals<
  Exclude<Primitive<string>, Tuple<[], true, Primitive<string>>>,
  Primitive<string>
> = 1;
tuplesNeverExclude;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<
  Exclude<Primitive<string>, Object>,
  Primitive<string>
> = 1;
objectsNeverExclude;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<Primitive<string>, Union<Primitive<string> | Primitive<number>>>,
  Never
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  Exclude<Primitive<string>, Union<Const<"C"> | Primitive<number>>>,
  Primitive<string>
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<
    Primitive<string>,
    Intersection<
      Union<Primitive<string> | Primitive<number>>,
      Primitive<string>
    >
  >,
  Never
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<Primitive<string>, Union<Const<"C"> | Primitive<number>>>,
  Primitive<string>
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<Primitive<string>, Exclusion<Primitive<string>, Const<"B">>>,
  Never
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<
    Primitive<string>,
    Exclusion<Union<Primitive<string> | Primitive<number>>, Primitive<string>>
  >,
  Primitive<string>
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<
  Exclude<Primitive<string>, Error<"Any">>,
  Error<"Any">
> = 1;
error;
