import { asConst } from "./asConst";

describe("asConst", () => {
  it("returns argument without modifying it", () => {
    expect(asConst(1)).toStrictEqual(1);

    expect(asConst({ some: "object" })).toStrictEqual({ some: "object" });

    expect(asConst(["some", { complex: "array" }])).toStrictEqual([
      "some",
      { complex: "array" },
    ]);
  });
});
