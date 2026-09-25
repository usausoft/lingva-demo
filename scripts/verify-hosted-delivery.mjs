import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  requireHostedEnvironment,
  resolveBundleUrl,
} from "./hosted-environment.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const artifactsDirectory = path.join(
  repositoryRoot,
  "packages/i18n/.lingva/artifacts/publish",
);
const manifest = JSON.parse(
  await readFile(path.join(artifactsDirectory, "manifest.json"), "utf8"),
);
const bundleUrlTemplate = requireHostedEnvironment("bundleUrlTemplate");

for (const descriptor of manifest.bundles) {
  const expected = JSON.parse(
    await readFile(path.join(artifactsDirectory, descriptor.fileName), "utf8"),
  );
  const url = resolveBundleUrl(
    bundleUrlTemplate,
    descriptor.locale,
    manifest.projectId,
    manifest.environment,
  );
  const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });

  assert.equal(
    response.status,
    200,
    `Hosted delivery returned ${response.status} for ${descriptor.locale}.`,
  );
  const actual = await response.json();
  assert.equal(actual.projectId, expected.projectId);
  assert.equal(actual.environment, expected.environment);
  assert.equal(actual.locale, expected.locale);
  assert.deepEqual(actual.messages, expected.messages);
  assert.deepEqual(actual.variables, expected.variables);
}

console.log(
  `Verified ${manifest.bundles.length} hosted Lingva locale bundles against local publish artifacts.`,
);
