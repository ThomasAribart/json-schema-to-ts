import { A } from "ts-toolbelt";

import { Resolve, Const } from "meta-types";

// --- PRIMITIVE ---

const test1: A.Equals<Resolve<Const<null>>, null> = 1;
test1;

const test2: A.Equals<Resolve<Const<true>>, true> = 1;
test2;

const test3: A.Equals<Resolve<Const<"foo">>, "foo"> = 1;
test3;

const test4: A.Equals<Resolve<Const<42>>, 42> = 1;
test4;

// --- TUPLE ---

const test5: A.Equals<Resolve<Const<["foo", "bar"]>>, ["foo", "bar"]> = 1;
test5;

// --- OBJECT ---

const test6: A.Equals<Resolve<Const<{ foo: "bar" }>>, { foo: "bar" }> = 1;
test6;
