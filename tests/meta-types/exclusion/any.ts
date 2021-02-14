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

const anysAlwaysExclude: A.Equals<Exclude<Any, Any>, Never> = 1;
anysAlwaysExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<Exclude<Any, Never>, Any> = 1;
neversNeverExclude;

// --- CONSTS ---

const constsNeverExclude: A.Equals<Exclude<Any, Const<"foo">>, Any> = 1;
constsNeverExclude;

// --- ENUM ---

const enumsNeverExclude: A.Equals<
  Exclude<Any, Enum<"foo" | "bar" | 42>>,
  Any
> = 1;
enumsNeverExclude;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  Exclude<Any, Primitive<string>>,
  Any
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const arraysNeverExclude: A.Equals<
  Exclude<Any, Arr<Primitive<string>>>,
  Any
> = 1;
arraysNeverExclude;

// --- TUPLE ---

const tuplesNeverExclude: A.Equals<
  Exclude<Any, Tuple<[Primitive<string>]>>,
  Any
> = 1;
tuplesNeverExclude;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<Exclude<Any, Object>, Any> = 1;
objectsNeverExclude;

// --- UNION ---

const excludingUnion: A.Equals<
  Exclude<Any, Union<Any | Arr<Primitive<number>>>>,
  Never
> = 1;
excludingUnion;

const nonExcludingUnion: A.Equals<
  Exclude<Any, Union<Const<["foo"]> | Primitive<number>>>,
  Any
> = 1;
nonExcludingUnion;

// --- INTERSECTION ---

const excludingIntersection: A.Equals<
  Exclude<Any, Intersection<Any, Any>>,
  Never
> = 1;
excludingIntersection;

const nonExcludingIntersection: A.Equals<
  Exclude<Any, Intersection<Any, Const<"A">>>,
  Any
> = 1;
nonExcludingIntersection;

// --- EXCLUSION ---

const excludingExclusion: A.Equals<
  Exclude<Any, Exclusion<Any, Const<"A">>>,
  Never
> = 1;
excludingExclusion;

const nonExcludingExclusion: A.Equals<
  Exclude<
    Any,
    Exclusion<Union<Primitive<number> | Primitive<string>>, Primitive<string>>
  >,
  Any
> = 1;
nonExcludingExclusion;

// --- ERROR ---

const error: A.Equals<Exclude<Any, Error<"Any">>, Error<"Any">> = 1;
error;
