import type { L } from "ts-toolbelt";

import type { Writable } from "./type-utils";
import type {
  JSONSchema7,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
  DeserializationPattern,
} from "./definitions";
import type { JSONSchema7Reference } from "./index";

export type ParseReferences<
  S extends JSONSchema7Reference[],
  R extends Record<string, JSONSchema7> = {}
> = {
  continue: ParseReferences<
    L.Tail<S>,
    R & { [key in L.Head<S>["$id"]]: Writable<L.Head<S>> }
  >;
  stop: R;
}[S extends [any, ...any[]] ? "continue" : "stop"];

export type ParseOptions<S extends JSONSchema7, O extends FromSchemaOptions> = {
  parseNotKeyword: O["parseNotKeyword"] extends boolean
    ? O["parseNotKeyword"]
    : FromSchemaDefaultOptions["parseNotKeyword"];
  parseIfThenElseKeywords: O["parseIfThenElseKeywords"] extends boolean
    ? O["parseIfThenElseKeywords"]
    : FromSchemaDefaultOptions["parseIfThenElseKeywords"];
  rootSchema: S;
  references: O["references"] extends JSONSchema7Reference[]
    ? ParseReferences<O["references"]>
    : {};
  deserialize: O["deserialize"] extends DeserializationPattern[] | false
    ? O["deserialize"]
    : FromSchemaDefaultOptions["deserialize"];
};
