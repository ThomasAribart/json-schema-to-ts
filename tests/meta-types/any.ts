import { A } from "ts-toolbelt";

import { Resolve, Any } from "meta-types";
import { IsRepresentable } from "meta-types/utils";

const test: A.Equals<Resolve<Any>, unknown> = 1;
test;

// --- ISREPRESENTABLE ---

const representable: A.Equals<IsRepresentable<Any>, true> = 1;
representable;
