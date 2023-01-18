import type { M } from "ts-algebra";

import type { JSONSchema7, DeserializationPattern } from "~/definitions";

import type { ParseSchemaOptions } from "./index";

export type DeserializeSchema<
  S extends JSONSchema7,
  O extends Omit<ParseSchemaOptions, "deserialize"> & {
    deserialize: DeserializationPattern[];
  },
> = RecurseOnDeserializationPatterns<S, O["deserialize"]>;

type RecurseOnDeserializationPatterns<
  S extends JSONSchema7,
  P extends DeserializationPattern[],
  R = M.Any,
> = P extends [infer H, ...infer T]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends DeserializationPattern
    ? T extends DeserializationPattern[]
      ? RecurseOnDeserializationPatterns<
          S,
          T,
          S extends H["pattern"] ? M.$Intersect<M.Any<true, H["output"]>, R> : R
        >
      : never
    : never
  : R;
