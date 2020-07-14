export type Prepend<H, T extends any[]> = ((
  head: H,
  ...tail: T
) => void) extends (...tuple: infer R) => void
  ? R
  : never;
