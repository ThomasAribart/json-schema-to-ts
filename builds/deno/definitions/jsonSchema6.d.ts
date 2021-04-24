import { JSONSchema6Definition, JSONSchema6 } from "https://cdn.skypack.dev/@types/json-schema@^7.0.6?dts";
import { Replace } from "../utils/index.d.ts";
export declare type JSONSchema6DefinitionWithoutInterface = JSONSchema6Definition extends infer S ? S extends JSONSchema6 ? Replace<S, "const" | "enum" | "not", unknown> : S : never;
