import type { JSONSchema7 } from "~/definitions";
import type { Split } from "~/type-utils/split";

import type { ParseSchemaOptions } from "../index";
import type { ParseDefinitionSchema } from "./definitions";
import type { ParseExternalReferenceSchema } from "./references";

export type ReferenceSchema = JSONSchema7 & {
  $ref: string;
};

export type ParseReferenceSchema<
  Sc extends ReferenceSchema,
  O extends ParseSchemaOptions,
  R extends string[] = Split<Sc["$ref"], "#">,
> = R[0] extends ""
  ? ParseDefinitionSchema<Sc, O, R[1]>
  : ParseExternalReferenceSchema<Sc, O, R[0], R[1]>;
