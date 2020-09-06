import { Get } from "../utils";

export type LitteralType = "litteral";

export type Litteral<L> = {
  type: "litteral";
  value: L;
};

export type Value<L> = Get<L, "value">;

export type ResolveLitteral<T> = Get<T, "value">;
