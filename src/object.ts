import { FromWriteableSchema } from "./index";
import { ObjectSchema, Schema } from "./schema";
import { MergeRight } from "./utils";

/**
 * Given a JSON schema of `object` type, infers the type of valid instances
 *
 * Args:
 * - `Schema`: JSON schema
 */
export type FromObjectSchema<S> = S extends ObjectSchema
  ? "properties" extends keyof S
    ? MergeRight<
        "additionalProperties" extends keyof S
          ? S["additionalProperties"] extends true | object
            ? { [key: string]: any }
            : {}
          : {},
        number extends keyof S["required"]
          ? MergeRight<
              {
                [key in Exclude<
                  keyof S["properties"],
                  S["required"][number]
                >]?: S["properties"][key] extends Schema
                  ? FromWriteableSchema<S["properties"][key]>
                  : never;
              },
              {
                [key in S["required"][number]]: FromWriteableSchema<
                  S["properties"][key]
                >;
              }
            >
          : {
              [key in keyof S["properties"]]?: S["properties"][key] extends Schema
                ? FromWriteableSchema<S["properties"][key]>
                : never;
            }
      >
    : "additionalProperties" extends keyof S
    ? "patternProperties" extends keyof S
      ? AdditionalAndPatternProps<
          S["additionalProperties"],
          S["patternProperties"]
        >
      : AdditionalProps<S["additionalProperties"]>
    : "patternProperties" extends keyof S
    ? PatternProps<S["patternProperties"]>
    : object
  : never;

/**
 * Given the `additionalProperties` value of an object JSON schema, returns the inferred type
 *
 * Args:
 * - `AdditionalProps`: Value of an object JSON schema `additionalProperties`
 */
type AdditionalProps<A> = A extends false
  ? { [key: string]: never }
  : A extends true
  ? { [key: string]: any }
  : A extends Schema
  ? { [key: string]: FromWriteableSchema<A> }
  : {};

/**
 * Given the `patternProperties` value of an object JSON schema, returns the inferred type
 *
 * Args:
 * - `PatternProps`: Value of an object JSON schema `patternProperties`
 */
type PatternProps<P> = {
  [key: string]: {
    [key in keyof P]: FromWriteableSchema<P[key]>;
  }[keyof P];
};

/**
 * Given the `additionalProperties` and `patternProperties` value of an object JSON schema, returns the inferred type
 *
 * Args:
 * - `AdditionalProps`: Value of an object JSON schema `additionalProperties`
 * - `PatternProps`: Value of an object JSON schema  `patternProperties`
 */
type AdditionalAndPatternProps<A, P> = A extends boolean
  ? PatternProps<P>
  : A extends Schema
  ? {
      [key: string]:
        | FromWriteableSchema<A>
        | {
            [key in keyof P]: FromWriteableSchema<P[key]>;
          }[keyof P];
    }
  : never;
