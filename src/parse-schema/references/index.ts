import { S } from "ts-toolbelt";

import { JSONSchema7 } from "../../definitions";
import { ParseSchemaOptions } from "../index";

import { ParseDefinitionSchema } from "./definitions";
import { ParseExternalReferenceSchema } from "./references";

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
