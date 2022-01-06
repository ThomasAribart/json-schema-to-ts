import { Get } from "../utils";

export type PrimitiveType = "primitive";
export type BrandedPrimitiveType = "brandedPrimitive";

export type Primitive<L> = {
  type: PrimitiveType;
  value: L;
};

export declare const BrandName: unique symbol;

export interface Branded<B> {
  [BrandName]: B;
}

export type BrandedPrimitive<L,B> = {
  type: BrandedPrimitiveType;
  value: L;
  brand: B;
}

export type Value<L> = Get<L, "value">;

export type ResolvePrimitive<T> = Get<T, "value">;
export type ResolveBrandedPrimitive<T> = Get<T, "value"> & Branded<Get<T, "brand">>;
