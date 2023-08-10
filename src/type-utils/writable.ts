/**
 * Recursively sets all type properties as writable (non-readonly)
 *
 * @param TYPE Type
 * @return Type
 */
export type DeepWritable<TYPE> = {
  -readonly [KEY in keyof TYPE]: DeepWritable<TYPE[KEY]>;
};
