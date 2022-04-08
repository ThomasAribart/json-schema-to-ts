# Does `json-schema-to-ts` work on _.json_ file schemas?

Sadly, no 😭

`FromSchema` is based on type computations. By design, it only works on "good enough" material, i.e. _narrow_ types (`{ type: "string" }`) and NOT _widened_ ones (`{ type: string }` which can also represent `{ type: "number" }`). However, JSON imports are **widened by default**. This is native TS behavior, there's no changing that.

If you really want use _.json_ files, you can start by [upvoting this feature request to implement _.json_ imports `as const`](https://github.com/microsoft/TypeScript/issues/32063) on the official repo 🙂 AND you can always cast imported schemas as their narrow types:

```json
// dog.json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" },
    "hobbies": { "type": "array", "items": { "type": "string" } },
    "favoriteFood": { "enum": ["pizza", "taco", "fries"] }
  },
  "required": ["name", "age"]
}
```

```typescript
import { FromSchema } from "json-schema-to-ts";

import dogRawSchema from "./dog.json";

const dogSchema = dogRawSchema as {
  type: "object";
  properties: {
    name: { type: "string" };
    age: { type: "integer" };
    hobbies: { type: "array"; items: { type: "string" } };
    favoriteFood: { enum: ["pizza", "taco", "fries"] };
  };
  required: ["name", "age"];
};

type Dog = FromSchema<typeof dogSchema>;
// => Will work 🙌
```

It is technically code duplication, BUT TS will throw an errow if the narrow and widened types don't sufficiently overlap, which allows for partial type safety (roughly, everything but the object "leafs"). In particular, this will work well on object properties names, as object keys are not widened by default.

```typescript
import { FromSchema } from "json-schema-to-ts";

import dogRawSchema from "./dog.json";

const dogSchema = dogoRawSchema as {
  type: "object";
  properties: {
    name: { type: "number" }; // "number" instead of "string" will go undetected...
    years: { type: "integer" }; // ...but "years" instead of "age" will not 🙌
    hobbies: { type: "array"; items: { type: "string" } };
    favoriteFood: { const: "pizza" }; // ..."const" instead of "enum" as well 🙌
  };
  required: ["name", "age"];
};
```
