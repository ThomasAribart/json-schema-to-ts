import { M } from "ts-algebra";

import { JSONSchema7 } from "../definitions";

import { ParseSchema, ParseSchemaOptions } from "./index";
import { MergeSubSchema } from "./utils";

export type DefinitionSchema<O extends ParseSchemaOptions> = JSONSchema7 & {
  $ref: `#/${O["definitionsPath"]}/${string}`;
};

export type ParseDefinitionSchema<
  S extends DefinitionSchema<O>,
  O extends ParseSchemaOptions,
  R extends JSONSchema7 = Omit<S, "$ref">
> = S["$ref"] extends `#/${O["definitionsPath"]}/${infer DefinitionName}`
  ? O["definitions"] extends Record<DefinitionName, JSONSchema7>
    ? M.$Intersect<
        ParseSchema<O["definitions"][DefinitionName], O>,
        ParseSchema<MergeSubSchema<O["definitions"][DefinitionName], R>, O>
      >
    : ParseSchema<R, O>
  : never;
