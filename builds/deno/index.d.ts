import { M } from 'https://cdn.skypack.dev/ts-algebra@^1.2.0?dts';
import { JSONSchema7 as JSONSchema7$2, JSONSchema7TypeName } from 'https://cdn.skypack.dev/@types/json-schema@^7.0.9?dts';
import { JSONSchema7Reference as JSONSchema7Reference$2, JSONSchema as JSONSchema$1, FromSchemaOptions as FromSchemaOptions$1, FromSchemaDefaultOptions as FromSchemaDefaultOptions$1, FromSchema as FromSchema$1 } from '~/index';
import { JSONSchema7 as JSONSchema7$3, DeserializationPattern as DeserializationPattern$1 } from '~/definitions';
import { Reverse, Tail, DoesExtend, Compute, DeepGet, Split, Join, Pop, And, Narrow } from '~/type-utils';
import { Split as Split$1 } from '~/type-utils/split';

type DeserializationPattern = {
    pattern: unknown;
    output: unknown;
};

declare const $JSONSchema7: unique symbol;
type $JSONSchema7 = typeof $JSONSchema7;
type JSONSchema7$1 = boolean | (Omit<JSONSchema7$2, "const" | "enum" | "items" | "additionalItems" | "contains" | "properties" | "patternProperties" | "additionalProperties" | "dependencies" | "propertyNames" | "if" | "then" | "else" | "allOf" | "anyOf" | "oneOf" | "not" | "definitions" | "examples" | "default"> & {
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
type JSONSchema7Reference$1 = JSONSchema7$1 & {
    $id: string;
};

type JSONSchema7Extension = Record<string, unknown>;
type ExtendedJSONSchema7$1<E extends JSONSchema7Extension = JSONSchema7Extension> = boolean | (Omit<JSONSchema7$2, "const" | "enum" | "items" | "additionalItems" | "contains" | "properties" | "patternProperties" | "additionalProperties" | "dependencies" | "propertyNames" | "if" | "then" | "else" | "allOf" | "anyOf" | "oneOf" | "not" | "definitions" | "examples" | "default"> & {
    const?: unknown;
    enum?: unknown;
    items?: ExtendedJSONSchema7$1<E> | ExtendedJSONSchema7$1<E>[];
    additionalItems?: ExtendedJSONSchema7$1<E>;
    contains?: ExtendedJSONSchema7$1<E>;
    properties?: Record<string, ExtendedJSONSchema7$1<E>>;
    patternProperties?: Record<string, ExtendedJSONSchema7$1<E>>;
    additionalProperties?: ExtendedJSONSchema7$1<E>;
    dependencies?: {
        [key: string]: ExtendedJSONSchema7$1<E> | string[];
    };
    propertyNames?: ExtendedJSONSchema7$1<E>;
    if?: ExtendedJSONSchema7$1<E>;
    then?: ExtendedJSONSchema7$1<E>;
    else?: ExtendedJSONSchema7$1<E>;
    allOf?: ExtendedJSONSchema7$1<E>[];
    anyOf?: ExtendedJSONSchema7$1<E>[];
    oneOf?: ExtendedJSONSchema7$1<E>[];
    not?: ExtendedJSONSchema7$1<E>;
    nullable?: boolean;
    definitions?: {
        [key: string]: ExtendedJSONSchema7$1<E>;
    };
    examples?: unknown[];
    default?: unknown;
} & Partial<E>);
type ExtendedJSONSchema7Reference$1<E extends JSONSchema7Extension = JSONSchema7Extension> = ExtendedJSONSchema7$1<E> & {
    $id: string;
};
type UnextendJSONSchema7Tuple<E extends JSONSchema7Extension, S extends ExtendedJSONSchema7$1<E>[]> = S extends [infer H, ...infer T] ? H extends ExtendedJSONSchema7$1<E> ? T extends ExtendedJSONSchema7$1<E>[] ? [UnextendJSONSchema7<E, H>, ...UnextendJSONSchema7Tuple<E, T>] : never : never : [];
type UnextendJSONSchema7Record<E extends JSONSchema7Extension, S extends Record<string, unknown>> = {
    [key in keyof S]: S[key] extends ExtendedJSONSchema7$1<E> ? UnextendJSONSchema7<E, S[key]> : S[key];
};
type UnextendJSONSchema7<E extends JSONSchema7Extension, S> = S extends boolean ? S : {
    [key in $JSONSchema7 | keyof S]: key extends keyof S ? S extends {
        [k in key]: ExtendedJSONSchema7$1<E>;
    } ? UnextendJSONSchema7<E, S[key]> : S extends {
        [k in key]: ExtendedJSONSchema7$1<E>[];
    } ? number extends S[key]["length"] ? UnextendJSONSchema7<E, S[key][number]>[] : S[key] extends ExtendedJSONSchema7$1<E>[] ? UnextendJSONSchema7Tuple<E, S[key]> : never : S extends {
        [k in key]: Record<string, unknown>;
    } ? UnextendJSONSchema7Record<E, S[key]> : S[key] : key extends $JSONSchema7 ? $JSONSchema7 : never;
};

type FromSchemaOptions = {
    parseNotKeyword?: boolean;
    parseIfThenElseKeywords?: boolean;
    references?: JSONSchema7Reference$2[] | false;
    deserialize?: DeserializationPattern[] | false;
};
type FromExtendedSchemaOptions<E extends JSONSchema7Extension> = {
    parseNotKeyword?: boolean;
    parseIfThenElseKeywords?: boolean;
    references?: ExtendedJSONSchema7Reference$1<E>[] | false;
    deserialize?: DeserializationPattern[] | false;
};
type FromSchemaDefaultOptions = {
    parseNotKeyword: false;
    parseIfThenElseKeywords: false;
    references: false;
    deserialize: false;
};

type DeepReadonly<T> = T extends Record<string | number | symbol, any> ? {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
} : T;

type DeepWritable<T> = {
    -readonly [P in keyof T]: DeepWritable<T[P]>;
};

type ParseReferences<S extends JSONSchema7Reference[], R extends Record<string, JSONSchema7$1> = {}> = S extends [infer H, ...infer T] ? H extends JSONSchema7Reference ? T extends JSONSchema7Reference[] ? ParseReferences<T, R & {
    [key in H["$id"]]: DeepWritable<H>;
}> : never : never : R;
type ParseOptions<S extends JSONSchema7$1, O extends FromSchemaOptions> = {
    parseNotKeyword: O["parseNotKeyword"] extends boolean ? O["parseNotKeyword"] : FromSchemaDefaultOptions["parseNotKeyword"];
    parseIfThenElseKeywords: O["parseIfThenElseKeywords"] extends boolean ? O["parseIfThenElseKeywords"] : FromSchemaDefaultOptions["parseIfThenElseKeywords"];
    rootSchema: S;
    references: O["references"] extends JSONSchema7Reference[] ? ParseReferences<O["references"]> : {};
    deserialize: O["deserialize"] extends DeserializationPattern[] | false ? O["deserialize"] : FromSchemaDefaultOptions["deserialize"];
};

type RemoveInvalidAdditionalItems<S extends JSONSchema7$3> = S extends {
    items: JSONSchema7$3 | JSONSchema7$3[];
} ? S extends {
    additionalItems: JSONSchema7$3;
} ? S : S & {
    additionalItems: true;
} : S extends boolean ? S : Omit<S, "additionalItems">;
type EmptySchema = {
    properties: {};
    additionalProperties: true;
    required: [];
};
type MergeSubSchema<P extends JSONSchema7$3, S extends JSONSchema7$3, R extends JSONSchema7$3 = RemoveInvalidAdditionalItems<S>, C extends JSONSchema7$3 = Omit<EmptySchema, keyof R> & R> = Omit<P, keyof C> & C;

type AllOfSchema = JSONSchema7$3 & {
    allOf: JSONSchema7$3[];
};
type ParseAllOfSchema<P extends AllOfSchema, O extends ParseSchemaOptions> = RecurseOnAllOfSchema<P["allOf"], P, O, ParseSchema<Omit<P, "allOf">, O>>;
type RecurseOnAllOfSchema<S extends JSONSchema7$3[], P extends AllOfSchema, O extends ParseSchemaOptions, R> = S extends [infer H, ...infer T] ? H extends JSONSchema7$3 ? T extends JSONSchema7$3[] ? RecurseOnAllOfSchema<T, P, O, M.$Intersect<ParseSchema<MergeSubSchema<Omit<P, "allOf">, H>, O>, R>> : never : never : R;

type AnyOfSchema = JSONSchema7$3 & {
    anyOf: JSONSchema7$3[];
};
type ParseAnyOfSchema<S extends AnyOfSchema, O extends ParseSchemaOptions> = M.$Union<RecurseOnAnyOfSchema<S["anyOf"], S, O>>;
type RecurseOnAnyOfSchema<S extends JSONSchema7$3[], P extends AnyOfSchema, O extends ParseSchemaOptions, R = never> = S extends [infer H, ...infer T] ? H extends JSONSchema7$3 ? T extends JSONSchema7$3[] ? RecurseOnAnyOfSchema<T, P, O, R | M.$Intersect<ParseSchema<Omit<P, "anyOf">, O>, ParseSchema<MergeSubSchema<Omit<P, "anyOf">, H>, O>>> : never : never : R;

type MultipleTypesSchema = JSONSchema7$3 & {
    type: JSONSchema7TypeName[];
};
type ParseMultipleTypesSchema<P extends MultipleTypesSchema, O extends ParseSchemaOptions> = M.$Union<RecurseOnMixedSchema<P["type"], P, O>>;
type RecurseOnMixedSchema<S extends JSONSchema7TypeName[], P extends MultipleTypesSchema, O extends ParseSchemaOptions, R = never> = S extends [infer H, ...infer T] ? H extends JSONSchema7TypeName ? T extends JSONSchema7TypeName[] ? RecurseOnMixedSchema<T, P, O, R | ParseSchema<Omit<P, "type"> & {
    type: H;
}, O>> : never : never : R;

type ArraySchema = JSONSchema7$3 & {
    type: "array";
};
type SimpleArraySchema = JSONSchema7$3 & {
    type: "array";
    items: JSONSchema7$3;
};
type TupleSchema = JSONSchema7$3 & {
    type: "array";
    items: JSONSchema7$3[];
};
type ParseArraySchema<S extends ArraySchema, O extends ParseSchemaOptions> = S extends SimpleArraySchema ? M.$Array<ParseSchema<S["items"], O>> : S extends TupleSchema ? M.$Union<FromTreeTuple<ParseTuple<S["items"], O>, S, O>> : M.$Array;
type ParseTuple<S extends JSONSchema7$3[], O extends ParseSchemaOptions> = S extends [infer H, ...infer T] ? H extends JSONSchema7$3 ? T extends JSONSchema7$3[] ? [...ParseTuple<T, O>, ParseSchema<H, O>] : never : never : [];
type FromTreeTuple<T extends any[], S extends ArraySchema, O extends ParseSchemaOptions> = ApplyAdditionalItems<ApplyBoundaries<T, S extends {
    minItems: number;
} ? S["minItems"] : 0, S extends {
    maxItems: number;
} ? S["maxItems"] : undefined>, S extends {
    additionalItems: JSONSchema7$3;
} ? S["additionalItems"] : true, O>;
type ApplyBoundaries<T extends any[], Min extends number, Max extends number | undefined, R = never, HasMin extends boolean = false, HasMax extends boolean = false, C extends any[] = T> = {
    stop: {
        result: Max extends undefined ? R | M.$Tuple<Reverse<T>> : HasMax extends true ? R | M.$Tuple<Reverse<T>> : Max extends T["length"] ? M.$Tuple<Reverse<T>> : IsLongerThan<Tail<T>, Max> extends true ? never : R | M.$Tuple<Reverse<T>>;
        hasEncounteredMin: DoesExtend<Min, T["length"]>;
        hasEncounteredMax: HasMax extends true ? true : Max extends T["length"] ? true : IsLongerThan<Tail<T>, Max>;
        completeTuple: C;
    };
    continue: ApplyBoundaries<Tail<T>, Min, Max, T["length"] extends Max ? M.$Tuple<Reverse<T>> : R | M.$Tuple<Reverse<T>>, HasMin extends true ? true : DoesExtend<Min, T["length"]>, HasMax extends true ? true : DoesExtend<Max, T["length"]>, C>;
}[Min extends T["length"] ? "stop" : T extends [any, ...any[]] ? "continue" : "stop"];
type IsLongerThan<T extends any[], N extends number | undefined, R extends boolean = false> = {
    continue: N extends undefined ? false : T["length"] extends N ? true : IsLongerThan<Tail<T>, N>;
    stop: T["length"] extends N ? true : R;
}[T extends [any, ...any[]] ? "continue" : "stop"];
type ApplyAdditionalItems<R extends {
    result: any;
    hasEncounteredMin: boolean;
    hasEncounteredMax: boolean;
    completeTuple: any[];
}, A extends JSONSchema7$3, O extends ParseSchemaOptions> = R extends {
    hasEncounteredMax: true;
} ? R extends {
    hasEncounteredMin: true;
} ? R["result"] : M.Never : A extends false ? R extends {
    hasEncounteredMin: true;
} ? R["result"] : M.Never : A extends true ? R extends {
    hasEncounteredMin: true;
} ? R["result"] | M.$Tuple<Reverse<R["completeTuple"]>, M.Any> : M.$Tuple<Reverse<R["completeTuple"]>, M.Any> : R["hasEncounteredMin"] extends true ? R["result"] | M.$Tuple<Reverse<R["completeTuple"]>, ParseSchema<A, O>> : M.$Tuple<Reverse<R["completeTuple"]>, ParseSchema<A, O>>;

type ObjectSchema = JSONSchema7$3 & {
    type: "object";
};
type ParseObjectSchema<S extends ObjectSchema, O extends ParseSchemaOptions> = S extends {
    properties: Record<string, JSONSchema7$3>;
} ? M.$Object<{
    [key in keyof S["properties"]]: ParseSchema<S["properties"][key], O>;
}, GetRequired<S>, GetOpenProps<S, O>> : M.$Object<{}, GetRequired<S>, GetOpenProps<S, O>>;
type GetRequired<S extends ObjectSchema> = S extends {
    required: ReadonlyArray<string>;
} ? S["required"][number] : never;
type GetOpenProps<S extends ObjectSchema, O extends ParseSchemaOptions> = S extends {
    additionalProperties: JSONSchema7$3;
} ? S extends {
    patternProperties: Record<string, JSONSchema7$3>;
} ? AdditionalAndPatternProps<S["additionalProperties"], S["patternProperties"], O> : ParseSchema<S["additionalProperties"], O> : S extends {
    patternProperties: Record<string, JSONSchema7$3>;
} ? PatternProps<S["patternProperties"], O> : M.Any;
type PatternProps<P extends Record<string, JSONSchema7$3>, O extends ParseSchemaOptions> = M.$Union<{
    [key in keyof P]: ParseSchema<P[key], O>;
}[keyof P]>;
type AdditionalAndPatternProps<A extends JSONSchema7$3, P extends Record<string, JSONSchema7$3>, O extends ParseSchemaOptions> = A extends boolean ? PatternProps<P, O> : M.$Union<ParseSchema<A, O> | {
    [key in keyof P]: ParseSchema<P[key], O>;
}[keyof P]>;

type SingleTypeSchema = JSONSchema7$3 & {
    type: JSONSchema7TypeName;
};
type ParseSingleTypeSchema<S extends SingleTypeSchema, O extends ParseSchemaOptions> = S extends {
    type: "null";
} ? M.Primitive<null> : S extends {
    type: "boolean";
} ? M.Primitive<boolean> : S extends {
    type: "integer";
} ? M.Primitive<number> : S extends {
    type: "number";
} ? M.Primitive<number> : S extends {
    type: "string";
} ? M.Primitive<string> : S extends ArraySchema ? ParseArraySchema<S, O> : S extends ObjectSchema ? ParseObjectSchema<S, O> : M.Never;

type ConstSchema = JSONSchema7$3 & {
    const: unknown;
};
type ParseConstSchema<S extends ConstSchema, O extends ParseSchemaOptions> = S extends SingleTypeSchema ? IntersectConstAndTypeSchema<S, O> : S extends MultipleTypesSchema ? IntersectConstAndTypeSchema<S, O> : ParseConst<S>;
type IntersectConstAndTypeSchema<S extends ConstSchema & (SingleTypeSchema | MultipleTypesSchema), O extends ParseSchemaOptions> = M.$Intersect<ParseConst<S>, ParseSchema<Omit<S, "const">, O>>;
type ParseConst<S extends ConstSchema> = M.Const<S["const"]>;

type DeserializeSchema<S extends JSONSchema7$3, O extends Omit<ParseSchemaOptions, "deserialize"> & {
    deserialize: DeserializationPattern$1[];
}> = RecurseOnDeserializationPatterns<S, O["deserialize"]>;
type RecurseOnDeserializationPatterns<S extends JSONSchema7$3, P extends DeserializationPattern$1[], R = M.Any> = P extends [infer H, ...infer T] ? H extends DeserializationPattern$1 ? T extends DeserializationPattern$1[] ? RecurseOnDeserializationPatterns<S, T, S extends H["pattern"] ? M.$Intersect<M.Any<true, H["output"]>, R> : R> : never : never : R;

type EnumSchema = JSONSchema7$3 & {
    enum: unknown[];
};
type ParseEnumSchema<S extends EnumSchema, O extends ParseSchemaOptions> = M.$Intersect<ParseEnum<S>, ParseSchema<Omit<S, "enum">, O>>;
type ParseEnum<S extends EnumSchema> = M.Enum<Compute<S["enum"][number]>>;

type IfThenElseSchema = JSONSchema7$3 & {
    if: JSONSchema7$3;
    then?: JSONSchema7$3;
    else?: JSONSchema7$3;
};
type ParseIfThenElseSchema<S extends IfThenElseSchema, O extends ParseSchemaOptions, R extends JSONSchema7$3 = Omit<S, "if" | "then" | "else">, I extends JSONSchema7$3 = MergeSubSchema<R, S["if"]>, T = S extends {
    then: JSONSchema7$3;
} ? M.$Intersect<ParseSchema<I, O>, ParseSchema<MergeSubSchema<R, S["then"]>, O>> : ParseSchema<I, O>, E = S extends {
    else: JSONSchema7$3;
} ? M.$Intersect<M.$Exclude<ParseSchema<R, O>, ParseSchema<I, O>>, ParseSchema<MergeSubSchema<R, S["else"]>, O>> : M.$Exclude<ParseSchema<R, O>, ParseSchema<I, O>>> = M.$Intersect<M.$Union<T | E>, ParseSchema<R, O>>;

type NotSchema = JSONSchema7$3 & {
    not: JSONSchema7$3;
};
type AllTypes = M.Union<M.Primitive<null> | M.Primitive<boolean> | M.Primitive<number> | M.Primitive<string> | M.Array | M.Object<{}, never, M.Any>>;
type ParseNotSchema<S extends NotSchema, O extends ParseSchemaOptions, P = ParseSchema<Omit<S, "not">, O>, E = M.$Exclude<P extends M.AnyType ? M.$Intersect<AllTypes, P> : P, ParseSchema<MergeSubSchema<Omit<S, "not">, S["not"]>, O>>> = E extends M.Never ? P : E;

type NullableSchema = JSONSchema7$3 & {
    nullable: boolean;
};
type ParseNullableSchema<S extends NullableSchema, O extends ParseSchemaOptions, R = ParseSchema<Omit<S, "nullable">, O>> = S extends {
    nullable: true;
} ? M.$Union<M.Primitive<null> | R> : R;

type OneOfSchema = JSONSchema7$3 & {
    oneOf: JSONSchema7$3[];
};
type ParseOneOfSchema<P extends OneOfSchema, O extends ParseSchemaOptions> = M.$Union<RecurseOnOneOfSchema<P["oneOf"], P, O>>;
type RecurseOnOneOfSchema<S extends JSONSchema7$3[], P extends OneOfSchema, O extends ParseSchemaOptions, R = never> = S extends [infer H, ...infer T] ? H extends JSONSchema7$3 ? T extends JSONSchema7$3[] ? RecurseOnOneOfSchema<T, P, O, R | M.$Intersect<ParseSchema<Omit<P, "oneOf">, O>, ParseSchema<MergeSubSchema<Omit<P, "oneOf">, H>, O>>> : never : never : R;

type ParseReference<Sc extends JSONSchema7$3, O extends ParseSchemaOptions, P extends string | undefined, R extends JSONSchema7$3, C extends JSONSchema7$3 = P extends string ? DeepGet<Sc, Tail<Split<P, "/">>, false> : Sc> = M.$Intersect<ParseSchema<C, O>, ParseSchema<MergeSubSchema<C, R>, O>>;

type ParseDefinitionSchema<S extends ReferenceSchema, O extends ParseSchemaOptions, P extends string> = ParseReference<O["rootSchema"], O, P, Omit<S, "$ref">>;

type ParseExternalReferenceSchema<Sc extends ReferenceSchema, O extends ParseSchemaOptions, A extends string, P extends string | undefined, R extends JSONSchema7$3 = Omit<Sc, "$ref">> = A extends keyof O["references"] ? ParseReference<O["references"][A], O, P, R> : O extends {
    rootSchema: IdSchema;
} ? ParseExternalReferenceWithIdSchema<O, A, P, R> : M.Never;
type ParseDomain<R extends string> = Join<Pop<Split<R, "/">>, "/">;
type IdSchema = JSONSchema7$3 & {
    $id: string;
};
type ParseExternalReferenceWithIdSchema<O extends ParseSchemaOptions & {
    rootSchema: IdSchema;
}, A extends string, P extends string | undefined, R extends JSONSchema7$3, D extends string = ParseDomain<O["rootSchema"]["$id"]>, C extends string = Join<[D, A], "/">> = C extends keyof O["references"] ? ParseReference<O["references"][C], O, P, R> : M.Never;

type ReferenceSchema = JSONSchema7$3 & {
    $ref: string;
};
type ParseReferenceSchema<Sc extends ReferenceSchema, O extends ParseSchemaOptions, R extends string[] = Split$1<Sc["$ref"], "#">> = R[0] extends "" ? ParseDefinitionSchema<Sc, O, R[1]> : ParseExternalReferenceSchema<Sc, O, R[0], R[1]>;

type ParseSchemaOptions = {
    parseNotKeyword: boolean;
    parseIfThenElseKeywords: boolean;
    rootSchema: JSONSchema7$3;
    references: Record<string, JSONSchema7$3>;
    deserialize: DeserializationPattern$1[] | false;
};
type ParseSchema<S extends JSONSchema7$3, O extends ParseSchemaOptions, P = JSONSchema7$3 extends S ? M.Any : S extends true | string ? M.Any : S extends false ? M.Never : S extends NullableSchema ? ParseNullableSchema<S, O> : S extends ReferenceSchema ? ParseReferenceSchema<S, O> : And<DoesExtend<O["parseIfThenElseKeywords"], true>, DoesExtend<S, IfThenElseSchema>> extends true ? S extends IfThenElseSchema ? ParseIfThenElseSchema<S, O> : never : And<DoesExtend<O["parseNotKeyword"], true>, DoesExtend<S, NotSchema>> extends true ? S extends NotSchema ? ParseNotSchema<S, O> : never : S extends AllOfSchema ? ParseAllOfSchema<S, O> : S extends OneOfSchema ? ParseOneOfSchema<S, O> : S extends AnyOfSchema ? ParseAnyOfSchema<S, O> : S extends EnumSchema ? ParseEnumSchema<S, O> : S extends ConstSchema ? ParseConstSchema<S, O> : S extends MultipleTypesSchema ? ParseMultipleTypesSchema<S, O> : S extends SingleTypeSchema ? ParseSingleTypeSchema<S, O> : M.Any> = O extends {
    deserialize: DeserializationPattern$1[];
} ? M.$Intersect<DeserializeSchema<S, O>, P> : P;

type $Compiler<C extends unknown[] = [], V extends unknown[] = []> = (schema: JSONSchema$1, ...compilingOptions: C) => (data: unknown, ...validationOptions: V) => boolean;
type Compiler<O extends FromSchemaOptions$1 = FromSchemaDefaultOptions$1, C extends unknown[] = [], V extends unknown[] = []> = <S extends JSONSchema$1, T = FromSchema$1<S, O>>(schema: S, ...compilingOptions: C) => (data: unknown, ...validationOptions: V) => data is T;
type CompilerWrapper = <O extends FromSchemaOptions$1 = FromSchemaDefaultOptions$1, C extends unknown[] = [], V extends unknown[] = []>(compiler: $Compiler<C, V>) => Compiler<O, C, V>;
declare const wrapCompilerAsTypeGuard: CompilerWrapper;

type $Validator<V extends unknown[] = []> = (schema: JSONSchema$1, data: unknown, ...validationOptions: V) => boolean;
type Validator<O extends FromSchemaOptions$1 = FromSchemaDefaultOptions$1, V extends unknown[] = []> = <S extends JSONSchema$1, T = FromSchema$1<S, O>>(schema: S, data: unknown, ...validationOptions: V) => data is T;
type ValidatorWrapper = <O extends FromSchemaOptions$1 = FromSchemaDefaultOptions$1, V extends unknown[] = []>(validator: $Validator<V>) => Validator<O, V>;
declare const wrapValidatorAsTypeGuard: ValidatorWrapper;

declare const asConst: <A>(narrowed: Narrow<A>) => Narrow<A>;

type JSONSchema7 = JSONSchema7$1 | DeepReadonly<JSONSchema7$1>;
type ExtendedJSONSchema7<E extends JSONSchema7Extension> = ExtendedJSONSchema7$1<E> | DeepReadonly<ExtendedJSONSchema7$1<E>>;
type JSONSchema7Reference = JSONSchema7Reference$1 | DeepReadonly<JSONSchema7Reference$1>;
type ExtendedJSONSchema7Reference<E extends JSONSchema7Extension> = ExtendedJSONSchema7Reference$1<E> | DeepReadonly<ExtendedJSONSchema7Reference$1<E>>;
type JSONSchema = JSONSchema7;
type ExtendedJSONSchema<E extends JSONSchema7Extension> = ExtendedJSONSchema7<E>;
type FromSchema<S extends JSONSchema, Opt extends FromSchemaOptions = FromSchemaDefaultOptions, W extends JSONSchema7$1 = S extends Record<string | number | symbol, unknown> ? DeepWritable<S> : S> = M.$Resolve<ParseSchema<W, ParseOptions<W, Opt>>>;
type FromExtendedSchema<E extends JSONSchema7Extension, S extends ExtendedJSONSchema<E>, Opt extends FromExtendedSchemaOptions<E> = FromSchemaDefaultOptions, U = UnextendJSONSchema7<E, S>> = U extends JSONSchema ? FromSchema<U, Opt> : never;

export { $Compiler, $Validator, Compiler, DeserializationPattern, ExtendedJSONSchema, ExtendedJSONSchema7, ExtendedJSONSchema7Reference, FromExtendedSchema, FromExtendedSchemaOptions, FromSchema, FromSchemaDefaultOptions, FromSchemaOptions, JSONSchema, JSONSchema7, JSONSchema7Extension, JSONSchema7Reference, Validator, asConst, wrapCompilerAsTypeGuard, wrapValidatorAsTypeGuard };
