/**
 * Recursively sets all type properties as writable (non-readonly)
 * @param TYPE Type
 * @returns Type
 */
export type DeepWritable<TYPE> = TYPE extends
  | number
  | string
  | boolean
  | bigint
  | symbol
  | undefined
  | null
  | Function
  ? TYPE
  : TYPE extends unknown[]
  ? TYPE extends [infer HEAD, ...infer TAIL]
    ? [DeepWritable<HEAD>, ...DeepWritable<TAIL>]
    : TYPE extends (infer VALUES)[]
    ? DeepWritable<VALUES>[]
    : never
  : {
      -readonly [KEY in keyof TYPE]: DeepWritable<TYPE[KEY]>;
    };
