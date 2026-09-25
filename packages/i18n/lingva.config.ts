import {
  LINGVA_DELIVERY_MODES,
  LINGVA_DEPLOYMENT_STAGES,
  defineLingvaConfig,
} from "@lingva/core";

export const DEMO_LOCALES = {
  english: "en",
  russian: "ru",
} as const;
export type DemoLocale = (typeof DEMO_LOCALES)[keyof typeof DEMO_LOCALES];
export const DEFAULT_DEMO_LOCALE: DemoLocale = DEMO_LOCALES.english;
export const DEMO_LOCALE_OPTIONS = Object.values(DEMO_LOCALES);

export function resolveDemoLocale(value: string | null): DemoLocale {
  return value === DEMO_LOCALES.russian
    ? DEMO_LOCALES.russian
    : DEFAULT_DEMO_LOCALE;
}

export default defineLingvaConfig({
  projectId: "lingva-framework-demo",
  environment: LINGVA_DEPLOYMENT_STAGES.development,
  locales: DEMO_LOCALE_OPTIONS,
  defaultLocale: DEFAULT_DEMO_LOCALE,
  locale: DEFAULT_DEMO_LOCALE,
  fallbackLocale: DEFAULT_DEMO_LOCALE,
  translationFiles: ".lingva/translations/{locale}.json",
  generatedProjectFile: ".lingva/generated/project.ts",
  metadataFile: ".lingva/metadata.json",
  delivery: {
    mode: LINGVA_DELIVERY_MODES.local,
    path: ".lingva/translations/{locale}.json",
  },
});
