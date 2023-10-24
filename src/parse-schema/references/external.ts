import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";
import type { Join, Pop, Split } from "~/type-utils";

import type { ParseSchemaOptions } from "../index";
import type { ReferencingSchema } from "./index";
import type { ParseReference } from "./utils";

/**
 * Parse a JSON schema referencing an external JSON schema (through its `$ref` property) to a meta-type.
 * @param SCHEMA JSONSchema
 * @param OPTIONS Parsing options
 * @param REFERENCE_SOURCE JSONSchema
 * @param PATH_IN_SOURCE string | undefined
 * @returns Meta-type
 */
export type ParseExternalReferenceSchema<
  REF_SCHEMA extends ReferencingSchema,
  OPTIONS extends ParseSchemaOptions,
  EXTERNAL_REFERENCE_ID extends string,
  SUB_PATH extends string | undefined,
> = OPTIONS["references"] extends {
  [KEY in EXTERNAL_REFERENCE_ID]: JSONSchema7;
}
  ? ParseReference<
      Omit<REF_SCHEMA, "$ref">,
      OPTIONS,
      OPTIONS["references"][EXTERNAL_REFERENCE_ID],
      SUB_PATH
    >
  : OPTIONS extends { rootSchema: IdSchema }
  ? ParseExternalReferenceWithoutDirectorySchema<
      Omit<REF_SCHEMA, "$ref">,
      OPTIONS,
      EXTERNAL_REFERENCE_ID,
      SUB_PATH
    >
  : M.Never;

/**
 * Returns the directory of a reference.
 * @param REFERENCE String
 * @returns String
 * @example
 * type Directory = ParseDirectory<"some/directory/file">
 * // => "some/directory"
 */
type ParseDirectory<REFERENCE extends string> = Join<
  Pop<Split<REFERENCE, "/">>,
  "/"
>;

/**
 * JSON schema that can be referenced through its id
 * @example
 * const idSchema = {
 *  $id: "my-schema",
 *  type: "string",
 * }
 */
type IdSchema = JSONSchema7 & { $id: string };

/**
 * Parse a JSON schema referencing an external JSON schema (through its `$ref` property - no directory) to a meta-type.
 * @param SUB_SCHEMA JSONSchema
 * @param OPTIONS Parsing options
 * @param EXTERNAL_REFERENCE_ID String
 * @param DEFINITION String
 * @param SUB_PATH String | undefined
 * @returns Meta-type
 */
type ParseExternalReferenceWithoutDirectorySchema<
  SUB_SCHEMA extends JSONSchema7,
  OPTIONS extends ParseSchemaOptions & { rootSchema: IdSchema },
  EXTERNAL_REFERENCE_ID extends string,
  SUB_PATH extends string | undefined,
  DIRECTORY extends string = ParseDirectory<OPTIONS["rootSchema"]["$id"]>,
  COMPLETE_REFERENCE extends string = Join<
    [DIRECTORY, EXTERNAL_REFERENCE_ID],
    "/"
  >,
> = COMPLETE_REFERENCE extends keyof OPTIONS["references"]
  ? ParseReference<
      SUB_SCHEMA,
      OPTIONS,
      OPTIONS["references"][COMPLETE_REFERENCE],
      SUB_PATH
    >
  : M.Never;
