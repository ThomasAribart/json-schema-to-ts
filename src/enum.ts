import { FromWriteableSchema } from "./index";
import { Head, Tail } from "./utils";

export type FromEnumSchema<S> = "enum" extends keyof S
  ? "type" extends keyof S
    ? RecurseOnEnumSchema<S["enum"], FromWriteableSchema<Omit<S, "enum">>>
    : RecurseOnEnumSchema<S["enum"]>
  : never;

type RecurseOnEnumSchema<S, T = any, R = never> = {
  stop: R;
  continue: S extends any[]
    ? Head<S> extends T
      ? RecurseOnEnumSchema<Tail<S>, T, R | Head<S>>
      : RecurseOnEnumSchema<Tail<S>, T, R>
    : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
