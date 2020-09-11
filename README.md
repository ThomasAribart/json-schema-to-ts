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
const catSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "integer" },
    favoriteThings: { enum: ["playing", "sleeping", "moreSleeping"] },
  },
  required: ["name", "age"],
} as const;

const petSchema = {
  anyOf: [dogSchema, catSchema],
} as const;

type Pet = FromSchema<typeof petSchema>;
// => Will work 🙌
```

> The `as const` statement is used so that TypeScript takes the schema definition to the word (e.g. _true_ is interpreted as the _true_ constant and not widened as _boolean_). It is pure TypeScript and has zero impact on the compiled code.

# Docs

## Installation

```bash
# npm
npm install --save-dev json-schema-to-ts

# yarn
yarn add --dev json-schema-to-ts
```

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
  Fries = "Fries",
}

const enumSchema = {
  enum: Object.values(Food),
} as const;

type Enum = FromSchema<typeof enumSchema>;
// => Food
```

### Litterals

```typescript
const litteralSchema = {
  type: "null", // "boolean", "string", "integer", "number"
} as const;

type Litteral = FromSchema<typeof litteralSchema>;
// => null, boolean, string or number
```

```typescript
const litteralsSchema = {
  type: ["null", "string"],
} as const;

type Litterals = FromSchema<typeof litteralsSchema>;
// => null | string
```

(For `object` and `array` types, properties like `required` or `additionalItems` will work 🙌)

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

`FromSchema` supports the `additionalItems` specifications:

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

...as well as the `minItems` and `maxItems` specifications:

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

`FromSchema` partially supports the `additionalProperties` and `patternProperties` specifications:

- `additionalProperties` can be used to deny additional items.

```typescript
const closedObjectSchema = {
  ...objectSchema,
  additionalProperties: false,
} as const;

type Object = FromSchema<typeof additionalPropertiesSchema>;
// => { foo: string; bar?: number; }
```

- Used on their own, `additionalProperties` and/or `patternProperties` can be used to type unnamed properties.

```typescript
const objectSchema = {
  type: "object",
  additionalProperties: {
    type: "boolean",
  },
  patternProperties: {
    "^S": { type: "string" },
    "^I": { type: "integer" },
  },
} as const;

type Object = FromSchema<typeof typedValuesSchema>;
// => { [x: string]: string | number | boolean }
```

- However, when used in combination with the `properties` keyword, extra properties will always be typed as `unknown` to avoid conflicts.

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

type AnyOf = FromSchema<typeof fooSchema>;
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

Because TypeScript doesn't have [refinment types](https://en.wikipedia.org/wiki/Refinement_type), `oneOf` will behave strictly the same as `anyOf`.

```typescript
const catSchema = {
  type: "object",
  oneOf: [
    { properties: { name: { type: "string" } }, required: ["name"] },
    { properties: { color: { enum: ["black", "brown", "white"] } } },
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

// => FromSchema cannot detect the following invalid obj 😱
const invalidCat: Cat = { name: "Garfield" };
```

### AllOf

...Coming soon 😃

### If/Else

...Coming soon 😃
