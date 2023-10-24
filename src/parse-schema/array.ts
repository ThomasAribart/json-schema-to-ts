/* eslint-disable max-lines */
import type { M } from "ts-algebra";

import type { JSONSchema7 } from "~/definitions";
import type { And, DoesExtend, Not, Tail } from "~/type-utils";

import type { ParseSchema, ParseSchemaOptions } from "./index";

/**
 * JSON schemas of arrays or tuples
 * @example
 * const arraySchema = {
 *  type: "array",
 *  items: { type: "string" }
 * }
 *
 * const tupleSchema = {
 *  type: "array",
 *  items: [{ type: "string" }]
 * }
 */
export type ArrayOrTupleSchema = JSONSchema7 & { type: "array" };

/**
 * JSON schemas of arrays
 * @example
 * const arraySchema = {
 *  type: "array",
 *  items: { type: "string" }
 * }
 */
type ArraySchema = JSONSchema7 & { type: "array"; items: JSONSchema7 };

/**
 * JSON schemas of tuples
 * @example
 * const arraySchema = {
 *  type: "array",
 *  items: [{ type: "string" }]
 * }
 */
type TupleSchema = JSONSchema7 & { type: "array"; items: JSONSchema7[] };

/**
 * Recursively parses an array or tuple JSON schema to a meta-type.
 *
 * Check the [ts-algebra documentation](https://github.com/ThomasAribart/ts-algebra) for more informations on how meta-types work.
 * @param ARRAY_OR_TUPLE_SCHEMA JSONSchema (array or tuple type)
 * @param OPTIONS Parsing options
 * @returns Meta-type
 */
export type ParseArrayOrTupleSchema<
  ARRAY_OR_TUPLE_SCHEMA extends ArrayOrTupleSchema,
  OPTIONS extends ParseSchemaOptions,
> = ARRAY_OR_TUPLE_SCHEMA extends ArraySchema
  ? M.$Array<ParseSchema<ARRAY_OR_TUPLE_SCHEMA["items"], OPTIONS>>
  : ARRAY_OR_TUPLE_SCHEMA extends TupleSchema
  ? M.$Union<
      ApplyMinMaxAndAdditionalItems<
        ParseTupleItems<ARRAY_OR_TUPLE_SCHEMA["items"], OPTIONS>,
        ARRAY_OR_TUPLE_SCHEMA,
        OPTIONS
      >
    >
  : M.$Array;

/**
 * Parses the items of a tuple JSON schema to a meta-type.
 * @param ITEM_SCHEMAS JSONSchema[]
 * @param OPTIONS Parsing options
 * @returns Meta-type[]
 */
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

/**
 * Apply `minItems` and `maxItems` to a parsed tuple type and append `additionalItems` if needed.
 * @param PARSED_ITEM_SCHEMAS Meta-type[]
 * @param ROOT_SCHEMA JSONSchema
 * @param OPTIONS Parsing options
 * @returns Meta-type union
 */
type ApplyMinMaxAndAdditionalItems<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PARSED_ITEM_SCHEMAS extends any[],
  ROOT_SCHEMA extends ArrayOrTupleSchema,
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

/**
 * Apply `minItems` and `maxItems` to a parsed tuple type, by recursing from full tuple length to `minItems` (defaulted to 0)
 *
 * Returns not only the result as a meta-type, but also some meta-data useful to `ApplyAdditionalItems`:
 * - result: Union of possible tuples
 * - hasEncounteredMin: If tuple with `minItems` length has been met during recursion
 * - hasEncounteredMax: If tuple with `maxItems` length has been met during recursion
 * - completeTuple: Original complete tuple
 * @param PARSED_ITEM_SCHEMAS Meta-type[]
 * @param ROOT_SCHEMA JSONSchema
 * @param OPTIONS Parsing options
 * @returns ApplyMinMaxResults
 */
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

/**
 * Returns `true` if the provided tuple has a length higher than or equal to the provided length, returns `false` otherwise (or if `LENGTH` is `undefined`).
 * @param TUPLE unknown[]
 * @param LENGTH number | undefined
 * @returns Boolean
 */
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

/**
 * Append `additionalItems` if needed, and filter some `minItems` & `maxItems` edge cases.
 * @param APPLY_MIN_MAX_RESULT ApplyMinMaxResults
 * @param ADDITIONAL_ITEMS_SCHEMA JSONSchema
 * @param OPTIONS Parsing options
 * @returns Meta-type union
 */
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
    : // NOTE: Min MUST have been encountered as it is defaulted to 0.
      // Here, only possibility is that `maxItems > minItems` which means non-representable type
      M.Never
  : ADDITIONAL_ITEMS_SCHEMA extends false
  ? APPLY_MIN_MAX_RESULT extends { hasEncounteredMin: true }
    ? APPLY_MIN_MAX_RESULT["result"]
    : // NOTE: Min MUST have been encountered as it is defaulted to 0.
      // Here, only possibility is that `minItems > items.length` which means non-representable type as `additionalItems` are denied
      M.Never
  : ADDITIONAL_ITEMS_SCHEMA extends true
  ? APPLY_MIN_MAX_RESULT extends { hasEncounteredMin: true }
    ?
        | APPLY_MIN_MAX_RESULT["result"]
        | M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], M.Any>
    : // NOTE: Min MUST have been encountered as it is defaulted to 0.
      // Here, only possibility is that `minItems > items.length` so we can just append `M.Any` to complete tuple
      M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], M.Any>
  : APPLY_MIN_MAX_RESULT extends { hasEncounteredMin: true }
  ?
      | APPLY_MIN_MAX_RESULT["result"]
      | M.$Tuple<
          APPLY_MIN_MAX_RESULT["completeTuple"],
          ParseSchema<ADDITIONAL_ITEMS_SCHEMA, OPTIONS>
        >
  : // NOTE: Min MUST have been encountered as it is defaulted to 0.
    // Here, only possibility is that `minItems > items.length` so we can just append parsed schema to complete tuple
    M.$Tuple<
      APPLY_MIN_MAX_RESULT["completeTuple"],
      ParseSchema<ADDITIONAL_ITEMS_SCHEMA, OPTIONS>
    >;
