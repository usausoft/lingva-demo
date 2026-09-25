import { createApp } from "vue";
import { createLingvaVue } from "@lingva/vue";
import {
  createDemoRuntimeConfig,
  resolveDemoLocale,
  type resources,
} from "@lingva-demo/i18n";
import App from "./App.vue";
import "../../../../packages/theme/demo.css";
const search = window.location.search;
const lingva = createLingvaVue<typeof resources>({
  ...createDemoRuntimeConfig(search),
  locale: resolveDemoLocale(new URLSearchParams(search).get("locale")),
});
createApp(App).use(lingva).mount("#app");
