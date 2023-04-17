import { Pop } from "./pop";

type RecSplit<
  S extends string,
  D extends string = "",
> = S extends `${infer BS}${D}${infer AS}` ? [BS, ...RecSplit<AS, D>] : [S];

export type Split<
  S extends string,
  D extends string = "",
  R extends string[] = RecSplit<S, D>,
> = D extends "" ? Pop<R> : R;
