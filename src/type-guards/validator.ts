import {
  FromSchema,
  JSONSchema,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "../index";

export type Validator = (schema: JSONSchema, data: unknown) => boolean;

type ValidatorWrapper = <
  O extends FromSchemaOptions = FromSchemaDefaultOptions
>(
  validator: Validator
) => <S extends JSONSchema, T = FromSchema<S, O>>(
  schema: S,
  data: unknown
) => data is T;

export const wrapValidatorAsTypeGuard: ValidatorWrapper =
  <O extends FromSchemaOptions = FromSchemaDefaultOptions>(
    validator: Validator
  ) =>
  <S extends JSONSchema, T = FromSchema<S, O>>(
    schema: S,
    data: unknown
  ): data is T =>
    validator(schema, data);
