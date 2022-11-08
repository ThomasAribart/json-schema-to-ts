import type { M } from "ts-algebra";
import type { L, S } from "ts-toolbelt";

import type { JSONSchema7 } from "~/definitions";

import type { ParseSchemaOptions } from "../index";
import type { ReferenceSchema } from "./index";
import type { ParseReference } from "./utils";

export type ParseExternalReferenceSchema<
  Sc extends ReferenceSchema,
  O extends ParseSchemaOptions,
  A extends string,
  P extends string | undefined,
  R extends JSONSchema7 = Omit<Sc, "$ref">,
> = A extends keyof O["references"]
  ? ParseReference<O["references"][A], O, P, R>
  : O extends { rootSchema: IdSchema }
  ? ParseExternalReferenceWithIdSchema<O, A, P, R>
  : M.Never;

type ParseDomain<R extends string> = S.Join<L.Pop<S.Split<R, "/">>, "/">;

type IdSchema = JSONSchema7 & { $id: string };

type ParseExternalReferenceWithIdSchema<
  O extends ParseSchemaOptions & { rootSchema: IdSchema },
  A extends string,
  P extends string | undefined,
  R extends JSONSchema7,
  D extends string = ParseDomain<O["rootSchema"]["$id"]>,
  C extends string = S.Join<[D, A], "/">,
> = C extends keyof O["references"]
  ? ParseReference<O["references"][C], O, P, R>
  : M.Never;
