import {
  Any,
  Never,
  Const,
  Litteral,
  Arr,
  Tuple,
  Object,
  Union,
  Intersection,
  Error,
} from "meta-types";

export const mAny = (): Any => ({ type: "any" });

export const mNever = (): Never => ({ type: "never" });

export const mConst = <T>(value: T): Const<T> => ({ type: "const", value });

export const mEnum = <T>(values: T): { type: "enum"; values: T } => ({
  type: "enum",
  values,
});

export const mLitteral = <T>(value: T): Litteral<T> => ({
  type: "litteral",
  value,
});

export const mArr = <T>(values: T): Arr<T> => ({ type: "array", values });

export const mTuple = <T, O, V>(
  values: T,
  isOpen: O,
  openProps: V
): Tuple<T, O, V> => ({
  type: "tuple",
  values,
  isOpen,
  openProps,
});

export const mObject = <T, R, O, V>(
  values: T,
  required: R,
  isOpen: O,
  openProps: V
): Object<T, R, O, V> => ({
  type: "object",
  values,
  required,
  isOpen,
  openProps,
});

export const mUnion = <T>(value: T): Union<T> => ({
  type: "union",
  values: value,
});

export const mIntersection = <L, R>(left: L, right: R): Intersection<L, R> => ({
  type: "intersection",
  left,
  right,
});

export const mError = <M>(message: M): Error<M> => ({ type: "error", message });
