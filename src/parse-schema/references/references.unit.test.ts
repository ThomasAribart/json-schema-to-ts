import { A } from "ts-toolbelt";

import { FromSchema } from "index";

import { ajv } from "../ajv.util.test";

describe("References", () => {
  const definitionsSchema = {
    $id: "http://example.com/schemas/defs.json",
    definitions: {
      int: { type: "integer" },
      str: { type: "string" },
    },
  } as const;

  ajv.addSchema(definitionsSchema);

  const personSchemaReference = {
    $id: "http://example.com/schemas/person.json",
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "integer" },
    },
    required: ["name"],
    additionalProperties: false,
  } as const;

  type ExpectedPerson = { age?: number | undefined; name: string };

  ajv.addSchema(personSchemaReference);

  describe("Default case", () => {
    const userSchema = {
      $ref: "http://example.com/schemas/person.json",
    } as const;

    type User = FromSchema<
      typeof userSchema,
      { references: [typeof personSchemaReference] }
    >;
    let userInstance: User;

    const assertUser: A.Equals<User, ExpectedPerson> = 1;
    assertUser;

    it("accepts a valid user", () => {
      userInstance = { name: "Ryan Gosling", age: 42 };
      expect(ajv.validate(userSchema, userInstance)).toBe(true);
    });

    it("rejects an invalid person", () => {
      // @ts-expect-error
      userInstance = { name: 42, age: "42" };
      expect(ajv.validate(userSchema, userInstance)).toBe(false);
    });
  });

  describe("Re-using domain", () => {
    const userSchema = {
      $id: "http://example.com/schemas/user.json",
      $ref: "person.json",
    } as const;

    type User = FromSchema<
      typeof userSchema,
      { references: [typeof personSchemaReference] }
    >;
    let userInstance: User;

    const assertUser: A.Equals<User, ExpectedPerson> = 1;
    assertUser;

    it("accepts a valid user", () => {
      userInstance = { name: "Ryan Gosling", age: 42 };
      expect(ajv.validate(userSchema, userInstance)).toBe(true);
    });

    it("rejects an invalid person", () => {
      // @ts-expect-error
      userInstance = { name: 42, age: "42" };
      expect(ajv.validate(userSchema, userInstance)).toBe(false);
    });
  });

  describe("Accessing nested property (absolute path)", () => {
    const userSchema = {
      type: "object",
      properties: {
        name: { $ref: "http://example.com/schemas/defs.json#/definitions/str" },
        age: { $ref: "http://example.com/schemas/defs.json#/definitions/int" },
      },
      required: ["name"],
      additionalProperties: false,
    } as const;

    type User = FromSchema<
      typeof userSchema,
      { references: [typeof definitionsSchema] }
    >;
    let userInstance: User;

    const assertUser: A.Equals<User, ExpectedPerson> = 1;
    assertUser;

    it("accepts a valid user", () => {
      userInstance = { name: "Ryan Gosling", age: 42 };
      expect(ajv.validate(userSchema, userInstance)).toBe(true);
    });

    it("rejects an invalid person", () => {
      // @ts-expect-error
      userInstance = { name: 42, age: "42" };
      expect(ajv.validate(userSchema, userInstance)).toBe(false);
    });
  });

  describe("Accessing nested property (relative path)", () => {
    const userSchema = {
      $id: "http://example.com/schemas/nested-user.json",
      type: "object",
      properties: {
        name: { $ref: "defs.json#/definitions/str" },
        age: { $ref: "defs.json#/definitions/int" },
      },
      required: ["name"],
      additionalProperties: false,
    } as const;

    type User = FromSchema<
      typeof userSchema,
      { references: [typeof definitionsSchema] }
    >;
    let userInstance: User;

    const assertUser: A.Equals<User, ExpectedPerson> = 1;
    assertUser;

    it("accepts a valid user", () => {
      userInstance = { name: "Ryan Gosling", age: 42 };
      expect(ajv.validate(userSchema, userInstance)).toBe(true);
    });

    it("rejects an invalid person", () => {
      // @ts-expect-error
      userInstance = { name: 42, age: "42" };
      expect(ajv.validate(userSchema, userInstance)).toBe(false);
    });
  });

  describe("Along definition", () => {
    const userSchema = {
      $id: "http://example.com/schemas/definitions-user.json",
      type: "object",
      properties: {
        name: { $ref: "defs.json#/definitions/str" },
        age: { $ref: "#/$defs/int" },
      },
      required: ["name"],
      additionalProperties: false,
      $defs: {
        int: { type: "number" },
      },
    } as const;

    type User = FromSchema<
      typeof userSchema,
      { references: [typeof definitionsSchema] }
    >;
    let userInstance: User;

    const assertUser: A.Equals<User, ExpectedPerson> = 1;
    assertUser;

    it("accepts a valid user", () => {
      userInstance = { name: "Ryan Gosling", age: 42 };
      expect(ajv.validate(userSchema, userInstance)).toBe(true);
    });

    it("rejects an invalid person", () => {
      // @ts-expect-error
      userInstance = { name: 42, age: "42" };
      expect(ajv.validate(userSchema, userInstance)).toBe(false);
    });
  });

  describe("In combinaison with keywords", () => {
    const personWithAgeSchema = {
      $ref: "http://example.com/schemas/person.json",
      required: ["age"],
      additionalProperties: true,
    } as const;

    type PersonWithAge = FromSchema<
      typeof personWithAgeSchema,
      { references: [typeof personSchemaReference] }
    >;
    let personWithAgeInstance: PersonWithAge;

    const assertPersonWithAge: A.Equals<
      PersonWithAge,
      Required<ExpectedPerson>
    > = 1;
    assertPersonWithAge;

    it("rejects additional properties (both additionalProperties apply)", () => {
      personWithAgeInstance = {
        name: "judy",
        age: 42,
        // @ts-expect-error
        additionalProp: true,
      };
      expect(ajv.validate(personWithAgeSchema, personWithAgeInstance)).toBe(
        false
      );
    });

    it("rejects if firstName OR last name misses (both required apply)", () => {
      // @ts-expect-error
      personWithAgeInstance = { name: "judy" };
      expect(ajv.validate(personWithAgeSchema, personWithAgeInstance)).toBe(
        false
      );

      // @ts-expect-error
      personWithAgeInstance = { age: 42 };
      expect(ajv.validate(personWithAgeSchema, personWithAgeInstance)).toBe(
        false
      );
    });
  });

  describe("Refs using other refs", () => {
    const personWithAgeSchema = {
      $id: "http://example.com/schemas/person-with-age.json",
      $ref: "http://example.com/schemas/person.json",
      required: ["age"],
    } as const;

    const personWithAgeSchema2 = {
      $ref: "http://example.com/schemas/person-with-age.json",
    } as const;

    type PersonWithAge = FromSchema<
      typeof personWithAgeSchema2,
      { references: [typeof personSchemaReference, typeof personWithAgeSchema] }
    >;
    let personWithAgeInstance: PersonWithAge;

    const assertPersonWithAge: A.Equals<
      PersonWithAge,
      Required<ExpectedPerson>
    > = 1;
    assertPersonWithAge;

    ajv.addSchema(personWithAgeSchema);

    it("accepts a valid person", () => {
      personWithAgeInstance = { name: "judy", age: 42 };
      expect(ajv.validate(personWithAgeSchema2, personWithAgeInstance)).toBe(
        true
      );
    });

    it("rejects an invalid person", () => {
      personWithAgeInstance = {
        name: "judy",
        // @ts-expect-error
        age: true,
      };
      expect(ajv.validate(personWithAgeSchema2, personWithAgeInstance)).toBe(
        false
      );
    });
  });
});
