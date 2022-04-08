import { JSONSchema7 } from "../definitions";

export type RemoveInvalidAdditionalItems<S extends JSONSchema7> = S extends {
  items: JSONSchema7 | JSONSchema7[];
}
  ? S extends { additionalItems: JSONSchema7 }
    ? S
    : S & { additionalItems: true }
  : S extends boolean
  ? S
  : Omit<S, "additionalItems">;

type EmptySchema = { properties: {}; additionalProperties: true; required: [] };

// TOIMPROVE: Investigate on unevaluatedItems
export type MergeSubSchema<
  P extends JSONSchema7,
  S extends JSONSchema7,
  R extends JSONSchema7 = RemoveInvalidAdditionalItems<S>,
  C extends JSONSchema7 = Omit<EmptySchema, keyof R> & R
> = Omit<P, keyof C> & C;
