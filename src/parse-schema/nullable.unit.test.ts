import { FromSchema } from "index";

import { ajv } from "./ajv.util.test";

describe("Nullable schemas", () => {
  describe("Simple nullable schema", () => {
    const nullableBooleanSchema = { type: "boolean", nullable: true } as const;

    type NullableBoolean = FromSchema<typeof nullableBooleanSchema>;
    let nullableBooleanInst: NullableBoolean;

    it("accepts null value", () => {
      nullableBooleanInst = true;
      expect(ajv.validate(nullableBooleanSchema, nullableBooleanInst)).toBe(
        true
      );

      nullableBooleanInst = null;
      expect(ajv.validate(nullableBooleanSchema, nullableBooleanInst)).toBe(
        true
      );
    });
  });

  describe("Simple non nullable schema", () => {
    const booleanSchema = { type: "boolean" } as const;
    const nonNullableBooleanSchema = {
      type: "boolean",
      nullable: false,
    } as const;

    type Boolean = FromSchema<typeof booleanSchema>;
    let booleanInst: Boolean;

    type NonNullableBoolean = FromSchema<typeof nonNullableBooleanSchema>;
    let nonNullableBooleanInst: NonNullableBoolean;

    it("rejects null value", () => {
      // @ts-expect-error
      booleanInst = null;
      expect(ajv.validate(booleanSchema, booleanInst)).toBe(false);

      // @ts-expect-error
      nonNullableBooleanInst = null;
      expect(
        ajv.validate(nonNullableBooleanSchema, nonNullableBooleanInst)
      ).toBe(false);
    });
  });

  describe("Nested nullable schema", () => {
    const objectWithNullablePropSchema = {
      type: "object",
      properties: {
        nullable: { type: "string", nullable: true },
        explicitNonNullable: { type: "string", nullable: false },
        implicitNonNullable: { type: "string" },
      },
      required: ["nullable", "explicitNonNullable", "implicitNonNullable"],
      additionalProperties: false,
    } as const;

    type ObjectWithNullableProp = FromSchema<
      typeof objectWithNullablePropSchema
    >;
    let objectInst: ObjectWithNullableProp;

    it("accepts null on nullable property", () => {
      objectInst = {
        nullable: "str",
        explicitNonNullable: "str",
        implicitNonNullable: "str",
      };
      expect(ajv.validate(objectWithNullablePropSchema, objectInst)).toBe(true);

      objectInst = {
        nullable: null,
        explicitNonNullable: "str",
        implicitNonNullable: "str",
      };
      expect(ajv.validate(objectWithNullablePropSchema, objectInst)).toBe(true);
    });

    it("rejects null on non-nullable property", () => {
      objectInst = {
        nullable: "str",
        // @ts-expect-error
        explicitNonNullable: null,
        implicitNonNullable: "str",
      };
      expect(ajv.validate(objectWithNullablePropSchema, objectInst)).toBe(
        false
      );

      objectInst = {
        nullable: null,
        explicitNonNullable: "str",
        // @ts-expect-error
        implicitNonNullable: null,
      };
      expect(ajv.validate(objectWithNullablePropSchema, objectInst)).toBe(
        false
      );
    });
  });

  describe("Deeply nested nullable schema", () => {
    const objectWithNullablePropSchema = {
      type: "object",
      properties: {
        // TOIMPROVE: Make it work with booleans (for the moment, M.Exclude<M.Primitive<Boolean>, M.Const<true>> = M.Primitive<Boolean> => Could be M.Const<false>)
        preventNullable: { type: "string", enum: ["true", "false"] },
        potentiallyNullable: {
          type: "string",
          nullable: true,
        },
      },
      required: ["preventNullable", "potentiallyNullable"],
      additionalProperties: false,
      allOf: [
        {
          if: {
            properties: {
              preventNullable: { const: "true" },
            },
          },
          then: {
            properties: {
              potentiallyNullable: {
                type: "string",
                nullable: false,
              },
            },
          },
        },
      ],
    } as const;

    type ObjectWithNullableProp = FromSchema<
      typeof objectWithNullablePropSchema,
      { parseIfThenElseKeywords: true }
    >;
    let objectInst: ObjectWithNullableProp;

    it("accepts null on nullable property", () => {
      objectInst = {
        preventNullable: "false",
        potentiallyNullable: null,
      };
      expect(ajv.validate(objectWithNullablePropSchema, objectInst)).toBe(true);
    });

    it("rejects null on non-nullable property", () => {
      // TOIMPROVE: Fix this: Use of allOf breaks the ifThenElse if exclusion somehow (works fine without allOf)
      objectInst = {
        preventNullable: "true",
        // @ts-NOT-expect-error
        potentiallyNullable: null,
      };
      expect(ajv.validate(objectWithNullablePropSchema, objectInst)).toBe(
        false
      );
    });
  });
});
