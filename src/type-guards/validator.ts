import {
  FromSchema,
  JSONSchema,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "../index";

export type $Validator<V extends unknown[] = []> = (
  schema: JSONSchema,
  data: unknown,
  ...validationOptions: V
) => boolean;

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
