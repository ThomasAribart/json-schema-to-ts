import dts from "rollup-plugin-dts";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import typescript from "@rollup/plugin-typescript";
import { join, basename } from "path";

import { dependencies } from "./package.json";

const BUILD_PATH = join("builds", "deno");
const DEFINITION_FILE_NAME = "index.d.ts";
const DEFINITION_FILE_PATH = join(BUILD_PATH, DEFINITION_FILE_NAME);
const COMMONJS_FILE_NAME = "index.js";
const COMMONJS_FILE_PATH = join(BUILD_PATH, COMMONJS_FILE_NAME);
const ESM_FILE_NAME = "index.mjs";
const ESM_FILE_PATH = join(BUILD_PATH, ESM_FILE_NAME);

const SOURCE_INPUT_PATH = join("src", "index.ts");
const REFERENCE_COMMENT = `/// <reference types="./${DEFINITION_FILE_NAME}"/>\n`;

// as it currently stands, all skypack plugins for rollup do not support scoped imports (e.g. @types/*)
// nor do they support a ?dts query string suffix to the url, which is necessary for deno
// import maps are a great substitute for such a plugin, and they offer more flexibility
const imports = {};
for (const [dep, ver] of Object.entries(dependencies))
  imports[basename(dep)] = `https://cdn.skypack.dev/${dep}@${ver}?dts`;

const config = [
  {
    input: SOURCE_INPUT_PATH,
    output: [{ file: DEFINITION_FILE_PATH, format: "es" }],
    plugins: [rollupImportMapPlugin([{ imports }]), dts()],
  },
  {
    input: SOURCE_INPUT_PATH,
    output: [
      { file: COMMONJS_FILE_PATH, format: "cjs", banner: REFERENCE_COMMENT },
    ],
    plugins: [
      typescript({
        compilerOptions: { lib: ["es5", "es6", "dom"], target: "es5" },
      }),
    ],
  },
  {
    input: SOURCE_INPUT_PATH,
    output: [{ file: ESM_FILE_PATH, format: "es", banner: REFERENCE_COMMENT }],
    plugins: [
      typescript({
        compilerOptions: { lib: ["es5", "es6", "dom"], target: "es5" },
      }),
    ],
  },
];

export default config;
