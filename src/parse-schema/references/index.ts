import type { S } from "ts-toolbelt";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchemaOptions } from "../index";
import type { ParseDefinitionSchema } from "./definitions";
import type { ParseExternalReferenceSchema } from "./references";

export type ReferenceSchema = JSONSchema7 & {
  $ref: string;
};

export type ParseReferenceSchema<
  Sc extends ReferenceSchema,
  O extends ParseSchemaOptions,
  R extends string[] = S.Split<Sc["$ref"], "#">,
> = R[0] extends ""
  ? ParseDefinitionSchema<Sc, O, R[1]>
  : ParseExternalReferenceSchema<Sc, O, R[0], R[1]>;
