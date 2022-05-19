import {
  FromSchema,
  JSONSchema,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "../index";

export type Validator = (schema: JSONSchema, data: unknown) => boolean;

export const wrapValidatorAsTypeGuard =
  <O extends FromSchemaOptions = FromSchemaDefaultOptions>(
    validator: Validator
  ) =>
  <S extends JSONSchema, T = FromSchema<S, O>>(
    schema: S,
    data: unknown
  ): data is T =>
    validator(schema, data);
