import type { JSONSchema7 } from "~/definitions";
import type { Split } from "~/type-utils/split";

import type { ParseSchemaOptions } from "../index";
import type { ParseDefinitionSchema } from "./definitions";
import type { ParseExternalReferenceSchema } from "./references";

export type ReferenceSchema = JSONSchema7 & {
  $ref: string;
};

export type ParseReferenceSchema<
  REF_SCHEMA extends ReferenceSchema,
  OPTIONS extends ParseSchemaOptions,
  REF_AND_DEFINITION extends string[] = Split<REF_SCHEMA["$ref"], "#">,
> = REF_AND_DEFINITION[0] extends ""
  ? ParseDefinitionSchema<REF_SCHEMA, OPTIONS, REF_AND_DEFINITION[1]>
  : ParseExternalReferenceSchema<
      REF_SCHEMA,
      OPTIONS,
      REF_AND_DEFINITION[0],
      REF_AND_DEFINITION[1]
    >;
