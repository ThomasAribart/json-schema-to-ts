import { M } from "ts-algebra";
import { O } from "ts-toolbelt";

import type {
  JSONSchema7 as $JSONSchema7,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "./definitions";
import type { ParseSchema } from "./parse-schema";
import type { Readonly, Writable } from "./utils";

export { FromSchemaOptions, FromSchemaDefaultOptions } from "./definitions";

/**
 * Unwidened V7 JSON schema (e.g. defined with the `as const` statement)
 */
export type JSONSchema7 = $JSONSchema7 | Readonly<$JSONSchema7>;

/**
 * Unwidened JSON schema (e.g. defined with the `as const` statement)
 */
export type JSONSchema = JSONSchema7;

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
    S extends O.Object ? Writable<S> : S,
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
