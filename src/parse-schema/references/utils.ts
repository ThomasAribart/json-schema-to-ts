import type { M } from "ts-algebra";

import type { JSONSchema } from "~/definitions";
import type { DeepGet, Split, Tail } from "~/type-utils";

import type { ParseSchema, ParseSchemaOptions } from "../index";
import type { MergeSubSchema } from "../utils";

/**
 * Recursively parses a referencing JSON schema to a meta-type, finding its reference in a reference source JSON schema (from options or definitions).
 * @param SCHEMA JSONSchema
 * @param OPTIONS Parsing options
 * @param REFERENCE_SOURCE JSONSchema
 * @param PATH_IN_SOURCE string | undefined
 * @returns Meta-type
 */
export type ParseReference<
  SCHEMA extends JSONSchema,
  OPTIONS extends ParseSchemaOptions,
  REFERENCE_SOURCE extends JSONSchema,
  PATH_IN_SOURCE extends string | undefined,
  MATCHING_REFERENCE extends JSONSchema = PATH_IN_SOURCE extends string
    ? // Tail is needed to remove initial "" from split path
      DeepGet<REFERENCE_SOURCE, Tail<Split<PATH_IN_SOURCE, "/">>, false>
    : REFERENCE_SOURCE,
> = M.$Intersect<
  ParseSchema<MATCHING_REFERENCE, OPTIONS>,
  ParseSchema<MergeSubSchema<MATCHING_REFERENCE, SCHEMA>, OPTIONS>
>;
