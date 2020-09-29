<img src="assets/header-round-medium.png" width="100%" align="center" />

<p align="right">
  <i>If you use this repo, star it ✨</i>
</p>

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

## FromSchema

The `FromSchema` method lets you infer TS types directly from JSON schemas:

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

type Dog = FromSchema<typeof dogSchema>;
// => Will infer the same type as above
```

Schemas can even be nested, as long as you don't forget the `as const` statement:

```typescript
const catSchema = { ... } as const;

const petSchema = {
  anyOf: [dogSchema, catSchema],
} as const;

type Pet = FromSchema<typeof petSchema>;
// => Will work 🙌
```

> The `as const` statement is used so that TypeScript takes the schema definition to the word (e.g. _true_ is interpreted as the _true_ constant and not widened as _boolean_). It is pure TypeScript and has zero impact on the compiled code.

## Why use `json-schema-to-ts`?

If you're looking for runtime validation with added types, libraries like [yup](https://github.com/jquense/yup), [zod](https://github.com/vriad/zod) or [runtypes](https://github.com/pelotom/runtypes) may suit your needs while being easier to use!

On the other hand, JSON schemas have the benefit of being widely used, more versatile and reusable (swaggers, APIaaS...).

If you prefer to stick to them and can define your schemas in TS instead of JSON (importing JSONs `as const` is not available yet), then `json-schema-to-ts` is made for you:

- 🙅‍♂️ **No dependency**
- ✨ **No impact on compiled code**: `json-schema-to-ts` only operates in type space. And after all, what's lighter than a dev-dependency?
- 🍸 **DRYness**: Less code means less embarrassing typos
- 🤝 **Consistency**: See that `string` that you used instead of an `enum`? Or this `additionalProperties` you confused with `additionalItems`? Or forgot entirely? Well, `json-schema-to-ts` does!
- 🔧 **Reliability**: `FromSchema` is extensively tested against [AJV](https://github.com/ajv-validator/ajv), and covers all the use cases that can be handled by TS for now\*
- 🏋️‍♂️ **Help on complex schemas**: Get complex schemas right first time with instantaneous typing feedbacks! For instance, it's not obvious the following schema can never be validated:

```typescript
const addressSchema = {
  type: "object",
  allOf: [
    {
      properties: {
        street: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
      },
      required: ["street", "city", "state"],
    },
    {
      properties: {
        type: { enum: ["residential", "business"] },
      },
    },
  ],
  additionalProperties: false,
} as const;
```

But it is with `FromSchema`!

```typescript
type Address = FromSchema<typeof addressSchema>;
// => never 🙌
```

> \*If `json-schema-to-ts` misses one of your use case, feel free to [open an issue](https://github.com/ThomasAribart/json-schema-to-ts/issues) 🤗

## Table of content

- [Installation](#installation)
- [Use cases](#use-cases)
  - [Const](#const)
  - [Enums](#enums)
  - [Primitive types](#primitive-types)
  - [Arrays](#arrays)
  - [Tuples](#tuples)
  - [Objects](#objects)
- [Combining schemas](#combining-schemas)
  - [AnyOf](#anyof)
  - [AllOf](#allof)
  - [OneOf](#oneof)
  - [Not and If-Then-Else](#not-and-if-then-else)

## Installation

```bash
# npm
npm install --save-dev json-schema-to-ts

# yarn
yarn add --dev json-schema-to-ts
```

> `json-schema-to-ts` requires TypeScript 3.3+. Activating `strictNullChecks` or using `strict` mode is recommended.

## Use cases

### Const

```typescript
const fooSchema = {
  const: "foo",
} as const;

type Foo = FromSchema<typeof fooSchema>;
// => "foo"
```

### Enums

```typescript
const enumSchema = {
  enum: [true, 42, { foo: "bar" }],
} as const;

type Enum = FromSchema<typeof enumSchema>;
// => true | 42 | { foo: "bar"}
```

You can also go full circle with typescript `enums`.

```typescript
enum Food {
  Pizza = "pizza",
  Taco = "taco",
  Fries = "fries",
}

const enumSchema = {
  enum: Object.values(Food),
} as const;

type Enum = FromSchema<typeof enumSchema>;
// => Food
```

### Primitive types

```typescript
const primitiveTypeSchema = {
  type: "null", // "boolean", "string", "integer", "number"
} as const;

type PrimitiveType = FromSchema<typeof primitiveTypeSchema>;
// => null, boolean, string or number
```

```typescript
const primitiveTypesSchema = {
  type: ["null", "string"],
} as const;

type PrimitiveTypes = FromSchema<typeof primitiveTypesSchema>;
// => null | string
```

> For more complex types, refinment keywords like `required` or `additionalItems` will apply 🙌

### Arrays

```typescript
const arraySchema = {
  type: "array",
  items: { type: "string" },
} as const;

type Array = FromSchema<typeof arraySchema>;
// => string[]
```

### Tuples

```typescript
const tupleSchema = {
  type: "array",
  items: [{ type: "boolean" }, { type: "string" }],
} as const;

type Tuple = FromSchema<typeof tupleSchema>;
// => [] | [boolean] | [boolean, string] | [boolean, string, ...unknown[]]
```

`FromSchema` supports the `additionalItems` keyword:

```typescript
const tupleSchema = {
  type: "array",
  items: [{ type: "boolean" }, { type: "string" }],
  additionalItems: false,
} as const;

type Tuple = FromSchema<typeof tupleSchema>;
// => [] | [boolean] | [boolean, string]
```

```typescript
const tupleSchema = {
  type: "array",
  items: [{ type: "boolean" }, { type: "string" }],
  additionalItems: { type: "number" },
} as const;

type Tuple = FromSchema<typeof tupleSchema>;
// => [] | [boolean] | [boolean, string] | [boolean, string, ...number[]]
```

...as well as the `minItems` and `maxItems` keywords:

```typescript
const tupleSchema = {
  type: "array",
  items: [{ type: "boolean" }, { type: "string" }],
  minItems: 1,
  maxItems: 2,
} as const;

type Tuple = FromSchema<typeof tupleSchema>;
// => [boolean] | [boolean, string]
```

> Additional items will only work if Typescript's `strictNullChecks` option is activated

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

type Object = FromSchema<typeof objectSchema>;
// => { [x: string]: unknown; foo: string; bar?: number; }
```

`FromSchema` partially supports the `additionalProperties` and `patternProperties` keywords:

- `additionalProperties` can be used to deny additional items.

```typescript
const closedObjectSchema = {
  ...objectSchema,
  additionalProperties: false,
} as const;

type Object = FromSchema<typeof closedObjectSchema>;
// => { foo: string; bar?: number; }
```

- Used on their own, `additionalProperties` and/or `patternProperties` can be used to type unnamed properties.

```typescript
const openObjectSchema = {
  type: "object",
  additionalProperties: {
    type: "boolean",
  },
  patternProperties: {
    "^S": { type: "string" },
    "^I": { type: "integer" },
  },
} as const;

type Object = FromSchema<typeof openObjectSchema>;
// => { [x: string]: string | number | boolean }
```

- However, when used in combination with the `properties` keyword, extra properties will always be typed as `unknown` to avoid conflicts.

## Combining schemas

### AnyOf

```typescript
const anyOfSchema = {
  anyOf: [
    { type: "string" },
    {
      type: "array",
      items: { type: "string" },
    },
  ],
} as const;

type AnyOf = FromSchema<typeof anyOfSchema>;
// => string | string[]
```

`FromSchema` will correctly infer factored schemas:

```typescript
const factoredSchema = {
  type: "object",
  properties: {
    bool: { type: "boolean" },
  },
  required: ["bool"],
  anyOf: [
    {
      properties: {
        str: { type: "string" },
      },
      required: ["str"],
    },
    {
      properties: {
        num: { type: "number" },
      },
    },
  ],
} as const;

type Factored = FromSchema<typeof factoredSchema>;
// => {
//  [x:string]: unknown;
//  bool: boolean;
//  str: string;
// } | {
//  [x:string]: unknown;
//  bool: boolean;
//  num?: number;
// }
```

### OneOf

Because TypeScript misses [refinment types](https://en.wikipedia.org/wiki/Refinement_type), `FromSchema` will use the `oneOf` keyword in the same way as `anyOf`:

```typescript
const catSchema = {
  type: "object",
  oneOf: [
    {
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
    {
      properties: {
        color: { enum: ["black", "brown", "white"] },
      },
    },
  ],
} as const;

type Cat = FromSchema<typeof catSchema>;
// => {
//  [x: string]: unknown;
//  name: string;
// } | {
//  [x: string]: unknown;
//  color?: "black" | "brown" | "white";
// }

// => FromSchema will not detect the following invalid obj 😱
const invalidCat: Cat = { name: "Garfield" };
```

### AllOf

```typescript
const addressSchema = {
  type: "object",
  allOf: [
    {
      properties: {
        address: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
      },
      required: ["address", "city", "state"],
    },
    {
      properties: {
        type: { enum: ["residential", "business"] },
      },
    },
  ],
} as const;

type Address = FromSchema<typeof addressSchema>;
// => {
//   [x: string]: unknown;
//   address: string;
//   city: string;
//   state: string;
//   type?: "residential" | "business";
// }
```

### Not and If-Then-Else

For the same reason as `oneOf` (missing refinment types), I feel like implementing the `not` and the `if/then/else` keywords in `FromSchema` would lead into a rabbit hole...

But I may be wrong! If you think that it can be implemented, feel free to [open an issue](https://github.com/ThomasAribart/json-schema-to-ts/issues) 🤗
