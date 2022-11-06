import type {
  FromSchema,
  JSONSchema,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "../../index";

/**
 * Any validator function type (non type-guarding)
 */
export type $Validator<V extends unknown[] = []> = (
  schema: JSONSchema,
  data: unknown,
  ...validationOptions: V
) => boolean;

/**
 * Adds type guarding to a validator function
 *
 * ```ts
 * const validate: Validator = <S extends JSONSchema, T = FromSchema<S>>(
 *   schema: S,
 *   data: unknown
 * ): data is T => {
 *   const isDataValid: boolean = ... // Implement validation here
 *   return isDataValid;
 * };
 * ```
 */
export type Validator<
  O extends FromSchemaOptions = FromSchemaDefaultOptions,
  V extends unknown[] = []
> = <S extends JSONSchema, T = FromSchema<S, O>>(
  schema: S,
  data: unknown,
  ...validationOptions: V
) => data is T;

type ValidatorWrapper = <
  O extends FromSchemaOptions = FromSchemaDefaultOptions,
  V extends unknown[] = []
>(
  validator: $Validator<V>
) => Validator<O, V>;

/**
 * Adds type guarding to any validator function (doesn't modify it)
 */
export const wrapValidatorAsTypeGuard: ValidatorWrapper =
  <
    O extends FromSchemaOptions = FromSchemaDefaultOptions,
    V extends unknown[] = []
  >(
    validator: $Validator<V>
  ) =>
  <S extends JSONSchema, T = FromSchema<S, O>>(
    schema: S,
    data: unknown,
    ...validationOptions: V
  ): data is T =>
    validator(schema, data, ...validationOptions);
