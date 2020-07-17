import { FromWriteableSchema } from "./index";
import { Head, Tail } from "./utils";

export type FromEnumSchema<S> = "enum" extends keyof S
  ? S["enum"] extends any[]
    ? Extract<"const" | "type", keyof S> extends never
      ? RecurseOnEnumSchema<S["enum"]>
      : RecurseOnEnumSchema<S["enum"], FromWriteableSchema<Omit<S, "enum">>>
    : "TypeError: value of enum should be an array"
  : never;

type RecurseOnEnumSchema<S, T = any, R = never> = {
  stop: number extends keyof S ? S[number] | R : R;
  continue: S extends any[]
    ? Head<S> extends T
      ? RecurseOnEnumSchema<Tail<S>, T, R | Head<S>>
      : RecurseOnEnumSchema<Tail<S>, T, R>
    : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
