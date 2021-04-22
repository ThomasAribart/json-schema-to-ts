import { JSONSchema6Definition, JSONSchema6 } from 'https://cdn.skypack.dev/@types/json-schema@^7.0.6?dts';
import { A, B, U } from 'https://cdn.skypack.dev/ts-toolbelt@^6.15.5?dts';

declare type And<A, B> = A extends true ? B extends true ? true : false : false;

declare type Head<T> = T extends any[] ? T[0] : never;

declare type Tail<T> = T extends any[] ? ((...args: T) => void) extends (head: any, ...tail: infer R) => void ? R : T : never;

declare type Prepend<E, T extends any[]> = ((element: E, ...tail: T) => void) extends (...tuple: infer R) => void ? R : never;

declare type Reverse<T, R extends any[] = []> = {
    stop: R;
    continue: T extends any[] ? Reverse<Tail<T>, Prepend<Head<T>, R>> : never;
}[T extends [any, ...any[]] ? "continue" : "stop"];

declare type ConcatReversed<A, B extends any[]> = {
    stop: B;
    continue: ConcatReversed<Tail<A>, Prepend<Head<A>, B>>;
}[A extends [any, ...any[]] ? "continue" : "stop"];
declare type Concat<A, B extends any[]> = A extends any[] ? ConcatReversed<Reverse<A>, B> : never;

declare type DoesExtend<A, B> = A extends B ? true : false;
declare type ArrayKeys = keyof [];
declare type IsObject<T> = T extends object ? ArrayKeys extends Extract<keyof T, ArrayKeys> ? false : true : false;
declare type IsArray<T> = T extends object ? ArrayKeys extends Extract<keyof T, ArrayKeys> ? true : false : false;

declare type Get<O, K, F = never> = K extends keyof O ? O[K] : F;
declare type DeepGet<O, P, F = never> = {
    continue: Head<P> extends keyof O ? DeepGet<O[Head<P>], Tail<P>, F> : F;
    stop: O;
}[P extends [any, ...any[]] ? "continue" : "stop"];

declare type HasKeyIn<O, K> = Extract<keyof O, K> extends never ? false : true;

declare type DeepMergeUnsafe<A, B> = IsObject<A> extends true ? IsObject<B> extends true ? {
    [K in keyof (A & B)]: K extends keyof B ? K extends keyof A ? DeepMergeUnsafe<A[K], B[K]> : B[K] : K extends keyof A ? A[K] : never;
} : B : IsArray<A> extends true ? IsArray<B> extends true ? B extends any[] ? Concat<A, B> : never : B : B;
declare type Merge<A, B> = IsObject<A> extends true ? IsObject<B> extends true ? {
    [K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
} : B : B;

declare type Not<A> = A extends false ? true : A extends true ? false : never;

declare type OptionalProps<O extends Record<string | number | symbol, unknown>> = Exclude<{
    [K in keyof O]: undefined extends O[K] ? K : never;
}[keyof O], undefined>;

declare type Or<A, B> = A extends true ? true : B extends true ? true : false;

declare type Prettify<T> = IsObject<T> extends true ? {
    [K in keyof T]: K extends keyof T ? T[K] : never;
} : T;

declare type DeepReadonly<O> = O extends object ? {
    readonly [K in keyof O]: DeepReadonly<O[K]>;
} : O;

declare type RequiredProps<O extends Record<string | number | symbol, unknown>> = Exclude<{
    [K in keyof O]: undefined extends O[K] ? never : K;
}[keyof O], undefined>;

declare type Replace<O extends Record<string | number | symbol, any>, P extends keyof O, V, Req extends keyof O = RequiredProps<O>, Opt extends keyof O = OptionalProps<O>> = DeepMergeUnsafe<DeepMergeUnsafe<Omit<O, P>, {
    [key in P & Req]: V;
}>, {
    [key in P & Opt]?: V;
}>;

declare type DeepWriteable<O> = O extends object ? {
    -readonly [K in keyof O]: DeepWriteable<O[K]>;
} : O;

declare type JSONSchema6DefinitionWithoutInterface = JSONSchema6Definition extends infer S ? S extends JSONSchema6 ? Replace<S, "const" | "enum" | "not", unknown> : S : never;

declare type AnyType = "any";
declare type Any = {
    type: AnyType;
};
declare type ResolveAny = unknown;

declare type NeverType = "never";
declare type Never = {
    type: NeverType;
};
declare type ResolveNever = never;

declare type ConstType = "const";
declare type Const<V> = {
    type: ConstType;
    value: V;
};
declare type Value$3<C> = Get<C, "value">;
declare type ResolveConst<T> = Value$3<T>;

declare type EnumType = "enum";
declare type Enum<V> = {
    type: EnumType;
    values: V;
};
declare type Values$4<E> = Get<E, "values">;
declare type ResolveEnum<T> = Values$4<T>;
declare type IsEnumRepresentable<E> = A.Equals<Values$4<E>, never> extends B.True ? false : true;

declare type PrimitiveType = "primitive";
declare type Primitive<L> = {
    type: PrimitiveType;
    value: L;
};
declare type Value$2<L> = Get<L, "value">;
declare type ResolvePrimitive<T> = Get<T, "value">;

declare type ArrType = "array";
declare type Arr<V = Any> = {
    type: ArrType;
    values: V;
};
declare type Values$3<A> = Get<A, "values">;
declare type ResolveArr<T> = Prettify<Resolve<Values$3<T>>[]>;

declare type ObjectType = "object";
declare type Object$1<V = {}, R = never, O = true, P = Any> = {
    type: ObjectType;
    values: V;
    required: R;
    isOpen: O;
    openProps: P;
};
declare type Values$2<O> = Get<O, "values">;
declare type Value$1<O, K> = K extends keyof Values$2<O> ? Values$2<O>[K] : IsOpen$1<O> extends true ? OpenProps$1<O> : Never;
declare type Required<O> = Get<O, "required"> extends string ? Get<O, "required"> : never;
declare type IsOpen$1<O> = Get<O, "isOpen">;
declare type OpenProps$1<O> = Get<O, "openProps">;
declare type IsEmpty<O> = DoesExtend<Extract<keyof Values$2<O>, keyof Values$2<O>>, never>;
declare type ResolveObject<O> = IsObjectValid<O> extends true ? ResolveValidObject<O> : never;
declare type IsObjectValid<O> = IsOpen$1<O> extends false ? Required<O> extends keyof Values$2<O> ? true : false : true;
declare type ResolveValidObject<O> = DeepMergeUnsafe<IsOpen$1<O> extends true ? IsEmpty<O> extends true ? {
    [key: string]: Resolve<Get<O, "openProps">>;
} : {
    [key: string]: Resolve<Any>;
} : {}, DeepMergeUnsafe<{
    [key in Exclude<keyof Values$2<O>, Required<O>>]?: Resolve<Values$2<O>[key]>;
}, {
    [key in Required<O>]: key extends keyof Values$2<O> ? Resolve<Values$2<O>[key]> : Resolve<Any>;
}>>;
declare type IsObjectValueRepresentable<O, K> = K extends keyof Values$2<O> ? IsRepresentable<Values$2<O>[K]> : IsOpen$1<O> extends true ? IsRepresentable<OpenProps$1<O>> : false;
declare type IsObjectRepresentable<O> = Or<DoesExtend<A.Equals<Required<O>, never>, B.True>, Not<DoesExtend<false, {
    [key in Required<O>]: IsObjectValueRepresentable<O, key>;
}[Required<O>]>>>;

declare type UnionType = "union";
declare type Union<V> = {
    type: UnionType;
    values: V;
};
declare type Values$1<U> = Get<U, "values">;
declare type ResolveUnion<U> = RecurseOnUnion$2<Values$1<U>>;
declare type RecurseOnUnion$2<V> = V extends infer T ? Resolve<T> : never;
declare type IsUnionRepresentable<U> = DoesExtend<true, AreUnionValuesRepresentable<Values$1<U>>>;
declare type AreUnionValuesRepresentable<V> = V extends infer T ? IsRepresentable<T> : never;

declare type ErrorType = "error";
declare type Error<M = "Unknown error"> = {
    type: ErrorType;
    message: M;
};

declare type ClearUnionIntersections<A> = Union<ClearUnionValuesIntersections<Values$1<A>>>;
declare type ClearUnionValuesIntersections<V> = V extends infer T ? ClearIntersections<T> : never;
declare type IntersectUnion<A, B> = {
    any: A;
    never: Never;
    const: DistributeIntersection<A, B>;
    enum: DistributeIntersection<A, B>;
    primitive: DistributeIntersection<A, B>;
    array: DistributeIntersection<A, B>;
    tuple: DistributeIntersection<A, B>;
    object: DistributeIntersection<A, B>;
    union: DistributeIntersection<A, B>;
    exclusion: DistributeIntersection<A, B>;
    intersection: Error<"Cannot intersect intersection">;
    error: B;
    errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];
declare type DistributeIntersection<A, B> = Union<RecurseOnUnion$1<Values$1<A>, B>>;
declare type RecurseOnUnion$1<V, B> = V extends infer T ? Intersect<T, B> : never;

declare type DistributeUnion<U, E> = Union<RecurseOnUnion<Values$1<U>, E>>;
declare type RecurseOnUnion<V, E> = V extends infer T ? Exclude$1<T, E> : never;
declare type ExcludeUnion<V, U> = A.Equals<Values$1<U>, never> extends B.True ? V : ExcludeUnionValue<V, U.Last<Values$1<U>>, U>;
declare type ExcludeUnionValue<V, L, U> = Intersect<Exclude$1<V, L>, Exclude$1<V, Union<U.Exclude<Values$1<U>, L>>>>;

declare type ExcludeIntersection<Source, ExcludedIntersection> = Exclude$1<Source, ClearIntersections<ExcludedIntersection>>;

declare type ExcludeExclusion<Source, ExcludedExclusion> = Exclude$1<Source, Exclude$1<Value<ExcludedExclusion>, Excluded<ExcludedExclusion>>>;

declare type ExcludeFromAny<Source, Excluded> = {
    any: Never;
    never: Source;
    const: Source;
    enum: Source;
    primitive: Source;
    array: Source;
    tuple: Source;
    object: Source;
    union: ExcludeUnion<Source, Excluded>;
    intersection: ExcludeIntersection<Source, Excluded>;
    exclusion: ExcludeExclusion<Source, Excluded>;
    error: Excluded;
    errorTypeProperty: Error<"Missing type property">;
}[Get<Excluded, "type"> extends MetaType ? Get<Excluded, "type"> : "errorTypeProperty"];

declare type ExcludeFromConst<Source, Excluded> = {
    any: Never;
    never: Source;
    const: CheckNotExtendsResolved<Source, Excluded>;
    enum: CheckNotExtendsResolved<Source, Excluded>;
    primitive: CheckNotExtendsResolved<Source, Excluded>;
    array: CheckNotExtendsResolved<Source, Excluded>;
    tuple: CheckNotExtendsResolved<Source, Excluded>;
    object: ExcludeObject<Source, Excluded>;
    union: ExcludeUnion<Source, Excluded>;
    intersection: ExcludeIntersection<Source, Excluded>;
    exclusion: ExcludeExclusion<Source, Excluded>;
    error: Excluded;
    errorTypeProperty: Error<"Missing type property">;
}[Get<Excluded, "type"> extends MetaType ? Get<Excluded, "type"> : "errorTypeProperty"];
declare type CheckNotExtendsResolved<Source, Excluded> = Value$3<Source> extends Resolve<Excluded> ? Never : Source;
declare type ExcludeObject<Source, Excluded> = IsObject<Value$3<Source>> extends true ? Required<Source> extends keyof Value$3<Source> ? ExcludeObjectFromConst<Source, Excluded> : Source : Source;
declare type ExcludeObjectFromConst<Source, Excluded, ExcludedValues = ExcludeConstValues<Value$3<Source>, Excluded>> = RepresentableKeys$1<ExcludedValues> extends never ? Never : Source;
declare type ExcludeConstValues<SourceValue, Excluded> = {
    [key in keyof SourceValue]: key extends keyof Values$2<Excluded> ? Exclude$1<Const<SourceValue[key]>, Values$2<Excluded>[key]> : IsOpen$1<Excluded> extends true ? Exclude$1<Const<SourceValue[key]>, OpenProps$1<Excluded>> : SourceValue[key];
};
declare type RepresentableKeys$1<O> = {
    [key in keyof O]: IsRepresentable<O[key]> extends true ? key : never;
}[keyof O];

declare type ExcludeFromEnum<Source, Excluded> = {
    any: Never;
    never: Source;
    const: FilterExcluded<Source, Excluded>;
    enum: FilterExcluded<Source, Excluded>;
    primitive: FilterExcluded<Source, Excluded>;
    array: FilterExcluded<Source, Excluded>;
    tuple: FilterExcluded<Source, Excluded>;
    object: FilterExcluded<Source, Excluded>;
    union: ExcludeUnion<Source, Excluded>;
    intersection: ExcludeIntersection<Source, Excluded>;
    exclusion: ExcludeExclusion<Source, Excluded>;
    error: Excluded;
    errorTypeProperty: Error<"Missing type property">;
}[Get<Excluded, "type"> extends MetaType ? Get<Excluded, "type"> : "errorTypeProperty"];
declare type FilterExcluded<SourceEnum, Excluded> = Enum<RecurseOnEnumValues$1<Values$4<SourceEnum>, Excluded>>;
declare type RecurseOnEnumValues$1<EnumValues, Excluded> = EnumValues extends infer EnumValue ? IsRepresentable<Exclude$1<Const<EnumValue>, Excluded>> extends false ? never : EnumValue : never;
declare type ExcludeEnum<Source, ExcludedEnum, ExcludedEnumValues = Values$4<ExcludedEnum>> = A.Equals<ExcludedEnumValues, never> extends B.True ? Source : ExcludeEnumValue<Source, U.Last<ExcludedEnumValues>, ExcludedEnumValues>;
declare type ExcludeEnumValue<Source, LastEnumValue, ExcludedEnumValues> = Intersect<Exclude$1<Source, Const<LastEnumValue>>, Exclude$1<Source, Enum<U.Exclude<ExcludedEnumValues, LastEnumValue>>>>;

declare type ExcludeFromPrimitive<A, B> = {
    any: Never;
    never: A;
    const: A;
    enum: A;
    primitive: Value$2<A> extends Value$2<B> ? Never : A;
    array: A;
    tuple: A;
    object: A;
    union: ExcludeUnion<A, B>;
    intersection: ExcludeIntersection<A, B>;
    exclusion: ExcludeExclusion<A, B>;
    error: B;
    errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];

declare type ExcludeFromArray<Source, Excluded> = {
    any: Never;
    never: Source;
    const: Source;
    enum: Source;
    primitive: Source;
    array: ExcludeArrs<Source, Excluded>;
    tuple: And<DoesExtend<A.Equals<Values<Excluded>, []>, B.True>, IsOpen<Excluded>> extends true ? ExcludeArrs<Source, Arr<OpenProps<Excluded>>> : Source;
    object: Source;
    union: ExcludeUnion<Source, Excluded>;
    intersection: ExcludeIntersection<Source, Excluded>;
    exclusion: ExcludeExclusion<Source, Excluded>;
    error: Excluded;
    errorTypeProperty: Error<"Missing type property">;
}[Get<Excluded, "type"> extends MetaType ? Get<Excluded, "type"> : "errorTypeProperty"];
declare type ExcludeArrs<Source, Excluded, ExcludedValues = Exclude$1<Values$3<Source>, Values$3<Excluded>>> = IsRepresentable<ExcludedValues> extends true ? Source : Const<[]>;

declare type CrossValue<V1, P1, R1, V2, P2, R2, X = Exclude$1<V1, V2>> = {
    sourceValue: V1;
    isPossibleInSource: P1;
    isRequiredInSource: R1;
    isPossibleInExcluded: P2;
    isRequiredInExcluded: R2;
    exclusionValue: X;
    isExclusionValueRepresentable: IsRepresentable<X>;
};
declare type SourceValue<C> = Get<C, "sourceValue">;
declare type IsPossibleInSource<C> = Get<C, "isPossibleInSource">;
declare type IsRequiredInSource<C> = Get<C, "isRequiredInSource">;
declare type IsPossibleInExcluded<C> = Get<C, "isPossibleInExcluded">;
declare type IsRequiredInExcluded<C> = Get<C, "isRequiredInExcluded">;
declare type ExclusionValue<C> = Get<C, "exclusionValue">;
declare type IsExclusionValueRepresentable<C> = Get<C, "isExclusionValueRepresentable">;
declare type IsOutsideOfSourceScope<C> = And<IsRequiredInExcluded<C>, Not<IsPossibleInSource<C>>>;
declare type IsOutsideOfExcludedScope<C> = And<IsRequiredInSource<C>, Not<IsPossibleInExcluded<C>>>;
declare type Propagate<C> = IsExclusionValueRepresentable<C> extends true ? ExclusionValue<C> : SourceValue<C>;
declare type IsOmittable<C> = And<Not<IsRequiredInSource<C>>, IsRequiredInExcluded<C>>;

declare type ExcludeFromTuple<S, E> = {
    any: Never;
    never: S;
    const: ExcludeConst$1<S, E>;
    enum: ExcludeEnum<S, E>;
    primitive: S;
    array: ExcludeArray<S, E>;
    tuple: ExcludeTuples<S, E>;
    object: S;
    union: ExcludeUnion<S, E>;
    intersection: ExcludeIntersection<S, E>;
    exclusion: ExcludeExclusion<S, E>;
    error: E;
    errorMissingType: Error<"Missing type property in Exclusion excluded value">;
}[Get<E, "type"> extends MetaType ? Get<E, "type"> : "errorMissingType"];
declare type ExcludeArray<S, E> = ExcludeTuples<S, Tuple<[], true, Values$3<E>>>;
declare type ExcludeTuples<S, E, C = CrossTupleValues<Values<S>, Values<E>, IsOpen<S>, IsOpen<E>, OpenProps<S>, OpenProps<E>>, R = RepresentableItems<C>, P = Exclude$1<OpenProps<S>, OpenProps<E>>, I = IsRepresentable<P>> = DoesTupleSizesMatch<S, E, C> extends true ? {
    moreThanTwo: S;
    onlyOne: Tuple<PropagateExclusion$1<C>, I extends true ? IsOpen<S> : false, P>;
    none: OmitOmittableItems<S, C>;
}[And<IsOpen<S>, I> extends true ? "moreThanTwo" : GetTupleLength<R>] : S;
declare type CrossTupleValues<V1, V2, O1, O2, P1, P2, R extends any[] = []> = {
    stop: Reverse<R>;
    continue1: CrossTupleValues<Tail<V1>, [], O1, O2, P1, P2, Prepend<CrossValue<Head<V1>, true, true, P2, O2, false>, R>>;
    continue2: CrossTupleValues<[], Tail<V2>, O1, O2, P1, P2, Prepend<CrossValue<P1, O1, false, Head<V2>, true, true>, R>>;
    continueBoth: CrossTupleValues<Tail<V1>, Tail<V2>, O1, O2, P1, P2, Prepend<CrossValue<Head<V1>, true, true, Head<V2>, true, true>, R>>;
}[V1 extends [any, ...any[]] ? V2 extends [any, ...any[]] ? "continueBoth" : "continue1" : V2 extends [any, ...any[]] ? "continue2" : "stop"];
declare type GetTupleLength<T> = A.Equals<T, []> extends B.True ? "none" : A.Equals<Tail<T>, []> extends B.True ? "onlyOne" : "moreThanTwo";
declare type DoesTupleSizesMatch<S, E, C> = And<IsOpen<S>, Not<IsOpen<E>>> extends true ? false : And<IsExcludedSmallEnough$1<C>, IsExcludedBigEnough$1<C>>;
declare type IsExcludedSmallEnough$1<C> = {
    stop: true;
    continue: IsOutsideOfSourceScope<Head<C>> extends true ? false : IsExcludedSmallEnough$1<Tail<C>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type IsExcludedBigEnough$1<C> = {
    stop: true;
    continue: IsOutsideOfExcludedScope<Head<C>> extends true ? false : IsExcludedBigEnough$1<Tail<C>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type RepresentableItems<C, R extends any[] = []> = {
    stop: R;
    continue: IsExclusionValueRepresentable<Head<C>> extends true ? RepresentableItems<Tail<C>, Prepend<Head<C>, R>> : RepresentableItems<Tail<C>, R>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type PropagateExclusion$1<C, R extends any[] = []> = {
    stop: Reverse<R>;
    continue: PropagateExclusion$1<Tail<C>, Prepend<Propagate<Head<C>>, R>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type OmitOmittableItems<S, C, I = OmittableItems<C>> = {
    moreThanTwo: S;
    onlyOne: Tuple<RequiredTupleValues<S, C>, false, OpenProps<S>>;
    none: Never;
}[GetTupleLength<I>];
declare type OmittableItems<C, R extends any[] = []> = {
    stop: R;
    continue: IsOmittable<Head<C>> extends true ? OmittableItems<Tail<C>, Prepend<Head<C>, R>> : OmittableItems<Tail<C>, R>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type RequiredTupleValues<S, C, R extends any[] = []> = {
    stop: Reverse<R>;
    continue: IsOmittable<Head<C>> extends true ? Reverse<R> : RequiredTupleValues<Tail<S>, Tail<C>, Prepend<SourceValue<Head<C>>, R>>;
}[C extends [any, ...any[]] ? "continue" : "stop"];
declare type ExcludeConst$1<S, E, V = Value$3<E>> = IsArray<V> extends true ? Exclude$1<S, Tuple<ExtractConstValues<V>, false, Never>> : S;
declare type ExtractConstValues<V, R extends any[] = []> = {
    stop: Reverse<R>;
    continue: ExtractConstValues<Tail<V>, Prepend<Const<Head<V>>, R>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];

declare type ExcludeFromObject<S, E> = {
    any: Never;
    never: S;
    const: ExcludeConst<S, E>;
    enum: ExcludeEnum<S, E>;
    primitive: S;
    array: S;
    tuple: S;
    object: ExcludeObjects<S, E>;
    union: ExcludeUnion<S, E>;
    intersection: ExcludeIntersection<S, E>;
    exclusion: ExcludeExclusion<S, E>;
    error: E;
    errorTypeProperty: Error<"Missing type property">;
}[Get<E, "type"> extends MetaType ? Get<E, "type"> : "errorTypeProperty"];
declare type ExcludeObjects<S, E, C = CrossObjectValues<S, E>, R = RepresentableKeys<C>, P = Exclude$1<OpenProps$1<S>, OpenProps$1<E>>> = DoesObjectSizesMatch<S, E, C> extends true ? {
    moreThanTwo: S;
    onlyOne: PropagateExclusion<S, C>;
    none: OmitOmittableKeys<S, C>;
}[And<IsOpen$1<S>, IsRepresentable<P>> extends true ? "moreThanTwo" : GetUnionLength<R>] : S;
declare type CrossObjectValues<S, E> = {
    [key in keyof Values$2<S> | keyof Values$2<E> | Required<S> | Required<E>]: CrossValue<Value$1<S, key>, IsPossibleIn<S, key>, IsRequiredIn<S, key>, Value$1<E, key>, IsPossibleIn<E, key>, IsRequiredIn<E, key>>;
};
declare type GetUnionLength<Union> = A.Equals<Union, never> extends B.True ? "none" : A.Equals<U.Pop<Union>, never> extends B.True ? "onlyOne" : "moreThanTwo";
declare type IsPossibleIn<O, K> = Or<DoesExtend<K, keyof Values$2<O>>, IsOpen$1<O>>;
declare type IsRequiredIn<O, K> = DoesExtend<K, Required<O>>;
declare type DoesObjectSizesMatch<S, E, C> = And<IsOpen$1<S>, Not<IsOpen$1<E>>> extends true ? false : And<IsExcludedSmallEnough<C>, IsExcludedBigEnough<C>>;
declare type IsExcludedSmallEnough<C> = Not<DoesExtend<true, {
    [key in keyof C]: IsOutsideOfSourceScope<C[key]>;
}[keyof C]>>;
declare type IsExcludedBigEnough<C> = Not<DoesExtend<true, {
    [key in keyof C]: IsOutsideOfExcludedScope<C[key]>;
}[keyof C]>>;
declare type RepresentableKeys<C> = {
    [key in keyof C]: IsExclusionValueRepresentable<C[key]> extends true ? key : never;
}[keyof C];
declare type PropagateExclusion<S, C> = Object$1<{
    [key in keyof C]: Propagate<C[key]>;
}, Required<S>, IsOpen$1<S>, OpenProps$1<S>>;
declare type OmitOmittableKeys<S, C, K = OmittableKeys<C>> = {
    moreThanTwo: S;
    onlyOne: Object$1<{
        [key in keyof C]: key extends K ? Never : SourceValue<C[key]>;
    }, Required<S>, IsOpen$1<S>, OpenProps$1<S>>;
    none: Never;
}[GetUnionLength<K>];
declare type OmittableKeys<C> = {
    [key in keyof C]: IsOmittable<C[key]> extends true ? key : never;
}[keyof C];
declare type ExcludeConst<S, E, V = Value$3<E>> = IsObject<V> extends true ? Exclude$1<S, Object$1<{
    [key in keyof V]: Const<V[key]>;
}, keyof V, false, Never>> : S;

declare type ExclusionType = "exclusion";
declare type Exclusion<V, E> = {
    type: ExclusionType;
    value: V;
    excluded: E;
};
declare type Value<E> = Get<E, "value">;
declare type Excluded<E> = Get<E, "excluded">;
declare type ResolveExclusion<E> = Resolve<Exclude$1<Value<E>, Excluded<E>>>;
declare type Exclude$1<A, B> = {
    any: ExcludeFromAny<A, B>;
    never: Never;
    const: ExcludeFromConst<A, B>;
    enum: ExcludeFromEnum<A, B>;
    primitive: ExcludeFromPrimitive<A, B>;
    array: ExcludeFromArray<A, B>;
    tuple: ExcludeFromTuple<A, B>;
    object: ExcludeFromObject<A, B>;
    union: DistributeUnion<A, B>;
    intersection: Exclude$1<ClearIntersections<A>, B>;
    exclusion: Exclude$1<Exclude$1<Value<A>, Excluded<A>>, B>;
    error: A;
    errorMissingType: Error<"Missing type property in Exclusion source value">;
}[Get<A, "type"> extends MetaType ? Get<A, "type"> : "errorMissingType"];
declare type IsExclusionRepresentable<E> = IsRepresentable<Exclude$1<Value<E>, Excluded<E>>>;

declare type ClearExclusionIntersections<A> = Exclusion<ClearIntersections<Value<A>>, ClearIntersections<Excluded<A>>>;
declare type IntersectExclusion<A, B> = {
    any: A;
    never: Never;
    const: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    enum: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    primitive: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    array: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    tuple: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    object: Exclusion<Intersect<Value<A>, B>, Excluded<A>>;
    union: IntersectUnion<B, A>;
    intersection: Error<"Cannot intersect intersection">;
    exclusion: Exclusion<Intersect<Value<A>, Value<B>>, Union<Excluded<A> | Excluded<B>>>;
    error: B;
    errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];

declare type IntersectConst<A, B> = {
    any: A;
    never: Never;
    const: CheckExtendsResolved<A, B>;
    enum: CheckExtendsResolved<A, B>;
    primitive: CheckExtendsResolved<A, B>;
    array: CheckExtendsResolved<A, B>;
    tuple: CheckExtendsResolved<A, B>;
    object: ToObject<A, B>;
    union: IntersectUnion<B, A>;
    exclusion: IntersectExclusion<B, A>;
    intersection: Error<"Cannot intersect intersection">;
    error: B;
    errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];
declare type CheckExtendsResolved<A, B> = Value$3<A> extends Resolve<B> ? A : Never;
declare type ToObject<A, B> = IsObject<Value$3<A>> extends true ? IntersectConstToObject<A, B> : Never;
declare type IntersectConstToObject<A, B, V = IntersectConstValues<Value$3<A>, B>> = NeverKeys$1<V> extends never ? A : Never;
declare type IntersectConstValues<V, B> = {
    [key in keyof V | Required<B>]: key extends keyof V ? key extends keyof Values$2<B> ? Intersect<Const<V[key]>, Values$2<B>[key]> : IsOpen$1<B> extends true ? Intersect<Const<V[key]>, OpenProps$1<B>> : Never : Never;
};
declare type NeverKeys$1<O> = {
    [key in keyof O]: O[key] extends Never ? key : never;
}[keyof O];

declare type IntersectEnum<A, B> = {
    any: A;
    never: Never;
    const: IntersectConst<B, A>;
    enum: FilterUnintersecting<A, B>;
    primitive: FilterUnintersecting<A, B>;
    array: FilterUnintersecting<A, B>;
    tuple: FilterUnintersecting<A, B>;
    object: FilterUnintersecting<A, B>;
    union: IntersectUnion<B, A>;
    exclusion: IntersectExclusion<B, A>;
    intersection: Error<"Cannot intersect intersection">;
    error: B;
    errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];
declare type FilterUnintersecting<A, B> = Enum<RecurseOnEnumValues<Values$4<A>, B>>;
declare type RecurseOnEnumValues<V, B> = V extends infer T ? Intersect<Const<T>, B> extends Never ? never : T : never;

declare type IntersectPrimitive<A, B> = {
    any: A;
    never: Never;
    const: IntersectConst<B, A>;
    enum: IntersectEnum<B, A>;
    primitive: Value$2<A> extends Value$2<B> ? A : Value$2<B> extends Value$2<A> ? B : Never;
    array: Never;
    tuple: Never;
    object: Never;
    union: Intersect<B, A>;
    intersection: Error<"Cannot intersect intersection">;
    exclusion: IntersectExclusion<B, A>;
    error: B;
    errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];

declare type ClearTupleIntersections<T, O = ClearIntersections<OpenProps<T>>> = Tuple<ClearTupleValuesIntersections<Values<T>>, O extends Never ? false : IsOpen<T>, O>;
declare type ClearTupleValuesIntersections<V, R extends any[] = []> = {
    stop: Reverse<R>;
    continue: ClearTupleValuesIntersections<Tail<V>, Prepend<ClearIntersections<Head<V>>, R>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];
declare type IntersectTuple<A, B> = {
    any: A;
    never: Never;
    const: IntersectConst<B, A>;
    enum: IntersectEnum<B, A>;
    primitive: Never;
    array: IntersectTupleToArray<A, B>;
    tuple: IntersectTuples<A, B>;
    object: Never;
    union: DistributeIntersection<B, A>;
    intersection: Error<"Cannot intersect intersection">;
    exclusion: IntersectExclusion<B, A>;
    error: B;
    errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];
declare type IntersectTupleToArray<T, A, V = IntersectTupleToArrValues<Values<T>, Values$3<A>>, N = HasNeverValue<V>, O = Intersect<OpenProps<T>, Values$3<A>>> = N extends true ? Never : Tuple<V, IsOpen<T> extends true ? (O extends Never ? false : true) : false, O>;
declare type IntersectTupleToArrValues<V, T, R = []> = {
    stop: Reverse<R>;
    continue: R extends any[] ? IntersectTupleToArrValues<Tail<V>, T, Prepend<Intersect<Head<V>, T>, R>> : never;
}[V extends [any, ...any[]] ? "continue" : "stop"];
declare type HasNeverValue<V, R = false> = {
    stop: R;
    continue: Head<V> extends Never ? true : HasNeverValue<Tail<V>>;
}[V extends [any, ...any[]] ? "continue" : "stop"];
declare type IntersectTuples<A, B, V = IntersectTupleValues<Values<A>, Values<B>, IsOpen<A>, IsOpen<B>, OpenProps<A>, OpenProps<B>>, N = HasNeverValue<V>, O = Intersect<OpenProps<A>, OpenProps<B>>> = N extends true ? Never : Tuple<V, O extends Never ? false : And<IsOpen<A>, IsOpen<B>>, O>;
declare type IntersectTupleValues<V1, V2, O1, O2, P1, P2, R extends any[] = []> = {
    stop: Reverse<R>;
    continue1: IntersectTupleValues<Tail<V1>, V2, O1, O2, P1, P2, Prepend<O2 extends true ? Intersect<Head<V1>, P2> : Never, R>>;
    continue2: IntersectTupleValues<V1, Tail<V2>, O1, O2, P1, P2, Prepend<O1 extends true ? Intersect<Head<V2>, P1> : Never, R>>;
    continueBoth: IntersectTupleValues<Tail<V1>, Tail<V2>, O1, O2, P1, P2, Prepend<Intersect<Head<V1>, Head<V2>>, R>>;
}[V1 extends [any, ...any[]] ? V2 extends [any, ...any[]] ? "continueBoth" : "continue1" : V2 extends [any, ...any[]] ? "continue2" : "stop"];

declare type ClearArrIntersections<A> = Arr<ClearIntersections<Values$3<A>>>;
declare type IntersectArr<A, B> = {
    any: A;
    never: Never;
    const: IntersectConst<B, A>;
    enum: IntersectEnum<B, A>;
    primitive: Never;
    array: IntersectArrs<A, B>;
    tuple: IntersectTuple<B, A>;
    object: Never;
    union: IntersectUnion<B, A>;
    exclusion: IntersectExclusion<B, A>;
    intersection: Error<"Cannot intersect intersection">;
    error: B;
    errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];
declare type IntersectArrs<A, B, I = Intersect<Values$3<A>, Values$3<B>>> = I extends Never ? Never : Arr<I>;

declare type ClearObjectIntersections<A, V = ClearObjectValuesIntersections<Values$2<A>>, N = NeverKeys<V>, O = ClearIntersections<OpenProps$1<A>>> = Required<A> extends Exclude<Required<A>, N> ? Object$1<{
    [key in Exclude<keyof V, N>]: V[key];
}, Required<A>, O extends Never ? false : IsOpen$1<A>, O> : Never;
declare type ClearObjectValuesIntersections<V> = {
    [key in keyof V]: ClearIntersections<V[key]>;
};
declare type IntersectObject<A, B> = {
    any: A;
    never: Never;
    const: IntersectConst<B, A>;
    enum: IntersectEnum<B, A>;
    primitive: Never;
    array: Never;
    tuple: Never;
    object: IntersectObjects<A, B>;
    union: DistributeIntersection<B, A>;
    intersection: Error<"Cannot intersect intersection">;
    exclusion: IntersectExclusion<B, A>;
    error: B;
    errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];
declare type IntersectObjects<A, B, V = IntersectValues<A, B>, N = NeverKeys<V>, O = IntersectOpenProps<A, B>> = Required<A> | Required<B> extends Exclude<Required<A> | Required<B>, N> ? Object$1<{
    [key in Exclude<keyof V, N>]: V[key];
}, Required<A> | Required<B>, O extends Never ? false : And<IsOpen$1<A>, IsOpen$1<B>>, O> : Never;
declare type IntersectValues<A, B> = {
    [key in keyof Values$2<A> | keyof Values$2<B>]: key extends keyof Values$2<A> ? key extends keyof Values$2<B> ? Intersect<Values$2<A>[key], Values$2<B>[key]> : IsOpen$1<B> extends true ? Intersect<Values$2<A>[key], OpenProps$1<B>> : Never : key extends keyof Values$2<B> ? IsOpen$1<A> extends true ? Intersect<OpenProps$1<A>, Values$2<B>[key]> : Never : Never;
};
declare type NeverKeys<O> = {
    [key in keyof O]: O[key] extends Never ? key : never;
}[keyof O];
declare type IntersectOpenProps<A, B> = Intersect<OpenProps$1<A>, OpenProps$1<B>>;

declare type IntersectionType = "intersection";
declare type Intersection<L, R> = {
    type: IntersectionType;
    left: L;
    right: R;
};
declare type Left<I> = Get<I, "left">;
declare type Right<I> = Get<I, "right">;
declare type ResolveIntersection<T> = Resolve<ClearIntersections<T>>;
declare type ClearIntersections<T> = {
    any: T;
    never: T;
    const: T;
    enum: T;
    primitive: T;
    array: ClearArrIntersections<T>;
    tuple: ClearTupleIntersections<T>;
    object: ClearObjectIntersections<T>;
    union: ClearUnionIntersections<T>;
    intersection: Intersect<ClearIntersections<Left<T>>, ClearIntersections<Right<T>>>;
    exclusion: ClearExclusionIntersections<T>;
    error: T;
    errorMissingType: Error<"Missing type property">;
}[Get<T, "type"> extends MetaType ? Get<T, "type"> : "errorMissingType"];
declare type Intersect<A, B> = {
    any: B;
    never: Get<B, "type"> extends ErrorType ? B : Never;
    const: IntersectConst<A, B>;
    enum: IntersectEnum<A, B>;
    primitive: IntersectPrimitive<A, B>;
    array: IntersectArr<A, B>;
    tuple: IntersectTuple<A, B>;
    object: IntersectObject<A, B>;
    union: IntersectUnion<A, B>;
    intersection: Error<"Cannot intersect intersection">;
    exclusion: IntersectExclusion<A, B>;
    error: A;
    errorMissingType: Error<"Missing type property">;
}[Get<A, "type"> extends MetaType ? Get<A, "type"> : "errorMissingType"];
declare type IsIntersectionRepresentable<A> = IsRepresentable<ClearIntersections<A>>;

declare type IsRepresentable<A> = {
    any: true;
    never: false;
    const: true;
    enum: IsEnumRepresentable<A>;
    primitive: true;
    array: true;
    tuple: IsTupleRepresentable<A>;
    object: IsObjectRepresentable<A>;
    union: IsUnionRepresentable<A>;
    intersection: IsIntersectionRepresentable<A>;
    exclusion: IsExclusionRepresentable<A>;
    error: false;
    errorMissingType: false;
}[Get<A, "type"> extends MetaType ? Get<A, "type"> : "errorMissingType"];

declare type TupleType = "tuple";
declare type Tuple<V, O = true, P = Any> = {
    type: TupleType;
    values: V;
    isOpen: O;
    openProps: P;
};
declare type Values<T> = Get<T, "values">;
declare type IsOpen<T> = Get<T, "isOpen">;
declare type OpenProps<T> = Get<T, "openProps">;
declare type ResolveTuple<T> = IsOpen<T> extends true ? Concat<RecurseOnTuple<Values<T>>, [...Resolve<OpenProps<T>>[]]> : RecurseOnTuple<Values<T>>;
declare type RecurseOnTuple<V, R extends any[] = []> = {
    stop: Reverse<R>;
    continue: V extends any[] ? RecurseOnTuple<Tail<V>, Prepend<Resolve<Head<V>>, R>> : never;
}[V extends [any, ...any[]] ? "continue" : "stop"];
declare type IsTupleRepresentable<T> = AreAllTupleValuesRepresentable<Values<T>>;
declare type AreAllTupleValuesRepresentable<V> = {
    stop: true;
    continue: V extends any[] ? IsRepresentable<Head<V>> extends false ? false : AreAllTupleValuesRepresentable<Tail<V>> : never;
}[V extends [any, ...any[]] ? "continue" : "stop"];

declare type MetaType = AnyType | NeverType | ConstType | EnumType | PrimitiveType | ArrType | TupleType | ObjectType | UnionType | IntersectionType | ExclusionType | ErrorType;
declare type Resolve<T, D = Exclude<T, undefined>> = {
    any: ResolveAny;
    never: ResolveNever;
    const: ResolveConst<D>;
    enum: ResolveEnum<D>;
    primitive: ResolvePrimitive<D>;
    array: ResolveArr<D>;
    tuple: ResolveTuple<D>;
    object: ResolveObject<D>;
    union: ResolveUnion<D>;
    intersection: ResolveIntersection<D>;
    exclusion: ResolveExclusion<D>;
    error: never;
}[Get<D, "type"> extends MetaType ? Get<D, "type"> : "error"];

declare type ParseConstSchema<S> = HasKeyIn<S, "type"> extends true ? Intersection<Const<Get<S, "const">>, ParseSchema<Omit<S, "const">>> : Const<Get<S, "const">>;

declare type ParseEnumSchema<S> = HasKeyIn<S, "const" | "type"> extends true ? Intersection<Enum<DeepGet<S, ["enum", number]>>, ParseSchema<Omit<S, "enum">>> : Enum<DeepGet<S, ["enum", number]>>;

declare type ParseMixedSchema<S> = Union<RecurseOnMixedSchema<Get<S, "type">, S>>;
declare type RecurseOnMixedSchema<T, S, R = never> = {
    stop: R;
    continue: T extends any[] ? RecurseOnMixedSchema<Tail<T>, S, R | ParseSchema<DeepMergeUnsafe<S, {
        type: Head<T>;
    }>>> : never;
}[T extends [any, ...any[]] ? "continue" : "stop"];

declare type ParseArrSchema<S> = "items" extends keyof S ? IsObject<S["items"]> extends true ? Arr<ParseSchema<S["items"]>> : S["items"] extends any[] ? Union<FromTreeTuple<ParseTuple<S["items"]>, S>> : Error<'Invalid value in "items" property'> : Arr;
declare type ParseTuple<S, R extends any[] = []> = {
    stop: R;
    continue: S extends any[] ? ParseTuple<Tail<S>, Prepend<ParseSchema<Head<S>>, R>> : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];
declare type FromTreeTuple<T, S> = T extends any[] ? ApplyAdditionalItems<ApplyBoundaries<T, "minItems" extends keyof S ? S["minItems"] : 0, "maxItems" extends keyof S ? S["maxItems"] : undefined>, "additionalItems" extends keyof S ? S["additionalItems"] : true> : never;
declare type ApplyBoundaries<T extends any[], Min, Max, R = never, HasMin extends boolean = false, HasMax extends boolean = false, C = T> = {
    stop: {
        result: Max extends undefined ? R | Tuple<Reverse<T>, false> : HasMax extends true ? R | Tuple<Reverse<T>, false> : Max extends T["length"] ? Tuple<Reverse<T>, false> : IsLongerThan<Tail<T>, Max> extends true ? never : R | Tuple<Reverse<T>, false>;
        hasEncounteredMin: DoesExtend<Min, T["length"]>;
        hasEncounteredMax: HasMax extends true ? true : Max extends T["length"] ? true : IsLongerThan<Tail<T>, Max>;
        completeTuple: C;
    };
    continue: ApplyBoundaries<Tail<T>, Min, Max, T["length"] extends Max ? Tuple<Reverse<T>, false> : R | Tuple<Reverse<T>, false>, HasMin extends true ? true : DoesExtend<Min, T["length"]>, HasMax extends true ? true : DoesExtend<Max, T["length"]>, C>;
}[Min extends T["length"] ? "stop" : T extends [any, ...any[]] ? "continue" : "stop"];
declare type IsLongerThan<T extends any[], N, R = false> = {
    continue: T["length"] extends N ? true : IsLongerThan<Tail<T>, N>;
    stop: T["length"] extends N ? true : R;
}[T extends [any, ...any[]] ? "continue" : "stop"];
declare type ApplyAdditionalItems<R, A> = Get<R, "hasEncounteredMax"> extends true ? Get<R, "hasEncounteredMin"> extends true ? Get<R, "result"> : Error<'"minItems" property is lower than "maxItems"'> : A extends false ? Get<R, "hasEncounteredMin"> extends true ? Get<R, "result"> : Error<'"minItems" property is higher than allowed number of items'> : A extends true ? Get<R, "hasEncounteredMin"> extends true ? Get<R, "result"> | Tuple<Reverse<Get<R, "completeTuple">>> : Tuple<Reverse<Get<R, "completeTuple">>> : IsObject<A> extends true ? Get<R, "hasEncounteredMin"> extends true ? Get<R, "result"> | Tuple<Reverse<Get<R, "completeTuple">>, true, ParseSchema<A>> : Tuple<Reverse<Get<R, "completeTuple">>, true, ParseSchema<A>> : Error<'Invalid value in "additionalItems" property'>;

declare type ParseObjectSchema<S> = "properties" extends keyof S ? Object$1<{
    [key in keyof S["properties"]]: ParseSchema<S["properties"][key]>;
}, GetRequired<S>, "additionalProperties" extends keyof S ? S["additionalProperties"] extends false ? false : true : true, GetOpenProps<S>> : Object$1<{}, GetRequired<S>, true, GetOpenProps<S>>;
declare type GetRequired<S> = S extends {
    required: ReadonlyArray<string>;
} ? S["required"][number] : never;
declare type GetOpenProps<S> = "additionalProperties" extends keyof S ? "patternProperties" extends keyof S ? AdditionalAndPatternProps<S["additionalProperties"], S["patternProperties"]> : AdditionalProps<S["additionalProperties"]> : "patternProperties" extends keyof S ? PatternProps<S["patternProperties"]> : Any;
declare type AdditionalProps<A> = A extends false ? Never : A extends true ? Any : IsObject<A> extends true ? ParseSchema<A> : Error<'Invalid value in "additionalProperties" property'>;
declare type PatternProps<P> = {
    type: "union";
    values: {
        [key in keyof P]: ParseSchema<P[key]>;
    }[keyof P];
};
declare type AdditionalAndPatternProps<A, P> = A extends boolean ? Union<{
    [key in keyof P]: ParseSchema<P[key]>;
}[keyof P]> : IsObject<A> extends true ? Union<ParseSchema<A> | {
    [key in keyof P]: ParseSchema<P[key]>;
}[keyof P]> : never;

declare type RemoveInvalidAdditionalItems<S> = "items" extends keyof S ? "additionalItems" extends keyof S ? S : Merge<S, {
    additionalItems: true;
}> : Omit<S, "additionalItems">;
declare type MergeSubSchema<P, C> = Merge<P, Merge<{
    properties: {};
    additionalProperties: true;
    required: [];
}, RemoveInvalidAdditionalItems<C>>>;

declare type ParseAnyOfSchema<S> = Union<RecurseOnAnyOfSchema<Get<S, "anyOf">, S>>;
declare type RecurseOnAnyOfSchema<S, P, R = never> = {
    stop: R;
    continue: S extends any[] ? RecurseOnAnyOfSchema<Tail<S>, P, R | (HasKeyIn<P, "enum" | "const" | "type"> extends true ? Intersection<ParseSchema<Omit<P, "anyOf">>, ParseSchema<MergeSubSchema<Omit<P, "anyOf">, Head<S>>>> : ParseSchema<Merge<Omit<P, "anyOf">, RemoveInvalidAdditionalItems<Head<S>>>>)> : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];

declare type ParseOneOfSchema<S> = Union<RecurseOnOneOfSchema<Get<S, "oneOf">, S>>;
declare type RecurseOnOneOfSchema<S, P, R = never> = {
    stop: R;
    continue: S extends any[] ? RecurseOnOneOfSchema<Tail<S>, P, R | (HasKeyIn<P, "enum" | "const" | "type" | "anyOf"> extends true ? Intersection<ParseSchema<Omit<P, "oneOf">>, ParseSchema<MergeSubSchema<Omit<P, "oneOf">, Head<S>>>> : ParseSchema<Merge<Omit<P, "oneOf">, RemoveInvalidAdditionalItems<Head<S>>>>)> : never;
}[S extends [any, ...any[]] ? "continue" : "stop"];

declare type ParseAllOfSchema<S> = RecurseOnAllOfSchema<Get<S, "allOf">, S, HasKeyIn<S, "enum" | "const" | "type" | "anyOf" | "oneOf"> extends true ? ParseSchema<Omit<S, "allOf">> : Any>;
declare type RecurseOnAllOfSchema<V, S, R> = {
    stop: R;
    continue: V extends any[] ? RecurseOnAllOfSchema<Tail<V>, S, Intersection<ParseSchema<MergeSubSchema<Omit<S, "allOf">, Head<V>>>, R>> : never;
}[V extends [any, ...any[]] ? "continue" : "stop"];

declare type AllTypes = Union<Primitive<null> | Primitive<boolean> | Primitive<number> | Primitive<string> | Arr<Any> | Object$1>;
declare type ParseNotSchema<S, P = ParseSchema<Omit<S, "not">>, E = Exclusion<HasKeyIn<S, "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf"> extends true ? P : AllTypes, ParseSchema<MergeSubSchema<Omit<S, "not">, Get<S, "not">>>>> = IsRepresentable<E> extends true ? E : P;

declare type ParseIfThenElseSchema<S, R = Omit<S, "if" | "then" | "else">> = HasKeyIn<S, "enum" | "const" | "type" | "anyOf" | "oneOf" | "allOf" | "not"> extends true ? Intersection<ApplyIfThenElse<S, R>, ParseSchema<R>> : ApplyIfThenElse<S, R>;
declare type ApplyIfThenElse<S, R, I = "if" extends keyof S ? MergeSubSchema<R, S["if"]> : never> = Union<("then" extends keyof S ? Intersection<ParseSchema<I>, ParseSchema<MergeSubSchema<R, S["then"]>>> : ParseSchema<I>) | Exclusion<"else" extends keyof S ? ParseSchema<MergeSubSchema<R, S["else"]>> : ParseSchema<R>, ParseSchema<I>>>;

declare type ParseSchema<S> = {
    any: Any;
    never: Never;
    null: Primitive<null>;
    boolean: Primitive<boolean>;
    number: Primitive<number>;
    string: Primitive<string>;
    mixed: ParseMixedSchema<S>;
    object: ParseObjectSchema<S>;
    array: ParseArrSchema<S>;
    const: ParseConstSchema<S>;
    enum: ParseEnumSchema<S>;
    anyOf: ParseAnyOfSchema<S>;
    oneOf: ParseOneOfSchema<S>;
    allOf: ParseAllOfSchema<S>;
    not: ParseNotSchema<S>;
    ifThenElse: ParseIfThenElseSchema<S>;
}[InferSchemaType<S>];
declare type InferSchemaType<S> = S extends true | string ? "any" : S extends false ? "never" : "if" extends keyof S ? "ifThenElse" : "not" extends keyof S ? "not" : "allOf" extends keyof S ? "allOf" : "oneOf" extends keyof S ? "oneOf" : "anyOf" extends keyof S ? "anyOf" : "enum" extends keyof S ? "enum" : "const" extends keyof S ? "const" : "type" extends keyof S ? S["type"] extends any[] ? "mixed" : S["type"] extends "null" ? "null" : S["type"] extends "boolean" ? "boolean" : S["type"] extends "integer" | "number" ? "number" : S["type"] extends "string" ? "string" : S["type"] extends "object" ? "object" : S["type"] extends "array" ? "array" : "never" : "any";

declare type JSONSchema = JSONSchema6Definition | DeepReadonly<JSONSchema6DefinitionWithoutInterface>;
declare type FromSchema<S extends JSONSchema> = Resolve<ParseSchema<DeepWriteable<S>>>;

export { FromSchema, JSONSchema };
