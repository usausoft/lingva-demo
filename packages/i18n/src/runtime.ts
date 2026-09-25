import { LINGVA_DELIVERY_MODES } from "@lingva/core";
import lingvaConfig from "../lingva.config";
import lingvaProject from "../.lingva/generated/project";

export const DEMO_DELIVERY_QUERY_PARAMETER = "delivery";

export function resolveDemoDeliveryUrl(search: string): string | undefined {
  const value = new URLSearchParams(search).get(DEMO_DELIVERY_QUERY_PARAMETER);
  return value?.trim() || undefined;
}

export function createDemoRuntimeConfig(search: string) {
  const deliveryUrl = resolveDemoDeliveryUrl(search);

  return deliveryUrl
    ? {
        ...lingvaConfig,
        delivery: {
          mode: LINGVA_DELIVERY_MODES.cdn,
          url: deliveryUrl,
        },
      }
    : {
        ...lingvaConfig,
        project: lingvaProject,
      };
}
