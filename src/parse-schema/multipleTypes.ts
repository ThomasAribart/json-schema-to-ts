import type { JSONSchema7TypeName } from "json-schema";
import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";

export type MultipleTypesSchema = JSONSchema7 & { type: JSONSchema7TypeName[] };

export type ParseMultipleTypesSchema<
  P extends MultipleTypesSchema,
  O extends ParseSchemaOptions,
> = M.$Union<RecurseOnMixedSchema<P["type"], P, O>>;

type RecurseOnMixedSchema<
  S extends JSONSchema7TypeName[],
  P extends MultipleTypesSchema,
  O extends ParseSchemaOptions,
  R = never,
> = S extends [infer H, ...infer T]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends JSONSchema7TypeName
    ? T extends JSONSchema7TypeName[]
      ? RecurseOnMixedSchema<
          T,
          P,
          O,
          R | ParseSchema<Omit<P, "type"> & { type: H }, O>
        >
      : never
    : never
  : R;
