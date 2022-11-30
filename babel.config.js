const defaultPresets = [
  [
    "@babel/preset-typescript",
    { allowNamespaces: true, allowDeclareFields: true },
  ],
];

module.exports = {
  env: {
    cjs: {
      presets: [["@babel/preset-env", { modules: "cjs" }], ...defaultPresets],
    },
    esm: {
      presets: [["@babel/preset-env", { modules: false }], ...defaultPresets],
    },
  },
  ignore: [/.*\/(.*\.|)test\.tsx?/, /node_modules/, /lib/, /builds/],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ts"],
        alias: { "~": "./src" },
      },
    ],
    "@babel/plugin-transform-runtime",
  ],
};
