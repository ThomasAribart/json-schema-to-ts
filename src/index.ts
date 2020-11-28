import { JSONSchema6Definition } from "json-schema";

import { JSONSchema6DefinitionWithoutInterface } from "./definitions";
import { Resolve } from "./meta-types";
import { ParseSchema } from "./parse-schema";
import { WriteableRec, ReadonlyRec } from "./utils";

/**
 * Given a JSON schema defined with the `as const` statement, infers the type of valid instances
 *
 * @param S JSON schema
 */
export type FromSchema<
  S extends
    | JSONSchema6Definition
    | ReadonlyRec<JSONSchema6DefinitionWithoutInterface>
> = Resolve<ParseSchema<WriteableRec<S>>>;
