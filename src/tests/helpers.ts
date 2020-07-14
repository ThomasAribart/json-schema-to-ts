import Ajv from "ajv";

import * as instances from "./instances";

var ajv = new Ajv();

type Schema = string | boolean | object;

export const expectInstances = {
  list: (instanceKeys: (keyof typeof instances)[]) => ({
    toBeValidAgainst: (schema: Schema) => {
      instanceKeys.forEach((instanceKey) => {
        const instance = instances[instanceKey];
        if (instance === undefined) {
          throw new Error(`Unknown instance: ${instanceKey}`);
        }

        const isValidInstance = ajv.validate(schema, instance);

        if (!isValidInstance) {
          console.log("Invalid instance:", instanceKey);
        }

        expect(isValidInstance).toBe(true);
      });
    },
    toBeInvalidAgainst: (schema: Schema) => {
      instanceKeys.forEach((instanceKey) => {
        const instance = instances[instanceKey];
        if (instance === undefined) {
          throw new Error(`Unknown instance: ${instanceKey}`);
        }

        const isValidInstance = ajv.validate(schema, instance);

        if (isValidInstance) {
          console.log("Invalid instance:", instanceKey);
        }

        expect(isValidInstance).toBe(false);
      });
    },
  }),
  allExcept: (instanceKeys: (keyof typeof instances)[]) => ({
    toBeValidAgainst: (schema: Schema) => {
      Object.entries(instances).forEach(([instanceKey, instance]) => {
        if (instanceKeys.includes(instanceKey as keyof typeof instances)) {
          return;
        }

        const isValidInstance = ajv.validate(schema, instance);

        if (!isValidInstance) {
          console.log("Invalid instance:", instanceKey);
        }

        expect(isValidInstance).toBe(true);
      });
    },
    toBeInvalidAgainst: (schema: Schema) => {
      Object.entries(instances).forEach(([instanceKey, instance]) => {
        if (instanceKeys.includes(instanceKey as keyof typeof instances)) {
          return;
        }

        const isValidInstance = ajv.validate(schema, instance);

        if (isValidInstance) {
          console.log("Invalid instance:", instanceKey);
        }

        expect(isValidInstance).toBe(false);
      });
    },
  }),
};
