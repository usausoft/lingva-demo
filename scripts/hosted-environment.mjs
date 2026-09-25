const REQUIRED_ENVIRONMENT_VARIABLES = Object.freeze({
  bundleUrlTemplate: "LINGVA_DEMO_BUNDLE_URL_TEMPLATE",
  publishApiUrl: "LINGVA_DEMO_PUBLISH_API_URL",
  publishToken: "LINGVA_DEMO_PUBLISH_TOKEN",
});

export function requireHostedEnvironment(name) {
  const variableName = REQUIRED_ENVIRONMENT_VARIABLES[name];
  const value = variableName ? process.env[variableName]?.trim() : undefined;

  if (!variableName || !value) {
    throw new Error(
      `Missing required hosted demo variable ${variableName ?? name}.`,
    );
  }

  return value;
}

export function resolveBundleUrl(template, locale, projectId, environment) {
  return template
    .replaceAll("{locale}", encodeURIComponent(locale))
    .replaceAll("{projectId}", encodeURIComponent(projectId))
    .replaceAll("{environment}", encodeURIComponent(environment));
}
