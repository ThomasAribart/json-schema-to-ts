import { FromWriteableSchema } from "./index";
import { Tail, Head } from "./utils";

export type FromAnyOfSchema<S> = "anyOf" extends keyof S
  ? S["anyOf"] extends any[]
    ? Extract<"enum" | "const" | "type", keyof S> extends never
      ? RecurseOnAnyOfSchema<S["anyOf"]>
      : RecurseOnAnyOfSchema<S["anyOf"], FromWriteableSchema<Omit<S, "anyOf">>>
    : "TypeError: Value of anyOf should be an array"
  : never;

type RecurseOnAnyOfSchema<S, T = unknown, R = never> = {
  stop: R & T;
  continue: S extends any[]
    ? RecurseOnAnyOfSchema<Tail<S>, T, R | FromWriteableSchema<Head<S>>>
    : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
