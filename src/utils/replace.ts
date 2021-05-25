import { O } from "ts-toolbelt";

import { DeepMergeUnsafe } from "./merge";

/**
 * Set a specified value to an object property or properties
 *
 * @param O Object
 * @param P Properties
 * @param V Value (type)
 * @return Object
 */
export type Replace<
  O extends O.Object,
  P extends keyof O,
  V,
  Req extends keyof O = O.RequiredKeys<O>,
  Opt extends keyof O = O.OptionalKeys<O>
> = DeepMergeUnsafe<
  DeepMergeUnsafe<Omit<O, P>, { [key in P & Req]: V }>,
  { [key in P & Opt]?: V }
>;
