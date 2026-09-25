import { createLingvaSvelte } from "@lingva/svelte";
import { createDemoRuntimeConfig, resolveDemoLocale } from "@lingva-demo/i18n";
import type { resources } from "@lingva-demo/i18n";

const search = window.location.search;

export const lingva = createLingvaSvelte<typeof resources>({
  ...createDemoRuntimeConfig(search),
  locale: resolveDemoLocale(new URLSearchParams(search).get("locale")),
});
