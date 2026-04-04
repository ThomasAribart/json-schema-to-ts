// @ark/attest types resolve as `any` under moduleResolution: "node" (TS 4.9)

/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { attest } from "@ark/attest";
import { describe, test } from "vitest";

import type { FromSchema } from "./index";

describe("FromSchema: $ref-only fast path", () => {
  test("single $ref to string definition", () => {
    const schema = {
      type: "object",
      required: ["value"],
      properties: { value: { $ref: "#/definitions/S" } },
      additionalProperties: false,
      definitions: { S: { type: "string" } },
    } as const;

    type Result = FromSchema<typeof schema>;
    attest.instantiations([2546, "instantiations"]);
    attest<Result>({} as { value: string });
  });

  test("$ref chain: 2 levels deep", () => {
    const schema = {
      type: "object",
      required: ["a"],
      properties: { a: { $ref: "#/definitions/B" } },
      additionalProperties: false,
      definitions: {
        B: {
          type: "object",
          required: ["b"],
          properties: { b: { $ref: "#/definitions/Leaf" } },
          additionalProperties: false,
        },
        Leaf: { type: "string" },
      },
    } as const;

    type Result = FromSchema<typeof schema>;
    attest.instantiations([3037, "instantiations"]);
    attest<Result>({} as { a: { b: string } });
  });
});

describe("FromSchema: anyOf/oneOf + $ref", () => {
  test("anyOf [$ref, null] — nullable pattern", () => {
    const schema = {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        admin: {
          anyOf: [{ $ref: "#/definitions/Addr" }, { type: "null" }],
        },
      },
      additionalProperties: false,
      definitions: { Addr: { type: "string" } },
    } as const;

    type Result = FromSchema<typeof schema>;
    attest.instantiations([5016, "instantiations"]);
    attest<Result>({} as { name: string; admin?: string | null });
  });

  test("oneOf with $ref branches (enum pattern)", () => {
    const schema = {
      oneOf: [
        {
          type: "object",
          required: ["a"],
          properties: { a: { $ref: "#/definitions/Inner" } },
          additionalProperties: false,
        },
        {
          type: "object",
          required: ["b"],
          properties: { b: { $ref: "#/definitions/Inner" } },
          additionalProperties: false,
        },
      ],
      definitions: {
        Inner: {
          type: "object",
          required: ["v"],
          properties: { v: { type: "string" } },
          additionalProperties: false,
        },
      },
    } as const;

    type Result = FromSchema<typeof schema>;
    attest.instantiations([7014, "instantiations"]);
    const a: Result = { a: { v: "x" } };
    const b: Result = { b: { v: "y" } };
    attest<typeof a>(a);
    attest<typeof b>(b);
  });
});

describe("FromSchema: $ref + sibling keywords (slow path)", () => {
  test("$ref + required must merge both constraints", () => {
    const schema = {
      type: "object",
      required: ["person"],
      properties: {
        person: {
          $ref: "#/definitions/Person",
          required: ["lastName"],
          additionalProperties: true,
        },
      },
      additionalProperties: false,
      definitions: {
        Person: {
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

    type Result = FromSchema<typeof schema>;
    attest.instantiations([5256, "instantiations"]);
    attest<Result>({} as { person: { firstName: string; lastName: string } });
  });
});

describe("FromSchema: exponential blowup reproduction", () => {
  test("4-level $ref with anyOf/oneOf branching", () => {
    const schema = {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        config: {
          anyOf: [{ $ref: "#/definitions/L1" }, { type: "null" }],
        },
      },
      additionalProperties: false,
      definitions: {
        L1: {
          type: "object",
          properties: {
            label: { type: "string" },
            theme: {
              anyOf: [{ $ref: "#/definitions/L2" }, { type: "null" }],
            },
          },
          additionalProperties: false,
        },
        L2: {
          oneOf: [
            {
              type: "object",
              required: ["url"],
              properties: { url: { type: "string" } },
              additionalProperties: false,
            },
            {
              type: "object",
              required: ["inline"],
              properties: { inline: { $ref: "#/definitions/L3" } },
              additionalProperties: false,
            },
          ],
        },
        L3: {
          oneOf: [
            {
              type: "object",
              required: ["svg"],
              properties: { svg: { $ref: "#/definitions/L4" } },
              additionalProperties: false,
            },
            {
              type: "object",
              required: ["png"],
              properties: { png: { $ref: "#/definitions/L4" } },
              additionalProperties: false,
            },
          ],
        },
        L4: { type: "string" },
      },
    } as const;

    type Result = FromSchema<typeof schema>;
    attest.instantiations([11283, "instantiations"]);
    attest<Result>(
      {} as {
        name: string;
        config?: {
          label?: string;
          theme?:
            | { url: string }
            | { inline: { svg: string } | { png: string } }
            | null;
        } | null;
      },
    );
  });
});
