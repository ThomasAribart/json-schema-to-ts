import { JSONSchema6Definition, JSONSchema6 } from "json-schema";

import { Replace } from "../utils";

// JSONSchema6Definition uses interfaces in "const" and "enum" typing (I guess for the purpose of denying "undefined" types in "const" and "enums")
// However, specific interfaces CANNOT be saved into a more generic interface (see issue https://github.com/microsoft/TypeScript/issues/15300)
// This results in an error "Index signature is missing in type..." on valid JSON schemas when using FromSchema
// This fix replaces JSONSchema6Definition "const" and "enum" definitions by "unknown"
// It is not ideal, but it's the best thing to do at the moment
export type JSONSchema6DefinitionWithoutInterface = JSONSchema6Definition extends infer S
  ? S extends JSONSchema6
    ? Replace<S, "const" | "enum" | "not", unknown>
    : S
  : never;
