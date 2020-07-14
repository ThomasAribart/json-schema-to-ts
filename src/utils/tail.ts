export type Tail<T extends any[]> = ((...args: T) => void) extends (
  head: any,
  ...tail: infer R
) => void
  ? R
  : T;
