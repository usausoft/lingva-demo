import path from "node:path";
import { fileURLToPath } from "node:url";

import { pushLingvaProject } from "@lingva/cli";
import {
  LINGVA_DELIVERY_SOURCES,
  LINGVA_DEPLOYMENT_STAGES,
} from "@lingva/core";

import { requireHostedEnvironment } from "./hosted-environment.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const configFile = path.join(repositoryRoot, "packages/i18n/lingva.config.ts");
const apiUrl = requireHostedEnvironment("publishApiUrl");
const authToken = requireHostedEnvironment("publishToken");

const result = await pushLingvaProject(configFile, {
  authToken,
  apiUrl,
  cwd: repositoryRoot,
  outputDir: "packages/i18n/.lingva/artifacts/hosted",
  invalidate: true,
  invalidateApiUrl: apiUrl,
  invalidateAuthToken: authToken,
  invalidateEnvironment: LINGVA_DEPLOYMENT_STAGES.development,
  invalidateReason: "Publish lingva-demo translation contract",
  invalidateSource: LINGVA_DELIVERY_SOURCES.repository,
});

console.log(result.report);
