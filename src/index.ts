import { M } from "ts-algebra";
import { A, O } from "ts-toolbelt";

import {
  JSONSchema7 as $JSONSchema7,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "./definitions";
import { ParseSchema } from "./parse-schema";

export { FromSchemaOptions, FromSchemaDefaultOptions } from "./definitions";

/**
 * Unwided JSON schema (e.g. defined with the `as const` statement)
 */
export type JSONSchema7 =
  | $JSONSchema7
  | O.Readonly<Extract<$JSONSchema7, O.Object>, A.Key, "deep">;

/**
 * Given a JSON schema defined with the `as const` statement, infers the type of valid instances
 *
 * @param S JSON schema
 */
export type FromSchema<
  S extends JSONSchema7,
  O extends FromSchemaOptions = FromSchemaDefaultOptions
> = M.$Resolve<
  ParseSchema<
    S extends O.Object ? O.Writable<S, A.Key, "deep"> : S,
    {
      parseNotKeyword: O["parseNotKeyword"] extends boolean
        ? O["parseNotKeyword"]
        : FromSchemaDefaultOptions["parseNotKeyword"];
      parseIfThenElseKeywords: O["parseIfThenElseKeywords"] extends boolean
        ? O["parseIfThenElseKeywords"]
        : FromSchemaDefaultOptions["parseIfThenElseKeywords"];
    }
  >
>;
