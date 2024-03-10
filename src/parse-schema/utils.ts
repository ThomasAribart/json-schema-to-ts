import { JSONSchema } from "~/definitions";

/**
 * Resets `additionalItems` property from a sub-schema before merging it to a parent schema
 */
type RemoveInvalidAdditionalItems<SCHEMA extends JSONSchema> =
  SCHEMA extends Readonly<{ items: JSONSchema | readonly JSONSchema[] }>
    ? SCHEMA extends Readonly<{ additionalItems: JSONSchema }>
      ? SCHEMA
      : SCHEMA & Readonly<{ additionalItems: true }>
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
  PARENT_SCHEMA extends JSONSchema,
  SUB_SCHEMA extends JSONSchema,
  CLEANED_SUB_SCHEMA extends
    JSONSchema = RemoveInvalidAdditionalItems<SUB_SCHEMA>,
  DEFAULTED_SUB_SCHEMA extends JSONSchema = Omit<
    ParentSchemaOverrides,
    keyof CLEANED_SUB_SCHEMA
  > &
    CLEANED_SUB_SCHEMA,
> = Omit<PARENT_SCHEMA, keyof DEFAULTED_SUB_SCHEMA> & DEFAULTED_SUB_SCHEMA;
