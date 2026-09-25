import { useState } from "react";
import { useLocale, useTranslation } from "@lingva/react";
import {
  DEMO_DELIVERY_QUERY_PARAMETER,
  DEMO_LOCALES,
  resolveDemoDeliveryUrl,
  type DemoLocale,
  type resources,
} from "@lingva-demo/i18n";

type DemoResources = typeof resources;
const MICROFRONTENDS = [
  { id: "react", labelKey: "frameworks.react", port: 4101 },
  { id: "angular", labelKey: "frameworks.angular", port: 4102 },
  { id: "vue", labelKey: "frameworks.vue", port: 4103 },
  { id: "svelte", labelKey: "frameworks.svelte", port: 4104 },
  { id: "vanilla", labelKey: "frameworks.vanilla", port: 4105 },
] as const;

export function App() {
  const [selectedId, setSelectedId] =
    useState<(typeof MICROFRONTENDS)[number]["id"]>("react");
  const [loading, setLoading] = useState(true);
  const { locale, setLocale } = useLocale<DemoResources>();
  const { t } = useTranslation<DemoResources>();
  const selected =
    MICROFRONTENDS.find(({ id }) => id === selectedId) ?? MICROFRONTENDS[0];
  const childUrl = new URL(`http://127.0.0.1:${selected.port}/`);
  childUrl.searchParams.set("locale", locale);
  const deliveryUrl = resolveDemoDeliveryUrl(window.location.search);
  if (deliveryUrl) {
    childUrl.searchParams.set(DEMO_DELIVERY_QUERY_PARAMETER, deliveryUrl);
  }
  const url = childUrl.toString();

  return (
    <main className="shell">
      <header className="shell-header">
        <div>
          <p className="demo-eyebrow">{t("demo.eyebrow")}</p>
          <h1>{t("demo.shellTitle")}</h1>
          <p>{t("demo.shellHint")}</p>
        </div>
        <label className="demo-field">
          {t("demo.localeLabel")}
          <select
            className="demo-select"
            value={locale}
            onChange={(event) => {
              setLoading(true);
              setLocale(event.target.value as DemoLocale);
            }}
          >
            <option value={DEMO_LOCALES.english}>{t("locales.en")}</option>
            <option value={DEMO_LOCALES.russian}>{t("locales.ru")}</option>
          </select>
        </label>
      </header>
      <nav className="shell-tabs" aria-label={t("demo.shellTitle")}>
        {MICROFRONTENDS.map((item) => (
          <button
            className={item.id === selectedId ? "active" : ""}
            key={item.id}
            onClick={() => {
              setLoading(true);
              setSelectedId(item.id);
            }}
          >
            {t(item.labelKey)}
          </button>
        ))}
      </nav>
      <section className="shell-frame">
        {loading && (
          <div className="shell-loading">
            {t("demo.loading", {
              variables: { framework: t(selected.labelKey) },
            })}
          </div>
        )}
        <iframe
          key={url}
          title={t(selected.labelKey)}
          src={url}
          onLoad={() => setLoading(false)}
        />
      </section>
      <a
        className="shell-standalone"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        {t("demo.openStandalone")}
      </a>
      <aside className="shell-native">
        <h2>{t("demo.nativeTitle")}</h2>
        <p>{t("demo.nativeHint")}</p>
        <div>
          {(["swift", "kotlin", "flutter"] as const).map((id) => (
            <span className="demo-chip" key={id}>
              {t(`frameworks.${id}`)}
            </span>
          ))}
        </div>
      </aside>
    </main>
  );
}
