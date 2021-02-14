import { Get, And, Not } from "../../utils";

import { IsRepresentable } from "../utils";

import { Exclude } from ".";

export type CrossValue<V1, P1, R1, V2, P2, R2, X = Exclude<V1, V2>> = {
  sourceValue: V1;
  isPossibleInSource: P1;
  isRequiredInSource: R1;
  isPossibleInExcluded: P2;
  isRequiredInExcluded: R2;
  exclusionValue: X;
  isExclusionValueRepresentable: IsRepresentable<X>;
};

export type SourceValue<C> = Get<C, "sourceValue">;

type IsPossibleInSource<C> = Get<C, "isPossibleInSource">;

type IsRequiredInSource<C> = Get<C, "isRequiredInSource">;

type IsPossibleInExcluded<C> = Get<C, "isPossibleInExcluded">;

type IsRequiredInExcluded<C> = Get<C, "isRequiredInExcluded">;

export type ExclusionValue<C> = Get<C, "exclusionValue">;

export type IsExclusionValueRepresentable<C> = Get<
  C,
  "isExclusionValueRepresentable"
>;

export type IsOutsideOfSourceScope<C> = And<
  IsRequiredInExcluded<C>,
  Not<IsPossibleInSource<C>>
>;

export type IsOutsideOfExcludedScope<C> = And<
  IsRequiredInSource<C>,
  Not<IsPossibleInExcluded<C>>
>;

export type Propagate<C> = IsExclusionValueRepresentable<C> extends true
  ? ExclusionValue<C>
  : SourceValue<C>;

export type IsOmittable<C> = And<
  Not<IsRequiredInSource<C>>,
  IsRequiredInExcluded<C>
>;
