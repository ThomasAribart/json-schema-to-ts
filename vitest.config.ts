import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  test: {
    include: ["src/**/*.bench.test.ts"],
    globalSetup: ["global-setup.bench.ts"],
    reporters: ["default", "verbose"],
  },
});
