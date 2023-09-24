import type { M } from "ts-algebra";

import type {
  FromExtendedSchemaOptions,
  FromSchemaDefaultOptions,
  FromSchemaOptions,
  JSONSchema7Extension,
  UnextendJSONSchema7,
  ExtendedJSONSchema7 as WritableExtendedJSONSchema7,
  ExtendedJSONSchema7Reference as WritableExtendedJSONSchema7Reference,
  JSONSchema7 as WritableJSONSchema7,
  JSONSchema7Reference as WritableJSONSchema7Reference,
} from "./definitions";
import type { ParseOptions } from "./parse-options";
import type { ParseSchema } from "./parse-schema";
import type { Readonly, Writable } from "./type-utils";

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
export type JSONSchema7 = WritableJSONSchema7 | Readonly<WritableJSONSchema7>;

/**
 * Unwidened extended V7 JSON schema (e.g. defined with the `as const` statement)
 */
export type ExtendedJSONSchema7<EXTENSION extends JSONSchema7Extension> =
  | WritableExtendedJSONSchema7<EXTENSION>
  | Readonly<WritableExtendedJSONSchema7<EXTENSION>>;

/**
 * Unwidened V7 JSON schema reference (e.g. defined with the `as const` statement)
 */
export type JSONSchema7Reference =
  | WritableJSONSchema7Reference
  | Readonly<WritableJSONSchema7Reference>;

/**
 * Unwidened extended V7 JSON schema reference (e.g. defined with the `as const` statement)
 */
export type ExtendedJSONSchema7Reference<
  EXTENSION extends JSONSchema7Extension,
> =
  | WritableExtendedJSONSchema7Reference<EXTENSION>
  | Readonly<WritableExtendedJSONSchema7Reference<EXTENSION>>;

/**
 * Unwidened JSON schema (e.g. defined with the `as const` statement)
 */
export type JSONSchema = JSONSchema7;

/**
 * Unwidened extended JSON schema (e.g. defined with the `as const` statement)
 */
export type ExtendedJSONSchema<EXTENSION extends JSONSchema7Extension> =
  ExtendedJSONSchema7<EXTENSION>;

/**
 * Given a JSON schema defined with the `as const` statement, infers the type of valid instances
 * @param SCHEMA JSON schema
 */
export type FromSchema<
  SCHEMA extends JSONSchema,
  OPTIONS extends FromSchemaOptions = FromSchemaDefaultOptions,
  WRITABLE_SCHEMA extends WritableJSONSchema7 = SCHEMA extends Record<
    string | number | symbol,
    unknown
  >
    ? Writable<SCHEMA>
    : SCHEMA,
> = M.$Resolve<
  ParseSchema<WRITABLE_SCHEMA, ParseOptions<WRITABLE_SCHEMA, OPTIONS>>
>;

/**
 * Given an extended JSON schema defined with the `as const` statement, infers the type of valid instances
 * @param SCHEMA JSON schema
 */
export type FromExtendedSchema<
  EXTENSION extends JSONSchema7Extension,
  SCHEMA extends ExtendedJSONSchema<EXTENSION>,
  OPTIONS extends FromExtendedSchemaOptions<EXTENSION> = FromSchemaDefaultOptions,
  UNEXTENDED_SCHEMA = UnextendJSONSchema7<EXTENSION, SCHEMA>,
> = UNEXTENDED_SCHEMA extends JSONSchema
  ? FromSchema<UNEXTENDED_SCHEMA, OPTIONS>
  : never;
