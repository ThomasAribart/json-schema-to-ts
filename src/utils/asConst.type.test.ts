import type { A } from "ts-toolbelt";

import type { FromSchema } from "../index";
import { asConst } from "./asConst";

const number = asConst(1);
const assertNumber: A.Equals<typeof number, 1> = 1;
assertNumber;

const string = asConst("string");
const assertString: A.Equals<typeof string, "string"> = 1;
assertString;

const array = asConst([1, "string", true]);
const assertArray: A.Equals<typeof array, [1, "string", true]> = 1;
assertArray;

const object = asConst({ some: ["object", 1, "string"] });
const assertObject: A.Equals<
  typeof object,
  { some: ["object", 1, "string"] }
> = 1;
assertObject;

const nestedObject = asConst({
  works: { with: { multiple: { nested: ["types"] } } },
});
const assertNestedObject: A.Equals<
  typeof nestedObject,
  { works: { with: { multiple: { nested: ["types"] } } } }
> = 1;
assertNestedObject;

const func = asConst(
  (a: string, b: { some: "object" }): [1, "string", true] => {
    a;
    b;
    return [1, "string", true];
  }
);
const assertFunc: A.Equals<
  typeof func,
  (a: string, b: { some: "object" }) => [1, "string", true]
> = 1;
assertFunc;

const promise = asConst(new Promise<1>((resolve) => resolve(1)));
const assertPromise: A.Equals<typeof promise, Promise<1>> = 1;
assertPromise;

// On actual schema

enum AdressType {
  residential = "residential",
  business = "business",
}

const addressSchema = asConst({
  type: "object",
  allOf: [
    {
      properties: {
        address: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
      },
      required: ["address", "city", "state"],
    },
    {
      properties: {
        type: { enum: Object.values(AdressType) },
      },
    },
  ],
});

type ReceivedAddress = FromSchema<typeof addressSchema>;
type ExpectedAddress = {
  [x: string]: unknown;
  address: string;
  city: string;
  state: string;
  type?: AdressType;
};

type AssertAddress = A.Equals<ReceivedAddress, ExpectedAddress>;
const assertAddress: AssertAddress = 1;
assertAddress;
