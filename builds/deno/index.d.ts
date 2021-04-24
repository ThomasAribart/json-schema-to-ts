import { JSONSchema6Definition } from "https://cdn.skypack.dev/@types/json-schema@^7.0.6?dts";
import { JSONSchema6DefinitionWithoutInterface } from "./definitions/index.d.ts";
import { Resolve } from "./meta-types/index.d.ts";
import { ParseSchema } from "./parse-schema/index.d.ts";
import { DeepWriteable, DeepReadonly } from "./utils/index.d.ts";
/**
 * Unwided JSON schema (e.g. defined with the `as const` statement)
 */
export declare type JSONSchema = JSONSchema6Definition | DeepReadonly<JSONSchema6DefinitionWithoutInterface>;
/**
 * Given a JSON schema defined with the `as const` statement, infers the type of valid instances
 *
 * @param S JSON schema
 */
export declare type FromSchema<S extends JSONSchema> = Resolve<ParseSchema<DeepWriteable<S>>>;
