import type { M } from "ts-algebra";

import type {
  JSONSchema7 as $JSONSchema7,
  JSONSchema7Reference as $JSONSchema7Reference,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "./definitions";
import type { ParseOptions } from "./parse-options";
import type { ParseSchema } from "./parse-schema";
import type { Readonly, Writable } from "./type-utils";

export type {
  DeserializationPattern,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "./definitions";
export type { $Compiler, Compiler, $Validator, Validator } from "./utils";
export {
  wrapCompilerAsTypeGuard,
  wrapValidatorAsTypeGuard,
  asConst,
} from "./utils";

/**
 * Unwidened V7 JSON schema (e.g. defined with the `as const` statement)
 */
export type JSONSchema7 = $JSONSchema7 | Readonly<$JSONSchema7>;

/**
 * Unwidened V7 JSON schema reference (e.g. defined with the `as const` statement)
 */
export type JSONSchema7Reference =
  | $JSONSchema7Reference
  | Readonly<$JSONSchema7Reference>;

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
  S extends JSONSchema,
  Opt extends FromSchemaOptions = FromSchemaDefaultOptions,
  W extends $JSONSchema7 = Writable<S>,
> = M.$Resolve<ParseSchema<W, ParseOptions<W, Opt>>>;
