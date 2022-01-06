import Ajv from "ajv";

import { FromSchema, JSONSchema } from "index";

var ajv = new Ajv();

const guard = <S extends JSONSchema>(schema:S) => {
  return ajv.compile(schema) as (t: unknown) => t is FromSchema<S>
}
const check = <S extends JSONSchema>(schema:S) => {
  const validator = guard(schema)
  return (value: unknown) => {
    if (validator(value)) {
      return value
    } else {
      const text = ajv.errorsText()
      throw new Error(text)
    }
  }
}

describe("Branded String schemas", () => {
  const stringSchema = { type: "string", 'x-brand': 'MyString' } as const;
  type String = FromSchema<typeof stringSchema>;
  const stringChecker = check(stringSchema)

  const anotherStringSchema = { type: "string", 'x-brand': 'AnotherString' } as const;
  type AnotherString = FromSchema<typeof anotherStringSchema>;
  const anotherStringChecker = check(anotherStringSchema)

  it("rejects string value at compile time", () => {
    // @ts-expect-error
    const stringInstance : String = "apples";
    expect(ajv.validate(stringSchema, stringInstance)).toBe(true);
  });

  it("rejects other values at compile time (number)", () => {
    // @ts-expect-error
    const stringInstance : String = 42;
    expect(ajv.validate(stringSchema, stringInstance)).toBe(false);
  });

  it("rejects other values at compile time (object)", () => {
    // @ts-expect-error
    const stringInstance : String = {};
    expect(ajv.validate(stringSchema, stringInstance)).toBe(false);
  });

  it("accepts a checked value (string)", () => {
    const stringInstance : String = stringChecker("apples");
    expect(ajv.validate(stringSchema, stringInstance)).toBe(true);
  });

  it("accepts a checked value (branded string)", () => {
    const stringInstance : String = stringChecker("apples");
    const anotherStringInstance : AnotherString = anotherStringChecker(stringInstance)
    expect(ajv.validate(anotherStringSchema, anotherStringInstance)).toBe(true);
  });

  it("rejects other checked values at runtime (number)", () => {
    expect( () => {
      // will throw
      const stringInstance : String = stringChecker(42);
      return stringInstance;
    }).toThrow();
  });

  it("rejects other checked values at runtime (object)", () => {
    expect( () => {
      // will throw
      const stringInstance : String = stringChecker({});
      return stringInstance;
    }).toThrow();
  });

  it("rejects cross-branding values", () => {
    const stringInstance : String = stringChecker("apples");
    // @ts-expect-error
    const anotherStringInstance : AnotherString = stringInstance
    expect(ajv.validate(anotherStringSchema, anotherStringInstance)).toBe(true);
  });

  const deepSchema = { type: "object", required: [ 'thisString'], properties: { thisString: stringSchema }  }as const;
  type Deep = FromSchema<typeof deepSchema>;
  const deepChecker = check(deepSchema)

  it("accepts deep type", () => {
    const deepInstance : Deep = deepChecker({ thisString: "apples" });
    const stringInstance : String = deepInstance.thisString;
    // @ts-expect-error
    const anotherStringInstance : AnotherString = deepInstance.thisString;
    expect(ajv.validate(stringSchema, stringInstance)).toBe(true);
    expect(ajv.validate(anotherStringSchema, anotherStringInstance)).toBe(true);
  })

});
