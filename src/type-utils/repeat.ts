/**
 * Builds a tuple type of length N where every element is T.
 * @param T - The type to repeat
 * @param N - The desired length (number literal)
 * @param ACC - Accumulator (internal)
 * @returns A tuple [T, T, ..., T] of length N
 */
export type Repeat<
  T,
  N extends number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ACC extends any[] = [],
> = ACC["length"] extends N ? ACC : Repeat<T, N, [...ACC, T]>;
