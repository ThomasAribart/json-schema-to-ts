import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import { expectInstances } from "./helpers";

describe("boolean", () => {
  it("should validate any schema instance", () => {
    type Any = FromSchema<boolean>;

    let assertAny: DoesBothExtend<Any, any>;
    assertAny = true;

    let anyInstance: Any;
    anyInstance = null;
    anyInstance = true;
    anyInstance = "string";
    anyInstance = 42;
    anyInstance = { foo: "bar" };
    anyInstance = ["foo", "bar"];
  });
});

describe("true", () => {
  it("should validate any schema instance", () => {
    type Any = FromSchema<true>;

    let assertAny: DoesBothExtend<Any, any>;
    assertAny = true;

    let anyInstance: Any;
    anyInstance = null;
    anyInstance = true;
    anyInstance = "string";
    anyInstance = 42;
    anyInstance = { foo: "bar" };
    anyInstance = ["foo", "bar"];

    expectInstances.allExcept([]).toBeValidAgainst(true);
  });
});

describe("false", () => {
  expectInstances.allExcept([]).toBeInvalidAgainst(false);
});

describe("string", () => {
  it("should validate any schema instance", () => {
    type Any = FromSchema<string>;

    let assertAny: DoesBothExtend<Any, any>;
    assertAny = true;

    let anyInstance: Any;
    anyInstance = null;
    anyInstance = true;
    anyInstance = "string";
    anyInstance = 42;
    anyInstance = { foo: "bar" };
    anyInstance = ["foo", "bar"];
  });

  it("should validate any schema instance", () => {
    // No need to test validation here, string = schema ref

    type Any = FromSchema<"foo">;

    let assertAny: DoesBothExtend<Any, any>;
    assertAny = true;

    let anyInstance: Any;
    anyInstance = null;
    anyInstance = true;
    anyInstance = "string";
    anyInstance = 42;
    anyInstance = { foo: "bar" };
    anyInstance = ["foo", "bar"];
  });
});
