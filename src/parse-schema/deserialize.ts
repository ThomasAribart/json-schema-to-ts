import { M } from "ts-algebra";
import { L } from "ts-toolbelt";

import { JSONSchema7, DeserializationPattern } from "../definitions";

import { ParseSchemaOptions } from "./index";

export type DeserializeSchema<
  S extends JSONSchema7,
  O extends Omit<ParseSchemaOptions, "deserialize"> & {
    deserialize: DeserializationPattern[];
  }
> = RecurseOnDeserializationPatterns<S, O["deserialize"]>;

type RecurseOnDeserializationPatterns<
  S extends JSONSchema7,
  P extends DeserializationPattern[],
  R = M.Any
> = {
  stop: R;
  continue: RecurseOnDeserializationPatterns<
    S,
    L.Tail<P>,
    S extends L.Head<P>["pattern"]
      ? M.$Intersect<M.Any<true, L.Head<P>["output"]>, R>
      : R
  >;
}[P extends [any, ...any[]] ? "continue" : "stop"];
