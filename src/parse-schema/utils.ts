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
 * Resets `additionalProperties` and `properties` from a sub-schema before merging it to a parent schema
 */
type RemoveInvalidAdditionalProperties<SCHEMA extends JSONSchema> =
  SCHEMA extends Readonly<{ additionalProperties: JSONSchema }>
    ? SCHEMA extends Readonly<{
        properties: Readonly<Record<string, JSONSchema>>;
      }>
      ? SCHEMA
      : SCHEMA & Readonly<{ properties: {} }>
    : SCHEMA extends boolean
      ? SCHEMA
      : Omit<SCHEMA, "additionalProperties">;

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
  CLEANED_SUB_SCHEMA extends JSONSchema = RemoveInvalidAdditionalProperties<
    RemoveInvalidAdditionalItems<SUB_SCHEMA>
  >,
> = Omit<
  PARENT_SCHEMA,
  | keyof CLEANED_SUB_SCHEMA
  | "additionalProperties"
  | "patternProperties"
  | "unevaluatedProperties"
  | "required"
  | "additionalItems"
> &
  CLEANED_SUB_SCHEMA;
