/**
 * Recursively sets all type properties as writable (non-readonly)
 *
 * @param TYPE Type
 * @return Type
 */
export type DeepWritable<TYPE> = TYPE extends unknown[]
  ? TYPE extends [infer HEAD, ...infer TAIL]
    ? [DeepWritable<HEAD>, ...DeepWritable<TAIL>]
    : TYPE extends (infer VALUES)[]
    ? DeepWritable<VALUES>[]
    : never
  : {
      -readonly [KEY in keyof TYPE]: DeepWritable<TYPE[KEY]>;
    };
