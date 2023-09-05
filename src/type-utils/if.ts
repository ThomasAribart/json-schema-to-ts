/**
 * Return `THEN` if `CONDITION` extends `true`, `ELSE` otherwise
 * @param CONDITION Boolean
 * @param THEN Type
 * @param ELSE Type
 * @returns Type
 */
export type If<
  CONDITION extends boolean,
  THEN,
  ELSE = never,
> = CONDITION extends true ? THEN : ELSE;
