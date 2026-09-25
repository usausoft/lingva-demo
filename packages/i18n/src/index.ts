export { default as lingvaConfig } from "../lingva.config";
export { default as lingvaProject } from "../.lingva/generated/project";
export { resources } from "../.lingva/generated/project";
export type { LingvaProjectResources } from "../.lingva/generated/project";
export {
  DEFAULT_DEMO_LOCALE,
  DEMO_LOCALES,
  DEMO_LOCALE_OPTIONS,
  resolveDemoLocale,
  type DemoLocale,
} from "../lingva.config";
export {
  createDemoRuntimeConfig,
  DEMO_DELIVERY_QUERY_PARAMETER,
  resolveDemoDeliveryUrl,
} from "./runtime";
