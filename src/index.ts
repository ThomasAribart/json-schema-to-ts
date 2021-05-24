import { A, O } from "ts-toolbelt";
import { JSONSchema6Definition } from "json-schema";

import { JSONSchema6DefinitionWithoutInterface } from "./definitions";
import { Resolve } from "./meta-types";
import { ParseSchema } from "./parse-schema";

/**
 * Unwided JSON schema (e.g. defined with the `as const` statement)
 */
export type JSONSchema =
  | JSONSchema6Definition
  | boolean
  | O.Readonly<
      Exclude<JSONSchema6DefinitionWithoutInterface, boolean>,
      A.Key,
      "deep"
    >;

/**
 * Given a JSON schema defined with the `as const` statement, infers the type of valid instances
 *
 * @param S JSON schema
 */
export type FromSchema<S extends JSONSchema> = Resolve<
  ParseSchema<S extends object ? O.Writable<S, A.Key, "deep"> : S>
>;
