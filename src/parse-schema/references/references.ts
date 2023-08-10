import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";
import type { Join, Pop, Split } from "~/type-utils";

import type { ParseSchemaOptions } from "../index";
import type { ReferenceSchema } from "./index";
import type { ParseReference } from "./utils";

export type ParseExternalReferenceSchema<
  REF_SCHEMA extends ReferenceSchema,
  OPTIONS extends ParseSchemaOptions,
  REFERENCE extends string,
  DEFINITION extends string | undefined,
  REST_SCHEMA extends JSONSchema7 = Omit<REF_SCHEMA, "$ref">,
> = REFERENCE extends keyof OPTIONS["references"]
  ? ParseReference<
      OPTIONS["references"][REFERENCE],
      OPTIONS,
      DEFINITION,
      REST_SCHEMA
    >
  : OPTIONS extends { rootSchema: IdSchema }
  ? ParseExternalReferenceWithIdSchema<
      OPTIONS,
      REFERENCE,
      DEFINITION,
      REST_SCHEMA
    >
  : M.Never;

type ParseDomain<REFERENCE extends string> = Join<
  Pop<Split<REFERENCE, "/">>,
  "/"
>;

type IdSchema = JSONSchema7 & { $id: string };

type ParseExternalReferenceWithIdSchema<
  OPTIONS extends ParseSchemaOptions & { rootSchema: IdSchema },
  REFERENCE extends string,
  DEFINITION extends string | undefined,
  REST_SCHEMA extends JSONSchema7,
  DOMAIN extends string = ParseDomain<OPTIONS["rootSchema"]["$id"]>,
  COMPLETE_REFERENCE extends string = Join<[DOMAIN, REFERENCE], "/">,
> = COMPLETE_REFERENCE extends keyof OPTIONS["references"]
  ? ParseReference<
      OPTIONS["references"][COMPLETE_REFERENCE],
      OPTIONS,
      DEFINITION,
      REST_SCHEMA
    >
  : M.Never;
