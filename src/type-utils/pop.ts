export type Pop<L extends unknown[]> = L extends
  | readonly [...infer LBody, unknown]
  | readonly [...infer LBody, unknown?]
  ? LBody
  : L;
