# I get a `type instantiation is excessively deep and potentially infinite` error, what should I do ?

Though it is rare, the TS compiler can sometimes raises this error when detecting long type computations, and potential infinite loops.

`FromSchema` goes through some pretty wild type recursions, so this is can be an issue on large schemas, particularly when using intersections (`allOf`) and exclusions (`not`, `else`).

I am working on simplifying the type computations. But for the moment, I don't have any better solution to give you other than ignoring the error with a `@ts-ignore` comment. If the type computation is not aborted (i.e. you do not get an `any` type), the inferred type should still be valid. Otherwise, try opting out of exclusions first (`not`, `ifThenElse` keywords).

If you're still having troubles, feel free to open an issue.
