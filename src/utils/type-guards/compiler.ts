import type {
  FromSchema,
  JSONSchema,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
} from "../../index";

/**
 * Any compiler function type (non type-guarding)
 */
export type $Compiler<C extends unknown[] = [], V extends unknown[] = []> = (
  schema: JSONSchema,
  ...compilingOptions: C
) => (data: unknown, ...validationOptions: V) => boolean;

/**
 * Adds type guarding to a validator function
 *
 * ```ts
 * const compiler: Compiler = <S extends JSONSchema, T = FromSchema<S>>(
 *   schema: S,
 * ) => (data: unknown): data is T => {
 *   const isDataValid: boolean = ... // Implement validation here
 *   return isDataValid;
 * };
 * ```
 */
export type Compiler<
  O extends FromSchemaOptions = FromSchemaDefaultOptions,
  C extends unknown[] = [],
  V extends unknown[] = []
> = <S extends JSONSchema, T = FromSchema<S, O>>(
  schema: S,
  ...compilingOptions: C
) => (data: unknown, ...validationOptions: V) => data is T;

type CompilerWrapper = <
  O extends FromSchemaOptions = FromSchemaDefaultOptions,
  C extends unknown[] = [],
  V extends unknown[] = []
>(
  compiler: $Compiler<C, V>
) => Compiler<O, C, V>;

/**
 * Adds type guarding to any compiler function (doesn't modify it)
 */
export const wrapCompilerAsTypeGuard: CompilerWrapper =
  <
    O extends FromSchemaOptions = FromSchemaDefaultOptions,
    C extends unknown[] = [],
    V extends unknown[] = []
  >(
    compiler: $Compiler<C, V>
  ) =>
  <S extends JSONSchema, T = FromSchema<S, O>>(
    schema: S,
    ...compilingOptions: C
  ) => {
    const validator = compiler(schema, ...compilingOptions);
    return (data: unknown, ...validationOptions: V): data is T =>
      validator(data, ...validationOptions);
  };
