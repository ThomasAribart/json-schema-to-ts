# Stop typing twice 🙅‍♂️

A lot of projects use JSON schemas for runtime data validation along with TypeScript for static type checking.

Their code may look like this:

```typescript
const dogSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
    hobbies: { type: "array", items: { type: "string" } },
    favoriteFood: { enum: ["pizza", "taco", "fries"] },
  },
  required: ["name", "age"],
};

type Dog = {
  name: string;
  age: number;
  hobbies?: string[];
  favoriteFood?: "pizza" | "taco" | "fries";
};
```

Both objects carry similar if not exactly the same information. This is a code duplication that can annoy developers and introduce bugs if not properly maintained.

That's when `json-schema-to-ts` comes to the rescue 💪

# FromSchema

The `FromSchema` method allows infering TS types directly from JSON schemas:

```typescript
import { FromSchema } from "json-schema-to-ts";

const dogSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
    hobbies: { type: "array", items: { type: "string" } },
    favoriteFood: { enum: ["pizza", "taco", "fries"] },
  },
  required: ["name", "age"],
} as const;

type Dog = FromSchema<typeof dogSchema>; // => Will infer the same type as above
```

Schemas can even be nested, as long as you don't forget the `as const` statement:

```typescript
const catSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
    favoriteThings: { enum: ["playing", "sleeping", "sleepingMore"] },
  },
  required: ["name", "age"],
} as const;

const petSchema = {
  anyOf: [dogSchema, catSchema],
} as const;

type Pet = FromSchema<typeof petSchema>; // => Will work 🙌
```

**Note**: The `as const` statement is used so that TypeScript takes the schema definition to the word (e.g. _true_ is interpreted as the _true_ constant and not as _boolean_). It is pure TypeScript and has zero impact on the compiled code.

# Docs

## Installation

```bash
# npm
npm install --save-dev json-schema-to-ts

# yarn
yarn add --dev json-schema-to-ts
```

## Use cases

### Litterals

```typescript
const litteralSchema = {
  type: "null", // "boolean", "string", "integer", "number"
} as const;

type Litteral = FromSchema<typeof litteralSchema>; // => null, boolean, string or number
```

### Objects

```typescript
const objectSchema = {
  type: "object",
  properties: {
    foo: { type: "string" },
    bar: { type: "number" },
  },
  required: ["foo"],
} as const;

type Object = FromSchema<typeof objectSchema>; // => { foo: string, bar?: number }
```

### Arrays

```typescript
const arraySchema = {
  type: "array",
  items: { type: "string" },
} as const;

type Array = FromSchema<typeof arraySchema>; // => string[]
```

### Tuples

```typescript
const tupleSchema = {
  type: "array",
  items: [{ type: "boolean" }, { type: "string" }],
} as const;

type Tuple = FromSchema<typeof tupleSchema>; // => [] | [boolean] | [boolean, string] | [boolean, string, ...any[]]
```

`FromSchema` supports the `additionalItems` keyword.

```typescript
const tupleSchema = {
  type: "array",
  items: [{ type: "boolean" }, { type: "string" }],
  additionalItems: false,
} as const;

type Tuple = FromSchema<typeof tupleSchema>; // => [] | [boolean] | [boolean, string]
const tupleInstance: Tuple = [true, "string", 42]; // => Will error ❌
```

### Const

```typescript
const fooSchema = {
  const: "foo",
} as const;

type Foo = FromSchema<typeof fooSchema>; // => "foo"
```

### Enums

```typescript
const enumSchema = {
  enum: [true, 42, { foo: "bar" }],
} as const;

type Enum = FromSchema<typeof enumSchema>; // => true | 42 | { foo: "bar"}
```

`enum` can be used concurrently with `type`.

```typescript
const enumSchema = {
  type: "string",
  enum: ["foo", "bar", { foo: "bar" }],
} as const;

type Enum = FromSchema<typeof enumSchema>; // => "foo" | "bar"
```

If used in concurrency with `const`, the `enum` keyword will be omitted.
