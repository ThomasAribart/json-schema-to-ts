import type { JSONSchema7 } from "~/definitions";

type RemoveInvalidAdditionalItems<SCHEMA extends JSONSchema7> = SCHEMA extends {
  items: JSONSchema7 | JSONSchema7[];
}
  ? SCHEMA extends { additionalItems: JSONSchema7 }
    ? SCHEMA
    : SCHEMA & { additionalItems: true }
  : SCHEMA extends boolean
  ? SCHEMA
  : Omit<SCHEMA, "additionalItems">;

type EmptySchema = { properties: {}; additionalProperties: true; required: [] };

// TOIMPROVE: Investigate on unevaluatedItems
export type MergeSubSchema<
  ROOT_SCHEMA extends JSONSchema7,
  SUB_SCHEMA extends JSONSchema7,
  CLEANED_SUB_SCHEMA extends JSONSchema7 = RemoveInvalidAdditionalItems<SUB_SCHEMA>,
  DEFAULTED_SUB_SCHEMA extends JSONSchema7 = Omit<
    EmptySchema,
    keyof CLEANED_SUB_SCHEMA
  > &
    CLEANED_SUB_SCHEMA,
> = Omit<ROOT_SCHEMA, keyof DEFAULTED_SUB_SCHEMA> & DEFAULTED_SUB_SCHEMA;
