import { M } from 'https://cdn.skypack.dev/ts-algebra@^1.2.0?dts';
import { JSONSchema7 as JSONSchema7$2, JSONSchema7TypeName } from 'https://cdn.skypack.dev/@types/json-schema@^7.0.9?dts';

declare type DeserializationPattern = {
    pattern: unknown;
    output: unknown;
};

declare const $JSONSchema7: unique symbol;
declare type $JSONSchema7 = typeof $JSONSchema7;
declare type JSONSchema7$1 = boolean | (Omit<JSONSchema7$2, "const" | "enum" | "items" | "additionalItems" | "contains" | "properties" | "patternProperties" | "additionalProperties" | "dependencies" | "propertyNames" | "if" | "then" | "else" | "allOf" | "anyOf" | "oneOf" | "not" | "definitions" | "examples" | "default"> & {
    [$JSONSchema7]?: $JSONSchema7;
    const?: unknown;
    enum?: unknown;
    items?: JSONSchema7$1 | JSONSchema7$1[];
    additionalItems?: JSONSchema7$1;
    contains?: JSONSchema7$1;
    properties?: Record<string, JSONSchema7$1>;
    patternProperties?: Record<string, JSONSchema7$1>;
    additionalProperties?: JSONSchema7$1;
    dependencies?: {
        [key: string]: JSONSchema7$1 | string[];
    };
    propertyNames?: JSONSchema7$1;
    if?: JSONSchema7$1;
    then?: JSONSchema7$1;
    else?: JSONSchema7$1;
    allOf?: JSONSchema7$1[];
    anyOf?: JSONSchema7$1[];
    oneOf?: JSONSchema7$1[];
    not?: JSONSchema7$1;
    nullable?: boolean;
    definitions?: {
        [key: string]: JSONSchema7$1;
    };
    examples?: unknown[];
    default?: unknown;
});
declare type JSONSchema7Reference$1 = JSONSchema7$1 & {
    $id: string;
};

declare type JSONSchema7Extension = Record<string, unknown>;
declare type ExtendedJSONSchema7$1<EXTENSION extends JSONSchema7Extension = JSONSchema7Extension> = boolean | (Omit<JSONSchema7$2, "const" | "enum" | "items" | "additionalItems" | "contains" | "properties" | "patternProperties" | "additionalProperties" | "dependencies" | "propertyNames" | "if" | "then" | "else" | "allOf" | "anyOf" | "oneOf" | "not" | "definitions" | "examples" | "default"> & {
    const?: unknown;
    enum?: unknown;
    items?: ExtendedJSONSchema7$1<EXTENSION> | ExtendedJSONSchema7$1<EXTENSION>[];
    additionalItems?: ExtendedJSONSchema7$1<EXTENSION>;
    contains?: ExtendedJSONSchema7$1<EXTENSION>;
    properties?: Record<string, ExtendedJSONSchema7$1<EXTENSION>>;
    patternProperties?: Record<string, ExtendedJSONSchema7$1<EXTENSION>>;
    additionalProperties?: ExtendedJSONSchema7$1<EXTENSION>;
    dependencies?: {
        [key: string]: ExtendedJSONSchema7$1<EXTENSION> | string[];
    };
    propertyNames?: ExtendedJSONSchema7$1<EXTENSION>;
    if?: ExtendedJSONSchema7$1<EXTENSION>;
    then?: ExtendedJSONSchema7$1<EXTENSION>;
    else?: ExtendedJSONSchema7$1<EXTENSION>;
    allOf?: ExtendedJSONSchema7$1<EXTENSION>[];
    anyOf?: ExtendedJSONSchema7$1<EXTENSION>[];
    oneOf?: ExtendedJSONSchema7$1<EXTENSION>[];
    not?: ExtendedJSONSchema7$1<EXTENSION>;
    nullable?: boolean;
    definitions?: {
        [key: string]: ExtendedJSONSchema7$1<EXTENSION>;
    };
    examples?: unknown[];
    default?: unknown;
} & Partial<EXTENSION>);
declare type ExtendedJSONSchema7Reference$1<EXTENSION extends JSONSchema7Extension = JSONSchema7Extension> = ExtendedJSONSchema7$1<EXTENSION> & {
    $id: string;
};
declare type UnextendJSONSchema7Tuple<EXTENSION extends JSONSchema7Extension, EXTENDED_SCHEMAS extends ExtendedJSONSchema7$1<EXTENSION>[]> = EXTENDED_SCHEMAS extends [
    infer EXTENDED_SCHEMAS_HEAD,
    ...infer EXTENDED_SCHEMAS_TAIL
] ? EXTENDED_SCHEMAS_HEAD extends ExtendedJSONSchema7$1<EXTENSION> ? EXTENDED_SCHEMAS_TAIL extends ExtendedJSONSchema7$1<EXTENSION>[] ? [
    UnextendJSONSchema7<EXTENSION, EXTENDED_SCHEMAS_HEAD>,
    ...UnextendJSONSchema7Tuple<EXTENSION, EXTENDED_SCHEMAS_TAIL>
] : never : never : [];
declare type UnextendJSONSchema7Record<EXTENSION extends JSONSchema7Extension, SCHEMA_RECORD extends Record<string, unknown>> = {
    [KEY in keyof SCHEMA_RECORD]: SCHEMA_RECORD[KEY] extends ExtendedJSONSchema7$1<EXTENSION> ? UnextendJSONSchema7<EXTENSION, SCHEMA_RECORD[KEY]> : SCHEMA_RECORD[KEY];
};
declare type UnextendJSONSchema7<EXTENSION extends JSONSchema7Extension, EXTENDED_SCHEMA> = EXTENDED_SCHEMA extends boolean ? EXTENDED_SCHEMA : {
    [KEY in $JSONSchema7 | keyof EXTENDED_SCHEMA]: KEY extends keyof EXTENDED_SCHEMA ? EXTENDED_SCHEMA extends {
        [K in KEY]: ExtendedJSONSchema7$1<EXTENSION>;
    } ? UnextendJSONSchema7<EXTENSION, EXTENDED_SCHEMA[KEY]> : EXTENDED_SCHEMA extends {
        [K in KEY]: ExtendedJSONSchema7$1<EXTENSION>[];
    } ? number extends EXTENDED_SCHEMA[KEY]["length"] ? UnextendJSONSchema7<EXTENSION, EXTENDED_SCHEMA[KEY][number]>[] : EXTENDED_SCHEMA[KEY] extends ExtendedJSONSchema7$1<EXTENSION>[] ? UnextendJSONSchema7Tuple<EXTENSION, EXTENDED_SCHEMA[KEY]> : never : EXTENDED_SCHEMA extends {
        [K in KEY]: Record<string, unknown>;
    } ? UnextendJSONSchema7Record<EXTENSION, EXTENDED_SCHEMA[KEY]> : EXTENDED_SCHEMA[KEY] : KEY extends $JSONSchema7 ? $JSONSchema7 : never;
};

declare type FromSchemaOptions = {
    parseNotKeyword?: boolean;
    parseIfThenElseKeywords?: boolean;
    references?: JSONSchema7Reference[] | false;
    deserialize?: DeserializationPattern[] | false;
};
declare type FromExtendedSchemaOptions<EXTENSION extends JSONSchema7Extension> = {
    parseNotKeyword?: boolean;
    parseIfThenElseKeywords?: boolean;
    references?: ExtendedJSONSchema7Reference$1<EXTENSION>[] | false;
    deserialize?: DeserializationPattern[] | false;
};
declare type FromSchemaDefaultOptions = {
    parseNotKeyword: false;
    parseIfThenElseKeywords: false;
    references: false;
    deserialize: false;
};

declare type And<CONDITION_A, CONDITION_B> = CONDITION_A extends true ? CONDITION_B extends true ? true : false : false;

declare type DoesExtend<TYPE_A, TYPE_B> = [TYPE_A] extends [TYPE_B] ? true : false;

declare type DeepGet<OBJECT, PATH extends string[], DEFAULT = undefined> = PATH extends [infer PATH_HEAD, ...infer PATH_TAIL] ? PATH_HEAD extends string ? PATH_TAIL extends string[] ? PATH_HEAD extends keyof OBJECT ? DeepGet<OBJECT[PATH_HEAD], PATH_TAIL, DEFAULT> : DEFAULT : never : never : OBJECT;

declare type Join<STRINGS extends string[], SEPARATOR extends string = ","> = STRINGS extends [] ? "" : STRINGS extends [string] ? `${STRINGS[0]}` : STRINGS extends [string, ...infer STRINGS_TAIL] ? STRINGS_TAIL extends string[] ? `${STRINGS[0]}${SEPARATOR}${Join<STRINGS_TAIL, SEPARATOR>}` : never : string;

declare type Narrow<INPUT> = INPUT extends Promise<infer AWAITED> ? Promise<Narrow<AWAITED>> : INPUT extends (...args: infer ARGS) => infer RETURN ? (...args: Narrow<ARGS>) => Narrow<RETURN> : INPUT extends [] ? [] : INPUT extends object ? {
    [KEY in keyof INPUT]: Narrow<INPUT[KEY]>;
} : INPUT extends string | number | boolean | bigint ? INPUT : never;

declare type Not<CONDITION> = CONDITION extends false ? true : CONDITION extends true ? false : never;

declare type Pop<ARRAY extends unknown[]> = ARRAY extends readonly [...infer ARRAY_BODY, unknown] | readonly [...infer ARRAY_BODY, unknown?] ? ARRAY_BODY : ARRAY;

declare type DeepReadonly<TYPE> = TYPE extends Record<string | number | symbol, any> ? {
    readonly [KEY in keyof TYPE]: DeepReadonly<TYPE[KEY]>;
} : TYPE;

declare type RecursiveSplit<STRING extends string, SEPARATOR extends string = ""> = STRING extends `${infer BEFORE}${SEPARATOR}${infer AFTER}` ? [BEFORE, ...RecursiveSplit<AFTER, SEPARATOR>] : [STRING];
declare type Split<STRING extends string, SEPARATOR extends string = "", RESULT extends string[] = RecursiveSplit<STRING, SEPARATOR>> = SEPARATOR extends "" ? Pop<RESULT> : RESULT;

declare type Tail<ARRAY extends unknown[]> = ARRAY extends readonly [] ? ARRAY : ARRAY extends readonly [unknown?, ...infer ARRAY_TAIL] ? ARRAY_TAIL : ARRAY;

declare type DeepWritable<TYPE> = TYPE extends unknown[] ? TYPE extends [infer HEAD, ...infer TAIL] ? [DeepWritable<HEAD>, ...DeepWritable<TAIL>] : TYPE extends (infer VALUES)[] ? DeepWritable<VALUES>[] : never : {
    -readonly [KEY in keyof TYPE]: DeepWritable<TYPE[KEY]>;
};

declare type ParseReferences<REF_SCHEMAS extends JSONSchema7Reference[], REFERENCES extends Record<string, JSONSchema7$1> = {}> = REF_SCHEMAS extends [infer REF_SCHEMAS_HEAD, ...infer REF_SCHEMAS_TAIL] ? REF_SCHEMAS_HEAD extends JSONSchema7Reference ? REF_SCHEMAS_TAIL extends JSONSchema7Reference[] ? ParseReferences<REF_SCHEMAS_TAIL, REFERENCES & {
    [key in REF_SCHEMAS_HEAD["$id"]]: DeepWritable<REF_SCHEMAS_HEAD>;
}> : never : never : REFERENCES;
declare type ParseOptions<SCHEMA extends JSONSchema7$1, OPTIONS extends FromSchemaOptions> = {
    parseNotKeyword: OPTIONS["parseNotKeyword"] extends boolean ? OPTIONS["parseNotKeyword"] : FromSchemaDefaultOptions["parseNotKeyword"];
    parseIfThenElseKeywords: OPTIONS["parseIfThenElseKeywords"] extends boolean ? OPTIONS["parseIfThenElseKeywords"] : FromSchemaDefaultOptions["parseIfThenElseKeywords"];
    rootSchema: SCHEMA;
    references: OPTIONS["references"] extends JSONSchema7Reference[] ? ParseReferences<OPTIONS["references"]> : {};
    deserialize: OPTIONS["deserialize"] extends DeserializationPattern[] | false ? OPTIONS["deserialize"] : FromSchemaDefaultOptions["deserialize"];
};

declare type RemoveInvalidAdditionalItems<SCHEMA extends JSONSchema7$1> = SCHEMA extends {
    items: JSONSchema7$1 | JSONSchema7$1[];
} ? SCHEMA extends {
    additionalItems: JSONSchema7$1;
} ? SCHEMA : SCHEMA & {
    additionalItems: true;
} : SCHEMA extends boolean ? SCHEMA : Omit<SCHEMA, "additionalItems">;
declare type EmptySchema = {
    properties: {};
    additionalProperties: true;
    required: [];
};
declare type MergeSubSchema<ROOT_SCHEMA extends JSONSchema7$1, SUB_SCHEMA extends JSONSchema7$1, CLEANED_SUB_SCHEMA extends JSONSchema7$1 = RemoveInvalidAdditionalItems<SUB_SCHEMA>, DEFAULTED_SUB_SCHEMA extends JSONSchema7$1 = Omit<EmptySchema, keyof CLEANED_SUB_SCHEMA> & CLEANED_SUB_SCHEMA> = Omit<ROOT_SCHEMA, keyof DEFAULTED_SUB_SCHEMA> & DEFAULTED_SUB_SCHEMA;

declare type AllOfSchema = JSONSchema7$1 & {
    allOf: JSONSchema7$1[];
};
declare type ParseAllOfSchema<SCHEMA extends AllOfSchema, OPTIONS extends ParseSchemaOptions> = RecurseOnAllOfSchema<SCHEMA["allOf"], SCHEMA, OPTIONS, ParseSchema<Omit<SCHEMA, "allOf">, OPTIONS>>;
declare type RecurseOnAllOfSchema<SUB_SCHEMAS extends JSONSchema7$1[], ROOT_SCHEMA extends AllOfSchema, OPTIONS extends ParseSchemaOptions, PARSED_ROOT_SCHEMA> = SUB_SCHEMAS extends [infer SUB_SCHEMAS_HEAD, ...infer SUB_SCHEMAS_TAIL] ? SUB_SCHEMAS_HEAD extends JSONSchema7$1 ? SUB_SCHEMAS_TAIL extends JSONSchema7$1[] ? RecurseOnAllOfSchema<SUB_SCHEMAS_TAIL, ROOT_SCHEMA, OPTIONS, M.$Intersect<ParseSchema<MergeSubSchema<Omit<ROOT_SCHEMA, "allOf">, SUB_SCHEMAS_HEAD>, OPTIONS>, PARSED_ROOT_SCHEMA>> : never : never : PARSED_ROOT_SCHEMA;

declare type AnyOfSchema = JSONSchema7$1 & {
    anyOf: JSONSchema7$1[];
};
declare type ParseAnyOfSchema<SCHEMA extends AnyOfSchema, OPTIONS extends ParseSchemaOptions> = M.$Union<RecurseOnAnyOfSchema<SCHEMA["anyOf"], SCHEMA, OPTIONS>>;
declare type RecurseOnAnyOfSchema<SUB_SCHEMAS extends JSONSchema7$1[], ROOT_SCHEMA extends AnyOfSchema, OPTIONS extends ParseSchemaOptions, RESULT = never> = SUB_SCHEMAS extends [infer SUB_SCHEMAS_HEAD, ...infer SUB_SCHEMAS_TAIL] ? SUB_SCHEMAS_HEAD extends JSONSchema7$1 ? SUB_SCHEMAS_TAIL extends JSONSchema7$1[] ? RecurseOnAnyOfSchema<SUB_SCHEMAS_TAIL, ROOT_SCHEMA, OPTIONS, RESULT | M.$Intersect<ParseSchema<Omit<ROOT_SCHEMA, "anyOf">, OPTIONS>, ParseSchema<MergeSubSchema<Omit<ROOT_SCHEMA, "anyOf">, SUB_SCHEMAS_HEAD>, OPTIONS>>> : never : never : RESULT;

declare type MultipleTypesSchema = JSONSchema7$1 & {
    type: JSONSchema7TypeName[];
};
declare type ParseMultipleTypesSchema<SCHEMA extends MultipleTypesSchema, OPTIONS extends ParseSchemaOptions> = M.$Union<RecurseOnMixedSchema<SCHEMA["type"], SCHEMA, OPTIONS>>;
declare type RecurseOnMixedSchema<TYPES extends JSONSchema7TypeName[], ROOT_SCHEMA extends MultipleTypesSchema, OPTIONS extends ParseSchemaOptions, RESULT = never> = TYPES extends [infer TYPES_HEAD, ...infer TYPES_TAIL] ? TYPES_HEAD extends JSONSchema7TypeName ? TYPES_TAIL extends JSONSchema7TypeName[] ? RecurseOnMixedSchema<TYPES_TAIL, ROOT_SCHEMA, OPTIONS, RESULT | ParseSchema<Omit<ROOT_SCHEMA, "type"> & {
    type: TYPES_HEAD;
}, OPTIONS>> : never : never : RESULT;

declare type ArraySchema = JSONSchema7$1 & {
    type: "array";
};
declare type SimpleArraySchema = JSONSchema7$1 & {
    type: "array";
    items: JSONSchema7$1;
};
declare type TupleSchema = JSONSchema7$1 & {
    type: "array";
    items: JSONSchema7$1[];
};
declare type ParseArraySchema<SCHEMA extends ArraySchema, OPTIONS extends ParseSchemaOptions> = SCHEMA extends SimpleArraySchema ? M.$Array<ParseSchema<SCHEMA["items"], OPTIONS>> : SCHEMA extends TupleSchema ? M.$Union<ApplyMinMaxAndAdditionalItems<ParseTupleItems<SCHEMA["items"], OPTIONS>, SCHEMA, OPTIONS>> : M.$Array;
declare type ParseTupleItems<ITEM_SCHEMAS extends JSONSchema7$1[], OPTIONS extends ParseSchemaOptions> = ITEM_SCHEMAS extends [infer ITEM_SCHEMAS_HEAD, ...infer ITEM_SCHEMAS_TAIL] ? ITEM_SCHEMAS_HEAD extends JSONSchema7$1 ? ITEM_SCHEMAS_TAIL extends JSONSchema7$1[] ? [
    ParseSchema<ITEM_SCHEMAS_HEAD, OPTIONS>,
    ...ParseTupleItems<ITEM_SCHEMAS_TAIL, OPTIONS>
] : never : never : [];
declare type ApplyMinMaxAndAdditionalItems<PARSED_ITEM_SCHEMAS extends any[], ROOT_SCHEMA extends ArraySchema, OPTIONS extends ParseSchemaOptions> = ApplyAdditionalItems<ApplyMinMax<PARSED_ITEM_SCHEMAS, ROOT_SCHEMA extends {
    minItems: number;
} ? ROOT_SCHEMA["minItems"] : 0, ROOT_SCHEMA extends {
    maxItems: number;
} ? ROOT_SCHEMA["maxItems"] : undefined>, ROOT_SCHEMA extends {
    additionalItems: JSONSchema7$1;
} ? ROOT_SCHEMA["additionalItems"] : true, OPTIONS>;
declare type ApplyMinMax<RECURSED_PARSED_ITEM_SCHEMAS extends any[], MIN extends number, MAX extends number | undefined, RESULT = never, HAS_ENCOUNTERED_MIN extends boolean = false, HAS_ENCOUNTERED_MAX extends boolean = false, INITIAL_PARSED_ITEM_SCHEMAS extends any[] = RECURSED_PARSED_ITEM_SCHEMAS> = And<Not<DoesExtend<MIN, RECURSED_PARSED_ITEM_SCHEMAS["length"]>>, DoesExtend<RECURSED_PARSED_ITEM_SCHEMAS, [any, ...any[]]>> extends true ? RECURSED_PARSED_ITEM_SCHEMAS extends [
    ...infer RECURSED_PARSED_ITEM_SCHEMAS_BODY,
    unknown
] ? ApplyMinMax<RECURSED_PARSED_ITEM_SCHEMAS_BODY, MIN, MAX, RECURSED_PARSED_ITEM_SCHEMAS["length"] extends MAX ? M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS> : RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS>, HAS_ENCOUNTERED_MIN extends true ? true : DoesExtend<MIN, RECURSED_PARSED_ITEM_SCHEMAS["length"]>, HAS_ENCOUNTERED_MAX extends true ? true : DoesExtend<MAX, RECURSED_PARSED_ITEM_SCHEMAS["length"]>, INITIAL_PARSED_ITEM_SCHEMAS> : never : {
    result: MAX extends undefined ? RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS> : HAS_ENCOUNTERED_MAX extends true ? RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS> : MAX extends RECURSED_PARSED_ITEM_SCHEMAS["length"] ? M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS> : IsLongerThan<Tail<RECURSED_PARSED_ITEM_SCHEMAS>, MAX> extends true ? never : RESULT | M.$Tuple<RECURSED_PARSED_ITEM_SCHEMAS>;
    hasEncounteredMin: DoesExtend<MIN, RECURSED_PARSED_ITEM_SCHEMAS["length"]>;
    hasEncounteredMax: HAS_ENCOUNTERED_MAX extends true ? true : MAX extends RECURSED_PARSED_ITEM_SCHEMAS["length"] ? true : IsLongerThan<Tail<RECURSED_PARSED_ITEM_SCHEMAS>, MAX>;
    completeTuple: INITIAL_PARSED_ITEM_SCHEMAS;
};
declare type IsLongerThan<TUPLE extends any[], LENGTH extends number | undefined, RESULT extends boolean = false> = LENGTH extends undefined ? false : TUPLE["length"] extends LENGTH ? true : TUPLE extends [any, ...infer TUPLE_TAIL] ? IsLongerThan<TUPLE_TAIL, LENGTH> : RESULT;
declare type ApplyAdditionalItems<APPLY_MIN_MAX_RESULT extends {
    result: any;
    hasEncounteredMin: boolean;
    hasEncounteredMax: boolean;
    completeTuple: any[];
}, ADDITIONAL_ITEMS_SCHEMA extends JSONSchema7$1, OPTIONS extends ParseSchemaOptions> = APPLY_MIN_MAX_RESULT extends {
    hasEncounteredMax: true;
} ? APPLY_MIN_MAX_RESULT extends {
    hasEncounteredMin: true;
} ? APPLY_MIN_MAX_RESULT["result"] : M.Never : ADDITIONAL_ITEMS_SCHEMA extends false ? APPLY_MIN_MAX_RESULT extends {
    hasEncounteredMin: true;
} ? APPLY_MIN_MAX_RESULT["result"] : M.Never : ADDITIONAL_ITEMS_SCHEMA extends true ? APPLY_MIN_MAX_RESULT extends {
    hasEncounteredMin: true;
} ? APPLY_MIN_MAX_RESULT["result"] | M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], M.Any> : M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], M.Any> : APPLY_MIN_MAX_RESULT["hasEncounteredMin"] extends true ? APPLY_MIN_MAX_RESULT["result"] | M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], ParseSchema<ADDITIONAL_ITEMS_SCHEMA, OPTIONS>> : M.$Tuple<APPLY_MIN_MAX_RESULT["completeTuple"], ParseSchema<ADDITIONAL_ITEMS_SCHEMA, OPTIONS>>;

declare type ObjectSchema = JSONSchema7$1 & {
    type: "object";
};
declare type ParseObjectSchema<SCHEMA extends ObjectSchema, OPTIONS extends ParseSchemaOptions> = SCHEMA extends {
    properties: Record<string, JSONSchema7$1>;
} ? M.$Object<{
    [KEY in keyof SCHEMA["properties"]]: ParseSchema<SCHEMA["properties"][KEY], OPTIONS>;
}, GetRequired<SCHEMA>, GetOpenProps<SCHEMA, OPTIONS>> : M.$Object<{}, GetRequired<SCHEMA>, GetOpenProps<SCHEMA, OPTIONS>>;
declare type GetRequired<SCHEMA extends ObjectSchema> = SCHEMA extends {
    required: ReadonlyArray<string>;
} ? SCHEMA["required"][number] : never;
declare type GetOpenProps<SCHEMA extends ObjectSchema, OPTIONS extends ParseSchemaOptions> = SCHEMA extends {
    additionalProperties: JSONSchema7$1;
} ? SCHEMA extends {
    patternProperties: Record<string, JSONSchema7$1>;
} ? AdditionalAndPatternProps<SCHEMA["additionalProperties"], SCHEMA["patternProperties"], OPTIONS> : ParseSchema<SCHEMA["additionalProperties"], OPTIONS> : SCHEMA extends {
    patternProperties: Record<string, JSONSchema7$1>;
} ? PatternProps<SCHEMA["patternProperties"], OPTIONS> : M.Any;
declare type PatternProps<PATTERN_PROPERTY_SCHEMAS extends Record<string, JSONSchema7$1>, OPTIONS extends ParseSchemaOptions> = M.$Union<{
    [KEY in keyof PATTERN_PROPERTY_SCHEMAS]: ParseSchema<PATTERN_PROPERTY_SCHEMAS[KEY], OPTIONS>;
}[keyof PATTERN_PROPERTY_SCHEMAS]>;
declare type AdditionalAndPatternProps<ADDITIONAL_ITEMS_SCHEMA extends JSONSchema7$1, PATTERN_PROPERTY_SCHEMAS extends Record<string, JSONSchema7$1>, OPTIONS extends ParseSchemaOptions> = ADDITIONAL_ITEMS_SCHEMA extends boolean ? PatternProps<PATTERN_PROPERTY_SCHEMAS, OPTIONS> : M.$Union<ParseSchema<ADDITIONAL_ITEMS_SCHEMA, OPTIONS> | {
    [KEY in keyof PATTERN_PROPERTY_SCHEMAS]: ParseSchema<PATTERN_PROPERTY_SCHEMAS[KEY], OPTIONS>;
}[keyof PATTERN_PROPERTY_SCHEMAS]>;

declare type SingleTypeSchema = JSONSchema7$1 & {
    type: JSONSchema7TypeName;
};
declare type ParseSingleTypeSchema<SCHEMA extends SingleTypeSchema, OPTIONS extends ParseSchemaOptions> = SCHEMA extends {
    type: "null";
} ? M.Primitive<null> : SCHEMA extends {
    type: "boolean";
} ? M.Primitive<boolean> : SCHEMA extends {
    type: "integer";
} ? M.Primitive<number> : SCHEMA extends {
    type: "number";
} ? M.Primitive<number> : SCHEMA extends {
    type: "string";
} ? M.Primitive<string> : SCHEMA extends ArraySchema ? ParseArraySchema<SCHEMA, OPTIONS> : SCHEMA extends ObjectSchema ? ParseObjectSchema<SCHEMA, OPTIONS> : M.Never;

declare type ConstSchema = JSONSchema7$1 & {
    const: unknown;
};
declare type ParseConstSchema<SCHEMA extends ConstSchema, OPTIONS extends ParseSchemaOptions> = SCHEMA extends SingleTypeSchema ? IntersectConstAndTypeSchema<SCHEMA, OPTIONS> : SCHEMA extends MultipleTypesSchema ? IntersectConstAndTypeSchema<SCHEMA, OPTIONS> : ParseConst<SCHEMA>;
declare type IntersectConstAndTypeSchema<SCHEMA extends ConstSchema & (SingleTypeSchema | MultipleTypesSchema), OPTIONS extends ParseSchemaOptions> = M.$Intersect<ParseConst<SCHEMA>, ParseSchema<Omit<SCHEMA, "const">, OPTIONS>>;
declare type ParseConst<S extends ConstSchema> = M.Const<S["const"]>;

declare type DeserializeSchema<S extends JSONSchema7$1, O extends Omit<ParseSchemaOptions, "deserialize"> & {
    deserialize: DeserializationPattern[];
}> = RecurseOnDeserializationPatterns<S, O["deserialize"]>;
declare type RecurseOnDeserializationPatterns<S extends JSONSchema7$1, P extends DeserializationPattern[], R = M.Any> = P extends [infer H, ...infer T] ? H extends DeserializationPattern ? T extends DeserializationPattern[] ? RecurseOnDeserializationPatterns<S, T, S extends H["pattern"] ? M.$Intersect<M.Any<true, H["output"]>, R> : R> : never : never : R;

declare type EnumSchema = JSONSchema7$1 & {
    enum: unknown[];
};
declare type ParseEnumSchema<SCHEMA extends EnumSchema, OPTIONS extends ParseSchemaOptions> = M.$Intersect<ParseEnum<SCHEMA>, ParseSchema<Omit<SCHEMA, "enum">, OPTIONS>>;
declare type ParseEnum<SCHEMA extends EnumSchema> = M.Enum<SCHEMA["enum"][number]>;

declare type IfThenElseSchema = JSONSchema7$1 & {
    if: JSONSchema7$1;
    then?: JSONSchema7$1;
    else?: JSONSchema7$1;
};
declare type ParseIfThenElseSchema<SCHEMA extends IfThenElseSchema, OPTIONS extends ParseSchemaOptions, REST_SCHEMA extends JSONSchema7$1 = Omit<SCHEMA, "if" | "then" | "else">, IF_SCHEMA extends JSONSchema7$1 = MergeSubSchema<REST_SCHEMA, SCHEMA["if"]>, PARSED_THEN_SCHEMA = SCHEMA extends {
    then: JSONSchema7$1;
} ? M.$Intersect<ParseSchema<IF_SCHEMA, OPTIONS>, ParseSchema<MergeSubSchema<REST_SCHEMA, SCHEMA["then"]>, OPTIONS>> : ParseSchema<IF_SCHEMA, OPTIONS>, PARSED_ELSE_SCHEMA = SCHEMA extends {
    else: JSONSchema7$1;
} ? M.$Intersect<M.$Exclude<ParseSchema<REST_SCHEMA, OPTIONS>, ParseSchema<IF_SCHEMA, OPTIONS>>, ParseSchema<MergeSubSchema<REST_SCHEMA, SCHEMA["else"]>, OPTIONS>> : M.$Exclude<ParseSchema<REST_SCHEMA, OPTIONS>, ParseSchema<IF_SCHEMA, OPTIONS>>> = M.$Intersect<M.$Union<PARSED_THEN_SCHEMA | PARSED_ELSE_SCHEMA>, ParseSchema<REST_SCHEMA, OPTIONS>>;

declare type NotSchema = JSONSchema7$1 & {
    not: JSONSchema7$1;
};
declare type AllTypes = M.Union<M.Primitive<null> | M.Primitive<boolean> | M.Primitive<number> | M.Primitive<string> | M.Array | M.Object<{}, never, M.Any>>;
declare type ParseNotSchema<SCHEMA extends NotSchema, OPTIONS extends ParseSchemaOptions, PARSED_REST_SCHEMA = ParseSchema<Omit<SCHEMA, "not">, OPTIONS>, EXCLUSION = M.$Exclude<PARSED_REST_SCHEMA extends M.AnyType ? M.$Intersect<AllTypes, PARSED_REST_SCHEMA> : PARSED_REST_SCHEMA, ParseSchema<MergeSubSchema<Omit<SCHEMA, "not">, SCHEMA["not"]>, OPTIONS>>> = EXCLUSION extends M.Never ? PARSED_REST_SCHEMA : EXCLUSION;

declare type NullableSchema = JSONSchema7$1 & {
    nullable: boolean;
};
declare type ParseNullableSchema<SCHEMA extends NullableSchema, OPTIONS extends ParseSchemaOptions, PARSED_REST_SCHEMA = ParseSchema<Omit<SCHEMA, "nullable">, OPTIONS>> = SCHEMA extends {
    nullable: true;
} ? M.$Union<M.Primitive<null> | PARSED_REST_SCHEMA> : PARSED_REST_SCHEMA;

declare type OneOfSchema = JSONSchema7$1 & {
    oneOf: JSONSchema7$1[];
};
declare type ParseOneOfSchema<SCHEMA extends OneOfSchema, OPTIONS extends ParseSchemaOptions> = M.$Union<RecurseOnOneOfSchema<SCHEMA["oneOf"], SCHEMA, OPTIONS>>;
declare type RecurseOnOneOfSchema<SUB_SCHEMAS extends JSONSchema7$1[], ROOT_SCHEMA extends OneOfSchema, OPTIONS extends ParseSchemaOptions, RESULT = never> = SUB_SCHEMAS extends [infer SUB_SCHEMAS_HEAD, ...infer SUB_SCHEMAS_TAIL] ? SUB_SCHEMAS_HEAD extends JSONSchema7$1 ? SUB_SCHEMAS_TAIL extends JSONSchema7$1[] ? RecurseOnOneOfSchema<SUB_SCHEMAS_TAIL, ROOT_SCHEMA, OPTIONS, RESULT | M.$Intersect<ParseSchema<Omit<ROOT_SCHEMA, "oneOf">, OPTIONS>, ParseSchema<MergeSubSchema<Omit<ROOT_SCHEMA, "oneOf">, SUB_SCHEMAS_HEAD>, OPTIONS>>> : never : never : RESULT;

declare type ParseReference<Sc extends JSONSchema7$1, O extends ParseSchemaOptions, P extends string | undefined, R extends JSONSchema7$1, C extends JSONSchema7$1 = P extends string ? DeepGet<Sc, Tail<Split<P, "/">>, false> : Sc> = M.$Intersect<ParseSchema<C, O>, ParseSchema<MergeSubSchema<C, R>, O>>;

declare type ParseDefinitionSchema<REF_SCHEMA extends ReferenceSchema, OPTIONS extends ParseSchemaOptions, DEFINITION extends string> = ParseReference<OPTIONS["rootSchema"], OPTIONS, DEFINITION, Omit<REF_SCHEMA, "$ref">>;

declare type ParseExternalReferenceSchema<REF_SCHEMA extends ReferenceSchema, OPTIONS extends ParseSchemaOptions, REFERENCE extends string, DEFINITION extends string | undefined, REST_SCHEMA extends JSONSchema7$1 = Omit<REF_SCHEMA, "$ref">> = REFERENCE extends keyof OPTIONS["references"] ? ParseReference<OPTIONS["references"][REFERENCE], OPTIONS, DEFINITION, REST_SCHEMA> : OPTIONS extends {
    rootSchema: IdSchema;
} ? ParseExternalReferenceWithIdSchema<OPTIONS, REFERENCE, DEFINITION, REST_SCHEMA> : M.Never;
declare type ParseDomain<REFERENCE extends string> = Join<Pop<Split<REFERENCE, "/">>, "/">;
declare type IdSchema = JSONSchema7$1 & {
    $id: string;
};
declare type ParseExternalReferenceWithIdSchema<OPTIONS extends ParseSchemaOptions & {
    rootSchema: IdSchema;
}, REFERENCE extends string, DEFINITION extends string | undefined, REST_SCHEMA extends JSONSchema7$1, DOMAIN extends string = ParseDomain<OPTIONS["rootSchema"]["$id"]>, COMPLETE_REFERENCE extends string = Join<[DOMAIN, REFERENCE], "/">> = COMPLETE_REFERENCE extends keyof OPTIONS["references"] ? ParseReference<OPTIONS["references"][COMPLETE_REFERENCE], OPTIONS, DEFINITION, REST_SCHEMA> : M.Never;

declare type ReferenceSchema = JSONSchema7$1 & {
    $ref: string;
};
declare type ParseReferenceSchema<REF_SCHEMA extends ReferenceSchema, OPTIONS extends ParseSchemaOptions, REF_AND_DEFINITION extends string[] = Split<REF_SCHEMA["$ref"], "#">> = REF_AND_DEFINITION[0] extends "" ? ParseDefinitionSchema<REF_SCHEMA, OPTIONS, REF_AND_DEFINITION[1]> : ParseExternalReferenceSchema<REF_SCHEMA, OPTIONS, REF_AND_DEFINITION[0], REF_AND_DEFINITION[1]>;

declare type ParseSchemaOptions = {
    parseNotKeyword: boolean;
    parseIfThenElseKeywords: boolean;
    rootSchema: JSONSchema7$1;
    references: Record<string, JSONSchema7$1>;
    deserialize: DeserializationPattern[] | false;
};
declare type ParseSchema<SCHEMA extends JSONSchema7$1, OPTIONS extends ParseSchemaOptions, RESULT = JSONSchema7$1 extends SCHEMA ? M.Any : SCHEMA extends true | string ? M.Any : SCHEMA extends false ? M.Never : SCHEMA extends NullableSchema ? ParseNullableSchema<SCHEMA, OPTIONS> : SCHEMA extends ReferenceSchema ? ParseReferenceSchema<SCHEMA, OPTIONS> : And<DoesExtend<OPTIONS["parseIfThenElseKeywords"], true>, DoesExtend<SCHEMA, IfThenElseSchema>> extends true ? SCHEMA extends IfThenElseSchema ? ParseIfThenElseSchema<SCHEMA, OPTIONS> : never : And<DoesExtend<OPTIONS["parseNotKeyword"], true>, DoesExtend<SCHEMA, NotSchema>> extends true ? SCHEMA extends NotSchema ? ParseNotSchema<SCHEMA, OPTIONS> : never : SCHEMA extends AllOfSchema ? ParseAllOfSchema<SCHEMA, OPTIONS> : SCHEMA extends OneOfSchema ? ParseOneOfSchema<SCHEMA, OPTIONS> : SCHEMA extends AnyOfSchema ? ParseAnyOfSchema<SCHEMA, OPTIONS> : SCHEMA extends EnumSchema ? ParseEnumSchema<SCHEMA, OPTIONS> : SCHEMA extends ConstSchema ? ParseConstSchema<SCHEMA, OPTIONS> : SCHEMA extends MultipleTypesSchema ? ParseMultipleTypesSchema<SCHEMA, OPTIONS> : SCHEMA extends SingleTypeSchema ? ParseSingleTypeSchema<SCHEMA, OPTIONS> : M.Any> = OPTIONS extends {
    deserialize: DeserializationPattern[];
} ? M.$Intersect<DeserializeSchema<SCHEMA, OPTIONS>, RESULT> : RESULT;

declare type $Compiler<C extends unknown[] = [], V extends unknown[] = []> = (schema: JSONSchema, ...compilingOptions: C) => (data: unknown, ...validationOptions: V) => boolean;
declare type Compiler<O extends FromSchemaOptions = FromSchemaDefaultOptions, C extends unknown[] = [], V extends unknown[] = []> = <S extends JSONSchema, T = FromSchema<S, O>>(schema: S, ...compilingOptions: C) => (data: unknown, ...validationOptions: V) => data is T;
declare type CompilerWrapper = <O extends FromSchemaOptions = FromSchemaDefaultOptions, C extends unknown[] = [], V extends unknown[] = []>(compiler: $Compiler<C, V>) => Compiler<O, C, V>;
declare const wrapCompilerAsTypeGuard: CompilerWrapper;

declare type $Validator<V extends unknown[] = []> = (schema: JSONSchema, data: unknown, ...validationOptions: V) => boolean;
declare type Validator<O extends FromSchemaOptions = FromSchemaDefaultOptions, V extends unknown[] = []> = <S extends JSONSchema, T = FromSchema<S, O>>(schema: S, data: unknown, ...validationOptions: V) => data is T;
declare type ValidatorWrapper = <O extends FromSchemaOptions = FromSchemaDefaultOptions, V extends unknown[] = []>(validator: $Validator<V>) => Validator<O, V>;
declare const wrapValidatorAsTypeGuard: ValidatorWrapper;

declare const asConst: <INPUT>(input: Narrow<INPUT>) => Narrow<INPUT>;

declare type JSONSchema7 = JSONSchema7$1 | DeepReadonly<JSONSchema7$1>;
declare type ExtendedJSONSchema7<EXTENSION extends JSONSchema7Extension> = ExtendedJSONSchema7$1<EXTENSION> | DeepReadonly<ExtendedJSONSchema7$1<EXTENSION>>;
declare type JSONSchema7Reference = JSONSchema7Reference$1 | DeepReadonly<JSONSchema7Reference$1>;
declare type ExtendedJSONSchema7Reference<EXTENSION extends JSONSchema7Extension> = ExtendedJSONSchema7Reference$1<EXTENSION> | DeepReadonly<ExtendedJSONSchema7Reference$1<EXTENSION>>;
declare type JSONSchema = JSONSchema7;
declare type ExtendedJSONSchema<EXTENSION extends JSONSchema7Extension> = ExtendedJSONSchema7<EXTENSION>;
declare type FromSchema<SCHEMA extends JSONSchema, OPTIONS extends FromSchemaOptions = FromSchemaDefaultOptions, WRITABLE_SCHEMA extends JSONSchema7$1 = SCHEMA extends Record<string | number | symbol, unknown> ? DeepWritable<SCHEMA> : SCHEMA> = M.$Resolve<ParseSchema<WRITABLE_SCHEMA, ParseOptions<WRITABLE_SCHEMA, OPTIONS>>>;
declare type FromExtendedSchema<EXTENSION extends JSONSchema7Extension, SCHEMA extends ExtendedJSONSchema<EXTENSION>, OPTIONS extends FromExtendedSchemaOptions<EXTENSION> = FromSchemaDefaultOptions, UNEXTENDED_SCHEMA = UnextendJSONSchema7<EXTENSION, SCHEMA>> = UNEXTENDED_SCHEMA extends JSONSchema ? FromSchema<UNEXTENDED_SCHEMA, OPTIONS> : never;

export { $Compiler, $Validator, Compiler, DeserializationPattern, ExtendedJSONSchema, ExtendedJSONSchema7, ExtendedJSONSchema7Reference, FromExtendedSchema, FromExtendedSchemaOptions, FromSchema, FromSchemaDefaultOptions, FromSchemaOptions, JSONSchema, JSONSchema7, JSONSchema7Extension, JSONSchema7Reference, Validator, asConst, wrapCompilerAsTypeGuard, wrapValidatorAsTypeGuard };
