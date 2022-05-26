import dts from "rollup-plugin-dts";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import typescript from "@rollup/plugin-typescript";
import { basename } from "path";

import { dependencies } from "./package.json";

// as it currently stands, all skypack plugins for rollup do not support scoped imports (e.g. @types/*)
// nor do they support a ?dts query string suffix to the url, which is necessary for deno
// import maps are a great substitute for such a plugin, and they offer more flexibility
const imports = {};
for (const [dep, ver] of Object.entries(dependencies))
  imports[basename(dep)] = `https://cdn.skypack.dev/${dep}@${ver}?dts`;

const config = [
  {
    input: "./src/index.ts",
    output: [{ file: "./builds/deno/index.d.ts", format: "es" }],
    plugins: [rollupImportMapPlugin([{ imports }]), dts()],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "./builds/deno/index.js", format: "cjs" }],
    plugins: [
      typescript({
        compilerOptions: {
          outDir: "builds/deno",
          lib: ["es5", "es6", "dom"],
          target: "es5",
        },
      }),
    ],
  },
  {
    input: "./src/index.ts",
    output: [{ file: "./builds/deno/index.mjs", format: "es" }],
    plugins: [
      typescript({
        compilerOptions: {
          outDir: "builds/deno",
          lib: ["es5", "es6", "dom"],
          target: "es5",
        },
      }),
    ],
  },
];

export default config;
