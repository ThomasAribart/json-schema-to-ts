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

const anysNeverExclude: A.Equals<Exclude<Never, Any>, Never> = 1;
anysNeverExclude;

// --- NEVER ---

const neversNeverExclude: A.Equals<Exclude<Never, Never>, Never> = 1;
neversNeverExclude;

// --- CONSTS ---

const constsNeverExclude: A.Equals<Exclude<Never, Const<"foo">>, Never> = 1;
constsNeverExclude;

// --- ENUM ---

const enumsNeverExclude: A.Equals<
  Exclude<Never, Enum<"foo" | "bar" | 42>>,
  Never
> = 1;
enumsNeverExclude;

// --- PRIMITIVES ---

const primitivesNeverExclude: A.Equals<
  Exclude<Never, Primitive<string>>,
  Never
> = 1;
primitivesNeverExclude;

// --- ARRAY ---

const arraysNeverExclude: A.Equals<
  Exclude<Never, Arr<Primitive<string>>>,
  Never
> = 1;
arraysNeverExclude;

// --- TUPLE ---

const tuplesNeverExclude: A.Equals<
  Exclude<Never, Tuple<[Primitive<string>]>>,
  Never
> = 1;
tuplesNeverExclude;

// --- OBJECT ---

const objectsNeverExclude: A.Equals<Exclude<Never, Object>, Never> = 1;
objectsNeverExclude;

// --- UNION ---

const unionsNeverExclude: A.Equals<
  Exclude<Never, Union<Any | Arr<Primitive<number>>>>,
  Never
> = 1;
unionsNeverExclude;

// --- INTERSECTION ---

const intersectionsNeverExclude: A.Equals<
  Exclude<Never, Intersection<Any, Any>>,
  Never
> = 1;
intersectionsNeverExclude;

// --- EXCLUSION ---

const exclusionsNeverExclude: A.Equals<
  Exclude<Never, Exclusion<Any, Const<"A">>>,
  Never
> = 1;
exclusionsNeverExclude;

// --- ERROR ---

const error: A.Equals<Exclude<Any, Error<"Any">>, Error<"Any">> = 1;
error;
