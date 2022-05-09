import { M } from "ts-algebra";
import { L, S } from "ts-toolbelt";

import { JSONSchema7 } from "../../definitions";

import { ParseSchemaOptions } from "../index";

import { ReferenceSchema } from "./index";
import { ParseReference } from "./utils";

export type ParseExternalReferenceSchema<
  S extends ReferenceSchema,
  O extends ParseSchemaOptions,
  A extends string,
  P extends string | undefined,
  R extends JSONSchema7 = Omit<S, "$ref">
> = A extends keyof O["references"]
  ? ParseReference<O["references"][A], O, P, R>
  : O extends { rootSchema: IdSchema }
  ? ParseExternalReferenceWithIdSchema<O, A, P, R>
  : M.Never;

export type ParseDomain<R extends string> = S.Join<L.Pop<S.Split<R, "/">>, "/">;

type IdSchema = JSONSchema7 & { $id: string };

export type ParseExternalReferenceWithIdSchema<
  O extends ParseSchemaOptions & { rootSchema: IdSchema },
  A extends string,
  P extends string | undefined,
  R extends JSONSchema7,
  D extends string = ParseDomain<O["rootSchema"]["$id"]>,
  C extends string = S.Join<[D, A], "/">
> = C extends keyof O["references"]
  ? ParseReference<O["references"][C], O, P, R>
  : M.Never;
