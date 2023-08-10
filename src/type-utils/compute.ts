import type { DoesExtend } from "./extends";
import type { If } from "./if";
import type { Key } from "./key";

export type Compute<TYPE, SEEN = never> = TYPE extends
  | Function
  | Error
  | Date
  | { readonly [Symbol.toStringTag]: string }
  | RegExp
  | Generator
  ? TYPE
  : If<
      DoesExtend<SEEN, TYPE>,
      TYPE,
      TYPE extends Array<unknown>
        ? TYPE extends Array<Record<Key, unknown>>
          ? Array<
              {
                [KEY in keyof TYPE[number]]: Compute<
                  TYPE[number][KEY],
                  TYPE | SEEN
                >;
              } & unknown
            >
          : TYPE
        : TYPE extends ReadonlyArray<unknown>
        ? TYPE extends ReadonlyArray<Record<string | number | symbol, unknown>>
          ? ReadonlyArray<
              {
                [KEY in keyof TYPE[number]]: Compute<
                  TYPE[number][KEY],
                  TYPE | SEEN
                >;
              } & unknown
            >
          : TYPE
        : { [KEY in keyof TYPE]: Compute<TYPE[KEY], TYPE | SEEN> } & unknown
    >;
