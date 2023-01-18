import { Pop } from "./pop";

type RecSplit<
  S extends string,
  D extends string = "",
  R extends string[] = [],
> = S extends `${infer BS}${D}${infer AS}`
  ? RecSplit<AS, D, [...R, BS]>
  : [...R, S];

export type Split<
  S extends string,
  D extends string = "",
  R extends string[] = RecSplit<S, D>,
> = D extends "" ? Pop<R> : R;
