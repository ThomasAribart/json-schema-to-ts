import { A } from "ts-toolbelt";

import { Resolve, Never, Const, Primitive, Object } from "meta-types";
import { IsRepresentable } from "meta-types/utils";

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

// --- ISREPRESENTABLE ---

const notRepresentable1: A.Equals<
  IsRepresentable<Object<{ a: Const<"A">; b: Never }, "b">>,
  false
> = 1;
notRepresentable1;

const notRepresentable2: A.Equals<
  IsRepresentable<Object<{}, "b", false>>,
  false
> = 1;
notRepresentable2;

const notRepresentable3: A.Equals<
  IsRepresentable<Object<{}, "b", true, Never>>,
  false
> = 1;
notRepresentable3;

const representable1: A.Equals<
  IsRepresentable<Object<{ a: Const<"A">; b: Never }, "a">>,
  true
> = 1;
representable1;

const representable2: A.Equals<
  IsRepresentable<Object<{}, "b", true>>,
  true
> = 1;
representable2;

const representable3: A.Equals<
  IsRepresentable<Object<{}, "b", true, Const<"A">>>,
  true
> = 1;
representable3;
