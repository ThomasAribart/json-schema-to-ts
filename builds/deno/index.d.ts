import { O, L, A, B, U } from 'https://cdn.skypack.dev/ts-toolbelt@^6.15.5?dts';
import { JSONSchema6Definition, JSONSchema6 } from 'https://cdn.skypack.dev/@types/json-schema@^7.0.6?dts';

declare type JSONSchema6DefinitionWithoutInterface = JSONSchema6Definition extends infer S ? S extends JSONSchema6 ? O.Update<S, "const" | "enum" | "not", unknown> : S : never;

declare type And<A, B> = A extends true ? B extends true ? true : false : false;

declare type DoesExtend<A, B> = A extends B ? true : false;
declare type ArrayKeys = keyof [];
declare type IsObject<T> = T extends object ? ArrayKeys extends Extract<keyof T, ArrayKeys> ? false : true : false;
declare type IsArray<T> = T extends object ? ArrayKeys extends Extract<keyof T, ArrayKeys> ? true : false : false;

declare type Get<O, K, F = never> = K extends keyof O ? O[K] : F;
declare type DeepGet<O, P extends L.List, F = never> = {
    continue: L.Head<P> extends keyof O ? DeepGet<O[L.Head<P>], L.Tail<P>, F> : F;
    stop: O;
}[P extends [any, ...L.List] ? "continue" : "stop"];

declare type HasKeyIn<O, K> = Extract<keyof O, K> extends never ? false : true;

declare type DeepMergeUnsafe<A, B> = IsObject<A> extends true ? IsObject<B> extends true ? {
    [K in keyof (A & B)]: K extends keyof B ? K extends keyof A ? DeepMergeUnsafe<A[K], B[K]> : B[K] : K extends keyof A ? A[K] : never;
} : B : IsArray<A> extends true ? IsArray<B> extends true ? B extends L.List ? L.Concat<A.Cast<A, L.List>, B> : never : B : B;
declare type Merge<A, B> = IsObject<A> extends true ? IsObject<B> extends true ? {
    [K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
} : B : B;

declare type Not<A> = A extends false ? true : A extends true ? false : never;

declare type Or<A, B> = A extends true ? true : B extends true ? true : false;

declare type Prettify<T> = IsObject<T> extends true ? {
    [K in keyof T]: K extends keyof T ? T[K] : never;
} : T;

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
declare type ExcludeTuples<S, E, C extends L.List = CrossTupleValues<A.Cast<Values<S>, L.List>, A.Cast<Values<E>, L.List>, IsOpen<S>, IsOpen<E>, OpenProps<S>, OpenProps<E>>, R extends L.List = RepresentableItems<C>, P = Exclude$1<OpenProps<S>, OpenProps<E>>, I = IsRepresentable<P>> = DoesTupleSizesMatch<S, E, C> extends true ? {
    moreThanTwo: S;
    onlyOne: Tuple<PropagateExclusion$1<C>, I extends true ? IsOpen<S> : false, P>;
    none: OmitOmittableItems<S, C>;
}[And<IsOpen<S>, I> extends true ? "moreThanTwo" : GetTupleLength<R>] : S;
declare type CrossTupleValues<V1 extends L.List, V2 extends L.List, O1, O2, P1, P2, R extends L.List = []> = {
    stop: L.Reverse<R>;
    continue1: CrossTupleValues<L.Tail<V1>, [], O1, O2, P1, P2, L.Prepend<R, CrossValue<L.Head<V1>, true, true, P2, O2, false>>>;
    continue2: CrossTupleValues<[], L.Tail<V2>, O1, O2, P1, P2, L.Prepend<R, CrossValue<P1, O1, false, L.Head<V2>, true, true>>>;
    continueBoth: CrossTupleValues<L.Tail<V1>, L.Tail<V2>, O1, O2, P1, P2, L.Prepend<R, CrossValue<L.Head<V1>, true, true, L.Head<V2>, true, true>>>;
}[V1 extends [any, ...L.List] ? V2 extends [any, ...L.List] ? "continueBoth" : "continue1" : V2 extends [any, ...L.List] ? "continue2" : "stop"];
declare type GetTupleLength<T extends L.List, R extends L.List = L.Tail<T>> = A.Equals<T, []> extends B.True ? "none" : A.Equals<R, []> extends B.True ? "onlyOne" : "moreThanTwo";
declare type DoesTupleSizesMatch<S, E, C extends L.List> = And<IsOpen<S>, Not<IsOpen<E>>> extends true ? false : And<IsExcludedSmallEnough$1<C>, IsExcludedBigEnough$1<C>>;
declare type IsExcludedSmallEnough$1<C extends L.List> = {
    stop: true;
    continue: IsOutsideOfSourceScope<L.Head<C>> extends true ? false : IsExcludedSmallEnough$1<L.Tail<C>>;
}[C extends [any, ...L.List] ? "continue" : "stop"];
declare type IsExcludedBigEnough$1<C extends L.List> = {
    stop: true;
    continue: IsOutsideOfExcludedScope<L.Head<C>> extends true ? false : IsExcludedBigEnough$1<L.Tail<C>>;
}[C extends [any, ...L.List] ? "continue" : "stop"];
declare type RepresentableItems<C extends L.List, R extends L.List = []> = {
    stop: R;
    continue: IsExclusionValueRepresentable<L.Head<C>> extends true ? RepresentableItems<L.Tail<C>, L.Prepend<R, L.Head<C>>> : RepresentableItems<L.Tail<C>, R>;
}[C extends [any, ...L.List] ? "continue" : "stop"];
declare type PropagateExclusion$1<C extends L.List, R extends L.List = []> = {
    stop: L.Reverse<R>;
    continue: PropagateExclusion$1<L.Tail<C>, L.Prepend<R, Propagate<L.Head<C>>>>;
}[C extends [any, ...L.List] ? "continue" : "stop"];
declare type OmitOmittableItems<S, C extends L.List, I extends L.List = OmittableItems<C>> = {
    moreThanTwo: S;
    onlyOne: Tuple<RequiredTupleValues<C>, false, OpenProps<S>>;
    none: Never;
}[GetTupleLength<I>];
declare type OmittableItems<C extends L.List, R extends L.List = []> = {
    stop: R;
    continue: IsOmittable<L.Head<C>> extends true ? OmittableItems<L.Tail<C>, L.Prepend<R, L.Head<C>>> : OmittableItems<L.Tail<C>, R>;
}[C extends [any, ...L.List] ? "continue" : "stop"];
declare type RequiredTupleValues<C extends L.List, R extends L.List = []> = {
    stop: L.Reverse<R>;
    continue: IsOmittable<L.Head<C>> extends true ? L.Reverse<R> : RequiredTupleValues<L.Tail<C>, L.Prepend<R, SourceValue<L.Head<C>>>>;
}[C extends [any, ...L.List] ? "continue" : "stop"];
declare type ExcludeConst$1<S, E, V = Value$3<E>> = V extends L.List ? Exclude$1<S, Tuple<ExtractConstValues<V>, false, Never>> : S;
declare type ExtractConstValues<V extends L.List, R extends L.List = []> = {
    stop: L.Reverse<R>;
    continue: ExtractConstValues<L.Tail<V>, L.Prepend<R, Const<L.Head<V>>>>;
}[V extends [any, ...L.List] ? "continue" : "stop"];

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

declare type ClearTupleIntersections<T, O = ClearIntersections<OpenProps<T>>> = Tuple<ClearTupleValuesIntersections<A.Cast<Values<T>, L.List>>, O extends Never ? false : IsOpen<T>, O>;
declare type ClearTupleValuesIntersections<V extends L.List, R extends L.List = []> = {
    stop: L.Reverse<R>;
    continue: ClearTupleValuesIntersections<L.Tail<V>, L.Prepend<R, ClearIntersections<L.Head<V>>>>;
}[V extends [any, ...L.List] ? "continue" : "stop"];
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
declare type IntersectTupleToArray<T, A, V extends L.List = IntersectTupleToArrValues<A.Cast<Values<T>, L.List>, Values$3<A>>, N = HasNeverValue<V>, O = Intersect<OpenProps<T>, Values$3<A>>> = N extends true ? Never : Tuple<V, IsOpen<T> extends true ? (O extends Never ? false : true) : false, O>;
declare type IntersectTupleToArrValues<V extends L.List, T, R extends L.List = []> = {
    stop: L.Reverse<R>;
    continue: R extends L.List ? IntersectTupleToArrValues<L.Tail<V>, T, L.Prepend<R, Intersect<L.Head<V>, T>>> : never;
}[V extends [any, ...L.List] ? "continue" : "stop"];
declare type HasNeverValue<V extends L.List, R = false> = {
    stop: R;
    continue: L.Head<V> extends Never ? true : HasNeverValue<L.Tail<V>>;
}[V extends [any, ...L.List] ? "continue" : "stop"];
declare type IntersectTuples<A, B, V extends L.List = IntersectTupleValues<A.Cast<Values<A>, L.List>, A.Cast<Values<B>, L.List>, IsOpen<A>, IsOpen<B>, OpenProps<A>, OpenProps<B>>, N = HasNeverValue<V>, O = Intersect<OpenProps<A>, OpenProps<B>>> = N extends true ? Never : Tuple<V, O extends Never ? false : And<IsOpen<A>, IsOpen<B>>, O>;
declare type IntersectTupleValues<V1 extends L.List, V2 extends L.List, O1, O2, P1, P2, R extends L.List = []> = {
    stop: L.Reverse<R>;
    continue1: IntersectTupleValues<L.Tail<V1>, V2, O1, O2, P1, P2, L.Prepend<R, O2 extends true ? Intersect<L.Head<V1>, P2> : Never>>;
    continue2: IntersectTupleValues<V1, L.Tail<V2>, O1, O2, P1, P2, L.Prepend<R, O1 extends true ? Intersect<L.Head<V2>, P1> : Never>>;
    continueBoth: IntersectTupleValues<L.Tail<V1>, L.Tail<V2>, O1, O2, P1, P2, L.Prepend<R, Intersect<L.Head<V1>, L.Head<V2>>>>;
}[V1 extends [any, ...L.List] ? V2 extends [any, ...L.List] ? "continueBoth" : "continue1" : V2 extends [any, ...L.List] ? "continue2" : "stop"];

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
declare type ResolveTuple<T> = IsOpen<T> extends true ? L.Concat<RecurseOnTuple<Values<T>>, [...Resolve<OpenProps<T>>[]]> : RecurseOnTuple<Values<T>>;
declare type RecurseOnTuple<V, R extends L.List = []> = {
    stop: L.Reverse<R>;
    continue: V extends L.List ? RecurseOnTuple<L.Tail<V>, L.Prepend<R, Resolve<L.Head<V>>>> : never;
}[V extends [any, ...L.List] ? "continue" : "stop"];
declare type IsTupleRepresentable<T> = AreAllTupleValuesRepresentable<Values<T>>;
declare type AreAllTupleValuesRepresentable<V> = {
    stop: true;
    continue: V extends L.List ? IsRepresentable<L.Head<V>> extends false ? false : AreAllTupleValuesRepresentable<L.Tail<V>> : never;
}[V extends [any, ...L.List] ? "continue" : "stop"];

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

declare type ParseMixedSchema<S, T = Get<S, "type">> = T extends L.List ? Union<RecurseOnMixedSchema<T, S>> : Error<"Mixed schema 'type' property should be an array">;
declare type RecurseOnMixedSchema<T extends L.List, S, R = never> = {
    stop: R;
    continue: RecurseOnMixedSchema<L.Tail<T>, S, R | ParseSchema<DeepMergeUnsafe<S, {
        type: L.Head<T>;
    }>>>;
}[T extends [any, ...L.List] ? "continue" : "stop"];

declare type ParseArrSchema<S> = "items" extends keyof S ? IsObject<S["items"]> extends true ? Arr<ParseSchema<S["items"]>> : S["items"] extends L.List ? Union<FromTreeTuple<ParseTuple<A.Cast<S["items"], L.List>>, S>> : Error<'Invalid value in "items" property'> : Arr;
declare type ParseTuple<S extends L.List, R extends L.List = []> = {
    stop: R;
    continue: ParseTuple<L.Tail<S>, L.Prepend<R, ParseSchema<L.Head<S>>>>;
}[S extends [any, ...L.List] ? "continue" : "stop"];
declare type FromTreeTuple<T extends L.List, S> = ApplyAdditionalItems<ApplyBoundaries<T, "minItems" extends keyof S ? S["minItems"] : 0, "maxItems" extends keyof S ? S["maxItems"] : undefined>, "additionalItems" extends keyof S ? S["additionalItems"] : true>;
declare type ApplyBoundaries<T extends L.List, Min, Max, R = never, HasMin extends boolean = false, HasMax extends boolean = false, C = T> = {
    stop: {
        result: Max extends undefined ? R | Tuple<L.Reverse<T>, false> : HasMax extends true ? R | Tuple<L.Reverse<T>, false> : Max extends T["length"] ? Tuple<L.Reverse<T>, false> : IsLongerThan<L.Tail<T>, Max> extends true ? never : R | Tuple<L.Reverse<T>, false>;
        hasEncounteredMin: DoesExtend<Min, T["length"]>;
        hasEncounteredMax: HasMax extends true ? true : Max extends T["length"] ? true : IsLongerThan<L.Tail<T>, Max>;
        completeTuple: C;
    };
    continue: ApplyBoundaries<L.Tail<T>, Min, Max, T["length"] extends Max ? Tuple<L.Reverse<T>, false> : R | Tuple<L.Reverse<T>, false>, HasMin extends true ? true : DoesExtend<Min, T["length"]>, HasMax extends true ? true : DoesExtend<Max, T["length"]>, C>;
}[Min extends T["length"] ? "stop" : T extends [any, ...L.List] ? "continue" : "stop"];
declare type IsLongerThan<T extends L.List, N, R = false> = {
    continue: T["length"] extends N ? true : IsLongerThan<L.Tail<T>, N>;
    stop: T["length"] extends N ? true : R;
}[T extends [any, ...L.List] ? "continue" : "stop"];
declare type ApplyAdditionalItems<R, A> = Get<R, "hasEncounteredMax"> extends true ? Get<R, "hasEncounteredMin"> extends true ? Get<R, "result"> : Error<'"minItems" property is lower than "maxItems"'> : A extends false ? Get<R, "hasEncounteredMin"> extends true ? Get<R, "result"> : Error<'"minItems" property is higher than allowed number of items'> : A extends true ? Get<R, "hasEncounteredMin"> extends true ? Get<R, "result"> | Tuple<L.Reverse<A.Cast<Get<R, "completeTuple">, L.List>>> : Tuple<L.Reverse<A.Cast<Get<R, "completeTuple">, L.List>>> : IsObject<A> extends true ? Get<R, "hasEncounteredMin"> extends true ? Get<R, "result"> | Tuple<L.Reverse<A.Cast<Get<R, "completeTuple">, L.List>>, true, ParseSchema<A>> : Tuple<L.Reverse<A.Cast<Get<R, "completeTuple">, L.List>>, true, ParseSchema<A>> : Error<'Invalid value in "additionalItems" property'>;

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
    continue: S extends L.List ? RecurseOnAnyOfSchema<L.Tail<S>, P, R | (HasKeyIn<P, "enum" | "const" | "type"> extends true ? Intersection<ParseSchema<Omit<P, "anyOf">>, ParseSchema<MergeSubSchema<Omit<P, "anyOf">, L.Head<S>>>> : ParseSchema<Merge<Omit<P, "anyOf">, RemoveInvalidAdditionalItems<L.Head<S>>>>)> : never;
}[S extends [any, ...L.List] ? "continue" : "stop"];

declare type ParseOneOfSchema<S, O = Get<S, "oneOf">> = O extends L.List ? Union<RecurseOnOneOfSchema<O, S>> : Error<"'oneOf' property should be an array">;
declare type RecurseOnOneOfSchema<S extends L.List, P, R = never> = {
    stop: R;
    continue: RecurseOnOneOfSchema<L.Tail<S>, P, R | (HasKeyIn<P, "enum" | "const" | "type" | "anyOf"> extends true ? Intersection<ParseSchema<Omit<P, "oneOf">>, ParseSchema<MergeSubSchema<Omit<P, "oneOf">, L.Head<S>>>> : ParseSchema<Merge<Omit<P, "oneOf">, RemoveInvalidAdditionalItems<L.Head<S>>>>)>;
}[S extends [any, ...L.List] ? "continue" : "stop"];

declare type ParseAllOfSchema<S> = RecurseOnAllOfSchema<Get<S, "allOf">, S, HasKeyIn<S, "enum" | "const" | "type" | "anyOf" | "oneOf"> extends true ? ParseSchema<Omit<S, "allOf">> : Any>;
declare type RecurseOnAllOfSchema<V, S, R> = {
    stop: R;
    continue: V extends L.List ? RecurseOnAllOfSchema<L.Tail<V>, S, Intersection<ParseSchema<MergeSubSchema<Omit<S, "allOf">, L.Head<V>>>, R>> : never;
}[V extends [any, ...L.List] ? "continue" : "stop"];

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

declare type JSONSchema = JSONSchema6Definition | boolean | O.Readonly<Exclude<JSONSchema6DefinitionWithoutInterface, boolean>, A.Key, "deep">;
declare type FromSchema<S extends JSONSchema> = Resolve<ParseSchema<S extends object ? O.Writable<S, A.Key, "deep"> : S>>;

export { FromSchema, JSONSchema };
