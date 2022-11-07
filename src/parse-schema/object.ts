import type { M } from "ts-algebra";

import type { JSONSchema7 } from "../definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";

export type ObjectSchema = JSONSchema7 & { type: "object" };

export type ParseObjectSchema<
  S extends ObjectSchema,
  O extends ParseSchemaOptions
> = S extends { properties: Record<string, JSONSchema7> }
  ? M.$Object<
      {
        [key in keyof S["properties"]]: ParseSchema<S["properties"][key], O>;
      },
      GetRequired<S>,
      GetOpenProps<S, O>
    >
  : M.$Object<{}, GetRequired<S>, GetOpenProps<S, O>>;

type GetRequired<S extends ObjectSchema> = S extends {
  required: ReadonlyArray<string>;
}
  ? S["required"][number]
  : never;

type GetOpenProps<
  S extends ObjectSchema,
  O extends ParseSchemaOptions
> = S extends { additionalProperties: JSONSchema7 }
  ? S extends { patternProperties: Record<string, JSONSchema7> }
    ? AdditionalAndPatternProps<
        S["additionalProperties"],
        S["patternProperties"],
        O
      >
    : ParseSchema<S["additionalProperties"], O>
  : S extends { patternProperties: Record<string, JSONSchema7> }
  ? PatternProps<S["patternProperties"], O>
  : M.Any;

type PatternProps<
  P extends Record<string, JSONSchema7>,
  O extends ParseSchemaOptions
> = M.$Union<
  {
    [key in keyof P]: ParseSchema<P[key], O>;
  }[keyof P]
>;

type AdditionalAndPatternProps<
  A extends JSONSchema7,
  P extends Record<string, JSONSchema7>,
  O extends ParseSchemaOptions
> = A extends boolean
  ? PatternProps<P, O>
  : M.$Union<
      | ParseSchema<A, O>
      | {
          [key in keyof P]: ParseSchema<P[key], O>;
        }[keyof P]
    >;
