import { Union, Primitive } from "../meta-types";
import { ParseSchema } from ".";

export type ParseNullableSchema<S> = Union<Primitive<null> | ParseSchema<S>>
