import type {
  DeserializationPattern,
  FromSchemaDefaultOptions,
  FromSchemaOptions,
  JSONSchema7,
} from "./definitions";
import type { JSONSchema7Reference } from "./index";
import type { Writable } from "./type-utils";

export type ParseReferences<
  REF_SCHEMAS extends JSONSchema7Reference[],
  REFERENCES extends Record<string, JSONSchema7> = {},
> = REF_SCHEMAS extends [infer REF_SCHEMAS_HEAD, ...infer REF_SCHEMAS_TAIL]
  ? // TODO increase TS version and use "extends" in Array https://devblogs.microsoft.com/typescript/announcing-typescript-4-8/#improved-inference-for-infer-types-in-template-string-types
    REF_SCHEMAS_HEAD extends JSONSchema7Reference
    ? REF_SCHEMAS_TAIL extends JSONSchema7Reference[]
      ? ParseReferences<
          REF_SCHEMAS_TAIL,
          REFERENCES & {
            [key in REF_SCHEMAS_HEAD["$id"]]: Writable<REF_SCHEMAS_HEAD>;
          }
        >
      : never
    : never
  : REFERENCES;

export type ParseOptions<
  SCHEMA extends JSONSchema7,
  OPTIONS extends FromSchemaOptions,
> = {
  parseNotKeyword: OPTIONS["parseNotKeyword"] extends boolean
    ? OPTIONS["parseNotKeyword"]
    : FromSchemaDefaultOptions["parseNotKeyword"];
  parseIfThenElseKeywords: OPTIONS["parseIfThenElseKeywords"] extends boolean
    ? OPTIONS["parseIfThenElseKeywords"]
    : FromSchemaDefaultOptions["parseIfThenElseKeywords"];
  rootSchema: SCHEMA;
  references: OPTIONS["references"] extends JSONSchema7Reference[]
    ? ParseReferences<OPTIONS["references"]>
    : {};
  deserialize: OPTIONS["deserialize"] extends DeserializationPattern[] | false
    ? OPTIONS["deserialize"]
    : FromSchemaDefaultOptions["deserialize"];
};
