import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";

export type NullableSchema = JSONSchema7 & { nullable: boolean };

export type ParseNullableSchema<
  SCHEMA extends NullableSchema,
  OPTIONS extends ParseSchemaOptions,
  PARSED_REST_SCHEMA = ParseSchema<Omit<SCHEMA, "nullable">, OPTIONS>,
> = SCHEMA extends { nullable: true }
  ? M.$Union<M.Primitive<null> | PARSED_REST_SCHEMA>
  : PARSED_REST_SCHEMA;
