import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const publishDirectory = path.join(
  repositoryRoot,
  "packages/i18n/.lingva/artifacts/publish",
);
const manifestPath = path.join(publishDirectory, "manifest.json");

const nativeTargets = [
  {
    directory: "apps/native/swift/Sources/LingvaDemoCore/Resources",
    fileName: (locale) => `${locale}.json`,
  },
  {
    directory: "apps/native/kotlin/app/src/main/res/raw",
    fileName: (locale) => `lingva_${locale}.json`,
  },
  {
    directory: "apps/native/flutter/assets/i18n",
    fileName: (locale) => `${locale}.json`,
  },
];

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

await Promise.all(
  nativeTargets.flatMap((target) =>
    manifest.bundles.map(async ({ fileName, locale }) => {
      const targetDirectory = path.join(repositoryRoot, target.directory);
      await mkdir(targetDirectory, { recursive: true });
      await copyFile(
        path.join(publishDirectory, fileName),
        path.join(targetDirectory, target.fileName(locale)),
      );
    }),
  ),
);

console.log(
  `Synced ${manifest.bundles.length} Lingva bundles to ${nativeTargets.length} native apps.`,
);
