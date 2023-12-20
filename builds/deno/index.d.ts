import { M } from 'https://cdn.skypack.dev/ts-algebra@^1.2.2?dts';
import { JSONSchema7 as JSONSchema7$1, JSONSchema7TypeName } from 'https://cdn.skypack.dev/@types/json-schema@^7.0.9?dts';

type DeserializationPattern = Readonly<{
    pattern: unknown;
    output: unknown;
}>;

declare const $JSONSchema7: unique symbol;
type $JSONSchema7 = typeof $JSONSchema7;
type JSONSchema7 = boolean | (Omit<JSONSchema7$1, "type" | "const" | "enum" | "items" | "additionalItems" | "contains" | "properties" | "required" | "patternProperties" | "additionalProperties" | "dependencies" | "propertyNames" | "if" | "then" | "else" | "allOf" | "anyOf" | "oneOf" | "not" | "definitions" | "examples" | "default"> & Readonly<{
    [$JSONSchema7]?: $JSONSchema7;
    type?: JSONSchema7TypeName | readonly JSONSchema7TypeName[];
    const?: unknown;
    enum?: unknown;
    items?: JSONSchema7 | readonly JSONSchema7[];
    additionalItems?: JSONSchema7;
    contains?: JSONSchema7;
    properties?: Readonly<Record<string, JSONSchema7>>;
    required?: readonly string[];
    patternProperties?: Readonly<Record<string, JSONSchema7>>;
    additionalProperties?: JSONSchema7;
    dependencies?: Readonly<Record<string, JSONSchema7 | readonly string[]>>;
    propertyNames?: JSONSchema7;
    if?: JSONSchema7;
    then?: JSONSchema7;
    else?: JSONSchema7;
    allOf?: readonly JSONSchema7[];
    anyOf?: readonly JSONSchema7[];
    oneOf?: readonly JSONSchema7[];
    not?: JSONSchema7;
    nullable?: boolean;
    definitions?: Readonly<Record<string, JSONSchema7>>;
    examples?: readonly unknown[];
    default?: unknown;
}>);
type JSONSchema7Reference = JSONSchema7 & Readonly<{
    $id: string;
}>;

type JSONSchema7Extension = Record<string, unknown>;
type ExtendedJSONSchema7<EXTENSION extends JSONSchema7Extension = JSONSchema7Extension> = boolean | (Omit<JSONSchema7$1, "type" | "const" | "enum" | "items" | "additionalItems" | "contains" | "properties" | "required" | "patternProperties" | "additionalProperties" | "dependencies" | "propertyNames" | "if" | "then" | "else" | "allOf" | "anyOf" | "oneOf" | "not" | "definitions" | "examples" | "default"> & Readonly<{
    type?: JSONSchema7TypeName | readonly JSONSchema7TypeName[];
    const?: unknown;
    enum?: unknown;
    items?: ExtendedJSONSchema7<EXTENSION> | readonly ExtendedJSONSchema7<EXTENSION>[];
    additionalItems?: ExtendedJSONSchema7<EXTENSION>;
    contains?: ExtendedJSONSchema7<EXTENSION>;
    properties?: Readonly<Record<string, ExtendedJSONSchema7<EXTENSION>>>;
    required?: readonly string[];
    patternProperties?: Readonly<Record<string, ExtendedJSONSchema7<EXTENSION>>>;
    additionalProperties?: ExtendedJSONSchema7<EXTENSION>;
    dependencies?: Readonly<{
        [key: string]: ExtendedJSONSchema7<EXTENSION> | string[];
    }>;
    propertyNames?: ExtendedJSONSchema7<EXTENSION>;
    if?: ExtendedJSONSchema7<EXTENSION>;
    then?: ExtendedJSONSchema7<EXTENSION>;
    else?: ExtendedJSONSchema7<EXTENSION>;
    allOf?: readonly ExtendedJSONSchema7<EXTENSION>[];
    anyOf?: readonly ExtendedJSONSchema7<EXTENSION>[];
    oneOf?: readonly ExtendedJSONSchema7<EXTENSION>[];
    not?: ExtendedJSONSchema7<EXTENSION>;
    nullable?: boolean;
    definitions?: Readonly<{
        [key: string]: ExtendedJSONSchema7<EXTENSION>;
    }>;
    examples?: readonly unknown[];
    default?: unknown;
}> & Readonly<Partial<EXTENSION>>);
type ExtendedJSONSchema7Reference<EXTENSION extends JSONSchema7Extension = JSONSchema7Extension> = ExtendedJSONSchema7<EXTENSION> & Readonly<{
    $id: string;
}>;
type UnextendJSONSchema7Tuple<EXTENSION extends JSONSchema7Extension, EXTENDED_SCHEMAS extends ExtendedJSONSchema7<EXTENSION>[]> = EXTENDED_SCHEMAS extends [
    infer EXTENDED_SCHEMAS_HEAD,
    ...infer EXTENDED_SCHEMAS_TAIL
] ? EXTENDED_SCHEMAS_HEAD extends ExtendedJSONSchema7<EXTENSION> ? EXTENDED_SCHEMAS_TAIL extends ExtendedJSONSchema7<EXTENSION>[] ? [
    UnextendJSONSchema7<EXTENSION, EXTENDED_SCHEMAS_HEAD>,
    ...UnextendJSONSchema7Tuple<EXTENSION, EXTENDED_SCHEMAS_TAIL>
] : never : never : [];
type UnextendJSONSchema7Record<EXTENSION extends JSONSchema7Extension, EXTENDED_SCHEMA_RECORD extends Record<string, unknown>> = {
    [KEY in keyof EXTENDED_SCHEMA_RECORD]: EXTENDED_SCHEMA_RECORD[KEY] extends ExtendedJSONSchema7<EXTENSION> ? UnextendJSONSchema7<EXTENSION, EXTENDED_SCHEMA_RECORD[KEY]> : EXTENDED_SCHEMA_RECORD[KEY];
};
type UnextendJSONSchema7<EXTENSION extends JSONSchema7Extension, EXTENDED_SCHEMA> = EXTENDED_SCHEMA extends boolean ? EXTENDED_SCHEMA : {
    [KEY in $JSONSchema7 | keyof EXTENDED_SCHEMA]: KEY extends keyof EXTENDED_SCHEMA ? EXTENDED_SCHEMA extends {
        [K in KEY]: ExtendedJSONSchema7<EXTENSION>;
    } ? UnextendJSONSchema7<EXTENSION, EXTENDED_SCHEMA[KEY]> : EXTENDED_SCHEMA extends {
        [K in KEY]: ExtendedJSONSchema7<EXTENSION>[];
    } ? number extends EXTENDED_SCHEMA[KEY]["length"] ? UnextendJSONSchema7<EXTENSION, EXTENDED_SCHEMA[KEY][number]>[] : EXTENDED_SCHEMA[KEY] extends ExtendedJSONSchema7<EXTENSION>[] ? UnextendJSONSchema7Tuple<EXTENSION, EXTENDED_SCHEMA[KEY]> : never : EXTENDED_SCHEMA extends {
        [K in KEY]: Record<string, unknown>;
    } ? UnextendJSONSchema7Record<EXTENSION, EXTENDED_SCHEMA[KEY]> : EXTENDED_SCHEMA[KEY] : KEY extends $JSONSchema7 ? $JSONSchema7 : never;
};

type FromSchemaOptions = {
    parseNotKeyword?: boolean;
    parseIfThenElseKeywords?: boolean;
    keepDefaultedPropertiesOptional?: boolean;
    references?: JSONSchema7Reference[] | false;
    deserialize?: DeserializationPattern[] | false;
};
type FromExtendedSchemaOptions<EXTENSION extends JSONSchema7Extension> = {
    parseNotKeyword?: boolean;
    parseIfThenElseKeywords?: boolean;
    keepDefaultedPropertiesOptional?: boolean;
    references?: ExtendedJSONSchema7Reference<EXTENSION>[] | false;
    deserialize?: DeserializationPattern[] | false;
};
type FromSchemaDefaultOptions = {
    parseNotKeyword: false;
    parseIfThenElseKeywords: false;
    keepDefaultedPropertiesOptional: false;
    references: false;
    deserialize: false;
};

type IndexReferencesById<SCHEMA_REFERENCES extends readonly JSONSchema7Reference[]> = {
    [REF_SCHEMA in SCHEMA_REFERENCES[number] as REF_SCHEMA["$id"]]: REF_SCHEMA;
};
type ParseOptions<ROOT_SCHEMA extends JSONSchema7, OPTIONS extends FromSchemaOptions> = {
    parseNotKeyword: OPTIONS["parseNotKeyword"] extends boolean ? OPTIONS["parseNotKeyword"] : FromSchemaDefaultOptions["parseNotKeyword"];
    parseIfThenElseKeywords: OPTIONS["parseIfThenElseKeywords"] extends boolean ? OPTIONS["parseIfThenElseKeywords"] : FromSchemaDefaultOptions["parseIfThenElseKeywords"];
    keepDefaultedPropertiesOptional: OPTIONS["keepDefaultedPropertiesOptional"] extends boolean ? OPTIONS["keepDefaultedPropertiesOptional"] : FromSchemaDefaultOptions["keepDefaultedPropertiesOptional"];
    rootSchema: ROOT_SCHEMA;
    references: OPTIONS["references"] extends JSONSchema7Reference[] ? IndexReferencesById<OPTIONS["references"]> : {};
    deserialize: OPTIONS["deserialize"] extends DeserializationPattern[] | false ? OPTIONS["deserialize"] : FromSchemaDefaultOptions["deserialize"];
};

type And<CONDITION_A, CONDITION_B> = CONDITION_A extends true ? CONDITION_B extends true ? true : false : false;

type DoesExtend<TYPE_A, TYPE_B> = [TYPE_A] extends [TYPE_B] ? true : false;

type DeepGet<OBJECT, PATH extends string[], DEFAULT = undefined> = PATH extends [infer PATH_HEAD, ...infer PATH_TAIL] ? PATH_HEAD extends string ? PATH_TAIL extends string[] ? PATH_HEAD extends keyof OBJECT ? DeepGet<OBJECT[PATH_HEAD], PATH_TAIL, DEFAULT> : DEFAULT : never : never : OBJECT;

type Join<STRINGS extends string[], SEPARATOR extends string = ","> = STRINGS extends [] ? "" : STRINGS extends [string] ? `${STRINGS[0]}` : STRINGS extends [string, ...infer STRINGS_TAIL] ? STRINGS_TAIL extends string[] ? `${STRINGS[0]}${SEPARATOR}${Join<STRINGS_TAIL, SEPARATOR>}` : never : string;

type Narrow<INPUT> = INPUT extends Promise<infer AWAITED> ? Promise<Narrow<AWAITED>> : INPUT extends (...args: infer ARGS) => infer RETURN ? (...args: Narrow<ARGS>) => Narrow<RETURN> : INPUT extends [] ? [] : INPUT extends object ? {
    [KEY in keyof INPUT]: Narrow<INPUT[KEY]>;
} : INPUT extends string | number | boolean | bigint ? INPUT : never;

type Not<BOOL> = BOOL extends false ? true : BOOL extends true ? false : never;

type Pop<ARRAY extends unknown[]> = ARRAY extends readonly [...infer ARRAY_BODY, unknown] | readonly [...infer ARRAY_BODY, unknown?] ? ARRAY_BODY : ARRAY;

type RecursiveSplit<STRING extends string, SEPARATOR extends string = ""> = STRING extends `${infer BEFORE}${SEPARATOR}${infer AFTER}` ? [BEFORE, ...RecursiveSplit<AFTER, SEPARATOR>] : [STRING];
type Split<STRING extends string, SEPARATOR extends string = "", RESULT extends string[] = RecursiveSplit<STRING, SEPARATOR>> = SEPARATOR extends "" ? Pop<RESULT> : RESULT;

type Tail<ARRAY extends unknown[]> = ARRAY extends readonly [] ? ARRAY : ARRAY extends readonly [unknown?, ...infer ARRAY_TAIL] ? ARRAY_TAIL : ARRAY;

type Writable<TYPE> = TYPE extends ((...args: unknown[]) => unknown) | Date | RegExp ? TYPE : TYPE extends ReadonlyMap<infer KEYS, infer VALUES> ? Map<Writable<KEYS>, Writable<VALUES>> : TYPE extends ReadonlySet<infer VALUES> ? Set<Writable<VALUES>> : TYPE extends ReadonlyArray<unknown> ? `${bigint}` extends `${keyof TYPE & any}` ? {
    -readonly [KEY in keyof TYPE]: Writable<TYPE[KEY]>;
} : Writable<TYPE[number]>[] : TYPE extends object ? {
    -readonly [KEY in keyof TYPE]: Writable<TYPE[KEY]>;
} : TYPE;

type RemoveInvalidAdditionalItems<SCHEMA extends JSONSchema7> = SCHEMA extends Readonly<{
    items: JSONSchema7 | readonly JSONSchema7[];
}> ? SCHEMA extends Readonly<{
    additionalItems: JSONSchema7;
}> ? SCHEMA : SCHEMA & Readonly<{
    additionalItems: true;
}> : SCHEMA extends boolean ? SCHEMA : Omit<SCHEMA, "additionalItems">;
type ParentSchemaOverrides = {
    properties: {};
    additionalProperties: true;
    required: [];
};
type MergeSubSchema<PARENT_SCHEMA extends JSONSchema7, SUB_SCHEMA extends JSONSchema7, CLEANED_SUB_SCHEMA extends JSONSchema7 = RemoveInvalidAdditionalItems<SUB_SCHEMA>, DEFAULTED_SUB_SCHEMA extends JSONSchema7 = Omit<ParentSchemaOverrides, keyof CLEANED_SUB_SCHEMA> & CLEANED_SUB_SCHEMA> = Omit<PARENT_SCHEMA, keyof DEFAULTED_SUB_SCHEMA> & DEFAULTED_SUB_SCHEMA;

type AllOfSchema = JSONSchema7 & Readonly<{
    allOf: readonly JSONSchema7[];
}>;
type ParseAllOfSchema<ALL_OF_SCHEMA extends AllOfSchema, OPTIONS extends ParseSchemaOptions> = RecurseOnAllOfSchema<ALL_OF_SCHEMA["allOf"], ALL_OF_SCHEMA, OPTIONS, ParseSchema<Omit<ALL_OF_SCHEMA, "allOf">, OPTIONS>>;
type RecurseOnAllOfSchema<SUB_SCHEMAS extends readonly JSONSchema7[], ROOT_ALL_OF_SCHEMA extends AllOfSchema, OPTIONS extends ParseSchemaOptions, PARSED_ROOT_ALL_OF_SCHEMA> = SUB_SCHEMAS extends readonly [
    infer SUB_SCHEMAS_HEAD,
    ...infer SUB_SCHEMAS_TAIL
] ? SUB_SCHEMAS_HEAD extends JSONSchema7 ? SUB_SCHEMAS_TAIL extends readonly JSONSchema7[] ? RecurseOnAllOfSchema<SUB_SCHEMAS_TAIL, ROOT_ALL_OF_SCHEMA, OPTIONS, M.$Intersect<ParseSchema<MergeSubSchema<Omit<ROOT_ALL_OF_SCHEMA, "allOf">, SUB_SCHEMAS_HEAD>, OPTIONS>, PARSED_ROOT_ALL_OF_SCHEMA>> : never : never : PARSED_ROOT_ALL_OF_SCHEMA;

type AnyOfSchema = JSONSchema7 & Readonly<{
    anyOf: readonly JSONSchema7[];
}>;
type ParseAnyOfSchema<ANY_OF_SCHEMA extends AnyOfSchema, OPTIONS extends ParseSchemaOptions> = M.$Union<RecurseOnAnyOfSchema<ANY_OF_SCHEMA["anyOf"], ANY_OF_SCHEMA, OPTIONS>>;
type RecurseOnAnyOfSchema<SUB_SCHEMAS extends readonly JSONSchema7[], ROOT_ANY_OF_SCHEMA extends AnyOfSchema, OPTIONS extends ParseSchemaOptions, RESULT = never> = SUB_SCHEMAS extends readonly [
    infer SUB_SCHEMAS_HEAD,
    ...infer SUB_SCHEMAS_TAIL
] ? SUB_SCHEMAS_HEAD extends JSONSchema7 ? SUB_SCHEMAS_TAIL extends readonly JSONSchema7[] ? RecurseOnAnyOfSchema<SUB_SCHEMAS_TAIL, ROOT_ANY_OF_SCHEMA, OPTIONS, RESULT | M.$Intersect<ParseSchema<Omit<ROOT_ANY_OF_SCHEMA, "anyOf">, OPTIONS>, ParseSchema<MergeSubSchema<Omit<ROOT_ANY_OF_SCHEMA, "anyOf">, SUB_SCHEMAS_HEAD>, OPTIONS>>> : never : never : RESULT;

type ConstSchema = JSONSchema7 & Readonly<{
    const: unknown;
}>;
type ParseConstSchema<CONST_SCHEMA extends ConstSchema, OPTIONS extends ParseSchemaOptions> = M.$Intersect<ParseConst<CONST_SCHEMA>, ParseSchema<Omit<CONST_SCHEMA, "const">, OPTIONS>>;
type ParseConst<CONST_SCHEMA extends ConstSchema> = M.Const<Writable<CONST_SCHEMA["const"]>>;

type DeserializeSchema<SCHEMA extends JSONSchema7, OPTIONS extends Omit<ParseSchemaOptions, "deserialize"> & {
    deserialize: DeserializationPattern[];
}> = RecurseOnDeserializationPatterns<SCHEMA, OPTIONS["deserialize"]>;
type RecurseOnDeserializationPatterns<SCHEMA extends JSONSchema7, DESERIALIZATION_PATTERNS extends DeserializationPattern[], RESULT = M.Any> = DESERIALIZATION_PATTERNS extends [
    infer DESERIALIZATION_PATTERNS_HEAD,
    ...infer DESERIALIZATION_PATTERNS_TAIL
] ? DESERIALIZATION_PATTERNS_HEAD extends DeserializationPattern ? DESERIALIZATION_PATTERNS_TAIL extends DeserializationPattern[] ? RecurseOnDeserializationPatterns<SCHEMA, DESERIALIZATION_PATTERNS_TAIL, SCHEMA extends DESERIALIZATION_PATTERNS_HEAD["pattern"] ? M.$Intersect<M.Any<true, DESERIALIZATION_PATTERNS_HEAD["output"]>, RESULT> : RESULT> : never : never : RESULT;

type EnumSchema = JSONSchema7 & Readonly<{
    enum: readonly unknown[];
}>;
type ParseEnumSchema<ENUM_SCHEMA extends EnumSchema, OPTIONS extends ParseSchemaOptions> = M.$Intersect<ParseEnum<ENUM_SCHEMA>, ParseSchema<Omit<ENUM_SCHEMA, "enum">, OPTIONS>>;
type ParseEnum<ENUM_SCHEMA extends EnumSchema> = M.Enum<Writable<ENUM_SCHEMA["enum"][number]>>;

type IfThenElseSchema = JSONSchema7 & {
    if: JSONSchema7;
    then?: JSONSchema7;
    else?: JSONSchema7;
};
type ParseIfThenElseSchema<IF_THEN_ELSE_SCHEMA extends IfThenElseSchema, OPTIONS extends ParseSchemaOptions, REST_SCHEMA extends JSONSchema7 = Omit<IF_THEN_ELSE_SCHEMA, "if" | "then" | "else">, IF_SCHEMA extends JSONSchema7 = MergeSubSchema<REST_SCHEMA, IF_THEN_ELSE_SCHEMA["if"]>, PARSED_THEN_SCHEMA = IF_THEN_ELSE_SCHEMA extends {
    then: JSONSchema7;
} ? M.$Intersect<ParseSchema<IF_SCHEMA, OPTIONS>, ParseSchema<MergeSubSchema<REST_SCHEMA, IF_THEN_ELSE_SCHEMA["then"]>, OPTIONS>> : ParseSchema<IF_SCHEMA, OPTIONS>, PARSED_ELSE_SCHEMA = IF_THEN_ELSE_SCHEMA extends {
    else: JSONSchema7;
} ? M.$Intersect<M.$Exclude<ParseSchema<REST_SCHEMA, OPTIONS>, ParseSchema<IF_SCHEMA, OPTIONS>>, ParseSchema<MergeSubSchema<REST_SCHEMA, IF_THEN_ELSE_SCHEMA["else"]>, OPTIONS>> : M.$Exclude<ParseSchema<REST_SCHEMA, OPTIONS>, ParseSchema<IF_SCHEMA, OPTIONS>>> = M.$Intersect<M.$Union<PARSED_THEN_SCHEMA | PARSED_ELSE_SCHEMA>, ParseSchema<REST_SCHEMA, OPTIONS>>;

type MultipleTypesSchema = JSONSchema7 & Readonly<{
    type: readonly JSONSchema7TypeName[];
}>;
type ParseMultipleTypesSchema<MULTI_TYPE_SCHEMA extends MultipleTypesSchema, OPTIONS extends ParseSchemaOptions> = M.$Union<RecurseOnMixedSchema<MULTI_TYPE_SCHEMA["type"], MULTI_TYPE_SCHEMA, OPTIONS>>;
type RecurseOnMixedSchema<TYPES extends readonly JSONSchema7TypeName[], ROOT_MULTI_TYPE_SCHEMA extends MultipleTypesSchema, OPTIONS extends ParseSchemaOptions, RESULT = never> = TYPES extends readonly [infer TYPES_HEAD, ...infer TYPES_TAIL] ? TYPES_HEAD extends JSONSchema7TypeName ? TYPES_TAIL extends readonly JSONSchema7TypeName[] ? RecurseOnMixedSchema<TYPES_TAIL, ROOT_MULTI_TYPE_SCHEMA, OPTIONS, RESULT | ParseSchema<Omit<ROOT_MULTI_TYPE_SCHEMA, "type"> & {
    type: TYPES_HEAD;
}, OPTIONS>> : never : never : RESULT;

type NotSchema = JSONSchema7 & Readonly<{
    not: JSONSchema7;
}>;
type AllTypes = M.Union<M.Primitive<null> | M.Primitive<boolean> | M.Primitive<number> | M.Primitive<string> | M.Array | M.Object<{}, never, M.Any>>;
type ParseNotSchema<NOT_SCHEMA extends NotSchema, OPTIONS extends ParseSchemaOptions, PARSED_REST_SCHEMA = ParseSchema<Omit<NOT_SCHEMA, "not">, OPTIONS>, EXCLUSION = M.$Exclude<PARSED_REST_SCHEMA extends M.AnyType ? M.$Intersect<AllTypes, PARSED_REST_SCHEMA> : PARSED_REST_SCHEMA, ParseSchema<MergeSubSchema<Omit<NOT_SCHEMA, "not">, NOT_SCHEMA["not"]>, OPTIONS>>> = EXCLUSION extends M.Never ? PARSED_REST_SCHEMA : EXCLUSION;

type NullableSchema = JSONSchema7 & Readonly<{
    nullable: boolean;
}>;
type ParseNullableSchema<NULLABLE_SCHEMA extends NullableSchema, OPTIONS extends ParseSchemaOptions, PARSED_REST_SCHEMA = ParseSchema<Omit<NULLABLE_SCHEMA, "nullable">, OPTIONS>> = NULLABLE_SCHEMA extends Readonly<{
    nullable: true;
}> ? M.$Union<M.Primitive<null> | PARSED_REST_SCHEMA> : PARSED_REST_SCHEMA;

type OneOfSchema = JSONSchema7 & Readonly<{
    oneOf: readonly JSONSchema7[];
}>;
type ParseOneOfSchema<ONE_OF_SCHEMA extends OneOfSchema, OPTIONS extends ParseSchemaOptions> = M.$Union<RecurseOnOneOfSchema<ONE_OF_SCHEMA["oneOf"], ONE_OF_SCHEMA, OPTIONS>>;
type RecurseOnOneOfSchema<SUB_SCHEMAS extends readonly JSONSchema7[], ROOT_ONE_OF_SCHEMA extends OneOfSchema, OPTIONS extends ParseSchemaOptions, RESULT = never> = SUB_SCHEMAS extends readonly [
    infer SUB_SCHEMAS_HEAD,
    ...infer SUB_SCHEMAS_TAIL
] ? SUB_SCHEMAS_HEAD extends JSONSchema7 ? SUB_SCHEMAS_TAIL extends readonly JSONSchema7[] ? RecurseOnOneOfSchema<SUB_SCHEMAS_TAIL, ROOT_ONE_OF_SCHEMA, OPTIONS, RESULT | M.$Intersect<ParseSchema<Omit<ROOT_ONE_OF_SCHEMA, "oneOf">, OPTIONS>, ParseSchema<MergeSubSchema<Omit<ROOT_ONE_OF_SCHEMA, "oneOf">, SUB_SCHEMAS_HEAD>, OPTIONS>>> : never : never : RESULT;

type ParseReference<SCHEMA extends JSONSchema7, OPTIONS extends ParseSchemaOptions, REFERENCE_SOURCE extends JSONSchema7, PATH_IN_SOURCE extends string | undefined, MATCHING_REFERENCE extends JSONSchema7 = PATH_IN_SOURCE extends string ? DeepGet<REFERENCE_SOURCE, Tail<Split<PATH_IN_SOURCE, "/">>, false> : REFERENCE_SOURCE> = M.$Intersect<ParseSchema<MATCHING_REFERENCE, OPTIONS>, ParseSchema<MergeSubSchema<MATCHING_REFERENCE, SCHEMA>, OPTIONS>>;

type ParseExternalReferenceSchema<REF_SCHEMA extends ReferencingSchema, OPTIONS extends ParseSchemaOptions, EXTERNAL_REFERENCE_ID extends string, SUB_PATH extends string | undefined> = OPTIONS["references"] extends {
    [KEY in EXTERNAL_REFERENCE_ID]: JSONSchema7;
} ? ParseReference<Omit<REF_SCHEMA, "$ref">, OPTIONS, OPTIONS["references"][EXTERNAL_REFERENCE_ID], SUB_PATH> : OPTIONS extends {
    rootSchema: IdSchema;
} ? ParseExternalReferenceWithoutDirectorySchema<Omit<REF_SCHEMA, "$ref">, OPTIONS, EXTERNAL_REFERENCE_ID, SUB_PATH> : M.Never;
type ParseDirectory<REFERENCE extends string> = Join<Pop<Split<REFERENCE, "/">>, "/">;
type IdSchema = JSONSchema7 & {
    $id: string;
};
type ParseExternalReferenceWithoutDirectorySchema<SUB_SCHEMA extends JSONSchema7, OPTIONS extends ParseSchemaOptions & {
    rootSchema: IdSchema;
}, EXTERNAL_REFERENCE_ID extends string, SUB_PATH extends string | undefined, DIRECTORY extends string = ParseDirectory<OPTIONS["rootSchema"]["$id"]>, COMPLETE_REFERENCE extends string = Join<[
    DIRECTORY,
    EXTERNAL_REFERENCE_ID
], "/">> = COMPLETE_REFERENCE extends keyof OPTIONS["references"] ? ParseReference<SUB_SCHEMA, OPTIONS, OPTIONS["references"][COMPLETE_REFERENCE], SUB_PATH> : M.Never;

type ParseInternalReferenceSchema<REFERENCING_SCHEMA extends ReferencingSchema, OPTIONS extends ParseSchemaOptions, PATH extends string> = ParseReference<Omit<REFERENCING_SCHEMA, "$ref">, OPTIONS, OPTIONS["rootSchema"], PATH>;

type ReferencingSchema = JSONSchema7 & {
    $ref: string;
};
type ParseReferenceSchema<REFERENCING_SCHEMA extends ReferencingSchema, OPTIONS extends ParseSchemaOptions, REFERENCE_ID_AND_PATH extends string[] = Split<REFERENCING_SCHEMA["$ref"], "#">> = REFERENCE_ID_AND_PATH[0] extends "" ? ParseInternalReferenceSchema<REFERENCING_SCHEMA, OPTIONS, REFERENCE_ID_AND_PATH[1]> : ParseExternalReferenceSchema<REFERENCING_SCHEMA, OPTIONS, REFERENCE_ID_AND_PATH[0], REFERENCE_ID_AND_PATH[1]>;

type ArrayOrTupleSchema = JSONSchema7 & Readonly<{
    type: "array";
}>;
type ArraySchema = JSONSchema7 & Readonly<{
    type: "array";
    items: JSONSchema7;
}>;
type TupleSchema = JSONSchema7 & Readonly<{
    type: "array";
    items: readonly JSONSchema7[];
}>;
type ParseArrayOrTupleSchema<ARRAY_OR_TUPLE_SCHEMA extends ArrayOrTupleSchema, OPTIONS extends ParseSchemaOptions> = ARRAY_OR_TUPLE_SCHEMA extends ArraySchema ? M.$Array<ParseSchema<ARRAY_OR_TUPLE_SCHEMA["items"], OPTIONS>> : ARRAY_OR_TUPLE_SCHEMA extends TupleSchema ? M.$Union<ApplyMinMaxAndAdditionalItems<ParseTupleItems<ARRAY_OR_TUPLE_SCHEMA["items"], OPTIONS>, ARRAY_OR_TUPLE_SCHEMA, OPTIONS>> : M.$Array;
type ParseTupleItems<ITEM_SCHEMAS extends readonly JSONSchema7[], OPTIONS extends ParseSchemaOptions> = ITEM_SCHEMAS extends readonly [
    infer ITEM_SCHEMAS_HEAD,
    ...infer ITEM_SCHEMAS_TAIL
] ? ITEM_SCHEMAS_HEAD extends JSONSchema7 ? ITEM_SCHEMAS_TAIL extends readonly JSONSchema7[] ? [
    ParseSchema<ITEM_SCHEMAS_HEAD, OPTIONS>,
    ...ParseTupleItems<ITEM_SCHEMAS_TAIL, OPTIONS>
] : never : never : [];
type ApplyMinMaxAndAdditionalItems<PARSED_ITEM_SCHEMAS extends any[], ROOT_SCHEMA extends ArrayOrTupleSchema, OPTIONS extends ParseSchemaOptions> = ApplyAdditionalItems<ApplyMinMax<PARSED_ITEM_SCHEMAS, ROOT_SCHEMA extends Readonly<{
    minItems: number;
}> ? ROOT_SCHEMA["minItems"] : 0, ROOT_SCHEMA extends Readonly<{
    maxItems: number;
}> ? ROOT_SCHEMA["maxItems"] : undefined>, ROOT_SCHEMA extends Readonly<{
    additionalItems: JSONSchema7;
}> ? ROOT_SCHEMA["additionalItems"] : true, OPTIONS>;
type ApplyMinMax<RECURSED_PARSED_ITEM_SCHEMAS extends any[], MIN extends number, MAX extends number | undefined, RESULT = never, HAS_ENCOUNTERED_MIN extends boolean = false, HAS_ENCOUNTERED_MAX extends boolean = false, INITIAL_PARSED_ITEM_SCHEMAS extends any[] = RECURSED_PARSED_ITEM_SCHEMAS> = And<Not<DoesExtend<MIN, RECURSED_PARSED_ITEM_SCHEMAS["length"]>>, DoesExtend<RECURSED_PARSED_ITEM_SCHEMAS, [any, ...any[]]>> extends true ? RECURSED_PARSED_ITEM_SCHEMAS extends [
    ...infer RECURSED_PARSED_ITEM_SCHEMAS_BODY,
    unknown
] ? ApplyMinMax<RECURSED_PARSED_ITEM_SCHEMAS_BODY, MIN, MAX, RECURSED_PARSED_ITEM_SCHEMAS["length"] extends MAX ? M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS> : RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS>, HAS_ENCOUNTERED_MIN extends true ? true : DoesExtend<MIN, RECURSED_PARSED_ITEM_SCHEMAS["length"]>, HAS_ENCOUNTERED_MAX extends true ? true : DoesExtend<MAX, RECURSED_PARSED_ITEM_SCHEMAS["length"]>, INITIAL_PARSED_ITEM_SCHEMAS> : never : {
    result: MAX extends undefined ? RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS> : HAS_ENCOUNTERED_MAX extends true ? RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS> : MAX extends RECURSED_PARSED_ITEM_SCHEMAS["length"] ? M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS> : IsLongerThan<Tail<RECURSED_PARSED_ITEM_SCHEMAS>, MAX> extends true ? never : RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS>;
    hasEncounteredMin: DoesExtend<MIN, RECURSED_PARSED_ITEM_SCHEMAS["length"]>;
    hasEncounteredMax: HAS_ENCOUNTERED_MAX extends true ? true : MAX extends RECURSED_PARSED_ITEM_SCHEMAS["length"] ? true : IsLongerThan<Tail<RECURSED_PARSED_ITEM_SCHEMAS>, MAX>;
    completeTuple: INITIAL_PARSED_ITEM_SCHEMAS;
};
type IsLongerThan<TUPLE extends any[], LENGTH extends number | undefined, RESULT extends boolean = false> = LENGTH extends undefined ? false : TUPLE["length"] extends LENGTH ? true : TUPLE extends [any, ...infer TUPLE_TAIL] ? IsLongerThan<TUPLE_TAIL, LENGTH> : RESULT;
type ApplyAdditionalItems<APPLY_MIN_MAX_RESULT extends {
    result: any;
    hasEncounteredMin: boolean;
    hasEncounteredMax: boolean;
    completeTuple: any[];
}, ADDITIONAL_ITEMS_SCHEMA extends JSONSchema7, OPTIONS extends ParseSchemaOptions> = APPLY_MIN_MAX_RESULT extends {
    hasEncounteredMax: true;
} ? APPLY_MIN_MAX_RESULT extends {
    hasEncounteredMin: true;
} ? APPLY_MIN_MAX_RESULT["result"] : M.Never : ADDITIONAL_ITEMS_SCHEMA extends false ? APPLY_MIN_MAX_RESULT extends {
    hasEncounteredMin: true;
} ? APPLY_MIN_MAX_RESULT["result"] : M.Never : ADDITIONAL_ITEMS_SCHEMA extends true ? APPLY_MIN_MAX_RESULT extends {
    hasEncounteredMin: true;
} ? APPLY_MIN_MAX_RESULT["result"] | M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], M.Any> : M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], M.Any> : APPLY_MIN_MAX_RESULT extends {
    hasEncounteredMin: true;
} ? APPLY_MIN_MAX_RESULT["result"] | M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], ParseSchema<ADDITIONAL_ITEMS_SCHEMA, OPTIONS>> : M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], ParseSchema<ADDITIONAL_ITEMS_SCHEMA, OPTIONS>>;

type ObjectSchema = JSONSchema7 & Readonly<{
    type: "object";
}>;
type ParseObjectSchema<OBJECT_SCHEMA extends ObjectSchema, OPTIONS extends ParseSchemaOptions> = OBJECT_SCHEMA extends Readonly<{
    properties: Readonly<Record<string, JSONSchema7>>;
}> ? M.$Object<{
    [KEY in keyof OBJECT_SCHEMA["properties"]]: ParseSchema<OBJECT_SCHEMA["properties"][KEY], OPTIONS>;
}, GetRequired<OBJECT_SCHEMA, OPTIONS>, GetOpenProps<OBJECT_SCHEMA, OPTIONS>> : M.$Object<{}, GetRequired<OBJECT_SCHEMA, OPTIONS>, GetOpenProps<OBJECT_SCHEMA, OPTIONS>>;
type GetRequired<OBJECT_SCHEMA extends ObjectSchema, OPTIONS extends ParseSchemaOptions> = (OBJECT_SCHEMA extends Readonly<{
    required: ReadonlyArray<string>;
}> ? OBJECT_SCHEMA["required"][number] : never) | (OPTIONS["keepDefaultedPropertiesOptional"] extends true ? never : OBJECT_SCHEMA extends Readonly<{
    properties: Readonly<Record<string, JSONSchema7>>;
}> ? {
    [KEY in keyof OBJECT_SCHEMA["properties"] & string]: OBJECT_SCHEMA["properties"][KEY] extends Readonly<{
        default: unknown;
    }> ? KEY : never;
}[keyof OBJECT_SCHEMA["properties"] & string] : never);
type GetOpenProps<OBJECT_SCHEMA extends ObjectSchema, OPTIONS extends ParseSchemaOptions> = OBJECT_SCHEMA extends Readonly<{
    additionalProperties: JSONSchema7;
}> ? OBJECT_SCHEMA extends Readonly<{
    patternProperties: Record<string, JSONSchema7>;
}> ? AdditionalAndPatternProps<OBJECT_SCHEMA["additionalProperties"], OBJECT_SCHEMA["patternProperties"], OPTIONS> : ParseSchema<OBJECT_SCHEMA["additionalProperties"], OPTIONS> : OBJECT_SCHEMA extends Readonly<{
    patternProperties: Record<string, JSONSchema7>;
}> ? PatternProps<OBJECT_SCHEMA["patternProperties"], OPTIONS> : M.Any;
type PatternProps<PATTERN_PROPERTY_SCHEMAS extends Readonly<Record<string, JSONSchema7>>, OPTIONS extends ParseSchemaOptions> = M.$Union<{
    [KEY in keyof PATTERN_PROPERTY_SCHEMAS]: ParseSchema<PATTERN_PROPERTY_SCHEMAS[KEY], OPTIONS>;
}[keyof PATTERN_PROPERTY_SCHEMAS]>;
type AdditionalAndPatternProps<ADDITIONAL_PROPERTIES_SCHEMA extends JSONSchema7, PATTERN_PROPERTY_SCHEMAS extends Readonly<Record<string, JSONSchema7>>, OPTIONS extends ParseSchemaOptions> = ADDITIONAL_PROPERTIES_SCHEMA extends boolean ? PatternProps<PATTERN_PROPERTY_SCHEMAS, OPTIONS> : M.$Union<ParseSchema<ADDITIONAL_PROPERTIES_SCHEMA, OPTIONS> | {
    [KEY in keyof PATTERN_PROPERTY_SCHEMAS]: ParseSchema<PATTERN_PROPERTY_SCHEMAS[KEY], OPTIONS>;
}[keyof PATTERN_PROPERTY_SCHEMAS]>;

type SingleTypeSchema = JSONSchema7 & Readonly<{
    type: JSONSchema7TypeName;
}>;
type ParseSingleTypeSchema<SINGLE_TYPE_SCHEMA extends SingleTypeSchema, OPTIONS extends ParseSchemaOptions> = SINGLE_TYPE_SCHEMA extends Readonly<{
    type: "null";
}> ? M.Primitive<null> : SINGLE_TYPE_SCHEMA extends Readonly<{
    type: "boolean";
}> ? M.Primitive<boolean> : SINGLE_TYPE_SCHEMA extends Readonly<{
    type: "integer";
}> ? M.Primitive<number> : SINGLE_TYPE_SCHEMA extends Readonly<{
    type: "number";
}> ? M.Primitive<number> : SINGLE_TYPE_SCHEMA extends Readonly<{
    type: "string";
}> ? M.Primitive<string> : SINGLE_TYPE_SCHEMA extends ArrayOrTupleSchema ? ParseArrayOrTupleSchema<SINGLE_TYPE_SCHEMA, OPTIONS> : SINGLE_TYPE_SCHEMA extends ObjectSchema ? ParseObjectSchema<SINGLE_TYPE_SCHEMA, OPTIONS> : M.Never;

type ParseSchemaOptions = {
    parseNotKeyword: boolean;
    parseIfThenElseKeywords: boolean;
    keepDefaultedPropertiesOptional: boolean;
    rootSchema: JSONSchema7;
    references: Record<string, JSONSchema7>;
    deserialize: DeserializationPattern[] | false;
};
type ParseSchema<SCHEMA extends JSONSchema7, OPTIONS extends ParseSchemaOptions, RESULT = JSONSchema7 extends SCHEMA ? M.Any : SCHEMA extends true | string ? M.Any : SCHEMA extends false ? M.Never : SCHEMA extends NullableSchema ? ParseNullableSchema<SCHEMA, OPTIONS> : SCHEMA extends ReferencingSchema ? ParseReferenceSchema<SCHEMA, OPTIONS> : And<DoesExtend<OPTIONS["parseIfThenElseKeywords"], true>, DoesExtend<SCHEMA, IfThenElseSchema>> extends true ? SCHEMA extends IfThenElseSchema ? ParseIfThenElseSchema<SCHEMA, OPTIONS> : never : And<DoesExtend<OPTIONS["parseNotKeyword"], true>, DoesExtend<SCHEMA, NotSchema>> extends true ? SCHEMA extends NotSchema ? ParseNotSchema<SCHEMA, OPTIONS> : never : SCHEMA extends AllOfSchema ? ParseAllOfSchema<SCHEMA, OPTIONS> : SCHEMA extends OneOfSchema ? ParseOneOfSchema<SCHEMA, OPTIONS> : SCHEMA extends AnyOfSchema ? ParseAnyOfSchema<SCHEMA, OPTIONS> : SCHEMA extends EnumSchema ? ParseEnumSchema<SCHEMA, OPTIONS> : SCHEMA extends ConstSchema ? ParseConstSchema<SCHEMA, OPTIONS> : SCHEMA extends MultipleTypesSchema ? ParseMultipleTypesSchema<SCHEMA, OPTIONS> : SCHEMA extends SingleTypeSchema ? ParseSingleTypeSchema<SCHEMA, OPTIONS> : M.Any> = OPTIONS extends {
    deserialize: DeserializationPattern[];
} ? M.$Intersect<DeserializeSchema<SCHEMA, OPTIONS>, RESULT> : RESULT;

type $Compiler<C extends unknown[] = [], V extends unknown[] = []> = (schema: JSONSchema, ...compilingOptions: C) => (data: unknown, ...validationOptions: V) => boolean;
type Compiler<O extends FromSchemaOptions = FromSchemaDefaultOptions, C extends unknown[] = [], V extends unknown[] = []> = <S extends JSONSchema, T = FromSchema<S, O>>(schema: S, ...compilingOptions: C) => (data: unknown, ...validationOptions: V) => data is T;
type CompilerWrapper = <O extends FromSchemaOptions = FromSchemaDefaultOptions, C extends unknown[] = [], V extends unknown[] = []>(compiler: $Compiler<C, V>) => Compiler<O, C, V>;
declare const wrapCompilerAsTypeGuard: CompilerWrapper;

type $Validator<V extends unknown[] = []> = (schema: JSONSchema, data: unknown, ...validationOptions: V) => boolean;
type Validator<O extends FromSchemaOptions = FromSchemaDefaultOptions, V extends unknown[] = []> = <S extends JSONSchema, T = FromSchema<S, O>>(schema: S, data: unknown, ...validationOptions: V) => data is T;
type ValidatorWrapper = <O extends FromSchemaOptions = FromSchemaDefaultOptions, V extends unknown[] = []>(validator: $Validator<V>) => Validator<O, V>;
declare const wrapValidatorAsTypeGuard: ValidatorWrapper;

declare const asConst: <INPUT>(input: Narrow<INPUT>) => Narrow<INPUT>;

type JSONSchema = JSONSchema7;
type ExtendedJSONSchema<EXTENSION extends JSONSchema7Extension> = ExtendedJSONSchema7<EXTENSION>;
type FromSchema<SCHEMA extends JSONSchema, OPTIONS extends FromSchemaOptions = FromSchemaDefaultOptions> = M.$Resolve<ParseSchema<SCHEMA, ParseOptions<SCHEMA, OPTIONS>>>;
type FromExtendedSchema<EXTENSION extends JSONSchema7Extension, SCHEMA extends ExtendedJSONSchema<EXTENSION>, OPTIONS extends FromExtendedSchemaOptions<EXTENSION> = FromSchemaDefaultOptions, UNEXTENDED_SCHEMA = UnextendJSONSchema7<EXTENSION, SCHEMA>> = UNEXTENDED_SCHEMA extends JSONSchema ? FromSchema<UNEXTENDED_SCHEMA, OPTIONS> : never;

export { $Compiler, $Validator, Compiler, DeserializationPattern, ExtendedJSONSchema, FromExtendedSchema, FromExtendedSchemaOptions, FromSchema, FromSchemaDefaultOptions, FromSchemaOptions, JSONSchema, JSONSchema7Extension, Validator, asConst, wrapCompilerAsTypeGuard, wrapValidatorAsTypeGuard };
