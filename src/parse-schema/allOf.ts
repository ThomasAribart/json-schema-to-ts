import { Any, Intersection } from "../meta-types";
import { Tail, Head, Get, HasKeyIn, SafeMergeRec, Merge } from "../utils";

import { ParseSchema } from ".";

export type ParseAllOfSchema<S> = RecurseOnAllOfSchema<
  Get<S, "allOf">,
  S,
  HasKeyIn<S, "enum" | "const" | "type" | "anyOf" | "oneOf"> extends true
    ? ParseSchema<Omit<S, "allOf">>
    : Any
>;

type RecurseOnAllOfSchema<V, S, R> = {
  stop: R;
  continue: V extends any[]
    ? RecurseOnAllOfSchema<
        Tail<V>,
        S,
        Intersection<
          ParseSchema<
            Merge<
              Omit<S, "allOf">,
              SafeMergeRec<
                { properties: {}; additionalProperties: true; required: [] },
                Head<V>
              >
            >
          >,
          R
        >
      >
    : never;
}[V extends [any, ...any[]] ? "continue" : "stop"];
