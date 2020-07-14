import { FromSchema } from "../index";
import { DoesBothExtend } from "../utils";

import * as instances from "./instances";
import { expectInstances } from "./helpers";

it("shoud derive correct types for null schema", () => {
  const nullSchema = { type: "null" } as const;

  type Null = FromSchema<typeof nullSchema>;

  let assertNull: DoesBothExtend<Null, null>;
  assertNull = true;

  let nullInstance: Null;
  nullInstance = instances.lNull;

  expectInstances.list(["lNull"]).toBeValidAgainst(nullSchema);
  expectInstances.allExcept(["lNull"]).toBeInvalidAgainst(nullSchema);
});
