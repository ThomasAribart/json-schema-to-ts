import type { Pop } from "./pop";

/**
 * Same as `Split` but doesn't remove the last value in case the SEPARATOR is an empty string
 * @param STRING String
 * @param SEPARATOR String
 * @returns String[]
 */
type RecursiveSplit<
  STRING extends string,
  SEPARATOR extends string = "",
> = STRING extends `${infer BEFORE}${SEPARATOR}${infer AFTER}`
  ? [BEFORE, ...RecursiveSplit<AFTER, SEPARATOR>]
  : [STRING];

/**
 * Given a string and a separator, split the string into an array of sub-strings delimited by the separator.
 * @param STRING String
 * @param SEPARATOR String
 * @returns String[]
 */
export type Split<
  STRING extends string,
  SEPARATOR extends string = "",
  RESULT extends string[] = RecursiveSplit<STRING, SEPARATOR>,
> = SEPARATOR extends "" ? Pop<RESULT> : RESULT;
