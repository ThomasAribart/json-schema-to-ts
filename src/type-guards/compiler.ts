import {
  FromSchema,
  JSONSchema,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "../index";

export type Compiler = (schema: JSONSchema) => (data: unknown) => boolean;

export const wrapCompilerAsTypeGuard =
  <O extends FromSchemaOptions = FromSchemaDefaultOptions>(
    validatorBuilder: Compiler
  ) =>
  <S extends JSONSchema, T = FromSchema<S, O>>(schema: S) => {
    const validator = validatorBuilder(schema);
    return (data: unknown): data is T => validator(data);
  };
