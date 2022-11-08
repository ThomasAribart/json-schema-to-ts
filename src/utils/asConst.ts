import type { Narrow } from "~/type-utils";

/**
 * Returns the input parameter without muting it, but narrowing its inferred type.
 *
 * _(Similar to using the_ `as const` _statement functionnally)_
 *
 * ```ts
 * const object = { foo: "bar" }
 * // { foo: string }
 *
 * const narrowedObject = asConst({ foo: "bar "})
 * // => { foo: "bar" }
 * ```
 */
export const asConst = <A>(narrowed: Narrow<A>): Narrow<A> => narrowed;
