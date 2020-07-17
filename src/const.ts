import { FromWriteableSchema } from "./index";

export type FromConstSchema<S> = "const" extends keyof S
  ? "type" extends keyof S
    ? S["const"] extends FromWriteableSchema<Omit<S, "const">>
      ? S["const"]
      : "TypeError: value of const doesn't extend provided type"
    : S["const"]
  : never;
