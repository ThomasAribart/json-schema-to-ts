import { A } from "ts-toolbelt";

import { Resolve, Error } from "meta-types";

const test: A.Equals<Resolve<Error<"Any">>, never> = 1;
test;
