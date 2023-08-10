export type Not<CONDITION> = CONDITION extends false
  ? true
  : CONDITION extends true
  ? false
  : never;
