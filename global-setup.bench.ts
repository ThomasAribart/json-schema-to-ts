// @ark/attest types resolve as `any` under moduleResolution: "node" (TS 4.9)

/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call */
import { setup } from "@ark/attest";

/**
 * Precaches type assertion data for `@ark/attest` bench tests.
 * @returns Teardown function
 */
export default (): (() => void) =>
  setup({
    benchErrorOnThresholdExceeded: true,
    tsconfig: "tsconfig.json",
  });
