import { A } from "ts-toolbelt";

import { Resolve, Any } from "meta-types";

const test: A.Equals<Resolve<Any>, unknown> = 1;
test;
