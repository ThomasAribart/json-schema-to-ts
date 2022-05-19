import {
  FromSchema,
  JSONSchema,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "../index";

export type $Validator = (schema: JSONSchema, data: unknown) => boolean;

export type Validator<O extends FromSchemaOptions = FromSchemaDefaultOptions> =
  <S extends JSONSchema, T = FromSchema<S, O>>(
    schema: S,
    data: unknown
  ) => data is T;

type ValidatorWrapper = <
  O extends FromSchemaOptions = FromSchemaDefaultOptions
>(
  validator: $Validator
) => Validator<O>;

export const wrapValidatorAsTypeGuard: ValidatorWrapper =
  <O extends FromSchemaOptions = FromSchemaDefaultOptions>(
    validator: $Validator
  ) =>
  <S extends JSONSchema, T = FromSchema<S, O>>(
    schema: S,
    data: unknown
  ): data is T =>
    validator(schema, data);
