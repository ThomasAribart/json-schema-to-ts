import type { FromSchema } from "~/index";

import { ajv } from "../ajv.util.test";

describe("Definitions", () => {
  describe("Default case", () => {
    const personSchema = {
      type: "object",
      properties: {
        firstName: { $ref: "#/$defs/name" },
        lastName: { $ref: "#/$defs/name" },
      },
      required: ["firstName", "lastName"],
      additionalProperties: false,
      $defs: {
        name: {
          type: "string",
        },
      },
    } as const;

    type Person = FromSchema<typeof personSchema>;
    let personInstance: Person;

    it("accepts a valid person", () => {
      personInstance = { firstName: "judy", lastName: "foster" };
      expect(ajv.validate(personSchema, personInstance)).toBe(true);
    });

    it("rejects an invalid person", () => {
      // @ts-expect-error
      personInstance = { firstName: 42, lastName: true };
      expect(ajv.validate(personSchema, personInstance)).toBe(false);
    });
  });

  describe("Nested path", () => {
    const personSchema = {
      type: "object",
      properties: {
        firstName: { $ref: "#/definitions/user/properties/name" },
        lastName: { $ref: "#/definitions/user/properties/name" },
      },
      required: ["firstName", "lastName"],
      additionalProperties: false,
      definitions: {
        user: {
          type: "object",
          properties: {
            name: { type: "string" },
          },
        },
      },
    } as const;

    type Person = FromSchema<typeof personSchema>;

    let personInstance: Person;

    it("accepts a valid person", () => {
      personInstance = { firstName: "judy", lastName: "foster" };
      expect(ajv.validate(personSchema, personInstance)).toBe(true);
    });

    it("rejects an invalid person", () => {
      // @ts-expect-error
      personInstance = { firstName: 42, lastName: true };
      expect(ajv.validate(personSchema, personInstance)).toBe(false);
    });
  });

  describe("In combinaison with keywords", () => {
    const judySchema = {
      type: "object",
      properties: {
        judy: {
          $ref: "#/$defs/person",
          required: ["lastName"],
          additionalProperties: true,
        },
      },
      required: ["judy"],
      additionalProperties: false,
      $defs: {
        person: {
          type: "object",
          properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
          },
          required: ["firstName"],
          additionalProperties: false,
        },
      },
    } as const;

    type Judy = FromSchema<typeof judySchema>;
    let judyInstance: Judy;

    it("rejects additional properties (both additionalProperties apply)", () => {
      judyInstance = {
        judy: {
          firstName: "judy",
          lastName: "foster",
          // @ts-expect-error
          additionalProp: true,
        },
      };
      expect(ajv.validate(judySchema, judyInstance)).toBe(false);
    });

    it("rejects if firstName OR last name misses (both required apply)", () => {
      judyInstance = {
        // @ts-expect-error
        judy: { firstName: "judy" },
      };
      expect(ajv.validate(judySchema, judyInstance)).toBe(false);

      judyInstance = {
        // @ts-expect-error
        judy: { lastName: "foster" },
      };
      expect(ajv.validate(judySchema, judyInstance)).toBe(false);
    });
  });

  describe("Definitions using other definitions", () => {
    const judySchema = {
      type: "object",
      properties: {
        judy: { $ref: "#/$defs/person" },
      },
      required: ["judy"],
      additionalProperties: false,
      $defs: {
        name: { type: "string" },
        person: {
          type: "object",
          properties: {
            firstName: { $ref: "#/$defs/name" },
            lastName: { $ref: "#/$defs/name" },
          },
          additionalProperties: false,
        },
      },
    } as const;

    type Judy = FromSchema<typeof judySchema>;
    let judyInstance: Judy;

    it("accepts a valid person", () => {
      judyInstance = { judy: { firstName: "judy", lastName: "foster" } };
      expect(ajv.validate(judySchema, judyInstance)).toBe(true);
    });

    it("rejects an invalid person", () => {
      judyInstance = {
        judy: {
          firstName: "judy",
          // @ts-expect-error
          lastName: true,
        },
      };
      expect(ajv.validate(judySchema, judyInstance)).toBe(false);
    });
  });
});
