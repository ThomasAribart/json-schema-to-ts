import { IsObject } from "./extends";

/**
 * Merge two types `A` and `B`:
 * - Returns `B` if `A` and `B` are not both objects
 * - Merge `A` and `B` properties if both are objects
 * - Merging is not recursive: Properties of `B` erase properties of `A`
 *
 * @param A Type
 * @param B Type
 * @return Type
 */
export type Merge<A, B> = IsObject<A> extends true
  ? IsObject<B> extends true
    ? {
        [K in keyof A | keyof B]: K extends keyof B
          ? B[K]
          : K extends keyof A
          ? A[K]
          : never;
      }
    : B
  : B;
