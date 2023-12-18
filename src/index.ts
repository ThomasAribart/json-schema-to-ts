import type { M } from "ts-algebra";

import type {
  ExtendedJSONSchema7,
  FromExtendedSchemaOptions,
  FromSchemaDefaultOptions,
  FromSchemaOptions,
  JSONSchema7,
  JSONSchema7Extension,
  UnextendJSONSchema7,
} from "./definitions";
import type { ParseOptions } from "./parse-options";
import type { ParseSchema } from "./parse-schema";

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
 * JSON Schema type constraint
 */
export type JSONSchema = JSONSchema7;

/**
 * Extended JSON Schema type constraint
 * @param EXTENSION JSONSchema7Extension
 * @returns Type
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
> = M.$Resolve<ParseSchema<SCHEMA, ParseOptions<SCHEMA, OPTIONS>>>;

/**
 * Given an extended JSON schema defined with the `as const` statement, infers the type of valid instances
 * @param SCHEMA JSON schema
 */
export type FromExtendedSchema<
  EXTENSION extends JSONSchema7Extension,
  SCHEMA extends ExtendedJSONSchema<EXTENSION>,
  OPTIONS extends
    FromExtendedSchemaOptions<EXTENSION> = FromSchemaDefaultOptions,
  UNEXTENDED_SCHEMA = UnextendJSONSchema7<EXTENSION, SCHEMA>,
> = UNEXTENDED_SCHEMA extends JSONSchema
  ? FromSchema<UNEXTENDED_SCHEMA, OPTIONS>
  : never;
