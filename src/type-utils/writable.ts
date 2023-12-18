/**
 * Recursively sets all type properties as writable (non-readonly)
 * @param TYPE Type
 * @returns Type
 */
export type Writable<TYPE> = TYPE extends
  | ((...args: unknown[]) => unknown)
  | Date
  | RegExp
  ? TYPE
  : // maps
    TYPE extends ReadonlyMap<infer KEYS, infer VALUES>
    ? Map<Writable<KEYS>, Writable<VALUES>>
    : // sets
      TYPE extends ReadonlySet<infer VALUES>
      ? Set<Writable<VALUES>>
      : TYPE extends ReadonlyArray<unknown>
        ? // tuples
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
          `${bigint}` extends `${keyof TYPE & any}`
          ? { -readonly [KEY in keyof TYPE]: Writable<TYPE[KEY]> }
          : // arrays
            Writable<TYPE[number]>[]
        : // objects
          TYPE extends object
          ? { -readonly [KEY in keyof TYPE]: Writable<TYPE[KEY]> }
          : // primitive or literal value
            TYPE;
