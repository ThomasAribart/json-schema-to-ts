import { A } from "ts-toolbelt";

import { Resolve, Object, Primitive } from "meta-types";

// --- OPEN ---

const test1: A.Equals<
  Resolve<
    Object<
      { str: Primitive<string>; num: Primitive<number> },
      "str",
      true,
      Primitive<string>
    >
  >,
  { str: string; num?: number | undefined; [k: string]: unknown }
> = 1;
test1;

const test2: A.Equals<
  Resolve<Object<{}, never, true, Primitive<string>>>,
  { [k: string]: string }
> = 1;
test2;

// --- CLOSED ---

const test3: A.Equals<
  Resolve<
    Object<{ str: Primitive<string>; num: Primitive<number> }, "str", false>
  >,
  { str: string; num?: number | undefined }
> = 1;
test3;

const test4: A.Equals<
  Resolve<Object<{ str: Primitive<string> }, "str" | "num", false>>,
  never
> = 1;
test4;
