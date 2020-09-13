import { Enum, Intersection } from "../meta-types";
import { GetRec, HasKeyIn } from "../utils";

import { ParseSchema } from ".";

export type ParseEnumSchema<S> = HasKeyIn<S, "const" | "type"> extends true
  ? Intersection<
      Enum<GetRec<S, ["enum", number]>>,
      ParseSchema<Omit<S, "enum">>
    >
  : Enum<GetRec<S, ["enum", number]>>;
