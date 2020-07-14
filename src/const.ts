import { FromWriteableSchema } from "./index";

export type FromConstSchema<S> = "const" extends keyof S
  ? "type" extends keyof S
    ? S["const"] extends FromWriteableSchema<Omit<S, "const" | "enum">>
      ? S["const"]
      : never
    : S["const"]
  : never;
