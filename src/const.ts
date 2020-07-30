import { FromWriteableSchema } from "./index";

/**
 * Given a JSON schema with the `const` property, returns the type of valid instances
 *
 * Args:
 * - `Schema`: JSON schema
 */
export type FromConstSchema<S> = "const" extends keyof S
  ? "type" extends keyof S
    ? S["const"] extends FromWriteableSchema<Omit<S, "const">>
      ? S["const"]
      : "TypeError: value of const doesn't extend provided type"
    : S["const"]
  : never;
