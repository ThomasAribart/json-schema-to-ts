import type { Narrow } from "~/type-utils";

/**
 * Returns the input parameter without muting it, but narrowing its inferred type. Similar to using the `as const` statement functionnally.
 * @param input Input
 * @returns Input, narrowly typed
 *
 * ```ts
 * const object = { foo: "bar" }
 * // { foo: string }
 *
 * const narrowedObject = asConst({ foo: "bar "})
 * // => { foo: "bar" }
 * ```
 */
export const asConst = <INPUT>(input: Narrow<INPUT>): Narrow<INPUT> => input;
