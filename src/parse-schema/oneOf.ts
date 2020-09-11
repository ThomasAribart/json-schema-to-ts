import { Intersection, Union } from "../meta-types";
import { Tail, Head, Get, HasKeyIn, SafeMergeRec, Merge } from "../utils";

import { ParseSchema } from ".";

export type ParseOneOfSchema<S> = Union<
  RecurseOnOneOfSchema<Get<S, "oneOf">, S>
>;

type RecurseOnOneOfSchema<S, P, R = never> = {
  stop: R;
  continue: S extends any[]
    ? RecurseOnOneOfSchema<
        Tail<S>,
        P,
        | R
        | (HasKeyIn<P, "enum" | "const" | "type" | "anyOf"> extends true
            ? Intersection<
                ParseSchema<Omit<P, "oneOf">>,
                ParseSchema<
                  Merge<
                    Omit<P, "oneOf">,
                    SafeMergeRec<
                      {
                        properties: {};
                        additionalProperties: true;
                        required: [];
                      },
                      Head<S>
                    >
                  >
                >
              >
            : ParseSchema<SafeMergeRec<Omit<P, "oneOf">, Head<S>>>)
      >
    : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
