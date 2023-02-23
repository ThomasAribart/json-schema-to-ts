import { M } from 'https://cdn.skypack.dev/ts-algebra@^1.2.0?dts';
import { JSONSchema7 as JSONSchema7$2, JSONSchema7TypeName } from 'https://cdn.skypack.dev/@types/json-schema@^7.0.9?dts';

declare type DeserializationPattern = {
    pattern: unknown;
    output: unknown;
};

declare type JSONSchema7$1 = boolean | (Omit<JSONSchema7$2, "const" | "enum" | "items" | "additionalItems" | "contains" | "properties" | "patternProperties" | "additionalProperties" | "dependencies" | "propertyNames" | "if" | "then" | "else" | "allOf" | "anyOf" | "oneOf" | "not" | "definitions" | "examples" | "default"> & {
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

declare type FromSchemaOptions = {
    parseNotKeyword?: boolean;
    parseIfThenElseKeywords?: boolean;
    references?: JSONSchema7Reference[] | false;
    deserialize?: DeserializationPattern[] | false;
};
declare type FromSchemaDefaultOptions = {
    parseNotKeyword: false;
    parseIfThenElseKeywords: false;
    references: false;
    deserialize: false;
};

declare type And<A, B> = A extends true ? B extends true ? true : false : false;

declare type DoesExtend<A, B> = [A] extends [B] ? true : false;

declare type If<B extends boolean, T, E = never> = B extends true ? T : E;

declare type Key = string | number | symbol;

declare type Compute<A, Seen = never> = A extends Function | Error | Date | {
    readonly [Symbol.toStringTag]: string;
} | RegExp | Generator ? A : If<DoesExtend<Seen, A>, A, A extends Array<unknown> ? A extends Array<Record<Key, unknown>> ? Array<{
    [K in keyof A[number]]: Compute<A[number][K], A | Seen>;
} & unknown> : A : A extends ReadonlyArray<unknown> ? A extends ReadonlyArray<Record<string | number | symbol, unknown>> ? ReadonlyArray<{
    [K in keyof A[number]]: Compute<A[number][K], A | Seen>;
} & unknown> : A : {
    [K in keyof A]: Compute<A[K], A | Seen>;
} & unknown>;

declare type DeepGet<O, P extends string[], D = undefined> = P extends [
    infer H,
    ...infer T
] ? H extends string ? T extends string[] ? H extends keyof O ? DeepGet<O[H], T, D> : D : never : never : O;

declare type Join<S extends string[], D extends string = ","> = S extends [] ? "" : S extends [string] ? `${S[0]}` : S extends [string, ...infer T] ? T extends string[] ? `${S[0]}${D}${Join<T, D>}` : never : string;

declare type Narrow<A> = A extends Promise<infer T> ? Promise<Narrow<T>> : A extends (...args: infer P) => infer R ? (...args: Narrow<P>) => Narrow<R> : A extends [] ? [] : A extends object ? {
    [key in keyof A]: Narrow<A[key]>;
} : A extends string | number | boolean | bigint ? A : never;

declare type Pop<L extends unknown[]> = L extends readonly [...infer LBody, unknown] | readonly [...infer LBody, unknown?] ? LBody : L;

declare type DeepReadonly<T> = T extends Record<string | number | symbol, any> ? {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
} : T;

declare type Reverse<L extends unknown[]> = L extends [infer H, ...infer T] ? [...Reverse<T>, H] : L;

declare type RecSplit<S extends string, D extends string = "", R extends string[] = []> = S extends `${infer BS}${D}${infer AS}` ? RecSplit<AS, D, [...R, BS]> : [...R, S];
declare type Split<S extends string, D extends string = "", R extends string[] = RecSplit<S, D>> = D extends "" ? Pop<R> : R;

declare type Tail<L extends unknown[]> = L extends readonly [] ? L : L extends readonly [unknown?, ...infer T] ? T : L;

declare type DeepWritable<T> = {
    -readonly [P in keyof T]: DeepWritable<T[P]>;
};

declare type ParseReferences<S extends JSONSchema7Reference[], R extends Record<string, JSONSchema7$1> = {}> = S extends [infer H, ...infer T] ? H extends JSONSchema7Reference ? T extends JSONSchema7Reference[] ? ParseReferences<T, R & {
    [key in H["$id"]]: DeepWritable<H>;
}> : never : never : R;
declare type ParseOptions<S extends JSONSchema7$1, O extends FromSchemaOptions> = {
    parseNotKeyword: O["parseNotKeyword"] extends boolean ? O["parseNotKeyword"] : FromSchemaDefaultOptions["parseNotKeyword"];
    parseIfThenElseKeywords: O["parseIfThenElseKeywords"] extends boolean ? O["parseIfThenElseKeywords"] : FromSchemaDefaultOptions["parseIfThenElseKeywords"];
    rootSchema: S;
    references: O["references"] extends JSONSchema7Reference[] ? ParseReferences<O["references"]> : {};
    deserialize: O["deserialize"] extends DeserializationPattern[] | false ? O["deserialize"] : FromSchemaDefaultOptions["deserialize"];
};

declare type RemoveInvalidAdditionalItems<S extends JSONSchema7$1> = S extends {
    items: JSONSchema7$1 | JSONSchema7$1[];
} ? S extends {
    additionalItems: JSONSchema7$1;
} ? S : S & {
    additionalItems: true;
} : S extends boolean ? S : Omit<S, "additionalItems">;
declare type EmptySchema = {
    properties: {};
    additionalProperties: true;
    required: [];
};
declare type MergeSubSchema<P extends JSONSchema7$1, S extends JSONSchema7$1, R extends JSONSchema7$1 = RemoveInvalidAdditionalItems<S>, C extends JSONSchema7$1 = Omit<EmptySchema, keyof R> & R> = Omit<P, keyof C> & C;

declare type AllOfSchema = JSONSchema7$1 & {
    allOf: JSONSchema7$1[];
};
declare type ParseAllOfSchema<P extends AllOfSchema, O extends ParseSchemaOptions> = RecurseOnAllOfSchema<P["allOf"], P, O, ParseSchema<Omit<P, "allOf">, O>>;
declare type RecurseOnAllOfSchema<S extends JSONSchema7$1[], P extends AllOfSchema, O extends ParseSchemaOptions, R> = S extends [infer H, ...infer T] ? H extends JSONSchema7$1 ? T extends JSONSchema7$1[] ? RecurseOnAllOfSchema<T, P, O, M.$Intersect<ParseSchema<MergeSubSchema<Omit<P, "allOf">, H>, O>, R>> : never : never : R;

declare type AnyOfSchema = JSONSchema7$1 & {
    anyOf: JSONSchema7$1[];
};
declare type ParseAnyOfSchema<S extends AnyOfSchema, O extends ParseSchemaOptions> = M.$Union<RecurseOnAnyOfSchema<S["anyOf"], S, O>>;
declare type RecurseOnAnyOfSchema<S extends JSONSchema7$1[], P extends AnyOfSchema, O extends ParseSchemaOptions, R = never> = S extends [infer H, ...infer T] ? H extends JSONSchema7$1 ? T extends JSONSchema7$1[] ? RecurseOnAnyOfSchema<T, P, O, R | M.$Intersect<ParseSchema<Omit<P, "anyOf">, O>, ParseSchema<MergeSubSchema<Omit<P, "anyOf">, H>, O>>> : never : never : R;

declare type MultipleTypesSchema = JSONSchema7$1 & {
    type: JSONSchema7TypeName[];
};
declare type ParseMultipleTypesSchema<P extends MultipleTypesSchema, O extends ParseSchemaOptions> = M.$Union<RecurseOnMixedSchema<P["type"], P, O>>;
declare type RecurseOnMixedSchema<S extends JSONSchema7TypeName[], P extends MultipleTypesSchema, O extends ParseSchemaOptions, R = never> = S extends [infer H, ...infer T] ? H extends JSONSchema7TypeName ? T extends JSONSchema7TypeName[] ? RecurseOnMixedSchema<T, P, O, R | ParseSchema<Omit<P, "type"> & {
    type: H;
}, O>> : never : never : R;

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
declare type ParseArraySchema<S extends ArraySchema, O extends ParseSchemaOptions> = S extends SimpleArraySchema ? M.$Array<ParseSchema<S["items"], O>> : S extends TupleSchema ? M.$Union<FromTreeTuple<ParseTuple<S["items"], O>, S, O>> : M.$Array;
declare type ParseTuple<S extends JSONSchema7$1[], O extends ParseSchemaOptions, R extends any[] = []> = S extends [infer H, ...infer T] ? H extends JSONSchema7$1 ? T extends JSONSchema7$1[] ? ParseTuple<T, O, [ParseSchema<H, O>, ...R]> : never : never : R;
declare type FromTreeTuple<T extends any[], S extends ArraySchema, O extends ParseSchemaOptions> = ApplyAdditionalItems<ApplyBoundaries<T, S extends {
    minItems: number;
} ? S["minItems"] : 0, S extends {
    maxItems: number;
} ? S["maxItems"] : undefined>, S extends {
    additionalItems: JSONSchema7$1;
} ? S["additionalItems"] : true, O>;
declare type ApplyBoundaries<T extends any[], Min extends number, Max extends number | undefined, R = never, HasMin extends boolean = false, HasMax extends boolean = false, C extends any[] = T> = {
    stop: {
        result: Max extends undefined ? R | M.$Tuple<Reverse<T>> : HasMax extends true ? R | M.$Tuple<Reverse<T>> : Max extends T["length"] ? M.$Tuple<Reverse<T>> : IsLongerThan<Tail<T>, Max> extends true ? never : R | M.$Tuple<Reverse<T>>;
        hasEncounteredMin: DoesExtend<Min, T["length"]>;
        hasEncounteredMax: HasMax extends true ? true : Max extends T["length"] ? true : IsLongerThan<Tail<T>, Max>;
        completeTuple: C;
    };
    continue: ApplyBoundaries<Tail<T>, Min, Max, T["length"] extends Max ? M.$Tuple<Reverse<T>> : R | M.$Tuple<Reverse<T>>, HasMin extends true ? true : DoesExtend<Min, T["length"]>, HasMax extends true ? true : DoesExtend<Max, T["length"]>, C>;
}[Min extends T["length"] ? "stop" : T extends [any, ...any[]] ? "continue" : "stop"];
declare type IsLongerThan<T extends any[], N extends number | undefined, R extends boolean = false> = {
    continue: N extends undefined ? false : T["length"] extends N ? true : IsLongerThan<Tail<T>, N>;
    stop: T["length"] extends N ? true : R;
}[T extends [any, ...any[]] ? "continue" : "stop"];
declare type ApplyAdditionalItems<R extends {
    result: any;
    hasEncounteredMin: boolean;
    hasEncounteredMax: boolean;
    completeTuple: any[];
}, A extends JSONSchema7$1, O extends ParseSchemaOptions> = R extends {
    hasEncounteredMax: true;
} ? R extends {
    hasEncounteredMin: true;
} ? R["result"] : M.Never : A extends false ? R extends {
    hasEncounteredMin: true;
} ? R["result"] : M.Never : A extends true ? R extends {
    hasEncounteredMin: true;
} ? R["result"] | M.$Tuple<Reverse<R["completeTuple"]>, M.Any> : M.$Tuple<Reverse<R["completeTuple"]>, M.Any> : R["hasEncounteredMin"] extends true ? R["result"] | M.$Tuple<Reverse<R["completeTuple"]>, ParseSchema<A, O>> : M.$Tuple<Reverse<R["completeTuple"]>, ParseSchema<A, O>>;

declare type ObjectSchema = JSONSchema7$1 & {
    type: "object";
};
declare type ParseObjectSchema<S extends ObjectSchema, O extends ParseSchemaOptions> = S extends {
    properties: Record<string, JSONSchema7$1>;
} ? M.$Object<{
    [key in keyof S["properties"]]: ParseSchema<S["properties"][key], O>;
}, GetRequired<S>, GetOpenProps<S, O>> : M.$Object<{}, GetRequired<S>, GetOpenProps<S, O>>;
declare type GetRequired<S extends ObjectSchema> = S extends {
    required: ReadonlyArray<string>;
} ? S["required"][number] : never;
declare type GetOpenProps<S extends ObjectSchema, O extends ParseSchemaOptions> = S extends {
    additionalProperties: JSONSchema7$1;
} ? S extends {
    patternProperties: Record<string, JSONSchema7$1>;
} ? AdditionalAndPatternProps<S["additionalProperties"], S["patternProperties"], O> : ParseSchema<S["additionalProperties"], O> : S extends {
    patternProperties: Record<string, JSONSchema7$1>;
} ? PatternProps<S["patternProperties"], O> : M.Any;
declare type PatternProps<P extends Record<string, JSONSchema7$1>, O extends ParseSchemaOptions> = M.$Union<{
    [key in keyof P]: ParseSchema<P[key], O>;
}[keyof P]>;
declare type AdditionalAndPatternProps<A extends JSONSchema7$1, P extends Record<string, JSONSchema7$1>, O extends ParseSchemaOptions> = A extends boolean ? PatternProps<P, O> : M.$Union<ParseSchema<A, O> | {
    [key in keyof P]: ParseSchema<P[key], O>;
}[keyof P]>;

declare type SingleTypeSchema = JSONSchema7$1 & {
    type: JSONSchema7TypeName;
};
declare type ParseSingleTypeSchema<S extends SingleTypeSchema, O extends ParseSchemaOptions> = S extends {
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

declare type ConstSchema = JSONSchema7$1 & {
    const: unknown;
};
declare type ParseConstSchema<S extends ConstSchema, O extends ParseSchemaOptions> = S extends SingleTypeSchema ? IntersectConstAndTypeSchema<S, O> : S extends MultipleTypesSchema ? IntersectConstAndTypeSchema<S, O> : ParseConst<S>;
declare type IntersectConstAndTypeSchema<S extends ConstSchema & (SingleTypeSchema | MultipleTypesSchema), O extends ParseSchemaOptions> = M.$Intersect<ParseConst<S>, ParseSchema<Omit<S, "const">, O>>;
declare type ParseConst<S extends ConstSchema> = M.Const<S["const"]>;

declare type DeserializeSchema<S extends JSONSchema7$1, O extends Omit<ParseSchemaOptions, "deserialize"> & {
    deserialize: DeserializationPattern[];
}> = RecurseOnDeserializationPatterns<S, O["deserialize"]>;
declare type RecurseOnDeserializationPatterns<S extends JSONSchema7$1, P extends DeserializationPattern[], R = M.Any> = P extends [infer H, ...infer T] ? H extends DeserializationPattern ? T extends DeserializationPattern[] ? RecurseOnDeserializationPatterns<S, T, S extends H["pattern"] ? M.$Intersect<M.Any<true, H["output"]>, R> : R> : never : never : R;

declare type EnumSchema = JSONSchema7$1 & {
    enum: unknown[];
};
declare type ParseEnumSchema<S extends EnumSchema, O extends ParseSchemaOptions> = M.$Intersect<ParseEnum<S>, ParseSchema<Omit<S, "enum">, O>>;
declare type ParseEnum<S extends EnumSchema> = M.Enum<Compute<S["enum"][number]>>;

declare type IfThenElseSchema = JSONSchema7$1 & {
    if: JSONSchema7$1;
    then?: JSONSchema7$1;
    else?: JSONSchema7$1;
};
declare type ParseIfThenElseSchema<S extends IfThenElseSchema, O extends ParseSchemaOptions, R extends JSONSchema7$1 = Omit<S, "if" | "then" | "else">, I extends JSONSchema7$1 = MergeSubSchema<R, S["if"]>, T = S extends {
    then: JSONSchema7$1;
} ? M.$Intersect<ParseSchema<I, O>, ParseSchema<MergeSubSchema<R, S["then"]>, O>> : ParseSchema<I, O>, E = S extends {
    else: JSONSchema7$1;
} ? M.$Intersect<M.$Exclude<ParseSchema<R, O>, ParseSchema<I, O>>, ParseSchema<MergeSubSchema<R, S["else"]>, O>> : M.$Exclude<ParseSchema<R, O>, ParseSchema<I, O>>> = M.$Intersect<M.$Union<T | E>, ParseSchema<R, O>>;

declare type NotSchema = JSONSchema7$1 & {
    not: JSONSchema7$1;
};
declare type AllTypes = M.Union<M.Primitive<null> | M.Primitive<boolean> | M.Primitive<number> | M.Primitive<string> | M.Array | M.Object<{}, never, M.Any>>;
declare type ParseNotSchema<S extends NotSchema, O extends ParseSchemaOptions, P = ParseSchema<Omit<S, "not">, O>, E = M.$Exclude<P extends M.AnyType ? M.$Intersect<AllTypes, P> : P, ParseSchema<MergeSubSchema<Omit<S, "not">, S["not"]>, O>>> = E extends M.Never ? P : E;

declare type NullableSchema = JSONSchema7$1 & {
    nullable: boolean;
};
declare type ParseNullableSchema<S extends NullableSchema, O extends ParseSchemaOptions, R = ParseSchema<Omit<S, "nullable">, O>> = S extends {
    nullable: true;
} ? M.$Union<M.Primitive<null> | R> : R;

declare type OneOfSchema = JSONSchema7$1 & {
    oneOf: JSONSchema7$1[];
};
declare type ParseOneOfSchema<P extends OneOfSchema, O extends ParseSchemaOptions> = M.$Union<RecurseOnOneOfSchema<P["oneOf"], P, O>>;
declare type RecurseOnOneOfSchema<S extends JSONSchema7$1[], P extends OneOfSchema, O extends ParseSchemaOptions, R = never> = S extends [infer H, ...infer T] ? H extends JSONSchema7$1 ? T extends JSONSchema7$1[] ? RecurseOnOneOfSchema<T, P, O, R | M.$Intersect<ParseSchema<Omit<P, "oneOf">, O>, ParseSchema<MergeSubSchema<Omit<P, "oneOf">, H>, O>>> : never : never : R;

declare type ParseReference<Sc extends JSONSchema7$1, O extends ParseSchemaOptions, P extends string | undefined, R extends JSONSchema7$1, C extends JSONSchema7$1 = P extends string ? DeepGet<Sc, Tail<Split<P, "/">>, false> : Sc> = M.$Intersect<ParseSchema<C, O>, ParseSchema<MergeSubSchema<C, R>, O>>;

declare type ParseDefinitionSchema<S extends ReferenceSchema, O extends ParseSchemaOptions, P extends string> = ParseReference<O["rootSchema"], O, P, Omit<S, "$ref">>;

declare type ParseExternalReferenceSchema<Sc extends ReferenceSchema, O extends ParseSchemaOptions, A extends string, P extends string | undefined, R extends JSONSchema7$1 = Omit<Sc, "$ref">> = A extends keyof O["references"] ? ParseReference<O["references"][A], O, P, R> : O extends {
    rootSchema: IdSchema;
} ? ParseExternalReferenceWithIdSchema<O, A, P, R> : M.Never;
declare type ParseDomain<R extends string> = Join<Pop<Split<R, "/">>, "/">;
declare type IdSchema = JSONSchema7$1 & {
    $id: string;
};
declare type ParseExternalReferenceWithIdSchema<O extends ParseSchemaOptions & {
    rootSchema: IdSchema;
}, A extends string, P extends string | undefined, R extends JSONSchema7$1, D extends string = ParseDomain<O["rootSchema"]["$id"]>, C extends string = Join<[D, A], "/">> = C extends keyof O["references"] ? ParseReference<O["references"][C], O, P, R> : M.Never;

declare type ReferenceSchema = JSONSchema7$1 & {
    $ref: string;
};
declare type ParseReferenceSchema<Sc extends ReferenceSchema, O extends ParseSchemaOptions, R extends string[] = Split<Sc["$ref"], "#">> = R[0] extends "" ? ParseDefinitionSchema<Sc, O, R[1]> : ParseExternalReferenceSchema<Sc, O, R[0], R[1]>;

declare type ParseSchemaOptions = {
    parseNotKeyword: boolean;
    parseIfThenElseKeywords: boolean;
    rootSchema: JSONSchema7$1;
    references: Record<string, JSONSchema7$1>;
    deserialize: DeserializationPattern[] | false;
};
declare type ParseSchema<S extends JSONSchema7$1, O extends ParseSchemaOptions, P = JSONSchema7$1 extends S ? M.Any : S extends true | string ? M.Any : S extends false ? M.Never : S extends NullableSchema ? ParseNullableSchema<S, O> : S extends ReferenceSchema ? ParseReferenceSchema<S, O> : And<DoesExtend<O["parseIfThenElseKeywords"], true>, DoesExtend<S, IfThenElseSchema>> extends true ? S extends IfThenElseSchema ? ParseIfThenElseSchema<S, O> : never : And<DoesExtend<O["parseNotKeyword"], true>, DoesExtend<S, NotSchema>> extends true ? S extends NotSchema ? ParseNotSchema<S, O> : never : S extends AllOfSchema ? ParseAllOfSchema<S, O> : S extends OneOfSchema ? ParseOneOfSchema<S, O> : S extends AnyOfSchema ? ParseAnyOfSchema<S, O> : S extends EnumSchema ? ParseEnumSchema<S, O> : S extends ConstSchema ? ParseConstSchema<S, O> : S extends MultipleTypesSchema ? ParseMultipleTypesSchema<S, O> : S extends SingleTypeSchema ? ParseSingleTypeSchema<S, O> : M.Any> = O extends {
    deserialize: DeserializationPattern[];
} ? M.$Intersect<DeserializeSchema<S, O>, P> : P;

declare type $Compiler<C extends unknown[] = [], V extends unknown[] = []> = (schema: JSONSchema, ...compilingOptions: C) => (data: unknown, ...validationOptions: V) => boolean;
declare type Compiler<O extends FromSchemaOptions = FromSchemaDefaultOptions, C extends unknown[] = [], V extends unknown[] = []> = <S extends JSONSchema, T = FromSchema<S, O>>(schema: S, ...compilingOptions: C) => (data: unknown, ...validationOptions: V) => data is T;
declare type CompilerWrapper = <O extends FromSchemaOptions = FromSchemaDefaultOptions, C extends unknown[] = [], V extends unknown[] = []>(compiler: $Compiler<C, V>) => Compiler<O, C, V>;
declare const wrapCompilerAsTypeGuard: CompilerWrapper;

declare type $Validator<V extends unknown[] = []> = (schema: JSONSchema, data: unknown, ...validationOptions: V) => boolean;
declare type Validator<O extends FromSchemaOptions = FromSchemaDefaultOptions, V extends unknown[] = []> = <S extends JSONSchema, T = FromSchema<S, O>>(schema: S, data: unknown, ...validationOptions: V) => data is T;
declare type ValidatorWrapper = <O extends FromSchemaOptions = FromSchemaDefaultOptions, V extends unknown[] = []>(validator: $Validator<V>) => Validator<O, V>;
declare const wrapValidatorAsTypeGuard: ValidatorWrapper;

declare const asConst: <A>(narrowed: Narrow<A>) => Narrow<A>;

declare type JSONSchema7 = JSONSchema7$1 | DeepReadonly<JSONSchema7$1>;
declare type JSONSchema7Reference = JSONSchema7Reference$1 | DeepReadonly<JSONSchema7Reference$1>;
declare type JSONSchema = JSONSchema7;
declare type FromSchema<S extends JSONSchema, Opt extends FromSchemaOptions = FromSchemaDefaultOptions, W extends JSONSchema7$1 = S extends Record<string | number | symbol, unknown> ? DeepWritable<S> : S> = M.$Resolve<ParseSchema<W, ParseOptions<W, Opt>>>;

export { $Compiler, $Validator, Compiler, DeserializationPattern, FromSchema, FromSchemaDefaultOptions, FromSchemaOptions, JSONSchema, JSONSchema7, JSONSchema7Reference, Validator, asConst, wrapCompilerAsTypeGuard, wrapValidatorAsTypeGuard };
