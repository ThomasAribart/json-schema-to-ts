import type { JSONSchema7 } from "~/definitions";

/**
 * Resets `additionalItems` property from a sub-schema before merging it to a parent schema
 */
type RemoveInvalidAdditionalItems<SCHEMA extends JSONSchema7> = SCHEMA extends {
  items: JSONSchema7 | JSONSchema7[];
}
  ? SCHEMA extends { additionalItems: JSONSchema7 }
    ? SCHEMA
    : SCHEMA & { additionalItems: true }
  : SCHEMA extends boolean
  ? SCHEMA
  : Omit<SCHEMA, "additionalItems">;

/**
 * Resets parent schema properties when merging a sub-schema into a parent schema
 */
type ParentSchemaOverrides = {
  properties: {};
  additionalProperties: true;
  required: [];
};

/**
 * Merges a sub-schema into a parent schema.
 *
 * Resets `properties`, `additionalProperties`, `required`, `additionalItems` if required.
 * @param PARENT_SCHEMA JSONSchema
 * @param SUB_SCHEMA JSONSchema
 * @returns JSONSchema
 */
export type MergeSubSchema<
  PARENT_SCHEMA extends JSONSchema7,
  SUB_SCHEMA extends JSONSchema7,
  CLEANED_SUB_SCHEMA extends JSONSchema7 = RemoveInvalidAdditionalItems<SUB_SCHEMA>,
  DEFAULTED_SUB_SCHEMA extends JSONSchema7 = Omit<
    ParentSchemaOverrides,
    keyof CLEANED_SUB_SCHEMA
  > &
    CLEANED_SUB_SCHEMA,
> = Omit<PARENT_SCHEMA, keyof DEFAULTED_SUB_SCHEMA> & DEFAULTED_SUB_SCHEMA;
