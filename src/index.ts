import type { M } from "ts-algebra";

import type {
  JSONSchema7 as $JSONSchema7,
  JSONSchema7Reference as $JSONSchema7Reference,
  JSONSchema7Extension,
  ExtendedJSONSchema7 as $ExtendedJSONSchema7,
  ExtendedJSONSchema7Reference as $ExtendedJSONSchema7Reference,
  UnextendJSONSchema7,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
  FromExtendedSchemaOptions,
} from "./definitions";
import type { ParseOptions } from "./parse-options";
import type { ParseSchema } from "./parse-schema";
import type { Cast, Readonly, Writable } from "./type-utils";

export type {
  DeserializationPattern,
  FromSchemaOptions,
  FromExtendedSchemaOptions,
  FromSchemaDefaultOptions,
  JSONSchema7Extension,
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
 * Unwidened extended V7 JSON schema (e.g. defined with the `as const` statement)
 */
export type ExtendedJSONSchema7<E extends JSONSchema7Extension> =
  | $ExtendedJSONSchema7<E>
  | Readonly<$ExtendedJSONSchema7<E>>;

/**
 * Unwidened V7 JSON schema reference (e.g. defined with the `as const` statement)
 */
export type JSONSchema7Reference =
  | $JSONSchema7Reference
  | Readonly<$JSONSchema7Reference>;

/**
 * Unwidened extended V7 JSON schema reference (e.g. defined with the `as const` statement)
 */
export type ExtendedJSONSchema7Reference<E extends JSONSchema7Extension> =
  | $ExtendedJSONSchema7Reference<E>
  | Readonly<$ExtendedJSONSchema7Reference<E>>;

/**
 * Unwidened JSON schema (e.g. defined with the `as const` statement)
 */
export type JSONSchema = JSONSchema7;

/**
 * Unwidened extended JSON schema (e.g. defined with the `as const` statement)
 */
export type ExtendedJSONSchema<E extends JSONSchema7Extension> =
  ExtendedJSONSchema7<E>;

/**
 * Given a JSON schema defined with the `as const` statement, infers the type of valid instances
 *
 * @param S JSON schema
 */
export type FromSchema<
  S extends JSONSchema,
  Opt extends FromSchemaOptions = FromSchemaDefaultOptions,
  W extends $JSONSchema7 = S extends Record<string | number | symbol, unknown>
    ? Writable<S>
    : S,
> = M.$Resolve<ParseSchema<W, ParseOptions<W, Opt>>>;

/**
 * Given an extended JSON schema defined with the `as const` statement, infers the type of valid instances
 *
 * @param S JSON schema
 */
export type FromExtendedSchema<
  E extends JSONSchema7Extension,
  S extends ExtendedJSONSchema<E>,
  Opt extends FromExtendedSchemaOptions<E> = FromSchemaDefaultOptions,
  W extends $ExtendedJSONSchema7<E> = Cast<
    S extends Record<string | number | symbol, unknown> ? Writable<S> : S,
    $ExtendedJSONSchema7<E>
  >,
> = FromSchema<Cast<UnextendJSONSchema7<E, W>, JSONSchema>, Opt>;
