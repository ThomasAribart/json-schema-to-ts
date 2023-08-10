import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchema, ParseSchemaOptions } from "./index";
import type { MergeSubSchema } from "./utils";

export type IfThenElseSchema = JSONSchema7 & {
  if: JSONSchema7;
  then?: JSONSchema7;
  else?: JSONSchema7;
};

export type ParseIfThenElseSchema<
  SCHEMA extends IfThenElseSchema,
  OPTIONS extends ParseSchemaOptions,
  REST_SCHEMA extends JSONSchema7 = Omit<SCHEMA, "if" | "then" | "else">,
  IF_SCHEMA extends JSONSchema7 = MergeSubSchema<REST_SCHEMA, SCHEMA["if"]>,
  PARSED_THEN_SCHEMA = SCHEMA extends { then: JSONSchema7 }
    ? M.$Intersect<
        ParseSchema<IF_SCHEMA, OPTIONS>,
        ParseSchema<MergeSubSchema<REST_SCHEMA, SCHEMA["then"]>, OPTIONS>
      >
    : ParseSchema<IF_SCHEMA, OPTIONS>,
  PARSED_ELSE_SCHEMA = SCHEMA extends { else: JSONSchema7 }
    ? M.$Intersect<
        M.$Exclude<
          ParseSchema<REST_SCHEMA, OPTIONS>,
          ParseSchema<IF_SCHEMA, OPTIONS>
        >,
        ParseSchema<MergeSubSchema<REST_SCHEMA, SCHEMA["else"]>, OPTIONS>
      >
    : M.$Exclude<
        ParseSchema<REST_SCHEMA, OPTIONS>,
        ParseSchema<IF_SCHEMA, OPTIONS>
      >,
> = M.$Intersect<
  M.$Union<PARSED_THEN_SCHEMA | PARSED_ELSE_SCHEMA>,
  ParseSchema<REST_SCHEMA, OPTIONS>
>;
