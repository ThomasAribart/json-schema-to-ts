import Ajv from "ajv";

import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import * as instances from "./instances";
import { expectInstances } from "./helpers";

var ajv = new Ajv();

describe("object schema", () => {
  describe("with specified properties", () => {
    it("without required", () => {
      const catSchema = {
        type: "object",
        properties: { age: { type: "number" }, name: { type: "string" } },
      } as const;

      type Cat = FromSchema<typeof catSchema>;

      let assertCat: DoesBothExtend<Cat, { age?: number; name?: string }>;
      assertCat = true;

      let catInstance: Cat;
      catInstance = {};
      expect(ajv.validate(catSchema, catInstance)).toBe(true);

      catInstance = instances.object1;
      expect(ajv.validate(catSchema, catInstance)).toBe(true);

      catInstance = instances.object2;
      expect(ajv.validate(catSchema, catInstance)).toBe(true);

      expectInstances
        .allExcept([
          "object1",
          "object2",
          "object3",
          "object4",
          "object5",
          "object6",
          "object7",
        ])
        .toBeInvalidAgainst(catSchema);
    });

    it("with required", () => {
      const dogSchema = {
        type: "object",
        properties: {
          age: { type: "number" },
          name: { type: "string" },
          hobbies: {
            type: "array",
            items: { type: "string" },
          },
          other: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
              },
              required: ["title"],
            },
          },
        },
        required: ["name", "age", "hobbies"],
      } as const;

      type Dog = FromSchema<typeof dogSchema>;

      let assertDog: DoesBothExtend<
        Dog,
        {
          name: string;
          age: number;
          hobbies: string[];
          other?: {
            title: string;
            description?: string;
          }[];
        }
      >;
      assertDog = true;

      let dogInstance: Dog;
      dogInstance = instances.object3;
      expect(ajv.validate(dogSchema, dogInstance)).toBe(true);

      dogInstance = instances.object4;
      expect(ajv.validate(dogSchema, dogInstance)).toBe(true);

      dogInstance = instances.object5;
      expect(ajv.validate(dogSchema, dogInstance)).toBe(true);

      expectInstances
        .allExcept(["object3", "object4", "object5"])
        .toBeInvalidAgainst(dogSchema);
    });

    it("with additional properties", () => {
      const addressSchema = {
        type: "object",
        properties: {
          number: { type: "number" },
          streetName: { type: "string" },
          streetType: {
            type: "string",
            enum: ["Street", "Avenue", "Boulevard"],
          },
        },
        required: ["number", "streetName", "streetType"],
        additionalProperties: true,
      } as const;

      type Address = FromSchema<typeof addressSchema>;

      let assertAddress: DoesBothExtend<
        Address,
        {
          [x: string]: any;
          number: number;
          streetName: string;
          streetType: "Street" | "Avenue" | "Boulevard";
        }
      >;
      assertAddress = true;

      let addressInstance: Address;
      addressInstance = instances.object6;
      expect(ajv.validate(addressSchema, addressInstance)).toBe(true);

      addressInstance.direction = instances.object7.direction;
      expect(ajv.validate(addressSchema, addressInstance)).toBe(true);

      expectInstances
        .allExcept(["object6", "object7"])
        .toBeInvalidAgainst(addressSchema);
    });

    it("with typed additional properties", () => {
      const addressSchema = {
        type: "object",
        properties: {
          number: { type: "number" },
          streetName: { type: "string" },
          streetType: {
            type: "string",
            enum: ["Street", "Avenue", "Boulevard"],
          },
        },
        required: ["number", "streetName", "streetType"],
        additionalProperties: { type: "string" },
      } as const;

      type Address = FromSchema<typeof addressSchema>;

      let assertAddress: DoesBothExtend<
        Address,
        {
          [x: string]: any;
          number: number;
          streetName: string;
          streetType: "Street" | "Avenue" | "Boulevard";
        }
      >;
      assertAddress = true;

      let addressInstance: Address;
      addressInstance = instances.object6;
      expect(ajv.validate(addressSchema, addressInstance)).toBe(true);

      addressInstance.direction = instances.object7.direction;
      expect(ajv.validate(addressSchema, addressInstance)).toBe(true);

      expectInstances
        .allExcept(["object6", "object7"])
        .toBeInvalidAgainst(addressSchema);
    });
  });

  describe("without specified properties", () => {
    it("without any properties", () => {
      const petSchema = { type: "object" } as const;

      type Pet = FromSchema<typeof petSchema>;

      let assertPet: DoesBothExtend<Pet, object>;
      assertPet = true;

      let petInstance: Pet;
      petInstance = {};
      expect(ajv.validate(petInstance, petSchema)).toBe(true);

      expectInstances
        .list([
          "object1",
          "object2",
          "object3",
          "object4",
          "object5",
          "object6",
          "object7",
        ])
        .toBeValidAgainst(petSchema);
      expectInstances
        .allExcept([
          "object1",
          "object2",
          "object3",
          "object4",
          "object5",
          "object6",
          "object7",
        ])
        .toBeInvalidAgainst(petSchema);
    });

    it("with additional properties only", () => {
      const setSchema = {
        type: "object",
        additionalProperties: { type: "boolean" },
      } as const;

      type Set = FromSchema<typeof setSchema>;

      let assertSet: DoesBothExtend<Set, { [key: string]: boolean }>;
      assertSet = true;

      let setInstance: Set;
      setInstance = { element1: true, element2: false };
      expect(ajv.validate(setInstance, setSchema)).toBe(true);

      expectInstances.allExcept([]).toBeInvalidAgainst(setSchema);
    });
  });

  it("with pattern properties only", () => {
    const strOrNumObjSchema = {
      type: "object",
      patternProperties: {
        "^S": { type: "string" },
        "^I": { type: "integer" },
      },
      additionalProperties: false,
    } as const;

    type StrOrNumObj = FromSchema<typeof strOrNumObjSchema>;

    let assertStrOrNumObj: DoesBothExtend<
      StrOrNumObj,
      { [key: string]: string | number }
    >;
    assertStrOrNumObj = true;

    let objInstance: StrOrNumObj;
    objInstance = { S: "str", I: 42 };
    expect(ajv.validate(strOrNumObjSchema, objInstance)).toBe(true);

    expectInstances.allExcept([]).toBeInvalidAgainst(strOrNumObjSchema);
  });

  it("with both pattern and additional properties", () => {
    const boolStrOrNumObjSchema = {
      type: "object",
      additionalProperties: { type: "boolean" },
      patternProperties: {
        "^S": { type: "string" },
        "^I": { type: "integer" },
      },
    } as const;

    type BoolStrOrNumObj = FromSchema<typeof boolStrOrNumObjSchema>;

    let assertBoolStrOrNumObj: DoesBothExtend<
      BoolStrOrNumObj,
      { [key: string]: boolean | string | number }
    >;
    assertBoolStrOrNumObj = true;

    let objInstance: BoolStrOrNumObj;
    objInstance = { bool: true, S: "str", I: 42 };
    expect(ajv.validate(boolStrOrNumObjSchema, objInstance)).toBe(true);

    expectInstances.allExcept([]).toBeInvalidAgainst(boolStrOrNumObjSchema);
  });
});
