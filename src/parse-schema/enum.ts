import { Enum, Intersection } from "../meta-types";
import { Get, HasKeyIn } from "../utils";

import { ParseSchema } from ".";

export type ParseEnumSchema<S> = HasKeyIn<S, "const" | "type"> extends true
  ? Intersection<Enum<Get<S, "enum">>, ParseSchema<Omit<S, "enum">>>
  : Enum<Get<S, "enum">>;
