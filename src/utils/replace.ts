import { UnsafeMergeRec } from "./merge";
import { OptionalProps } from "./optionalProps";
import { RequiredProps } from "./requiredProps";

/**
 * Set a specified value to an object property or properties
 *
 * @param O Object
 * @param P Properties
 * @param V Value (type)
 * @return Object
 */
export type Replace<
  O extends Record<string | number | symbol, any>,
  P extends keyof O,
  V,
  Req extends keyof O = RequiredProps<O>,
  Opt extends keyof O = OptionalProps<O>
> = UnsafeMergeRec<
  UnsafeMergeRec<Omit<O, P>, { [key in P & Req]: V }>,
  { [key in P & Opt]?: V }
>;
