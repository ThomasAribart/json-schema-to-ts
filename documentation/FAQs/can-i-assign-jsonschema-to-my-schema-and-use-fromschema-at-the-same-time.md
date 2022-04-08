# Can I assign `JSONSchema` to my schema and use `FromSchema` at the same time?

`json-schema-to-ts` exports a `JSONSchema` type to help you write schemas:

```typescript
import { FromSchema, JSONSchema } from "json-schema-to-ts";

const dogSchema: JSONSchema = { ... } as const;

type Dog = FromSchema<typeof dogSchema>;
```

However, this example will **not** work 🙅‍♂️

`FromSchema` is based on type computations. By design, it only works on "good enough" material, i.e. _narrow_ types (`{ type: "string" }`) and NOT _widened_ ones (`{ type: string }` which can also represent `{ type: "number" }`). For the compiler, assigning `JSONSchema` to your schema "blurs" its type to pretty much the **widest possible schema type** 😅 That's why in this example, `Dog` will be equal to the `unknown` type.

So there is a sort of Heiseinberg's uncertainty principle at play here: You can either use `FromSchema` or `JSONSchema`, but not both at the same time.

The correct way to use them is the following:

- Define a schema with the `as const` statement
- Assign the `JSONSchema` type to it (allowing autocompletion and precise error highlighting)
- Write the schema
- Remove the type assignment
- Use `FromSchema` 🙌
