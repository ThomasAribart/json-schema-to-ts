import type {
  JSONSchema7,
  FromSchemaOptions,
  FromSchemaDefaultOptions,
  DeserializationPattern,
} from "./definitions";
import type { JSONSchema7Reference } from "./index";
import type { Writable } from "./type-utils";

export type ParseReferences<
  S extends JSONSchema7Reference[],
  R extends Record<string, JSONSchema7> = {},
> = S extends [infer H, ...infer T]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    H extends JSONSchema7Reference
    ? T extends JSONSchema7Reference[]
      ? ParseReferences<T, R & { [key in H["$id"]]: Writable<H> }>
      : never
    : never
  : R;

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
