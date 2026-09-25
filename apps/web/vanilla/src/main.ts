import { createLingvaJsRuntime } from "@lingva/js";
import {
  createDemoRuntimeConfig,
  resolveDemoLocale,
  resolveDemoDeliveryUrl,
  type DemoLocale,
  type resources,
} from "@lingva-demo/i18n";
import "../../../../packages/theme/demo.css";

type DemoResources = typeof resources;
const runtime = createLingvaJsRuntime<DemoResources>({
  ...createDemoRuntimeConfig(window.location.search),
});
const select = document.querySelector<HTMLSelectElement>("[data-locale]")!;
let locale: DemoLocale = resolveDemoLocale(
  new URLSearchParams(window.location.search).get("locale"),
);
runtime.setLocale(locale);
if (resolveDemoDeliveryUrl(window.location.search)) {
  await runtime.preload([], locale);
}

const text = (selector: string, value: string) => {
  const element = document.querySelector<HTMLElement>(
    `[data-copy="${selector}"]`,
  );
  if (element) element.textContent = value;
};

function render() {
  text("eyebrow", runtime.tSync("demo.eyebrow"));
  text("title", runtime.tSync("demo.title"));
  text("subtitle", runtime.tSync("demo.subtitle"));
  text(
    "greeting",
    runtime.tSync("demo.greeting", {
      variables: {
        name: "Ada",
        framework: runtime.tSync("frameworks.vanilla"),
      },
    }),
  );
  text("localeLabel", runtime.tSync("demo.localeLabel"));
  text("framework", runtime.tSync("frameworks.vanilla"));
  text("featureTitle", runtime.tSync("demo.featureTitle"));
  text("featureBody", runtime.tSync("demo.featureBody"));
  text("cta", runtime.tSync("demo.cta"));
  select.value = locale;
  select.options[0]!.text = runtime.tSync("locales.en");
  select.options[1]!.text = runtime.tSync("locales.ru");
}

select.addEventListener("change", async () => {
  locale = select.value as DemoLocale;
  runtime.setLocale(locale);
  if (resolveDemoDeliveryUrl(window.location.search)) {
    await runtime.preload([], locale);
  }
  render();
});
render();
