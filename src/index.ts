import { Resolve } from "./meta-types";
import { ParseSchema } from "./parse-schema";
import { Writeable } from "./utils";

/**
 * Given a JSON schema defined with the `as const` statement, infers the type of valid instances
 *
 * @param S JSON schema
 */
export type FromSchema<S> = Resolve<ParseSchema<Writeable<S>>>;
