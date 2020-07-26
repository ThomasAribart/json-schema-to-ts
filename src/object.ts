import { FromWriteableSchema } from "./index";
import { ObjectSchema, Schema } from "./schema";
import { MergeRight } from "./utils";

export type FromObjectSchema<S> = S extends ObjectSchema
  ? "properties" extends keyof S
    ? MergeRight<
        "additionalProperties" extends keyof S
          ? S["additionalProperties"] extends true | object
            ? { [additionalProperties: string]: any }
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
    : object
  : never;
