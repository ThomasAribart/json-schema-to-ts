import { FromWriteableSchema } from "./index";
import { ObjectSchema, Schema } from "./schema";
import { MergeRight } from "./utils";

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

type AdditionalProps<A> = A extends false
  ? { [key: string]: never }
  : A extends true
  ? { [key: string]: any }
  : A extends Schema
  ? { [key: string]: FromWriteableSchema<A> }
  : {};

type PatternProps<P> = {
  [key: string]: {
    [key in keyof P]: FromWriteableSchema<P[key]>;
  }[keyof P];
};

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
