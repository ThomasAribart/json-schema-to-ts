import type { JSONSchema } from "~/definitions";
import type { Split } from "~/type-utils/split";

import type { ParseSchemaOptions } from "../index";
import type { ParseExternalReferenceSchema } from "./external";
import type { ParseInternalReferenceSchema } from "./internal";

/**
 * JSON schemas referencing other schemas
 */
export type ReferencingSchema = JSONSchema & {
  $ref: string;
};

/**
 * Recursively parses a JSON referencing another schema to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param REFERENCING_SCHEMA JSONSchema (referencing)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseReferenceSchema<
  REFERENCING_SCHEMA extends ReferencingSchema,
  OPTIONS extends ParseSchemaOptions,
  REFERENCE_ID_AND_PATH extends string[] = Split<
    REFERENCING_SCHEMA["$ref"],
    "#"
  >,
> = REFERENCE_ID_AND_PATH[0] extends ""
  ? ParseInternalReferenceSchema<
      REFERENCING_SCHEMA,
      OPTIONS,
      REFERENCE_ID_AND_PATH[1]
    >
  : ParseExternalReferenceSchema<
      REFERENCING_SCHEMA,
      OPTIONS,
      REFERENCE_ID_AND_PATH[0],
      REFERENCE_ID_AND_PATH[1]
    >;
