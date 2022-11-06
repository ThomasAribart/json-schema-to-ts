import type { S } from "ts-toolbelt";

import type { JSONSchema7 } from "../../definitions";
import type { ParseSchemaOptions } from "../index";

import type { ParseDefinitionSchema } from "./definitions";
import type { ParseExternalReferenceSchema } from "./references";

export type ReferenceSchema = JSONSchema7 & {
  $ref: string;
};

export type ParseReferenceSchema<
  S extends ReferenceSchema,
  O extends ParseSchemaOptions,
  R extends string[] = S.Split<S["$ref"], "#">
> = R[0] extends ""
  ? ParseDefinitionSchema<S, O, R[1]>
  : ParseExternalReferenceSchema<S, O, R[0], R[1]>;
