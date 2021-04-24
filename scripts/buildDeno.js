const fs = require("fs").promises;
const path = require("path");

const [, , srcDir, destDir, extension] = process.argv;

const packageJson = require("../package.json");

const importMap = {};

// fill the import map with data from package.json
for (const [dep, version] of Object.entries(packageJson.dependencies)) {
  importMap[
    path.basename(dep)
  ] = `https://cdn.skypack.dev/${dep}@${version}?dts`;
}

// https://gist.github.com/lovasoa/8691344
async function* walk(dir) {
  for await (const d of await fs.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory())
      if (entry === destDir) continue;
      // in case destDir is inside srcDir
      else yield* walk(entry);
    else if (d.isFile()) yield entry;
  }
}

async function exists(name) {
  return await fs
    .lstat(name)
    .then(() => true)
    .catch(() => false);
}

// https://stackoverflow.com/a/48032528
async function replaceAsync(str, regex, asyncFn) {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);
  return str.replace(regex, () => data.shift());
}

async function changeImports(file, match) {
  const [prefix, id, suffix] = match;
  if (id === "." || id === "./")
    return `${prefix}${id}/index${extension}${suffix}`;
  if (id.startsWith(".")) {
    const asFile = path.join(path.dirname(file), `${id}${extension}`);
    const asDir = path.join(path.dirname(file), id);
    if (await exists(asFile)) return `${prefix}${id}${extension}${suffix}`;
    else if (
      (await exists(asDir)) &&
      (await fs.lstat(asDir)).isDirectory() &&
      (await exists(`${asDir}/index${extension}`))
    )
      return `${prefix}${id}/index${extension}${suffix}`;
  } else if (importMap[id]) {
    return `${prefix}${importMap[id]}${suffix}`;
  }
  throw new Error(`could not change imports in ${file} for import ${id}`);
}

async function changeFile(file) {
  const importRe = /(?<=^|\n)((?:im|ex)port\s[\w\s{}*,\n]*['"])(.*)(['"](?:;|\n|$))/g;
  const destFile = path.join(destDir, path.relative(srcDir, file));
  const srcCode = await fs.readFile(file, "utf-8");
  const destCode = await replaceAsync(srcCode, importRe, (_, ...p) =>
    changeImports(file, p)
  );
  await fs.mkdir(path.dirname(destFile), { recursive: true });
  await fs.writeFile(destFile, destCode, "utf-8");
}

async function main() {
  for await (const p of walk(srcDir)) await changeFile(p);
}

main();
