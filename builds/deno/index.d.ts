import { M } from 'https://cdn.skypack.dev/ts-algebra@^1.0.1?dts';
import { JSONSchema7 as JSONSchema7$2, JSONSchema7TypeName } from 'https://cdn.skypack.dev/@types/json-schema@^7.0.9?dts';
import { O, L, A } from 'https://cdn.skypack.dev/ts-toolbelt@^9.6.0?dts';

declare type JSONSchema7$1 = boolean | (Omit<JSONSchema7$2, "const" | "enum" | "items" | "additionalItems" | "contains" | "properties" | "patternProperties" | "additionalProperties" | "dependencies" | "propertyNames" | "if" | "then" | "else" | "allOf" | "anyOf" | "oneOf" | "not" | "definitions" | "examples"> & {
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
    definitions?: {
        [key: string]: JSONSchema7$1;
    };
    examples?: unknown[];
});

declare type FromSchemaOptions = {
    parseNotKeyword?: boolean;
    parseIfThenElseKeywords?: boolean;
};
declare type FromSchemaDefaultOptions = {
    parseNotKeyword: false;
    parseIfThenElseKeywords: false;
};

declare type And<A, B> = A extends true ? B extends true ? true : false : false;

declare type DoesExtend<A, B> = A extends B ? true : false;
declare type ArrayKeys = keyof [];
declare type IsObject<T> = T extends object ? ArrayKeys extends Extract<keyof T, ArrayKeys> ? false : true : false;

declare type HasKeyIn<O, K> = Extract<keyof O, K> extends never ? false : true;

declare type Merge<A, B> = IsObject<A> extends true ? IsObject<B> extends true ? {
    [K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
} : B : B;

declare type Readonly<T> = T extends O.Object ? {
    readonly [P in keyof T]: Readonly<T[P]>;
} : T;

declare type Writable<T> = {
    -readonly [P in keyof T]: Writable<T[P]>;
};

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
declare type ParseTuple<S extends JSONSchema7$1[], O extends ParseSchemaOptions, R extends any[] = []> = {
    stop: R;
    continue: ParseTuple<L.Tail<S>, O, L.Prepend<R, ParseSchema<L.Head<S>, O>>>;
}[S extends [any, ...any[]] ? "continue" : "stop"];
declare type FromTreeTuple<T extends any[], S extends ArraySchema, O extends ParseSchemaOptions> = ApplyAdditionalItems<ApplyBoundaries<T, S extends {
    minItems: number;
} ? S["minItems"] : 0, S extends {
    maxItems: number;
} ? S["maxItems"] : undefined>, S extends {
    additionalItems: JSONSchema7$1;
} ? S["additionalItems"] : true, O>;
declare type ApplyBoundaries<T extends any[], Min extends number, Max extends number | undefined, R extends any = never, HasMin extends boolean = false, HasMax extends boolean = false, C extends any[] = T> = {
    stop: {
        result: Max extends undefined ? R | M.$Tuple<L.Reverse<T>> : HasMax extends true ? R | M.$Tuple<L.Reverse<T>> : Max extends T["length"] ? M.$Tuple<L.Reverse<T>> : IsLongerThan<L.Tail<T>, Max> extends true ? never : R | M.$Tuple<L.Reverse<T>>;
        hasEncounteredMin: DoesExtend<Min, T["length"]>;
        hasEncounteredMax: HasMax extends true ? true : Max extends T["length"] ? true : IsLongerThan<L.Tail<T>, Max>;
        completeTuple: C;
    };
    continue: ApplyBoundaries<L.Tail<T>, Min, Max, T["length"] extends Max ? M.$Tuple<L.Reverse<T>> : R | M.$Tuple<L.Reverse<T>>, HasMin extends true ? true : DoesExtend<Min, T["length"]>, HasMax extends true ? true : DoesExtend<Max, T["length"]>, C>;
}[Min extends T["length"] ? "stop" : T extends [any, ...any[]] ? "continue" : "stop"];
declare type IsLongerThan<T extends any[], N extends number | undefined, R extends boolean = false> = {
    continue: N extends undefined ? false : T["length"] extends N ? true : IsLongerThan<L.Tail<T>, N>;
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
} ? R["result"] | M.$Tuple<L.Reverse<R["completeTuple"]>, M.Any> : M.$Tuple<L.Reverse<R["completeTuple"]>, M.Any> : R["hasEncounteredMin"] extends true ? R["result"] | M.$Tuple<L.Reverse<R["completeTuple"]>, ParseSchema<A, O>> : M.$Tuple<L.Reverse<R["completeTuple"]>, ParseSchema<A, O>>;

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

declare type MultipleTypesSchema = JSONSchema7$1 & {
    type: JSONSchema7TypeName[];
};
declare type ParseMultipleTypesSchema<P extends MultipleTypesSchema, O extends ParseSchemaOptions> = M.$Union<RecurseOnMixedSchema<P["type"], P, O>>;
declare type RecurseOnMixedSchema<S extends JSONSchema7TypeName[], P extends MultipleTypesSchema, O extends ParseSchemaOptions, R extends any = never> = {
    stop: R;
    continue: RecurseOnMixedSchema<L.Tail<S>, P, O, R | ParseSchema<Omit<P, "type"> & {
        type: L.Head<S>;
    }, O>>;
}[S extends [any, ...any[]] ? "continue" : "stop"];

declare type ConstSchema = JSONSchema7$1 & {
    const: unknown;
};
declare type ParseConstSchema<S extends ConstSchema, O extends ParseSchemaOptions> = S extends SingleTypeSchema ? IntersectConstAndTypeSchema<S, O> : S extends MultipleTypesSchema ? IntersectConstAndTypeSchema<S, O> : ParseConst<S>;
declare type IntersectConstAndTypeSchema<S extends ConstSchema & (SingleTypeSchema | MultipleTypesSchema), O extends ParseSchemaOptions> = M.$Intersect<ParseConst<S>, ParseSchema<Omit<S, "const">, O>>;
declare type ParseConst<S extends ConstSchema> = M.Const<S["const"]>;

declare type EnumSchema = JSONSchema7$1 & {
    enum: unknown[];
};
declare type ParseEnumSchema<S extends EnumSchema, O extends ParseSchemaOptions> = HasKeyIn<S, "const" | "type"> extends true ? M.$Intersect<ParseEnum<S>, ParseSchema<Omit<S, "enum">, O>> : ParseEnum<S>;
declare type ParseEnum<S extends EnumSchema> = M.Enum<A.Compute<S["enum"][number]>>;

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

declare type AnyOfSchema = JSONSchema7$1 & {
    anyOf: JSONSchema7$1[];
};
declare type ParseAnyOfSchema<S extends AnyOfSchema, O extends ParseSchemaOptions> = M.$Union<RecurseOnAnyOfSchema<S["anyOf"], S, O>>;
declare type RecurseOnAnyOfSchema<S extends JSONSchema7$1[], P extends AnyOfSchema, O extends ParseSchemaOptions, R extends any = never> = {
    stop: R;
    continue: RecurseOnAnyOfSchema<L.Tail<S>, P, O, R | (HasKeyIn<P, "enum" | "const" | "type"> extends true ? M.$Intersect<ParseSchema<Omit<P, "anyOf">, O>, ParseSchema<MergeSubSchema<Omit<P, "anyOf">, L.Head<S>>, O>> : ParseSchema<Merge<Omit<P, "anyOf">, RemoveInvalidAdditionalItems<L.Head<S>>>, O>)>;
}[S extends [any, ...any[]] ? "continue" : "stop"];

declare type OneOfSchema = JSONSchema7$1 & {
    oneOf: JSONSchema7$1[];
};
declare type ParseOneOfSchema<P extends OneOfSchema, O extends ParseSchemaOptions> = M.$Union<RecurseOnOneOfSchema<P["oneOf"], P, O>>;
declare type RecurseOnOneOfSchema<S extends JSONSchema7$1[], P extends OneOfSchema, O extends ParseSchemaOptions, R extends any = never> = {
    stop: R;
    continue: RecurseOnOneOfSchema<L.Tail<S>, P, O, R | (HasKeyIn<P, "enum" | "const" | "type" | "anyOf"> extends true ? M.$Intersect<ParseSchema<Omit<P, "oneOf">, O>, ParseSchema<MergeSubSchema<Omit<P, "oneOf">, L.Head<S>>, O>> : ParseSchema<Merge<Omit<P, "oneOf">, RemoveInvalidAdditionalItems<L.Head<S>>>, O>)>;
}[S extends [any, ...any[]] ? "continue" : "stop"];

declare type AllOfSchema = JSONSchema7$1 & {
    allOf: JSONSchema7$1[];
};
declare type ParseAllOfSchema<P extends AllOfSchema, O extends ParseSchemaOptions> = RecurseOnAllOfSchema<P["allOf"], P, O, HasKeyIn<P, "enum" | "const" | "type" | "anyOf" | "oneOf"> extends true ? ParseSchema<Omit<P, "allOf">, O> : M.Any>;
declare type RecurseOnAllOfSchema<S extends JSONSchema7$1[], P extends AllOfSchema, O extends ParseSchemaOptions, R extends any> = {
    stop: R;
    continue: RecurseOnAllOfSchema<L.Tail<S>, P, O, M.$Intersect<ParseSchema<MergeSubSchema<Omit<P, "allOf">, L.Head<S>>, O>, R>>;
}[S extends [any, ...any[]] ? "continue" : "stop"];

declare type NotSchema = JSONSchema7$1 & {
    not: JSONSchema7$1;
};
declare type AllTypes = M.Union<M.Primitive<null> | M.Primitive<boolean> | M.Primitive<number> | M.Primitive<string> | M.Array<M.Any> | M.Object<{}, never, M.Any>>;
declare type ParseNotSchema<S extends NotSchema, O extends ParseSchemaOptions, P extends any = ParseSchema<Omit<S, "not">, O>, E = M.$Exclude<HasKeyIn<S, "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf"> extends true ? P : AllTypes, ParseSchema<MergeSubSchema<Omit<S, "not">, S["not"]>, O>>> = E extends M.Never ? P : E;

declare type IfThenElseSchema = JSONSchema7$1 & {
    if: JSONSchema7$1;
    then?: JSONSchema7$1;
    else?: JSONSchema7$1;
};
declare type ParseIfThenElseSchema<S extends IfThenElseSchema, O extends ParseSchemaOptions, R extends JSONSchema7$1 = Omit<S, "if" | "then" | "else">, I extends JSONSchema7$1 = MergeSubSchema<R, S["if"]>, T extends any = S extends {
    then: JSONSchema7$1;
} ? M.$Intersect<ParseSchema<I, O>, ParseSchema<MergeSubSchema<R, S["then"]>, O>> : ParseSchema<I, O>, E = M.$Exclude<S extends {
    else: JSONSchema7$1;
} ? ParseSchema<MergeSubSchema<R, S["else"]>, O> : ParseSchema<R, O>, ParseSchema<I, O>>> = HasKeyIn<S, "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf" | "not"> extends true ? M.$Intersect<M.$Union<T | E>, ParseSchema<R, O>> : M.$Union<T | E>;

declare type ParseSchemaOptions = {
    parseNotKeyword: boolean;
    parseIfThenElseKeywords: boolean;
};
declare type ParseSchema<S extends JSONSchema7$1, O extends ParseSchemaOptions> = JSONSchema7$1 extends S ? M.Any : S extends true | string ? M.Any : S extends false ? M.Never : And<DoesExtend<O["parseIfThenElseKeywords"], true>, DoesExtend<S, IfThenElseSchema>> extends true ? S extends IfThenElseSchema ? ParseIfThenElseSchema<S, O> : never : And<DoesExtend<O["parseNotKeyword"], true>, DoesExtend<S, NotSchema>> extends true ? S extends NotSchema ? ParseNotSchema<S, O> : never : S extends AllOfSchema ? ParseAllOfSchema<S, O> : S extends OneOfSchema ? ParseOneOfSchema<S, O> : S extends AnyOfSchema ? ParseAnyOfSchema<S, O> : S extends EnumSchema ? ParseEnumSchema<S, O> : S extends ConstSchema ? ParseConstSchema<S, O> : S extends MultipleTypesSchema ? ParseMultipleTypesSchema<S, O> : S extends SingleTypeSchema ? ParseSingleTypeSchema<S, O> : M.Any;

declare type JSONSchema7 = JSONSchema7$1 | Readonly<JSONSchema7$1>;
declare type JSONSchema = JSONSchema7;
declare type FromSchema<S extends JSONSchema7, O extends FromSchemaOptions = FromSchemaDefaultOptions> = M.$Resolve<ParseSchema<S extends O.Object ? Writable<S> : S, {
    parseNotKeyword: O["parseNotKeyword"] extends boolean ? O["parseNotKeyword"] : FromSchemaDefaultOptions["parseNotKeyword"];
    parseIfThenElseKeywords: O["parseIfThenElseKeywords"] extends boolean ? O["parseIfThenElseKeywords"] : FromSchemaDefaultOptions["parseIfThenElseKeywords"];
}>>;

export { FromSchema, FromSchemaDefaultOptions, FromSchemaOptions, JSONSchema, JSONSchema7 };
