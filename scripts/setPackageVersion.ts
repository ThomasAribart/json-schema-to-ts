import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const newVersionTag = process.argv[2] as string | undefined;

const semanticVersioningRegex =
  /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

if (
  newVersionTag === undefined ||
  !semanticVersioningRegex.test(newVersionTag)
) {
  throw new Error("Invalid version");
}

const NEW_VERSION = newVersionTag.slice(1);

console.log(NEW_VERSION);

type PackageJson = {
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

const packageJsonPath = join(__dirname, "..", "package.json");

const packageJson = JSON.parse(
  readFileSync(packageJsonPath).toString(),
) as PackageJson;

packageJson.version = NEW_VERSION;

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
