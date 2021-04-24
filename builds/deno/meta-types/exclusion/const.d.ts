import { Get, IsObject } from "../../utils/index.d.ts";
import { Resolve, MetaType, Never, Error } from "../index.d.ts";
import { Const, Value } from "../const.d.ts";
import { Values, Required, IsOpen, OpenProps } from "../object.d.ts";
import { IsRepresentable } from "../utils.d.ts";
import { Exclude } from "./index.d.ts";
import { ExcludeUnion } from "./union.d.ts";
import { ExcludeIntersection } from "./intersection.d.ts";
import { ExcludeExclusion } from "./exclusion.d.ts";
export declare type ExcludeFromConst<Source, Excluded> = {
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
declare type CheckNotExtendsResolved<Source, Excluded> = Value<Source> extends Resolve<Excluded> ? Never : Source;
declare type ExcludeObject<Source, Excluded> = IsObject<Value<Source>> extends true ? Required<Source> extends keyof Value<Source> ? ExcludeObjectFromConst<Source, Excluded> : Source : Source;
declare type ExcludeObjectFromConst<Source, Excluded, ExcludedValues = ExcludeConstValues<Value<Source>, Excluded>> = RepresentableKeys<ExcludedValues> extends never ? Never : Source;
declare type ExcludeConstValues<SourceValue, Excluded> = {
    [key in keyof SourceValue]: key extends keyof Values<Excluded> ? Exclude<Const<SourceValue[key]>, Values<Excluded>[key]> : IsOpen<Excluded> extends true ? Exclude<Const<SourceValue[key]>, OpenProps<Excluded>> : SourceValue[key];
};
declare type RepresentableKeys<O> = {
    [key in keyof O]: IsRepresentable<O[key]> extends true ? key : never;
}[keyof O];
export {};
