import { A } from "ts-toolbelt";

import { Resolve, Enum } from "meta-types";

// --- EMPTY ---

const test1: A.Equals<Resolve<Enum<never>>, never> = 1;
test1;

// --- PRIMITIVE ---

const test2: A.Equals<Resolve<Enum<"foo" | "bar">>, "foo" | "bar"> = 1;
test2;

// --- TUPLE ---

const test3: A.Equals<Resolve<Enum<["foo", "bar"]>>, ["foo", "bar"]> = 1;
test3;

// --- OBJECT ---

const test4: A.Equals<Resolve<Enum<{ foo: "bar" }>>, { foo: "bar" }> = 1;
test4;
