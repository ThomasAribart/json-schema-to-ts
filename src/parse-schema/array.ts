import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";
import type { And, DoesExtend, Tail, Not } from "~/type-utils";

import type { ParseSchema, ParseSchemaOptions } from "./index";

export type ArraySchema = JSONSchema7 & { type: "array" };

type SimpleArraySchema = JSONSchema7 & {
  type: "array";
  items: JSONSchema7;
};

type TupleSchema = JSONSchema7 & { type: "array"; items: JSONSchema7[] };

export type ParseArraySchema<
  SCHEMA extends ArraySchema,
  OPTIONS extends ParseSchemaOptions,
> = SCHEMA extends SimpleArraySchema
  ? M.$Array<ParseSchema<SCHEMA["items"], OPTIONS>>
  : SCHEMA extends TupleSchema
  ? M.$Union<
      ApplyMinMaxAndAdditionalItems<
        ParseTupleItems<SCHEMA["items"], OPTIONS>,
        SCHEMA,
        OPTIONS
      >
    >
  : M.$Array;

type ParseTupleItems<
  ITEM_SCHEMAS extends JSONSchema7[],
  OPTIONS extends ParseSchemaOptions,
> = ITEM_SCHEMAS extends [infer ITEM_SCHEMAS_HEAD, ...infer ITEM_SCHEMAS_TAIL]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    ITEM_SCHEMAS_HEAD extends JSONSchema7
    ? ITEM_SCHEMAS_TAIL extends JSONSchema7[]
      ? [
          ParseSchema<ITEM_SCHEMAS_HEAD, OPTIONS>,
          ...ParseTupleItems<ITEM_SCHEMAS_TAIL, OPTIONS>,
        ]
      : never
    : never
  : [];

type ApplyMinMaxAndAdditionalItems<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PARSED_ITEM_SCHEMAS extends any[],
  ROOT_SCHEMA extends ArraySchema,
  OPTIONS extends ParseSchemaOptions,
> = ApplyAdditionalItems<
  ApplyMinMax<
    PARSED_ITEM_SCHEMAS,
    ROOT_SCHEMA extends { minItems: number } ? ROOT_SCHEMA["minItems"] : 0,
    ROOT_SCHEMA extends { maxItems: number }
      ? ROOT_SCHEMA["maxItems"]
      : undefined
  >,
  ROOT_SCHEMA extends { additionalItems: JSONSchema7 }
    ? ROOT_SCHEMA["additionalItems"]
    : true,
  OPTIONS
>;

type ApplyMinMax<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RECURSED_PARSED_ITEM_SCHEMAS extends any[],
  MIN extends number,
  MAX extends number | undefined,
  RESULT = never,
  HAS_ENCOUNTERED_MIN extends boolean = false,
  HAS_ENCOUNTERED_MAX extends boolean = false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  INITIAL_PARSED_ITEM_SCHEMAS extends any[] = RECURSED_PARSED_ITEM_SCHEMAS,
> = And<
  Not<DoesExtend<MIN, RECURSED_PARSED_ITEM_SCHEMAS["length"]>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DoesExtend<RECURSED_PARSED_ITEM_SCHEMAS, [any, ...any[]]>
> extends true
  ? RECURSED_PARSED_ITEM_SCHEMAS extends [
      ...infer RECURSED_PARSED_ITEM_SCHEMAS_BODY,
      unknown,
    ]
    ? ApplyMinMax<
        RECURSED_PARSED_ITEM_SCHEMAS_BODY,
        MIN,
        MAX,
        RECURSED_PARSED_ITEM_SCHEMAS["length"] extends MAX
          ? M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS>
          : RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS>,
        HAS_ENCOUNTERED_MIN extends true
          ? true
          : DoesExtend<MIN, RECURSED_PARSED_ITEM_SCHEMAS["length"]>,
        HAS_ENCOUNTERED_MAX extends true
          ? true
          : DoesExtend<MAX, RECURSED_PARSED_ITEM_SCHEMAS["length"]>,
        INITIAL_PARSED_ITEM_SCHEMAS
      >
    : never
  : {
      result: MAX extends undefined
        ? RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS>
        : HAS_ENCOUNTERED_MAX extends true
        ? RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS>
        : MAX extends RECURSED_PARSED_ITEM_SCHEMAS["length"]
        ? M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS>
        : IsLongerThan<Tail<RECURSED_PARSED_ITEM_SCHEMAS>, MAX> extends true
        ? never
        : RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS>;
      hasEncounteredMin: DoesExtend<
        MIN,
        RECURSED_PARSED_ITEM_SCHEMAS["length"]
      >;
      hasEncounteredMax: HAS_ENCOUNTERED_MAX extends true
        ? true
        : MAX extends RECURSED_PARSED_ITEM_SCHEMAS["length"]
        ? true
        : IsLongerThan<Tail<RECURSED_PARSED_ITEM_SCHEMAS>, MAX>;
      completeTuple: INITIAL_PARSED_ITEM_SCHEMAS;
    };

type IsLongerThan<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TUPLE extends any[],
  LENGTH extends number | undefined,
  RESULT extends boolean = false,
> = LENGTH extends undefined
  ? false
  : TUPLE["length"] extends LENGTH
  ? true
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TUPLE extends [any, ...infer TUPLE_TAIL]
  ? IsLongerThan<TUPLE_TAIL, LENGTH>
  : RESULT;

type ApplyAdditionalItems<
  APPLY_MIN_MAX_RESULT extends {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result: any;
    hasEncounteredMin: boolean;
    hasEncounteredMax: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    completeTuple: any[];
  },
  ADDITIONAL_ITEMS_SCHEMA extends JSONSchema7,
  OPTIONS extends ParseSchemaOptions,
> = APPLY_MIN_MAX_RESULT extends { hasEncounteredMax: true }
  ? APPLY_MIN_MAX_RESULT extends { hasEncounteredMin: true }
    ? APPLY_MIN_MAX_RESULT["result"]
    : M.Never
  : ADDITIONAL_ITEMS_SCHEMA extends false
  ? APPLY_MIN_MAX_RESULT extends { hasEncounteredMin: true }
    ? APPLY_MIN_MAX_RESULT["result"]
    : M.Never
  : ADDITIONAL_ITEMS_SCHEMA extends true
  ? APPLY_MIN_MAX_RESULT extends { hasEncounteredMin: true }
    ?
        | APPLY_MIN_MAX_RESULT["result"]
        | M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], M.Any>
    : M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], M.Any>
  : APPLY_MIN_MAX_RESULT["hasEncounteredMin"] extends true
  ?
      | APPLY_MIN_MAX_RESULT["result"]
      | M.$Tuple<
          APPLY_MIN_MAX_RESULT["completeTuple"],
          ParseSchema<ADDITIONAL_ITEMS_SCHEMA, OPTIONS>
        >
  : M.$Tuple<
      APPLY_MIN_MAX_RESULT["completeTuple"],
      ParseSchema<ADDITIONAL_ITEMS_SCHEMA, OPTIONS>
    >;
