import type { DoesExtend } from "./extends";
import type { If } from "./if";
import type { Key } from "./key";

export type Compute<A, Seen = never> = A extends
  | Function
  | Error
  | Date
  | { readonly [Symbol.toStringTag]: string }
  | RegExp
  | Generator
  ? A
  : If<
      DoesExtend<Seen, A>,
      A,
      A extends Array<unknown>
        ? A extends Array<Record<Key, unknown>>
          ? Array<
              {
                [K in keyof A[number]]: Compute<A[number][K], A | Seen>;
              } & unknown
            >
          : A
        : A extends ReadonlyArray<unknown>
        ? A extends ReadonlyArray<Record<string | number | symbol, unknown>>
          ? ReadonlyArray<
              {
                [K in keyof A[number]]: Compute<A[number][K], A | Seen>;
              } & unknown
            >
          : A
        : { [K in keyof A]: Compute<A[K], A | Seen> } & unknown
    >;
