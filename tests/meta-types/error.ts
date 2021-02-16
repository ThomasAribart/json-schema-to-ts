import { A } from "ts-toolbelt";

import { Resolve, Error } from "meta-types";
import { IsRepresentable } from "meta-types/utils";

const test: A.Equals<Resolve<Error<"Any">>, never> = 1;
test;

// --- ISREPRESENTABLE ---

const notRepresentable: A.Equals<IsRepresentable<Error<"Any">>, false> = 1;
notRepresentable;
