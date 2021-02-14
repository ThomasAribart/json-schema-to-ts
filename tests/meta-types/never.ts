import { A } from "ts-toolbelt";

import { Resolve, Never } from "meta-types";

const test: A.Equals<Resolve<Never>, never> = 1;
test;
